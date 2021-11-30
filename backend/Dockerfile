FROM node:16-alpine

LABEL maintainer="wellington Junior <wndrj7@gmail.com>"
LABEL contributors=""

RUN mkdir -p /app

WORKDIR /app

COPY package.json ./

COPY . ./

RUN apk add yarn
RUN yarn install

EXPOSE 3000

CMD ["yarn", "start:dev"]