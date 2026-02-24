import pkg from "pg";
import { ENV } from "./env.js";

const { Pool } = pkg;

const { DATABASE_URL } = ENV;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("Unexpected database error", err);
  process.exit(-1);
});

export default pool;
