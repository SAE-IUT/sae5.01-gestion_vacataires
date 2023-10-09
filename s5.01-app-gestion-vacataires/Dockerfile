# syntax=docker/dockerfile:1
FROM node:18
WORKDIR /code
ENV PATH /code/node_modules/.bin:$PATH
COPY package.json package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9
EXPOSE 4200
COPY . .
CMD npm start
