
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface IngredientInputProps {
  onAddIngredient: (ingredient: string) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ onAddIngredient }) => {
  const [currentIngredient, setCurrentIngredient] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentIngredient.trim()) {
      onAddIngredient(currentIngredient.trim());
      setCurrentIngredient('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full">
      <Input
        type="text"
        value={currentIngredient}
        onChange={(e) => setCurrentIngredient(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter an ingredient..."
        className="glass-input text-gray-800 placeholder-gray-600 flex-1 h-12 text-lg"
      />
      <Button 
        type="submit" 
        className="recipe-button text-white font-semibold px-6 h-12 rounded-lg"
        disabled={!currentIngredient.trim()}
      >
        Add
      </Button>
    </form>
  );
};

export default IngredientInput;
