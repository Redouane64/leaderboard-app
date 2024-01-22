declare namespace NodeJS {
  export interface ProcessEnv {
    // appconfig
    NODE_ENV: string;
    HOST: string;
    PORT: string;

    // auth
    JWT_SECRET: string;
    JWT_EXPIRE: string;

    // throttler
    API_RATE_LIMIT: string;
    API_RATE_LIMIT_TTL: string;

    // db
    DATABASE_URL: string;
  }
}
