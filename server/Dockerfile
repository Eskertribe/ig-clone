# server/Dockerfile
FROM node:22.17.1-alpine3.22 AS build

RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package*.json ./

RUN npm install -g nodemon && npm install

COPY . .

RUN mkdir -p uploads
RUN npm run build

COPY entrypoint.sh /app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["nodemon", "--watch", "src", "--exec", "ts-node", "src/main.ts"]

FROM node:22.17.1-alpine3.22 as production

RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN mkdir -p uploads
RUN npm run build

COPY entrypoint.sh /app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["node", "dist/main.js"]