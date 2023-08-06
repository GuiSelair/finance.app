FROM node:18-alpine AS dev
WORKDIR /usr/api
COPY ./package*.json ./
RUN npm ci
COPY ./ ./

FROM dev AS dev-api
RUN apk add --no-cache bash
EXPOSE 3333
CMD ["npm", "run", "dev:server"]

FROM dev AS dev-migration
CMD ["npm", "run", "typeorm", "migration:run"]
