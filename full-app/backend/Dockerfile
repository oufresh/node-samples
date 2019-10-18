FROM node:lts-buster-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
COPY yarn.lock .

RUN npm install --production
# If you are building your code for production
# RUN npm ci --only=production

COPY dist .
COPY public .

#service port
EXPOSE 3000

#Start service
CMD [ "node", "server.js" ]