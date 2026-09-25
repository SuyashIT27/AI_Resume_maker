import express from "express";
import { checkLanguage } from "../controllers/language.controller.js";

const router = express.Router();

router.post("/check", checkLanguage);

export default router;
