import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-pro" });
} else {
  console.warn("GOOGLE_API_KEY is not set. AI features will be disabled.");
}

export { model };

export async function generateText(prompt: string): Promise<string | null> {
  if (!model) {
    return null;
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating text with Gemini:", error);
    return null;
  }
}
