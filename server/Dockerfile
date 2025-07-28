# server/Dockerfile
FROM node:22.17.1-alpine3.22 AS build

RUN apk add --no-cache postgresql-client

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install ALL dependencies (including devDependencies) for build stage
RUN npm ci

# Copy source code BEFORE building
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Now build the application
RUN npm run build

# Copy entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["nodemon", "--watch", "src", "--exec", "ts-node", "src/main.ts"]

# Production stage
FROM node:22.17.1-alpine3.22 as production

RUN apk add --no-cache postgresql-client

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/uploads ./uploads

# Copy entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["node", "dist/main.js"]