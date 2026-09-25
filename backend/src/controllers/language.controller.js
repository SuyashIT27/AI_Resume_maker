import { checkLanguageTool } from "../services/languageTool.service.js";

export async function checkLanguage(req, res, next) {
  try {
    const { text, language = "en-US" } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Text is required."
      });
    }

    const result = await checkLanguageTool(text, language);

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}
