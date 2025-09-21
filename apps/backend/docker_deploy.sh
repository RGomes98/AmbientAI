#!/bin/bash
set -e

FULL_IMAGE="rgomes98/ambientai-api:latest"
NETWORK_NAME="$(basename $(pwd))_default"
VOLUME_NAME="$(basename $(pwd))_postgres-data"

# Helper functions
deploy_exists() {
    docker ps -a --format '{{.Names}}' | grep -q '^api$' || \
    docker network inspect "$NETWORK_NAME" >/dev/null 2>&1 || \
    docker volume inspect "$VOLUME_NAME" >/dev/null 2>&1
}

remove_deploy() {
    echo "⚠️ Removing the entire deployment..."
    docker compose down -v --remove-orphans || true
    docker network inspect "$NETWORK_NAME" >/dev/null 2>&1 && docker network rm "$NETWORK_NAME"
    docker volume inspect "$VOLUME_NAME" >/dev/null 2>&1 && docker volume rm "$VOLUME_NAME"
}

prompt_create_user() {
    local TYPE="$1" VAR_USER="$2" VAR_PASS="$3" NPM_CMD="$4"
    read -p "Do you want to create $TYPE? (y/n): " CREATE
    if [[ "$CREATE" =~ ^[yY]$ ]]; then
        read -p "$TYPE: " USERNAME
        while true; do
            read -s -p "Password: " PASSWORD
            echo
            read -s -p "Repeat password: " PASSWORD_CONFIRM
            echo
            [[ "$PASSWORD" == "$PASSWORD_CONFIRM" ]] && break
            echo "❌ Passwords do not match. Try again."
        done
        if ! docker compose exec -e "$VAR_USER"="$USERNAME" -e "$VAR_PASS"="$PASSWORD" api npm run "$NPM_CMD"; then
            echo "❌ Error creating $TYPE. Cleaning up deployment..."
            remove_deploy
            echo "✅ Deployment cleaned due to error creating $TYPE."
            exit 1
        fi
    else
        echo "⚠️ $TYPE will not be created."
    fi
}

# Indicates if we are creating a new deployment
CREATING_DEPLOY=false

cleanup_on_interrupt() {
    if [ "$CREATING_DEPLOY" = true ]; then
        echo
        echo "⚠️ New deployment interrupted. Cleaning up containers, volumes, and network..."
        remove_deploy
    else
        echo
        echo "⚠️ Deployment interrupted. No cleanup will be performed."
    fi
    exit 1
}

# Catch Ctrl+C or termination signals
trap cleanup_on_interrupt SIGINT SIGTERM

# Options menu
DEPLOY_EXISTS=false
deploy_exists && DEPLOY_EXISTS=true

echo "🔹 Choose the deployment option:"
if [ "$DEPLOY_EXISTS" = true ]; then
    echo "1) Create deployment from scratch (option unavailable, remove first)"
    echo "2) Update existing containers (restart without removing data)"
    echo "3) Remove entire deployment (clean containers, volumes, and network)"
else
    echo "1) Create deployment from scratch (set up new containers, volumes, and network)"
    echo "2) Update existing containers (option unavailable, no deployment found)"
    echo "3) Remove entire deployment (option unavailable, no deployment found)"
fi

read -p "Enter 1, 2, or 3: " OPTION

case "$OPTION" in
1)
    if [ "$DEPLOY_EXISTS" = true ]; then
        echo "❌ Deployment already exists. Remove the current deployment before creating a new one."
        exit 1
    fi
    
    # Enable cleanup protection only during creation
    CREATING_DEPLOY=true

    echo "⚠️ Creating deployment from scratch..."
    docker compose down -v --remove-orphans
    docker network inspect "$NETWORK_NAME" >/dev/null 2>&1 && docker network rm "$NETWORK_NAME"

    echo "🔹 Building images..."
    docker compose build --no-cache
    echo "🔹 Starting containers..."
    docker compose up -d

    echo "🔹 Applying Prisma migrations..."
    docker compose exec api npm run prisma:migrate:prod

    echo "⏳ Waiting for API and database to be ready..."
    until docker compose exec api npx prisma db pull >/dev/null 2>&1; do
        sleep 2
    done

    # Seeds
    prompt_create_user "initial admin user" "ADMIN_EMAIL" "ADMIN_PASSWORD" "prisma:admin-seed:prod"
    prompt_create_user "device writer user" "DEVICE_EMAIL" "DEVICE_PASSWORD" "prisma:device-writer-seed:prod"

    read -p "Do you want to populate air quality data? (y/n): " CREATE_AIR
    if [[ "$CREATE_AIR" =~ ^[yY]$ ]]; then
        if ! docker compose exec api npm run prisma:air-quality-seed:prod; then
            echo "❌ Error creating air quality data. Cleaning up deployment..."
            remove_deploy
            exit 1
        fi
    else
        echo "⚠️ Air quality data will not be created."
    fi
    ;;

2)
    if [ "$DEPLOY_EXISTS" != true ]; then
        echo "❌ No existing deployment to update. Create a deployment first."
        exit 1
    fi

    echo "🔹 Updating existing containers..."
    docker pull "$FULL_IMAGE" || true
    docker compose up -d --build --force-recreate api nginx db
    docker compose exec api npm run prisma:migrate:prod
    ;;

3)
    if [ "$DEPLOY_EXISTS" != true ]; then
        echo "❌ No existing deployment to remove."
        exit 1
    fi

    read -p "⚠️ Are you sure you want to remove the ENTIRE deployment? (y/n): " CONFIRM
    [[ ! "$CONFIRM" =~ ^[yY]$ ]] && { echo "❌ Removal canceled by user."; exit 0; }

    remove_deploy
    echo "✅ Deployment completely cleaned!"
    exit 0
    ;;
    
*)
    echo "❌ Invalid option."
    exit 1
    ;;
esac

echo "🎉 Deployment successfully completed!"
docker compose ps