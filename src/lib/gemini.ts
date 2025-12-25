import { GoogleGenerativeAI } from "@google/generative-ai";

// API key from environment variable - never hardcode in production
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

if (!GEMINI_API_KEY) {
  console.warn("VITE_GEMINI_API_KEY is not set. AI features will not work.");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Use Gemini 2.0 Flash - latest fast model
const GEMINI_MODEL = "gemini-2.0-flash-exp";

export interface GeneratedTour {
  title: string;
  slug: string;
  category: string;
  location: string;
  duration_hours: number;
  price: number;
  currency: string;
  short_description: string;
  long_description: string;
  itinerary: string;
  includes: string;
  excludes: string;
  pickup_info: string;
  what_to_bring: string;
  is_featured: boolean;
  is_active: boolean;
  // SEO fields
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  // Sales optimization
  sales_highlights: string[];
  urgency_message: string;
  value_proposition: string;
  // Image prompts for generation
  image_prompts: string[];
}

export interface TourGenerationInput {
  tourType: string;
  location?: string;
  targetAudience?: string;
  priceRange?: string;
  specialFeatures?: string;
}

export async function generateTourContent(input: TourGenerationInput): Promise<GeneratedTour> {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const prompt = `You are a professional travel content creator and SEO expert for Zanzibar tours. Generate a complete, high-quality tour listing for a travel website.

Tour Request:
- Tour Type: ${input.tourType}
- Location: ${input.location || "Zanzibar, Tanzania"}
- Target Audience: ${input.targetAudience || "International tourists, families, adventure seekers"}
- Price Range: ${input.priceRange || "mid-range ($50-150 per person)"}
- Special Features: ${input.specialFeatures || "Authentic local experience"}

Generate a complete tour with the following JSON structure. Be creative, engaging, and SEO-optimized:

{
  "title": "Compelling tour title (max 60 chars for SEO)",
  "slug": "url-friendly-slug-with-keywords",
  "category": "One of: Cultural, Nature, Adventure, Beach, Safari",
  "location": "Specific location in Zanzibar",
  "duration_hours": number (typical tour duration),
  "price": number (in USD, realistic for Zanzibar),
  "currency": "USD",
  "short_description": "Compelling 150-200 char description with keywords for listings",
  "long_description": "Detailed 500-800 word description with rich storytelling, keywords, and emotional appeal. Include sensory details and unique experiences. Use markdown formatting.",
  "itinerary": "Detailed timeline in markdown format with times and activities",
  "includes": "Bullet list of what's included (markdown format)",
  "excludes": "Bullet list of what's not included (markdown format)",
  "pickup_info": "Detailed pickup information",
  "what_to_bring": "Bullet list of recommended items (markdown format)",
  "is_featured": true or false (suggest true for exceptional tours),
  "is_active": true,
  "seo_title": "SEO-optimized title (50-60 chars) with primary keyword",
  "seo_description": "Meta description (150-160 chars) with call-to-action",
  "seo_keywords": ["array", "of", "5-10", "relevant", "keywords"],
  "sales_highlights": ["3-5 compelling bullet points for sales"],
  "urgency_message": "Creates urgency (e.g., 'Limited spots available!')",
  "value_proposition": "Unique selling point in one sentence",
  "image_prompts": ["5 detailed prompts for AI image generation, describing scenic photos of this tour in Zanzibar"]
}

Important:
- Use persuasive, emotionally engaging language
- Include relevant keywords naturally
- Make it authentic to Zanzibar culture and tourism
- Pricing should be realistic for the market
- Include sensory details that make readers imagine the experience

Return ONLY the JSON object, no additional text.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response - remove markdown code blocks if present
    let cleanedText = text.trim();
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.slice(7);
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.slice(3);
    }
    if (cleanedText.endsWith("```")) {
      cleanedText = cleanedText.slice(0, -3);
    }
    
    const tourData = JSON.parse(cleanedText.trim());
    return tourData as GeneratedTour;
  } catch (error) {
    console.error("Error generating tour content:", error);
    throw new Error("Failed to generate tour content. Please try again.");
  }
}

export async function generateTourImage(prompt: string): Promise<string> {
  // Note: Gemini's image generation requires the Imagen model
  // For now, we'll use Gemini to generate a detailed image description
  // and return a placeholder or stock image URL
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const imagePrompt = `Based on this tour image description, suggest a high-quality stock photo URL from Unsplash that would work well. Return ONLY the URL, nothing else.

Image description: ${prompt}

The image should represent Zanzibar, Tanzania tourism. Return a relevant Unsplash URL in this format:
https://images.unsplash.com/photo-XXXXX?w=1200&q=80`;

  try {
    const result = await model.generateContent(imagePrompt);
    const response = await result.response;
    const url = response.text().trim();
    
    // If the response doesn't look like a valid URL, return a default Zanzibar image
    if (!url.startsWith("https://")) {
      return getZanzibarStockImage(prompt);
    }
    
    return url;
  } catch (error) {
    console.error("Error generating image URL:", error);
    return getZanzibarStockImage(prompt);
  }
}

function getZanzibarStockImage(prompt: string): string {
  // Curated list of high-quality Zanzibar-related stock images
  const stockImages = [
    "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=1200&q=80", // Zanzibar beach
    "https://images.unsplash.com/photo-1581852017103-68ac65514cf7?w=1200&q=80", // Tropical beach
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80", // Spice market
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80", // Safari
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80", // African wildlife
    "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200&q=80", // Beach sunset
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80", // Scenic landscape
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80", // Tropical resort
    "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1200&q=80", // Stone Town
    "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1200&q=80", // Boat on water
  ];
  
  // Select based on keywords in the prompt
  const promptLower = prompt.toLowerCase();
  
  if (promptLower.includes("beach") || promptLower.includes("ocean") || promptLower.includes("sea")) {
    return stockImages[0];
  } else if (promptLower.includes("spice") || promptLower.includes("market") || promptLower.includes("cultural")) {
    return stockImages[2];
  } else if (promptLower.includes("safari") || promptLower.includes("wildlife") || promptLower.includes("animal")) {
    return stockImages[3];
  } else if (promptLower.includes("sunset") || promptLower.includes("evening")) {
    return stockImages[5];
  } else if (promptLower.includes("stone town") || promptLower.includes("historic")) {
    return stockImages[8];
  } else if (promptLower.includes("boat") || promptLower.includes("dhow") || promptLower.includes("sailing")) {
    return stockImages[9];
  }
  
  // Return a random image if no specific match
  return stockImages[Math.floor(Math.random() * stockImages.length)];
}

export async function generateMultipleTourImages(prompts: string[]): Promise<string[]> {
  const images = await Promise.all(prompts.map(prompt => generateTourImage(prompt)));
  return images;
}

export async function optimizeTourForSEO(tour: Partial<GeneratedTour>): Promise<{
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  optimized_title: string;
  optimized_description: string;
}> {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const prompt = `Optimize this tour for search engines and conversions:

Title: ${tour.title}
Description: ${tour.short_description}
Category: ${tour.category}
Location: ${tour.location}

Return a JSON object with:
{
  "seo_title": "SEO-optimized page title (50-60 chars)",
  "seo_description": "Meta description with CTA (150-160 chars)",
  "seo_keywords": ["array", "of", "relevant", "keywords"],
  "optimized_title": "Improved tour title for conversions",
  "optimized_description": "Improved short description with emotional appeal"
}

Return ONLY the JSON object.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Clean markdown formatting
    if (text.startsWith("```json")) text = text.slice(7);
    else if (text.startsWith("```")) text = text.slice(3);
    if (text.endsWith("```")) text = text.slice(0, -3);
    
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Error optimizing for SEO:", error);
    throw new Error("Failed to optimize tour for SEO.");
  }
}

export async function generateSalesContent(tour: Partial<GeneratedTour>): Promise<{
  sales_highlights: string[];
  urgency_message: string;
  value_proposition: string;
  testimonial_template: string;
  email_subject: string;
  social_media_post: string;
}> {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const prompt = `Generate compelling sales content for this tour:

Title: ${tour.title}
Description: ${tour.short_description}
Price: ${tour.price} ${tour.currency}
Duration: ${tour.duration_hours} hours

Return a JSON object with:
{
  "sales_highlights": ["3-5 bullet points that drive bookings"],
  "urgency_message": "Creates FOMO and urgency",
  "value_proposition": "Why this tour is worth the price",
  "testimonial_template": "Template for a realistic testimonial",
  "email_subject": "Compelling email subject line",
  "social_media_post": "Engaging social media post (with emojis)"
}

Return ONLY the JSON object.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    if (text.startsWith("```json")) text = text.slice(7);
    else if (text.startsWith("```")) text = text.slice(3);
    if (text.endsWith("```")) text = text.slice(0, -3);
    
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Error generating sales content:", error);
    throw new Error("Failed to generate sales content.");
  }
}

export async function improveTourContent(
  currentContent: string,
  contentType: "title" | "description" | "itinerary" | "includes"
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const typeInstructions = {
    title: "Make it more compelling and SEO-friendly (max 60 chars)",
    description: "Make it more engaging, add sensory details and emotional appeal",
    itinerary: "Make it more detailed and exciting, use clear time markers",
    includes: "Make it more comprehensive and highlight value",
  };

  const prompt = `Improve this tour ${contentType} for a Zanzibar tourism website:

Current content:
${currentContent}

Instructions: ${typeInstructions[contentType]}

Return ONLY the improved content, no explanations.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content.");
  }
}

export async function generateTourFromDescription(description: string): Promise<GeneratedTour> {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const prompt = `You are a professional travel content creator for Zanzibar tours. Based on this simple description, generate a complete, high-quality tour listing.

User's description: "${description}"

Generate a complete tour with the following JSON structure. Be creative, engaging, and SEO-optimized:

{
  "title": "Compelling tour title (max 60 chars for SEO)",
  "slug": "url-friendly-slug-with-keywords",
  "category": "One of: Cultural, Nature, Adventure, Beach, Safari",
  "location": "Specific location in Zanzibar",
  "duration_hours": number (typical tour duration),
  "price": number (in USD, realistic for Zanzibar),
  "currency": "USD",
  "short_description": "Compelling 150-200 char description with keywords for listings",
  "long_description": "Detailed 500-800 word description with rich storytelling. Use markdown formatting with headers and paragraphs.",
  "itinerary": "Detailed timeline in markdown format with times and activities",
  "includes": "Bullet list of what's included (markdown format)",
  "excludes": "Bullet list of what's not included (markdown format)",
  "pickup_info": "Detailed pickup information",
  "what_to_bring": "Bullet list of recommended items (markdown format)",
  "is_featured": true or false,
  "is_active": true,
  "seo_title": "SEO-optimized title (50-60 chars)",
  "seo_description": "Meta description (150-160 chars) with call-to-action",
  "seo_keywords": ["array", "of", "5-10", "keywords"],
  "sales_highlights": ["3-5 compelling sales points"],
  "urgency_message": "Creates urgency for booking",
  "value_proposition": "Unique selling point",
  "image_prompts": ["5 detailed prompts for photos of this tour"]
}

Return ONLY the JSON object.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    if (text.startsWith("```json")) text = text.slice(7);
    else if (text.startsWith("```")) text = text.slice(3);
    if (text.endsWith("```")) text = text.slice(0, -3);
    
    return JSON.parse(text.trim()) as GeneratedTour;
  } catch (error) {
    console.error("Error generating tour:", error);
    throw new Error("Failed to generate tour. Please try again.");
  }
}

