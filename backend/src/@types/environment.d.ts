declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production';

      /** Datasource configuration */
      DB_HOST?: string;
      DB_TYPE?: 'postgres' | 'mysql';
      DB_PORT?: string;
      DB_USER?: string;
      DB_PASSWORD?: string;
      DB_DATABASE?: string;

      /** JWT configuration */
      JWT_SECRET?: string;
      JWT_EXPIRE_IN?: string;
    }
  }
}

export {};
