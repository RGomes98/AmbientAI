#!/bin/bash
set -e
export $(grep -v '^#' .env | xargs)

# Configuration variables
TAG="latest"
IMAGE_NAME="ambientai-api"
FULL_IMAGE="$DOCKER_USERNAME/$IMAGE_NAME:$TAG"

# Test variables
API_CONTAINER_NAME="test-api"
DB_CONTAINER_NAME="test-db"
NETWORK_NAME="test-network"

# Helper functions
cleanup() {
    echo "⚠️ Cleaning up temporary containers and network..."
    docker stop "$API_CONTAINER_NAME" >/dev/null 2>&1 || true
    docker rm "$API_CONTAINER_NAME" >/dev/null 2>&1 || true
    docker stop "$DB_CONTAINER_NAME" >/dev/null 2>&1 || true
    docker rm "$DB_CONTAINER_NAME" >/dev/null 2>&1 || true
    docker network rm "$NETWORK_NAME" >/dev/null 2>&1 || true
}

trap cleanup EXIT

remove_network_if_exists() {
    if docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
        echo "⚠️ Network $NETWORK_NAME already exists. Removing..."
        local containers
        containers=$(docker ps -aq --filter network="$NETWORK_NAME")
        if [ -n "$containers" ]; then
            echo "⚠️ Stopping and removing containers connected to network $NETWORK_NAME..."
            docker stop $containers >/dev/null
            docker rm $containers >/dev/null
        fi
        docker network rm "$NETWORK_NAME" >/dev/null 2>&1 || true
    fi
}

wait_for_postgres() {
    echo "⏳ Waiting for the database to start..."
    local retries=0
    local max_retries=30
    until docker exec "$DB_CONTAINER_NAME" pg_isready -U ${POSTGRES_USER} >/dev/null 2>&1; do
        retries=$((retries+1))
        echo "⏳ Attempt $retries/$max_retries..."
        sleep 1
        if [ $retries -ge $max_retries ]; then
            echo "❌ Database did not start after $max_retries seconds."
            exit 1
        fi
    done
    echo "✅ Database is ready!"
}

wait_for_api() {
    echo "⏳ Waiting for the API to start..."
    local retries=0
    local max_retries=30
    local status
    until status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/health) && [ "$status" -eq 200 ]; do
        retries=$((retries+1))
        if [ "$status" = "000" ] || [ -z "$status" ]; then
            echo "⏳ Attempt $retries/$max_retries..."
        else
            echo "⏳ Attempt $retries/$max_retries (last status: $status)..."
        fi
        sleep 1
        if [ $retries -ge $max_retries ]; then
            echo "❌ API did not respond with '200' at '/health' after $max_retries seconds (last status: ${status:-N/A})."
            exit 1
        fi
    done
    echo "✅ API responded with '200' at '/health'!"
}

# Local build
echo "🔹 Step 1: Testing local TypeScript build..."
npx prisma generate
npm run build
echo "✅ Local build OK!"

# Docker build
echo "🔹 Step 2: Building Docker image..."
docker build -t "$FULL_IMAGE" .
echo "✅ Image built: $FULL_IMAGE"

# Temporary network and database
remove_network_if_exists
docker network create "$NETWORK_NAME" >/dev/null

echo "🔹 Step 3: Starting temporary database..."
docker run -d \
    --name "$DB_CONTAINER_NAME" \
    --network "$NETWORK_NAME" \
    -e POSTGRES_USER=${POSTGRES_USER} \
    -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD} \
    -e POSTGRES_DB=${POSTGRES_DB} \
    postgres:15-alpine >/dev/null

wait_for_postgres

# Temporary API container for testing
echo "🔹 Step 4: Starting temporary API container for testing..."
docker run -d -p 8080:8080 --env-file .env \
    --name "$API_CONTAINER_NAME" \
    --network "$NETWORK_NAME" \
    -e POSTGRES_DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_CONTAINER_NAME}:${POSTGRES_PORT}/${POSTGRES_DB}" \
    -e POSTGRES_DATABASE_URL_NON_POOLING="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_CONTAINER_NAME}:${POSTGRES_PORT}/${POSTGRES_DB}" \
    "$FULL_IMAGE" >/dev/null

wait_for_api

# Docker Hub push
echo "🔹 Step 5: Logging in to Docker Hub..."
echo "$DOCKER_PASSWORD" | docker login --username "$DOCKER_USERNAME" --password-stdin

echo "🔹 Step 6: Pushing image to Docker Hub..."
docker push "$FULL_IMAGE"

docker logout
echo "✅ Docker Hub logout completed, credentials cleared"
echo "🎉 Deploy successfully completed! -> $FULL_IMAGE"