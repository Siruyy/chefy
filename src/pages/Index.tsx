import React, { useState } from 'react';
import IngredientInput from '@/components/IngredientInput';
import IngredientList from '@/components/IngredientList';
import RecipeDisplay from '@/components/RecipeDisplay';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const addIngredient = (ingredient: string) => {
    if (!ingredients.includes(ingredient.toLowerCase())) {
      setIngredients([...ingredients, ingredient]);
      toast({
        title: "Ingredient added!",
        description: `${ingredient} has been added to your list.`,
      });
    } else {
      toast({
        title: "Duplicate ingredient",
        description: `${ingredient} is already in your list.`,
        variant: "destructive",
      });
    }
  };

  const removeIngredient = (index: number) => {
    const removedIngredient = ingredients[index];
    setIngredients(ingredients.filter((_, i) => i !== index));
    toast({
      title: "Ingredient removed",
      description: `${removedIngredient} has been removed from your list.`,
    });
  };

  const generateRecipe = async () => {
    setLoading(true);
    setRecipe('');

    try {
      const prompt = `Create a delicious recipe using these ingredients: ${ingredients.join(', ')}. 
      Please provide a complete recipe with ingredients list, instructions, and cooking time. 
      Make it creative and tasty!`;

      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients,
          prompt
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate recipe');
      }

      const data = await response.json();
      setRecipe(data.recipe);
      
      toast({
        title: "Recipe generated!",
        description: "Your delicious recipe is ready!",
      });
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast({
        title: "Error generating recipe",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
      
      // Fallback demo recipe
      setRecipe(`🍳 **Delicious ${ingredients[0]} Medley**

**Ingredients:**
${ingredients.map(ingredient => `• ${ingredient}`).join('\n')}
• Salt and pepper to taste
• 2 tbsp olive oil
• 1 onion, diced

**Instructions:**
1. Heat olive oil in a large pan over medium heat
2. Add diced onion and cook until translucent
3. Add your main ingredients: ${ingredients.slice(0, 3).join(', ')}
4. Season with salt and pepper
5. Cook for 15-20 minutes, stirring occasionally
6. Serve hot and enjoy!

**Cooking Time:** 25 minutes
**Serves:** 4 people

*This is a demo recipe.*`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <img src="/cooking.svg" alt="Recipe Generator" className="h-20 w-20" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Recipe Generator
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Add your ingredients and let AI create amazing recipes just for you!
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Ingredient Input */}
          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Ingredients</h2>
            <IngredientInput onAddIngredient={addIngredient} />
          </div>

          {/* Ingredients List - Only show when there are ingredients */}
          {ingredients.length > 0 && (
            <div className="glass-card rounded-2xl p-8">
              <IngredientList 
                ingredients={ingredients} 
                onRemoveIngredient={removeIngredient} 
              />
              
              {/* Generate Recipe Button */}
              {ingredients.length >= 4 && (
                <div className="mt-8 text-center fade-in">
                  <Button
                    onClick={generateRecipe}
                    disabled={loading}
                    className="recipe-button text-white font-bold py-4 px-8 text-lg rounded-xl"
                  >
                    {loading ? 'Generating Recipe...' : '🔥 Get My Recipe!'}
                  </Button>
                </div>
              )}

              {ingredients.length > 0 && ingredients.length < 4 && (
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Add {4 - ingredients.length} more ingredients to generate a recipe
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Recipe Display */}
          {(recipe || loading) && (
            <RecipeDisplay recipe={recipe} loading={loading} />
          )}
          
          {/* Footer */}
          <footer className="mt-16 pt-6 border-t border-gray-200">
            <div className="text-center text-gray-600 text-sm italic">
              <p>
                © {new Date().getFullYear()} Chefy by Siruyy | 
                Made with React, Tailwind CSS, and AI-powered recipe generation | 
                <a 
                  href="https://github.com/Siruyy/chefy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 underline hover:text-gray-800 transition-colors ml-1"
                >
                  View on GitHub
                </a>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
