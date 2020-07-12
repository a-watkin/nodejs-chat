FROM node:latest
WORKDIR /user/src/app
COPY package*.json ./

RUN npm install

COPY . .
RUN pwd
RUN ls -alh

EXPOSE 3000
CMD ["node", "../chat-app/index.js"]