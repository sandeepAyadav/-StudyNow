import express from "express";
import { askAiMentor } from "../controllers/aiController.js";
import { authware } from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/ask-mentor", authware, askAiMentor);

export default router;