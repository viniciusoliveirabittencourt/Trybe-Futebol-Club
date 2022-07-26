FROM node:16-alpine
WORKDIR /app-backend
COPY package*.json /app-backend/
RUN npm i
COPY . .
EXPOSE 3001
ENTRYPOINT [ "npm", "start" ]
