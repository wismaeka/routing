import express from "express";

const router = express.Router();

router.get("/health", (req, res) => {
  return res.status(200).json({ message: "OK" });
});

router.post("/game", async (req, res, next) => {
  try {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(5000);
    return res.status(200).json(req.body);
  } catch (error) {
    next(error);
  }
});

export default router;
