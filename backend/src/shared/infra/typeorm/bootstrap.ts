import { DataSource } from "typeorm"

export const ConnectionSource = new DataSource({
  "type": "postgres",
  "host": "datasource",
  "port": 5432,
  "username": "finance",
  "password": "app",
  "database": "finance-app",
  "synchronize": true,
  "logging": true,
  "entities": [
    "./src/modules/**/infra/typeorm/entities/*.ts"
  ],
  "migrations": [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
})