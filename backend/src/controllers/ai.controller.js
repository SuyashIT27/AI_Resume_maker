import { improveText } from "../services/gemini.service.js";

export async function improveResumeText(req, res, next) {
  try {
    const { type, text, context = "" } = req.body;

    if (!["summary", "experience", "project"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid AI operation type."
      });
    }

    if (!text?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Text is required."
      });
    }

    const improved = await improveText({ type, text, context });

    res.json({
      success: true,
      data: { text: improved }
    });
  } catch (error) {
    next(error);
  }
}
