
import React, { useState } from 'react';
import { Book, ChevronDown, ChevronUp } from 'lucide-react';
import { biblicalStories } from '../data/content';

const BiblicalStories: React.FC = () => {
  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const toggleStory = (storyId: string) => {
    setExpandedStory(expandedStory === storyId ? null : storyId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Histórias Bíblicas
        </h1>
        <p className="text-sm sm:text-base text-gray-600">Inspiração e ensinamentos das Sagradas Escrituras</p>
      </div>

      <div className="space-y-6">
        {biblicalStories.map(story => (
          <div key={story.id} className="prayer-card">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{story.title}</h3>
              <Book size={20} className="text-golden-500 flex-shrink-0 ml-2" />
            </div>

            <p className="text-gray-600 mb-4">{story.summary}</p>

            <button
              onClick={() => toggleStory(story.id)}
              className="flex items-center space-x-2 text-golden-600 hover:text-golden-700 font-medium mb-4"
            >
              {expandedStory === story.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              <span>{expandedStory === story.id ? 'Ocultar História' : 'Ler História Completa'}</span>
            </button>

            {expandedStory === story.id && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-gradient-to-r from-heavenly-50 to-golden-50 p-4 rounded-lg">
                  <p className="font-scripture text-gray-700 leading-relaxed">
                    {story.fullText}
                  </p>
                </div>

                <div className="bg-golden-50 p-4 rounded-lg">
                  <h4 className="font-bold text-golden-700 mb-2">Lição Espiritual:</h4>
                  <p className="text-golden-700">{story.lesson}</p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-4">
              <span className="text-golden-600 font-medium">{story.reference}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BiblicalStories;
