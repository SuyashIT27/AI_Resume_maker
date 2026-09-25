import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5000),
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  geminiModel: process.env.GEMINI_MODEL || "gemini-3.8-flash",
  languageToolUrl:
    process.env.LANGUAGETOOL_API_URL ||
    "https://api.languagetool.org/v2/check"
};

if (!env.geminiApiKey) {
  console.warn("WARNING: GEMINI_API_KEY is missing.");
}
