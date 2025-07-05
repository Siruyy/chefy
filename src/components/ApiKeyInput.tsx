
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  hasApiKey: boolean;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySet, hasApiKey }) => {
  const [apiKey, setApiKey] = useState('');
  const [showInput, setShowInput] = useState(!hasApiKey);

  useEffect(() => {
    // Check if API key exists in localStorage
    const savedApiKey = localStorage.getItem('ai-api-key');
    if (savedApiKey) {
      onApiKeySet(savedApiKey);
      setShowInput(false);
    }
  }, [onApiKeySet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('ai-api-key', apiKey.trim());
      onApiKeySet(apiKey.trim());
      setShowInput(false);
    }
  };

  const handleChangeKey = () => {
    setShowInput(true);
    setApiKey('');
  };

  if (!showInput && hasApiKey) {
    return (
      <div className="glass-card rounded-xl p-4 flex items-center justify-between">
        <span className="text-green-700 font-medium">✓ API Key configured</span>
        <Button 
          onClick={handleChangeKey}
          variant="outline"
          size="sm"
          className="text-sm"
        >
          Change Key
        </Button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">AI API Configuration</h3>
      <p className="text-sm text-gray-600 mb-4">
        Enter your AI API key (OpenAI, Anthropic, etc.) to generate recipes
      </p>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your AI API key..."
          className="glass-input text-gray-800 flex-1"
        />
        <Button 
          type="submit" 
          className="recipe-button text-white font-semibold"
          disabled={!apiKey.trim()}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default ApiKeyInput;
