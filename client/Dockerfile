FROM node:22-alpine

# Set build-time arguments first
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

WORKDIR /app

# Copy package files for better caching
COPY package.json ./
COPY package-lock.json ./

# Use npm ci for faster, reliable installs
RUN npm ci

COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -S -D -H -u 1001 -s /sbin/nologin -G appgroup appuser && \
    chown -R appuser:appgroup /app

USER appuser

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]