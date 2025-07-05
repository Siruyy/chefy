export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { ingredients, prompt } = req.body;

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
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful cooking assistant. Create detailed, delicious recipes based on the ingredients provided.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate recipe');
    }

    const data = await response.json();
    const recipe = data.choices[0].message.content;

    return res.status(200).json({ recipe });
  } catch (error) {
    console.error('Error generating recipe:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate recipe' });
  }
} 