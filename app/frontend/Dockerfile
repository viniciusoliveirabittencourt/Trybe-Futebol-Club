FROM node:16-alpine
WORKDIR /app-frontend
COPY package*.json /app-frontend/
RUN npm i
COPY . .
EXPOSE 3001
ENTRYPOINT [ "npm", "start" ]