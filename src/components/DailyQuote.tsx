import React, { useState } from 'react';
import { Share2, RefreshCw, Sparkles } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-sacred font-bold text-luz-graphite mb-2">
          Frase do Dia
        </h1>
        <p className="text-sm sm:text-base text-luz-brown">Inspiração diária para iluminar seu caminho</p>
      </div>

      <div className="prayer-card max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 golden-gradient rounded-full flex items-center justify-center sacred-glow">
            <Sparkles size={24} className="text-luz-petrol" />
          </div>
        </div>

        <blockquote className="font-scripture text-lg sm:text-xl lg:text-2xl text-luz-brown leading-relaxed mb-6">
          "{quote.quote}"
        </blockquote>

        <cite className="text-sacred-highlight text-base sm:text-lg font-sacred">
          {quote.reference}
        </cite>

        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="celestial-card flex items-center space-x-2 text-luz-petrol px-6 py-3 rounded-full hover:bg-luz-celestial/30 transition-all duration-200 disabled:opacity-50 border-0"
          >
            <Share2 size={20} />
            <span className="font-semibold">{isSharing ? 'Compartilhando...' : 'Compartilhar'}</span>
          </button>

          <button className="btn-golden flex items-center space-x-2 rounded-full">
            <RefreshCw size={20} />
            <span>Nova Frase</span>
          </button>
        </div>
      </div>

      <div className="text-center text-luz-brown text-sm">
        <p className="font-scripture">Que esta palavra toque seu coração e ilumine seu dia</p>
      </div>
    </div>
  );
};

export default DailyQuote;
