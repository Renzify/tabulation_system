import express from "express";

const router = express.Router();

// Temporary memory storage
let submissions = [];

/*
  POST /api/scores
  Receives scores from frontend
*/
router.post("/scores", (req, res) => {
  const { criteria, contestants } = req.body;

  if (!criteria || !contestants) {
    return res.status(400).json({
      message: "Invalid payload",
    });
  }

  submissions = contestants;

  res.status(200).json({
    message: "Scores stored successfully",
  });
});

/*
  GET /api/ranking
  Returns contestants sorted by total descending
*/
router.get("/ranking", (req, res) => {
  const ranked = [...submissions].sort((a, b) => b.total - a.total);

  res.status(200).json(ranked);
});
export default router;
