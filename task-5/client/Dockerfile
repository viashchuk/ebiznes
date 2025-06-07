FROM node:22-alpine

WORKDIR /app

RUN npm i -g serve

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]
