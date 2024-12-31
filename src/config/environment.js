import "dotenv/config";

export const env = {
  APP_HOST: process.env.APP_HOST,
  APP_PORT: Number(process.env.APP_PORT),
  AUTHOR: process.env.AUTHOR,
  BUILD_MODE: process.env.BUILD_MODE,

  JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY,
  JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY,

  CLOUD_IMG_NAME: process.env.CLOUD_IMG_NAME,
  CLOUD_IMG_API_KEY: process.env.CLOUD_IMG_API_KEY,
  CLOUD_IMG_SECRET: process.env.CLOUD_IMG_SECRET,

  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PWD: process.env.DB_PWD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
};
