FROM node:8.15.1

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn

COPY . /app

CMD [ "yarn", "start" ]
