FROM node:lts-alpine3.15
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8080
WORKDIR /app/src/api
CMD [ "node", "server.js" ]