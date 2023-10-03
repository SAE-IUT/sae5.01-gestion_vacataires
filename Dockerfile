# syntax=docker/dockerfile:1
FROM node:18
WORKDIR /s5.01-app-gestion-vacataires
COPY package.json package.json
RUN npm install
EXPOSE 4200
COPY . .
CMD ["npm", "start"]