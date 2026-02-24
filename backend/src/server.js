import express from "express";
import { ENV } from "./lib/env.js";
import pool from "./lib/db.js";

const app = express();

const { PORT } = ENV;
const result = await pool.query("SELECT NOW()");

app.listen(PORT, () => {
  console.log("Server is running in port:", PORT);
  console.log("Connected! Current time:", result.rows[0].now);
});
