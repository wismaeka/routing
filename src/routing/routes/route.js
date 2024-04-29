import express from "express";
import { handleRequest } from "../controller/routing.js";

const router = express.Router();
router.post("/api/v1", handleRequest);

export default router;
