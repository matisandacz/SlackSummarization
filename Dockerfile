# https://nodejs.org/en/docs/guides/nodejs-docker-webapp

FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]