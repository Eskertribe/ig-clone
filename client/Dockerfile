# Multi-stage build for production-ready React app
FROM node:22-alpine AS build

# Set build-time arguments for Vite environment variables
ARG VITE_API_URL=http://server:3000/api/v1
ARG VITE_GOOGLE_CLIENT_ID=504692938992-3h533nn2o1878b5a83lcrgjkujvuo27n.apps.googleusercontent.com
ARG VITE_GOOGLE_AUTH_URL=http://server:3000/auth/google

# Set environment variables from build args
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_AUTH_URL=$VITE_GOOGLE_AUTH_URL

WORKDIR /app

# Copy package files for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built React app from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Fix permissions for existing nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Use existing nginx user
USER nginx

EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]