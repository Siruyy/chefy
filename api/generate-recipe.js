export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { ingredients, prompt } = req.body;

    // Validate inputs
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: 'Invalid or missing ingredients' });
    }

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing prompt' });
    }

    // Get API key from environment variable
    const apiKey = process.env.AI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured on server' });
    }

    // Make request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert cooking assistant specializing in creative, adaptable recipe recommendations based on any set of ingredients, no matter how limited.
            
            For every request:
            - Identify possible well-known dishes, giving special priority to Filipino or other regional favorites when the ingredients match or nearly match a traditional dish—even if substitutions are needed.
            - Clearly suggest ingredient alternatives and substitutions for any missing or uncommon items. Whenever an ingredient is missing for a classic recipe, provide two or three practical substitutes commonly found in home kitchens, and brieflyexplain how each would affect the dish's flavor or texture.
            - Always explain briefly how the dish might change with these substitutes, including preparation and taste.
            - Prioritize recipes that use all or most of the given ingredients, but always provide at least one thoughtful, creative recipe suggestion, no matter how few ingredients are available.
            - When ingredients are very limited, avoid generic advice (like "just fry everything"). Instead, invent or adapt unique and interesting recipes that truly fit the ingredients, and describe why they work well together.
            - For popular dishes (e.g., sisig, adobo, curry), offer flexible versions: suggest possible protein or main ingredient substitutions (tofu, pork, chicken, beef, etc.), and describe how the choice alters the dish.
            - Whenever possible, offer a quick tip for presentation or serving, and encourage experimentation.

            Keep instructions clear and easy to follow, and promote confidence and creativity in home cooking, regardless of the user's skill level.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Failed to generate recipe');
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      console.error('Unexpected API response format:', data);
      throw new Error('Received invalid response from AI service');
    }
    
    const recipe = data.choices[0].message.content;

    return res.status(200).json({ recipe });
  } catch (error) {
    console.error('Error generating recipe:', error);
    
    // Provide more specific error messages based on the error
    if (error.message.includes('API key')) {
      return res.status(500).json({ error: 'API authentication failed. Please check your API key.' });
    } else if (error.message.includes('rate limit')) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    } else if (error.message.includes('timeout')) {
      return res.status(504).json({ error: 'Request timed out. Please try again.' });
    }
    
    return res.status(500).json({ error: error.message || 'Failed to generate recipe' });
  }
} 