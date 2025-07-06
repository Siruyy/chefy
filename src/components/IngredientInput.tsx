import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface IngredientInputProps {
  onAddIngredient: (ingredient: string) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ onAddIngredient }) => {
  const [currentIngredient, setCurrentIngredient] = useState('');
  const { toast } = useToast();

  // List of common profanity words to filter
  const profanityList = [
    'fuck', 'shit', 'ass', 'damn', 'bitch', 'cunt', 'dick', 'cock', 'pussy', 'asshole', 'shit', 'oten', 'otin', 'iyot', 'bilat', 'sex', 'yawa', 'ywa', ' yw', 'piste', 'pisti', 'boang'
  ];

  // List of non-food items to filter
  const nonFoodItems = [
    'car', 'phone', 'computer', 'tv', 'chair', 'table', 'sofa', 'shoe', 'shirt', 'pants',
    'pencil', 'paper', 'book', 'pen', 'laptop', 'keyboard', 'mouse', 'monitor', 'desk',
    'window', 'door', 'wall', 'floor', 'ceiling', 'roof', 'brick', 'concrete', 'metal',
    'plastic', 'glass', 'wood', 'steel', 'iron', 'gold', 'silver', 'diamond', 'ruby'
  ];

  const validateIngredient = (ingredient: string): boolean => {
    const lowercaseIngredient = ingredient.toLowerCase();
    
    // Check for profanity
    if (profanityList.some(word => lowercaseIngredient.includes(word))) {
      toast({
        title: "Inappropriate content",
        description: "Please enter appropriate food ingredients only.",
        variant: "destructive",
      });
      return false;
    }
    
    // Check for obvious non-food items
    if (nonFoodItems.some(item => lowercaseIngredient === item)) {
      toast({
        title: "Not a food ingredient",
        description: "Please enter valid food ingredients only.",
        variant: "destructive",
      });
      return false;
    }
    
    // Check for numbers or special characters only
    if (/^[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(lowercaseIngredient)) {
      toast({
        title: "Invalid ingredient",
        description: "Please enter valid food ingredients.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedIngredient = currentIngredient.trim();
    
    if (trimmedIngredient) {
      if (validateIngredient(trimmedIngredient)) {
        onAddIngredient(trimmedIngredient);
        setCurrentIngredient('');
      }
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
