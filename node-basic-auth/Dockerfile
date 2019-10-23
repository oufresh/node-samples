FROM node:lts-buster-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
COPY yarn.lock .

# If you are running developements
RUN yarn install
# If you are building your code for production
# RUN yarn install --production

RUN yarn build

COPY dist .
COPY config ./config/
COPY users.json .

#service port
EXPOSE 6000

#Start service
CMD [ "node", "server.js" ]