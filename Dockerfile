# Stage 1: Build compilation engine
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Minimalist production delivery server
FROM alpine:3.19
RUN apk add --no-cache caddy
WORKDIR /srv
# Copy the compiled production assets from the builder stage
COPY --from=builder /app/dist .
EXPOSE 80
CMD ["caddy", "file-server", "--listen", ":80"]