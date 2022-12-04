FROM node:lts-alpine3.15
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
WORKDIR /app/src/api
CMD [ "node", "server.js" ]