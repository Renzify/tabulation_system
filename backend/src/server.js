import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usersRoute from "./routes/usersRoute.js";
import { ENV } from "./lib/env.js";

const app = express();

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
