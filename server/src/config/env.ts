import * as dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  cors: process.env.CORS,
  dbuser: process.env.DBUSER,
  dbpassword: process.env.DBPASSWORD,
  dbhost: process.env.DBHOST,
  dbport: process.env.DBPORT,
  dbUrl: process.env.DATABASE_URL,
  dbdatabase: process.env.DBDATABASE,
  jwtKeySecret: process.env.SECRET_KEY || "SECRET",
  jwtExpire: process.env.JWT_EXPIRATION,
};
