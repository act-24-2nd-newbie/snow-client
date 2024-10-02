FROM node:20-alpine as base

# 1. Install dependencies
FROM base as deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 2. build source code
FROM base as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3. run
FROM nginx:alpine-slim as runner
WORKDIR /app
COPY --from=builder /app/dist .
COPY nginx/app.conf /etc/nginx/conf.d/app.conf
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80