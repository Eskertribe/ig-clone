# server/Dockerfile
FROM node:22.17.1-alpine3.22 AS build

RUN apk add --no-cache postgresql-client

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

# Install ALL dependencies for build stage
RUN npm ci

# Copy source code BEFORE building
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Build the application with proper output configuration
RUN npm run build

# Production stage
FROM node:22.17.1-alpine3.22 as production

RUN apk add --no-cache postgresql-client

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

# Install ALL dependencies for migrations
RUN npm ci

# Copy built application from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/uploads ./uploads

# Copy entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["node", "dist/main.js"]