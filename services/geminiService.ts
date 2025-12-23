
import { GoogleGenAI, Type } from "@google/genai";
import { RecommendationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getInsuranceRecommendation = async (userDescription: string): Promise<RecommendationResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise o seguinte perfil de usuário e recomende o melhor seguro inicial e coberturas adicionais. Descrição: "${userDescription}"`,
      config: {
        systemInstruction: "Você é um consultor especialista em seguros da SeguraMais. Seu objetivo é analisar o texto do usuário e retornar uma recomendação em JSON com 'mainInsurance', 'reason' e 'suggestedAddons' (array). Seja empático e direto.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mainInsurance: { type: Type.STRING, description: "Nome do seguro principal recomendado" },
            reason: { type: Type.STRING, description: "Breve explicação do porquê desta recomendação" },
            suggestedAddons: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Lista de coberturas ou outros seguros relevantes"
            }
          },
          required: ["mainInsurance", "reason", "suggestedAddons"]
        }
      }
    });

    return JSON.parse(response.text || '{}') as RecommendationResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      mainInsurance: "Seguro Personalizado",
      reason: "Não conseguimos processar sua solicitação agora, mas nossos consultores podem te ajudar pessoalmente.",
      suggestedAddons: ["Auto", "Vida", "Residencial"]
    };
  }
};
