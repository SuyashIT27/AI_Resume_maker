import { analyzeResumeWithGemini } from "../services/gemini.service.js";

export async function analyzeATS(req, res, next) {
  try {
    const { resume, jobDescription = "" } = req.body;

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Resume data is required."
      });
    }

    const result = await analyzeResumeWithGemini(
      resume,
      jobDescription
    );

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}
