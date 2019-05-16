ARG NODE_VERSION
FROM node:${NODE_VERSION}

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn

COPY . /app

CMD [ "yarn", "start" ]
