FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--host"]

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL