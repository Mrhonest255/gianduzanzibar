import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAlR2cGYZb4mI5qoZ4G264hW3HO_L33wq8";
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateTourDetails = async (tourName: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Generate a comprehensive tour package for "${tourName}" in Zanzibar.
    Return the result as a JSON object with the following fields:
    - title: A catchy title for the tour
    - category: One of [Cultural, Adventure, Water Sports, Nature, Relaxation]
    - location: Specific location in Zanzibar
    - duration_hours: Estimated duration in hours (number)
    - price: Suggested price in USD (number)
    - short_description: A brief 1-2 sentence summary
    - long_description: A detailed description of the tour
    - itinerary: A step-by-step itinerary (bullet points)
    - includes: What's included (bullet points)
    - excludes: What's not included (bullet points)
    - pickup_info: Information about pickup and drop-off
    - what_to_bring: Recommended items to bring (bullet points)

    Ensure the content is professional, engaging, and specific to Zanzibar.
    Return ONLY the JSON object.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response (in case Gemini adds markdown formatting)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Failed to parse AI response");
  } catch (error) {
    console.error("Error generating tour details:", error);
    throw error;
  }
};
