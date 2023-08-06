FROM node:18-alpine AS DEV

WORKDIR /usr/web

COPY ./package*.json ./
RUN npm install

COPY ./ ./
RUN apk add --no-cache bash
EXPOSE 3000

CMD ["npm", "run", "dev"]
