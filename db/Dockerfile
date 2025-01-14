FROM postgres:14

COPY ./db-init/init.sql /docker-entrypoint-initdb.d/

VOLUME ["/var/lib/postgresql/data"]

EXPOSE 5432