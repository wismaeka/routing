import express from "express";

const router = express.Router();

router.get("/health", (req, res) => {
  return res.status(200).json({ message: "OK" });
});

router.post("/game", async (req, res, next) => {
  try {
    return res.status(200).json(req.body);
  } catch (error) {
    next(error);
  }
});

export default router;
