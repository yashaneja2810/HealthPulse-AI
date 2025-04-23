import { GoogleGenerativeAI } from "@google/generative-ai";
import { PredictionResult, Language } from "../types";

// Initialize the Gemini API with proper configuration
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

async function getGeminiResponse(prompt: string, language: Language): Promise<PredictionResult> {
  try {
    // Get the model with proper configuration
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    
    const response = await result.response;
    const responseText = response.text().trim();
    
    try {
      // Extract JSON from the response if it's wrapped in markdown or other text
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : responseText;
      
      // Parse the response and ensure it matches our expected format
      const parsedResponse = JSON.parse(jsonString);
      
      // Validate the response format
      if (!parsedResponse.disease || !parsedResponse.description || 
          !Array.isArray(parsedResponse.precautions) || 
          !parsedResponse.specialistType || 
          typeof parsedResponse.confidence !== 'number') {
        throw new Error('Invalid response format from Gemini API');
      }

      // Ensure confidence is between 0 and 1
      parsedResponse.confidence = Math.min(Math.max(parsedResponse.confidence, 0), 1);
      
      return parsedResponse as PredictionResult;
    } catch (parseError) {
      console.error("Failed to parse response:", parseError);
      throw new Error("Invalid response format from Gemini API");
    }
  } catch (error: any) {
    console.error("Error getting Gemini response:", error);
    if (error.message?.includes("API key")) {
      throw new Error("Invalid or missing API key. Please check your configuration.");
    }
    throw new Error(`Failed to get response from Gemini API: ${error.message}`);
  }
}

export async function analyzeSymptoms(symptoms: string[], language: Language): Promise<PredictionResult> {
  try {
    const prompt = `
      You are a medical analysis assistant. Analyze the following symptoms and provide a medical assessment.
      Symptoms: ${symptoms.join(", ")}
      
      You must respond with ONLY a valid JSON object in this exact format, translated to ${language}:
      {
        "disease": "Name of the most likely condition",
        "description": "A detailed description of the condition",
        "precautions": ["List", "of", "recommended", "precautions"],
        "specialistType": "Type of specialist to consult",
        "confidence": 0.XX
      }
      
      Important:
      - Return ONLY the JSON object
      - Do not include any markdown formatting
      - Do not include any explanatory text
      - The confidence must be a number between 0 and 1
      - The precautions must be an array of strings
      - All text must be in ${language}
    `;

    return await getGeminiResponse(prompt, language);
  } catch (error: any) {
    console.error("Error analyzing symptoms:", error);
    throw new Error(`Failed to analyze symptoms: ${error.message}`);
  }
}

export async function analyzeSymptomText(symptomText: string, language: Language): Promise<PredictionResult> {
  try {
    const prompt = `
      You are a medical analysis assistant. Analyze the following symptom description and provide a medical assessment.
      Description: ${symptomText}
      
      You must respond with ONLY a valid JSON object in this exact format, translated to ${language}:
      {
        "disease": "Name of the most likely condition",
        "description": "A detailed description of the condition",
        "precautions": ["List", "of", "recommended", "precautions"],
        "specialistType": "Type of specialist to consult",
        "confidence": 0.XX
      }
      
      Important:
      - Return ONLY the JSON object
      - Do not include any markdown formatting
      - Do not include any explanatory text
      - The confidence must be a number between 0 and 1
      - The precautions must be an array of strings
      - All text must be in ${language}
    `;

    return await getGeminiResponse(prompt, language);
  } catch (error: any) {
    console.error("Error analyzing symptom text:", error);
    throw new Error(`Failed to analyze symptom text: ${error.message}`);
  }
}