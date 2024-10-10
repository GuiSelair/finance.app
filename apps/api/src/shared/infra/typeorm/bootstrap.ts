import 'dotenv/config';

import { DataSource } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'production';
export const DataSourceConfiguration = new DataSource({
  type: (process.env.DB_TYPE as 'postgres' | 'mysql') ?? 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: +(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root',
  database: process.env.DB_DATABASE ?? 'finance-app',
  logging: true,
  synchronize: false,
  entities: [
    isProduction
      ? 'dist/modules/**/infra/typeorm/entities/*{.ts,.js}'
      : 'src/modules/**/infra/typeorm/entities/*{.ts,.js}',
  ],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
});
