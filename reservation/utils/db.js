import dotenv from "dotenv";
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

export const pool = new Pool({
  user: process.env.BD_USER,
  host: process.env.BD_HOST,
  database: process.env.BD_DATABASE,
  password: process.env.BD_PASSWORD,
  port: process.env.BD_PORT || 5432,
  /* ssl: {
    rejectUnauthorized: false,
  }, */
});

export default pool;