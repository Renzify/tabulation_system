import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usersRoute from "./routes/usersRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("Req method: " + req.method + " & req location: " + req.url);
  next();
});

// Routes
app.use("/api", usersRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
