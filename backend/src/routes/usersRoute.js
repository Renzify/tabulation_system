import express from "express";

const router = express.Router();

// Temporary memory storage
let submissions = [];


// Receive scores from frontend
router.post("/scores", (req, res) => {             // post route
  const { criteria, contestants } = req.body;     // destructure input json

  if (!criteria || !contestants) {    // check if input has no value
    return res.status(400).json({
      message: "Invalid payload",
    });
  }

  submissions = contestants;    // store input value to submission array

  res.status(200).json({
    message: "Scores stored successfully",
  });
});


router.get("/ranking", (req, res) => {              // get route
  const ranked = [...submissions].sort((a, b) => b.total - a.total);   // Return contestants sorted by total descending order

  res.status(200).json(ranked);
});

export default router;
