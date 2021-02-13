FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .
RUN npm install

EXPOSE 5000
CMD [ "node", "server.js" ]