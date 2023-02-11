import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  AUTH_COOKIE: process.env.AUTH_COOKIE,
  CLIENT_CONNECTION: process.env.CLIENT_CONNECTION,
};
