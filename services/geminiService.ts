import { GoogleGenAI, Type } from "@google/genai";
import { AIResponseRecipe } from "../types";

// Generate Text Recipe
export const generateRecipeDetails = async (recipeName: string, apiKey: string): Promise<AIResponseRecipe | null> => {
  if (!apiKey) return null;
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a recipe for: ${recipeName}. 
      Target audience: Home cooks.
      Style: Modern, concise, appetizing.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING, description: "A very short 1-sentence description." },
            prepTime: { type: Type.STRING, description: "Total time (e.g., '35m')." },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING },
                  amount: { type: Type.STRING }
                }
              }
            },
            instructions: {
              type: Type.ARRAY,
              items: { type: Type.STRING, description: "Short steps." }
            }
          },
          required: ["description", "ingredients", "instructions", "prepTime"]
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as AIResponseRecipe;
    }
    return null;
  } catch (error) {
    console.error("Error generating recipe text:", error);
    return null;
  }
};

// Generate Recipe Image
export const generateRecipeImage = async (recipeName: string, apiKey: string): Promise<string | null> => {
  if (!apiKey) return null;
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Professional food photography of ${recipeName}, 4k resolution, appetizing, restaurant quality.`
          },
        ],
      },
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating recipe image:", error);
    return null;
  }
};