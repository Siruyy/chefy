import React from 'react';

interface RecipeDisplayProps {
  recipe: string;
  loading: boolean;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, loading }) => {
  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-8 fade-in">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-300 border-t-orange-600"></div>
          <span className="ml-4 text-lg text-gray-700">Generating your recipe...</span>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return null;
  }

  // Function to format markdown-like content
  const formatRecipeContent = (content: string) => {
    const lines = content.split('\n');
    const formattedContent: JSX.Element[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (!line) {
        formattedContent.push(<div key={key++} className="h-3" />);
        continue;
      }

      // Main Recipe title (starts with # or **Title**)
      if (line.startsWith('# ') || (line.startsWith('**') && line.endsWith('**') && !line.includes(':'))) {
        const title = line.replace(/^#+\s*/, '').replace(/^\*\*/, '').replace(/\*\*$/, '');
        formattedContent.push(
          <div key={key++} className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
              <span className="text-4xl">🍳</span>
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mx-auto"></div>
          </div>
        );
        continue;
      }

      // Section headers with ### or ####
      if (line.startsWith('###')) {
        const title = line.replace(/^#+\s*/, '');
        const headerLevel = (line.match(/^#+/) || [''])[0].length;
        
        if (headerLevel === 3) {
          formattedContent.push(
            <h3 key={key++} className="text-2xl font-bold text-orange-700 mt-8 mb-4 border-b-2 border-orange-200 pb-2">
              {title}
            </h3>
          );
        } else if (headerLevel === 4) {
          formattedContent.push(
            <h4 key={key++} className="text-xl font-bold text-orange-600 mt-6 mb-3">
              {title}
            </h4>
          );
        }
        continue;
      }

      // Section headers (bold text with colons) - Made bigger
      if (line.startsWith('**') && line.includes(':') && line.endsWith('**')) {
        const header = line.replace(/^\*\*/, '').replace(/\*\*$/, '');
        formattedContent.push(
          <h3 key={key++} className="text-2xl font-bold text-orange-700 mt-8 mb-4 border-b-2 border-orange-200 pb-2">
            {header}
          </h3>
        );
        continue;
      }

      // Cooking Time and Serves (special styling)
      if (line.includes('Cooking Time:') || line.includes('Serves:')) {
        const isTime = line.includes('Cooking Time:');
        const content = line.replace(/^\*\*/, '').replace(/\*\*$/, '');
        const [label, value] = content.split(':').map(s => s.trim());
        
        formattedContent.push(
          <div key={key++} className="inline-block mr-6 mb-4">
            <div className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-lg p-3 border border-orange-200">
              <div className="flex items-center gap-2">
                <span className="text-orange-600 text-lg">
                  {isTime ? '⏱️' : '👥'}
                </span>
                <div>
                  <div className="text-sm font-medium text-orange-700">{label}:</div>
                  <div className="text-orange-800 font-semibold">{value}</div>
                </div>
              </div>
            </div>
          </div>
        );
        continue;
      }

      // List items (starts with • or -)
      if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
        const listItem = line.replace(/^[•\-*]\s*/, '');
        formattedContent.push(
          <div key={key++} className="flex items-start mb-2">
            <span className="text-orange-500 mr-3 mt-1">•</span>
            <span className="text-gray-700 leading-relaxed">{listItem}</span>
          </div>
        );
        continue;
      }

      // Numbered list items
      if (/^\d+\./.test(line)) {
        const match = line.match(/^(\d+)\.\s*(.+)$/);
        if (match) {
          const [, number, content] = match;
          formattedContent.push(
            <div key={key++} className="flex items-start mb-3">
              <span className="bg-orange-100 text-orange-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                {number}
              </span>
              <span className="text-gray-700 leading-relaxed">{content}</span>
            </div>
          );
          continue;
        }
      }

      // Numbered steps without periods (like "1 Step one")
      if (/^\d+\s+\S/.test(line)) {
        const match = line.match(/^(\d+)\s+(.+)$/);
        if (match) {
          const [, number, content] = match;
          formattedContent.push(
            <div key={key++} className="flex items-start mb-3">
              <span className="bg-orange-100 text-orange-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                {number}
              </span>
              <span className="text-gray-700 leading-relaxed">{content}</span>
            </div>
          );
          continue;
        }
      }

      // Bold text
      if (line.startsWith('**') && line.endsWith('**')) {
        const boldText = line.replace(/^\*\*/, '').replace(/\*\*$/, '');
        formattedContent.push(
          <p key={key++} className="font-semibold text-gray-800 mb-2">
            {boldText}
          </p>
        );
        continue;
      }

      // Italic text (demo text)
      if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
        const italicText = line.replace(/^\*/, '').replace(/\*$/, '');
        formattedContent.push(
          <p key={key++} className="italic text-gray-600 text-sm mt-4 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-200">
            {italicText}
          </p>
        );
        continue;
      }

      // Regular paragraph
      formattedContent.push(
        <p key={key++} className="text-gray-700 mb-2 leading-relaxed">
          {line}
        </p>
      );
    }

    return formattedContent;
  };

  return (
    <div className="glass-card rounded-2xl p-8 fade-in">
      <div className="max-w-none">
        <div className="text-gray-700">
          {formatRecipeContent(recipe)}
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
