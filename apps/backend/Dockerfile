# Builder
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install && npx prisma generate

COPY . .
RUN npm run build

# Runtime
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
COPY CHANGELOG.md ./
COPY VERSION ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client

EXPOSE 3000

CMD ["/bin/sh", "-c", "npx prisma migrate deploy && npm run start"]