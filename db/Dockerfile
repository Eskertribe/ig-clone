FROM postgres:17.5-alpine

# Create a non-root user for better security
RUN addgroup -g 1001 -S postgres_group && \
    adduser -S -D -H -u 1001 -s /sbin/nologin -G postgres_group postgres_user

# Copy initialization scripts with proper permissions
COPY --chown=postgres:postgres ./db-init/init.sql /docker-entrypoint-initdb.d/

# Set proper permissions on initialization directory
RUN chmod 755 /docker-entrypoint-initdb.d/ && \
    chmod 644 /docker-entrypoint-initdb.d/init.sql

# Create data directory with proper ownership
RUN mkdir -p /var/lib/postgresql/data && \
    chown -R postgres:postgres /var/lib/postgresql/data && \
    chmod 700 /var/lib/postgresql/data

# Use named volume with proper permissions
VOLUME ["/var/lib/postgresql/data"]

# Security: Don't run as root
USER postgres

# Health check for production readiness
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD pg_isready -U ${POSTGRES_USER:-postgres} -d ${POSTGRES_DB:-postgres} || exit 1

EXPOSE 5432