// AI-powered tour editing/updating function
export async function enhanceExistingTour(
  existingTour: Partial<GeneratedTour>,
  enhancementType: "full" | "seo" | "sales" | "description" | "itinerary" | "pricing"
): Promise<GeneratedTour> {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const enhancementPrompts = {
    full: `Completely enhance and improve this tour while keeping the core concept. Make everything more compelling, SEO-optimized, and sales-ready.`,
    seo: `Focus on SEO optimization. Improve keywords, meta descriptions, and search visibility while maintaining the tour's essence.`,
    sales: `Focus on sales optimization. Make the content more persuasive, add urgency, and highlight value propositions.`,
    description: `Focus on improving the descriptions. Add sensory details, emotional appeal, and storytelling elements.`,
    itinerary: `Focus on enhancing the itinerary. Make it more detailed, exciting, and well-structured with clear timings.`,
    pricing: `Review and optimize the pricing strategy. Suggest competitive pricing and package options.`,
  };

  const prompt = `You are an expert travel content optimizer. Enhance this existing tour based on the requested focus area.

Current Tour:
- Title: ${existingTour.title}
- Category: ${existingTour.category}
- Location: ${existingTour.location}
- Price: ${existingTour.price} ${existingTour.currency}
- Duration: ${existingTour.duration_hours} hours
- Short Description: ${existingTour.short_description}
- Long Description: ${existingTour.long_description}
- Itinerary: ${existingTour.itinerary}
- Includes: ${existingTour.includes}
- Excludes: ${existingTour.excludes}

Enhancement Focus: ${enhancementPrompts[enhancementType]}

Return an improved version with this JSON structure:
{
  "title": "Enhanced tour title",
  "slug": "${existingTour.slug || 'url-friendly-slug'}",
  "category": "${existingTour.category || 'Cultural'}",
  "location": "Enhanced location description",
  "duration_hours": ${existingTour.duration_hours || 4},
  "price": number (optimized price in USD),
  "currency": "USD",
  "short_description": "Enhanced 150-200 char description",
  "long_description": "Enhanced detailed description with markdown",
  "itinerary": "Enhanced itinerary with markdown formatting",
  "includes": "Enhanced includes list with markdown bullets",
  "excludes": "Enhanced excludes list with markdown bullets",
  "pickup_info": "Enhanced pickup information",
  "what_to_bring": "Enhanced what to bring list",
  "is_featured": ${existingTour.is_featured || false},
  "is_active": true,
  "seo_title": "SEO-optimized title",
  "seo_description": "Meta description with CTA",
  "seo_keywords": ["enhanced", "keywords", "array"],
  "sales_highlights": ["enhanced", "sales", "points"],
  "urgency_message": "Enhanced urgency message",
  "value_proposition": "Enhanced value proposition",
  "image_prompts": ["5 improved image prompts"]
}

Return ONLY the JSON object.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    if (text.startsWith("```json")) text = text.slice(7);
    else if (text.startsWith("```")) text = text.slice(3);
    if (text.endsWith("```")) text = text.slice(0, -3);
    
    return JSON.parse(text.trim()) as GeneratedTour;
  } catch (error) {
    console.error("Error enhancing tour:", error);
    throw new Error("Failed to enhance tour. Please try again.");
  }
}

