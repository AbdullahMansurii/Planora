import Groq from 'groq-sdk';
import { z } from 'zod';

// Initialize Groq client
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// Zod schema for validating AI response - made more flexible
const PlanSchema = z.object({
    overview: z.string().min(1),
    startup_name_suggestions: z.array(z.string()).min(3).max(10),
    target_audience: z.string().min(1),
    ui_design_suggestions: z.string().min(1),
    database_schema: z.union([
        z.string().min(1),
        z.object({
            tables: z.array(z.object({
                name: z.string(),
                fields: z.array(z.string())
            }))
        })
    ]),
    typography_suggestions: z.string().min(1),
    color_palette: z.array(z.string()).min(3).max(10),
    user_pain_points: z.string().min(1),
    required_features: z.string().min(1),
    competitors: z.string().min(1),
    industry_insights: z.string().min(1),
});

export type PlanData = z.infer<typeof PlanSchema>;

// Craft the prompt for structured JSON output
function createPrompt(
    ideaDescription: string,
    targetMarket?: string,
    country?: string,
    businessType?: string
): string {
    const additionalContext = [
        targetMarket && `Target Market: ${targetMarket}`,
        country && `Country: ${country}`,
        businessType && `Business Type: ${businessType}`,
    ]
        .filter(Boolean)
        .join('\n');

    return `You are a business planning AI assistant. Generate a comprehensive business plan analysis in VALID JSON format ONLY.

Startup Idea: ${ideaDescription}
${additionalContext}

CRITICAL INSTRUCTIONS:
1. Return ONLY a JSON object, no markdown, no code blocks, no explanations
2. Use EXACTLY these field names with underscores (not spaces or hyphens)
3. All fields are required and must follow the specified format

{
  "overview": "2-3 paragraph executive summary of the business idea, market opportunity, and value proposition",
  "startup_name_suggestions": ["name1", "name2", "name3", "name4", "name5", "name6"],
  "target_audience": "Home Cooks, Foodies, Families, Cooking Enthusiasts, Healthconscious Individuals, Professional Chefs, Recipe Bloggers (Provide 5-8 specific audience segments as comma-separated values)",
  "ui_design_suggestions": "Modern Minimalist, Material Design, Flat Design, Card-based Layout, Bottom Navigation, Bright Color Scheme, Food Photography Focus, Recipe Cards, Dark Mode Option (Provide 6-10 specific design style keywords or UI patterns as comma-separated values)",
  "database_schema": {
    "tables": [
      {
        "name": "Users",
        "fields": ["id", "name", "email", "password", "created_at", "updated_at"]
      },
      {
        "name": "Products",
        "fields": ["id", "name", "description", "price", "stock", "category_id"]
      },
      {
        "name": "Orders",
        "fields": ["id", "user_id", "total", "status", "created_at"]
      },
      {
        "name": "Categories",
        "fields": ["id", "name", "description"]
      }
    ]
  },
  "typography_suggestions": "Open Sans, Roboto, Lato, Montserrat, Poppins, Inter, Helvetica, Georgia (Provide 6-8 Google Font names as comma-separated values)",
  "color_palette": ["#1E40AF", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"],
  "user_pain_points": "• First major pain point\\n• Second pain point\\n• Third pain point\\n• Fourth pain point\\n(Use bullet points with • symbol)",
  "required_features": "• Feature 1: Description\\n• Feature 2: Description\\n• Feature 3: Description\\n• Feature 4: Description\\n• Feature 5: Description\\n(Use bullet points with • symbol, 5-8 features)",
  "competitors": "1) Company Name 1 - Brief description\\n2) Company Name 2 - Brief description\\n3) Company Name 3 - Brief description\\n4) Company Name 4 - Brief description\\n(Provide 4-5 specific competitor names)",
  "industry_insights": "Market trends, growth projections, and key industry developments"
}`;
}

// Attempt to repair common JSON issues
function repairJSON(text: string): string {
    // Remove markdown code blocks
    text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '');

    // Remove any text before the first {
    const firstBrace = text.indexOf('{');
    if (firstBrace > 0) {
        text = text.substring(firstBrace);
    }

    // Remove any text after the last }
    const lastBrace = text.lastIndexOf('}');
    if (lastBrace > 0 && lastBrace < text.length - 1) {
        text = text.substring(0, lastBrace + 1);
    }

    return text.trim();
}

// Main function to generate plan
export async function generatePlan(
    ideaDescription: string,
    targetMarket?: string,
    country?: string,
    businessType?: string
): Promise<{ success: true; data: PlanData } | { success: false; error: string }> {
    try {
        const prompt = createPrompt(ideaDescription, targetMarket, country, businessType);

        console.log('[Groq] Generating plan with Llama 3.3 70B...');

        // Call Groq API with Llama 3.3 70B (latest version)
        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: 'You are a business planning expert. Always respond with valid JSON only, no markdown or explanations.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.4,
            max_tokens: 2048,
            response_format: { type: 'json_object' },
        });

        const generatedText = completion.choices[0]?.message?.content;

        if (!generatedText) {
            console.error('[Groq] No response from API');
            return {
                success: false,
                error: 'No response from AI. Please try again.',
            };
        }

        console.log('[Groq] Response received, length:', generatedText.length);

        // Attempt to parse JSON
        let parsedData: any;
        try {
            parsedData = JSON.parse(generatedText);
        } catch (parseError) {
            console.log('[Groq] Initial parse failed, attempting repair...');

            // Try to repair and parse again
            const repairedText = repairJSON(generatedText);
            try {
                parsedData = JSON.parse(repairedText);
                console.log('[Groq] Successfully parsed after repair');
            } catch (repairError) {
                console.error('[Groq] JSON repair failed');
                console.error('[Groq] Generated text sample:', generatedText.substring(0, 500));
                return {
                    success: false,
                    error: 'The AI returned invalid JSON. Please try again.',
                };
            }
        }

        // Validate against schema
        const validationResult = PlanSchema.safeParse(parsedData);

        if (!validationResult.success) {
            console.error('[Groq] Validation failed:', validationResult.error);
            console.error('[Groq] Received data keys:', Object.keys(parsedData));
            console.error('[Groq] Sample of received data:', JSON.stringify(parsedData).substring(0, 500));

            // Try to provide a more helpful error message
            const missingFields = validationResult.error.issues
                .map(issue => issue.path.join('.'))
                .join(', ');

            return {
                success: false,
                error: `The AI response is missing or has invalid fields: ${missingFields}. Please try again.`,
            };
        }

        console.log('[Groq] Plan generated successfully');
        return {
            success: true,
            data: validationResult.data,
        };

    } catch (error: any) {
        console.error('[Groq] Generation error:', error);

        // Check for specific error types
        if (error.message?.includes('rate limit')) {
            return {
                success: false,
                error: 'Rate limit exceeded. Please try again in a few moments.',
            };
        }

        if (error.message?.includes('API key')) {
            return {
                success: false,
                error: 'Invalid API key. Please check your Groq API key configuration.',
            };
        }

        return {
            success: false,
            error: error.message || 'Failed to generate plan. Please try again.',
        };
    }
}
