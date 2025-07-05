
import React from 'react';
import { Button } from '@/components/ui/button';

interface IngredientListProps {
  ingredients: string[];
  onRemoveIngredient: (index: number) => void;
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients, onRemoveIngredient }) => {
  if (ingredients.length === 0) {
    return (
      <div className="text-center text-gray-600 py-8">
        <p className="text-lg">No ingredients added yet.</p>
        <p className="text-sm opacity-75 mt-1">Add some ingredients to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Ingredients ({ingredients.length})</h3>
      <div className="flex flex-wrap gap-3">
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="ingredient-tag px-4 py-2 rounded-full flex items-center gap-2 fade-in"
          >
            <span className="text-gray-800 font-medium">{ingredient}</span>
            <Button
              onClick={() => onRemoveIngredient(index)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-red-200 rounded-full"
            >
              ×
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientList;