// Generate tour variations (for A/B testing or different audiences)
export async function generateTourVariation(
  baseTour: Partial<GeneratedTour>,
  targetAudience: "families" | "couples" | "adventurers" | "luxury" | "budget" | "seniors"
): Promise<GeneratedTour> {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const audiencePreferences = {
    families: "Family-friendly with kid activities, safety focus, value for groups",
    couples: "Romantic, intimate experiences, special moments, photography opportunities",
    adventurers: "Thrilling, off-the-beaten-path, physical activities, unique experiences",
    luxury: "Premium experiences, VIP treatment, exclusive access, high-end amenities",
    budget: "Cost-effective, great value, essential experiences without extras",
    seniors: "Comfortable pace, accessible, cultural depth, rest breaks included",
  };

  const prompt = `Create a variation of this tour optimized for ${targetAudience}.

Base Tour:
- Title: ${baseTour.title}
- Category: ${baseTour.category}
- Description: ${baseTour.short_description}
- Price: ${baseTour.price} ${baseTour.currency}

Target Audience Preferences: ${audiencePreferences[targetAudience]}

Create a new version tailored to this audience. Adjust:
- Title to appeal to the audience
- Description with relevant hooks
- Itinerary with suitable activities
- Pricing appropriate for the segment
- Includes/excludes based on expectations
- Sales messaging that resonates

Return the JSON in the standard GeneratedTour format:
{
  "title": "Audience-specific title",
  "slug": "audience-specific-slug",
  "category": "${baseTour.category || 'Cultural'}",
  "location": "${baseTour.location || 'Zanzibar'}",
  "duration_hours": number,
  "price": number (adjusted for audience),
  "currency": "USD",
  "short_description": "Audience-specific description",
  "long_description": "Detailed description for this audience",
  "itinerary": "Adjusted itinerary",
  "includes": "Audience-appropriate includes",
  "excludes": "Relevant excludes",
  "pickup_info": "Pickup details",
  "what_to_bring": "Audience-specific recommendations",
  "is_featured": true,
  "is_active": true,
  "seo_title": "SEO title for audience",
  "seo_description": "Meta description targeting audience",
  "seo_keywords": ["audience-specific", "keywords"],
  "sales_highlights": ["audience-specific", "highlights"],
  "urgency_message": "Relevant urgency message",
  "value_proposition": "Value prop for this audience",
  "image_prompts": ["5 audience-relevant image prompts"]
}

Return ONLY the JSON object.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    if (text.startsWith("```json")) text = text.slice(7);
    else if (text.startsWith("```")) text = text.slice(3);
    if (text.endsWith("```")) text = text.slice(0, -3);
    
    return JSON.parse(text.trim()) as GeneratedTour;
  } catch (error) {
    console.error("Error generating tour variation:", error);
    throw new Error("Failed to generate tour variation. Please try again.");
  }
}

// Bulk generate related tours
export async function generateRelatedTours(
  baseTour: Partial<GeneratedTour>,
  count: number = 3
): Promise<GeneratedTour[]> {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const prompt = `Based on this popular tour, suggest ${count} related complementary tours that visitors might also enjoy.

Base Tour:
- Title: ${baseTour.title}
- Category: ${baseTour.category}
- Location: ${baseTour.location}
- Description: ${baseTour.short_description}

Generate ${count} different but related tours as a JSON array. Each tour should:
- Complement the base tour (different activity, same region)
- Appeal to similar customers
- Offer variety in duration/price
- Be unique and interesting

Return a JSON array of ${count} complete tours:
[
  {
    "title": "...",
    "slug": "...",
    "category": "...",
    "location": "...",
    "duration_hours": number,
    "price": number,
    "currency": "USD",
    "short_description": "...",
    "long_description": "...",
    "itinerary": "...",
    "includes": "...",
    "excludes": "...",
    "pickup_info": "...",
    "what_to_bring": "...",
    "is_featured": boolean,
    "is_active": true,
    "seo_title": "...",
    "seo_description": "...",
    "seo_keywords": [],
    "sales_highlights": [],
    "urgency_message": "...",
    "value_proposition": "...",
    "image_prompts": []
  }
]

Return ONLY the JSON array.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    if (text.startsWith("```json")) text = text.slice(7);
    else if (text.startsWith("```")) text = text.slice(3);
    if (text.endsWith("```")) text = text.slice(0, -3);
    
    return JSON.parse(text.trim()) as GeneratedTour[];
  } catch (error) {
    console.error("Error generating related tours:", error);
    throw new Error("Failed to generate related tours. Please try again.");
  }
}

