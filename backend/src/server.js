import express from "express";
import { ENV } from "./lib/env.js";

const app = express();

const { PORT } = ENV;

app.listen(PORT, () => {
  console.log("Server is running in port:", PORT);
});
