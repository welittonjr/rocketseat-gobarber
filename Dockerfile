FROM node:16-alpine

LABEL maintainer="wellington Junior <wndrj7@gmail.com>"
LABEL contributors=""

RUN mkdir -p /app

WORKDIR /app

#  install app dependencies
COPY ./backend/package.json ./

# add app
COPY ./backend ./

RUN npm config set cache /app/.npm-cache --global
RUN npm install

EXPOSE 3000
EXPOSE 5000

CMD ["npm", "run", "start:dev"]