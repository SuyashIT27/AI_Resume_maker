import { env } from "../config/env.js";

export async function checkLanguageTool(text, language = "en-US") {
  if (!text?.trim()) {
    return { matches: [], language };
  }

  const body = new URLSearchParams();
  body.append("text", text);
  body.append("language", language);
  body.append("enabledOnly", "false");

  const response = await fetch(env.languageToolUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json"
    },
    body
  });

  if (!response.ok) {
    throw new Error(`LanguageTool error: ${response.status}`);
  }

  const data = await response.json();

  return {
    matches: data.matches || [],
    language: data.language || { code: language }
  };
}
