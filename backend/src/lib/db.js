import pkg from "pg";
import { ENV } from "./env.js";

const { Pool } = pkg;

const { DATABASE_URL } = ENV;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default pool;
