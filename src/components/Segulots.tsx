
import React from 'react';
import { Lock, Crown, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { segulots } from '../data/content';

const Segulots: React.FC = () => {
  const { user, startTrial } = useAuth();

  if (!user?.isPremium) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            Unções Premium
          </h1>
          <p className="text-sm sm:text-base text-gray-600">Orações especiais da tradição judaico-cristã</p>
        </div>

        <div className="prayer-card max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-golden-400 to-golden-600 rounded-full flex items-center justify-center">
              <Crown size={32} className="text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Desbloqueie o Poder das Unções
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            As Unções são orações especiais baseadas na tradição mística judaico-cristã, 
            conhecidas por sua eficácia espiritual. Acesse práticas ancestrais para:
          </p>

          <div className="grid gap-4 text-left mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 text-sm">✓</span>
              </div>
              <span className="text-gray-700">Proteção espiritual e física</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 text-sm">✓</span>
              </div>
              <span className="text-gray-700">Prosperidade e abundância</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 text-sm">✓</span>
              </div>
              <span className="text-gray-700">Cura física e emocional</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 text-sm">✓</span>
              </div>
              <span className="text-gray-700">Sabedoria e discernimento</span>
            </div>
          </div>

          <button
            onClick={startTrial}
            className="w-full bg-gradient-to-r from-golden-500 to-golden-600 text-white py-4 rounded-lg font-medium hover:from-golden-600 hover:to-golden-700 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Clock size={20} />
            <span>Iniciar Teste Grátis de 7 Dias</span>
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Sem compromisso • Cancele a qualquer momento
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Unções Premium
        </h1>
        <p className="text-sm sm:text-base text-gray-600">Orações especiais da tradição judaico-cristã</p>
        {user.trialEndsAt && (
          <p className="text-blue-600 font-medium mt-2 text-sm sm:text-base">
            Teste grátis até {new Date(user.trialEndsAt).toLocaleDateString('pt-BR')}
          </p>
        )}
      </div>

      <div className="grid gap-6">
        {segulots.map(segulot => (
          <div key={segulot.id} className="prayer-card">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{segulot.title}</h3>
              <Crown size={20} className="text-golden-500 flex-shrink-0 ml-2" />
            </div>

            <p className="text-gray-600 mb-4">{segulot.description}</p>

            <div className="bg-gradient-to-r from-heavenly-50 to-golden-50 p-4 rounded-lg mb-4">
              <p className="font-scripture text-gray-700 leading-relaxed italic">
                {segulot.prayer}
              </p>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-sm text-purple-800">
                <strong>Propósito:</strong> {segulot.purpose}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Segulots;
