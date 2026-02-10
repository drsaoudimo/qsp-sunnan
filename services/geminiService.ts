
import { GoogleGenAI, Type } from "@google/genai";
import { QSP_SYSTEM_PROMPT } from "../constants";
import { QSPAnalysisResult } from "../types";

// استخدام موديل Gemini 3 Flash كما هو مطلوب.
const MODEL_NAME = "gemini-3-flash-preview";

export const analyzeQSP = async (inputText: string): Promise<QSPAnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        {
          role: "user",
          parts: [
            { text: QSP_SYSTEM_PROMPT },
            { text: `قم بإجراء تحليل QSP معمق ومفصل جداً للمدخل التالي، مع كتابة مقال فقهي شرعي رصين يتجاوز 3500 حرف في مجمله، مع الالتزام التام باللغة الأصولية: "${inputText}"` }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            coreVerse: { type: Type.STRING },
            analysisText: { type: Type.STRING },
            algebra: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            variables: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  symbol: { type: Type.STRING },
                  name: { type: Type.STRING },
                  value: { type: Type.NUMBER },
                  description: { type: Type.STRING }
                }
              }
            },
            article: {
              type: Type.OBJECT,
              properties: {
                intro: { type: Type.STRING },
                forecasting: { type: Type.STRING },
                modeling: { type: Type.STRING },
                remedies: { type: Type.STRING }
              }
            },
            status: { type: Type.STRING, enum: ["Safe", "Warning", "Critical", "Collapse"] },
            recommendations: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            disclaimer: { type: Type.STRING }
          },
          required: ["title", "coreVerse", "analysisText", "algebra", "variables", "article", "status", "recommendations", "disclaimer"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("لم يتم استلام استجابة من المحرك.");

    return JSON.parse(text) as QSPAnalysisResult;

  } catch (error: any) {
    console.error("QSP Analysis Error:", error);
    throw error;
  }
};
