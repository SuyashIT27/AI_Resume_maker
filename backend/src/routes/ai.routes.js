import express from "express";
import { improveResumeText } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/improve", improveResumeText);

export default router;
