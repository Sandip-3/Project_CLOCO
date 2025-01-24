import { Pool } from "pg";
import env from "./env";
import logger from "./logger";

const pool = new Pool({
  user: env.dbuser,
  host: env.dbhost,
  database: env.dbdatabase,
  password: env.dbpassword,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Function to check the database connection and log success/failure
export const checkConnection = async () => {
  try {
    await pool.query("SELECT NOW()");
    logger.info("Database Connection Successful");
  } catch (error) {
    logger.error("Database Connection Failed", error);
  }
};

export default pool;
