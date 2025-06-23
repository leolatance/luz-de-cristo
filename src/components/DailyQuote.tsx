
import React, { useState } from 'react';
import { Share2, RefreshCw } from 'lucide-react';
import { getTodayQuote } from '../data/content';

const DailyQuote: React.FC = () => {
  const [quote] = useState(getTodayQuote());
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    const shareText = `"${quote.quote}" - ${quote.reference}\n\nCompartilhado do app Luz de Cristo`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Frase do Dia - Luz de Cristo',
          text: shareText,
        });
      } catch (err) {
        // Compartilhamento cancelado
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
    }
    setIsSharing(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Frase do Dia
        </h1>
        <p className="text-sm sm:text-base text-gray-600">Inspiração diária para iluminar seu caminho</p>
      </div>

      <div className="prayer-card max-w-2xl mx-auto text-center animate-gentle-glow">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-golden-400 to-golden-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">✨</span>
          </div>
        </div>

        <blockquote className="font-scripture text-lg sm:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-6 italic">
          "{quote.quote}"
        </blockquote>

        <cite className="text-golden-600 font-semibold text-base sm:text-lg">
          {quote.reference}
        </cite>

        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="flex items-center space-x-2 bg-gradient-to-r from-heavenly-400 to-heavenly-500 text-white px-6 py-3 rounded-full hover:from-heavenly-500 hover:to-heavenly-600 transition-all duration-200 disabled:opacity-50"
          >
            <Share2 size={20} />
            <span>{isSharing ? 'Compartilhando...' : 'Compartilhar'}</span>
          </button>

          <button className="flex items-center space-x-2 border border-golden-300 text-golden-600 px-6 py-3 rounded-full hover:bg-golden-50 transition-all duration-200">
            <RefreshCw size={20} />
            <span>Nova Frase</span>
          </button>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm">
        <p>Que esta palavra toque seu coração e ilumine seu dia</p>
      </div>
    </div>
  );
};

export default DailyQuote;
