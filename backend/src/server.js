import express from "express";
import cors from "cors";
import usersRoute from "./routes/usersRoute.js";
import { ENV } from "./lib/env.js";
import pool from "./lib/db.js";

const app = express();
const result = await pool.query("SELECT NOW()");
const { PORT } = ENV;

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("Req method: " + req.method + " & req location: " + req.url);
  next();
});

// Routes
app.use("/api", usersRoute);

app.listen(PORT, () => {
  console.log("Server is running in port:", PORT);
});
