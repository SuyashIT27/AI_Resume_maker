import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";

let client;

function getClient() {
  if (!env.geminiApiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  if (!client) {
    client = new GoogleGenAI({ apiKey: env.geminiApiKey });
  }

  return client;
}

const atsSchema = {
  type: "object",
  properties: {
    score: { type: "integer" },
    summary: { type: "string" },
    strengths: { type: "array", items: { type: "string" } },
    issues: { type: "array", items: { type: "string" } },
    recommendations: { type: "array", items: { type: "string" } },
    matchedKeywords: { type: "array", items: { type: "string" } },
    missingKeywords: { type: "array", items: { type: "string" } },
    sectionScores: {
      type: "object",
      properties: {
        contact: { type: "integer" },
        summary: { type: "integer" },
        skills: { type: "integer" },
        experience: { type: "integer" },
        projects: { type: "integer" },
        education: { type: "integer" },
        formatting: { type: "integer" }
      },
      required: [
        "contact", "summary", "skills", "experience",
        "projects", "education", "formatting"
      ]
    }
  },
  required: [
    "score", "summary", "strengths", "issues",
    "recommendations", "matchedKeywords",
    "missingKeywords", "sectionScores"
  ]
};

export async function analyzeResumeWithGemini(resume, jobDescription = "") {
  const ai = getClient();

  const prompt = `
You are an expert ATS resume analyzer.

Analyze the supplied resume for ATS compatibility and recruiter readability.

Return only JSON matching the schema.
Do not invent experience, education, projects, skills, dates, metrics or achievements.
The score is an ATS compatibility and optimization estimate, not a guarantee for every ATS.
Evaluate contact information, standard section headings, keyword relevance,
skills, experience, projects, education, measurable achievements, action verbs,
clarity, formatting safety and job-description relevance.
If a job description is provided, identify matched and missing keywords.

RESUME:
${JSON.stringify(resume, null, 2)}

TARGET JOB DESCRIPTION:
${jobDescription || "No job description provided."}
`;

  const response = await ai.models.generateContent({
    model: env.geminiModel,
    contents: prompt,
    config: {
      temperature: 0.2,
      responseMimeType: "application/json",
      responseSchema: atsSchema
    }
  });

  const text = response.text?.trim();
  if (!text) throw new Error("Gemini returned an empty response.");

  try {
    const parsed = JSON.parse(text);
    return {
      ...parsed,
      score: Math.max(0, Math.min(100, Number(parsed.score) || 0)),
    };
  } catch {
    throw new Error("Gemini returned invalid JSON.");
  }
}

export async function improveText({ type, text, context = "" }) {
  const ai = getClient();

  const instructions = {
    summary: `
Improve the resume summary. Make it concise, professional, ATS-friendly,
keyword-rich without keyword stuffing and achievement-oriented.
Do not invent information.
`,
    experience: `
Improve these experience bullets using strong action verbs and concise,
ATS-friendly technical language. Do not invent metrics or achievements.
`,
    project: `
Improve these project bullets. Highlight what was built, technologies,
important functionality and backend/API/database work where supported.
Do not invent facts.
`
  };

  const prompt = `
You are a professional technical resume writer.

${instructions[type] || instructions.summary}

TEXT:
${text}

CONTEXT:
${context}

Return only the improved text.
`;

  const response = await ai.models.generateContent({
    model: env.geminiModel,
    contents: prompt,
    config: { temperature: 0.3 }
  });

  return response.text?.trim() || text;
}
