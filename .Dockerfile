FROM node:8.6-alpine

RUN mkdir -p /usr/service
WORKDIR /usr/service

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 5001

CMD export PORT=5001 && npm start
