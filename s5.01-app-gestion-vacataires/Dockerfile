# syntax=docker/dockerfile:1
FROM node:18
WORKDIR /code
ENV PATH /code/node_modules/.bin:$PATH
COPY package.json package.json
RUN npm install
EXPOSE 3000
COPY . .
CMD npm start
