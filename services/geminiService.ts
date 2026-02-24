
import { GoogleGenAI } from "@google/genai";

// Always use process.env.API_KEY directly for initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getVenueAIInsight = async (hallName: string, amenities: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a catchy, premium 2-sentence marketing blurb for a party hall named "${hallName}" that offers these amenities: ${amenities.join(', ')}. Focus on luxury and ease of planning.`
    });
    return response.text || "Perfect for your next milestone celebration.";
  } catch (error) {
    console.error("AI Insight failed", error);
    return "Experience elegance and world-class service at this premier venue.";
  }
};