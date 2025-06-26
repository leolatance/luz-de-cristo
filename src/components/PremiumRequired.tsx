import React from 'react';
import { Crown, Star, Shield, Heart, Book, Sparkles, Gift, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { openCheckout } from '../config/checkout';

const PremiumRequired: React.FC = () => {
  const { user } = useAuth();

  const handleGetPremium = () => {
    // Redirecionar para checkout em vez de iniciar trial
    openCheckout();
  };

  // Verificar se o usuário já teve trial (trial expirado)
  const hadTrialBefore = user && user.trialEndsAt === undefined && !user.isPremium;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          {hadTrialBefore ? 'Bem-vindo de volta!' : 'Descubra o Premium'}
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          {hadTrialBefore 
            ? 'Continue sua jornada espiritual onde parou'
            : 'Recursos exclusivos para enriquecer sua fé'
          }
        </p>
      </div>

      <div className="prayer-card max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            {hadTrialBefore ? <Sparkles size={32} className="text-white" /> : <Crown size={32} className="text-white" />}
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          {hadTrialBefore 
            ? 'Que tal retomar sua jornada?' 
            : 'Recursos que vão inspirar sua fé'
          }
        </h2>

        <p className="text-gray-600 mb-8 leading-relaxed">
          {hadTrialBefore 
            ? 'Você já conhece o valor dos nossos recursos premium. Que tal continuar explorando conteúdos que nutrem sua espiritualidade?'
            : 'Descubra uma coleção cuidadosamente selecionada de conteúdos espirituais baseados na tradição judaico-cristã.'
          }
        </p>

        {/* Grid expandido para 5 recursos - layout responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 text-left mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Reflexões Diárias</h3>
              <p className="text-gray-600 text-sm">Pensamentos inspiradores para começar bem o dia</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="text-indigo-600 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Palavra da Semana</h3>
              <p className="text-gray-600 text-sm">Direção espiritual personalizada com interpretação e oração semanal</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="text-purple-600 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Orações Organizadas</h3>
              <p className="text-gray-600 text-sm">Encontre a oração certa para cada momento</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Crown className="text-amber-600 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Unções Tradicionais</h3>
              <p className="text-gray-600 text-sm">Práticas ancestrais da tradição judaico-cristã</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Book className="text-green-600 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Histórias Inspiradoras</h3>
              <p className="text-gray-600 text-sm">Narrativas que fortalecem a fé e a esperança</p>
            </div>
          </div>
        </div>

        {/* Seção de garantia - mais suave */}
        {!hadTrialBefore ? (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-8 border border-blue-100">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gift className="text-blue-600 w-6 h-6" />
              <h3 className="text-lg font-semibold text-gray-800">Experimente sem compromisso</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600 mb-1">7 dias</div>
                <div className="text-gray-600">Acesso completo</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600 mb-1">Grátis</div>
                <div className="text-gray-600">Sem taxas</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600 mb-1">Fácil</div>
                <div className="text-gray-600">Cancele quando quiser</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl mb-8 border border-amber-100">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="text-amber-600 w-6 h-6" />
              <h3 className="text-lg font-semibold text-gray-800">Você já sabe o que encontrar aqui</h3>
            </div>
            <p className="text-gray-700 text-sm">
              Durante seu período de teste, você explorou nossos recursos. 
              Continue sua jornada espiritual com acesso completo ao conteúdo.
            </p>
          </div>
        )}

        {/* Botão corrigido - cores sólidas */}
        <button
          onClick={handleGetPremium}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {hadTrialBefore ? <Sparkles size={24} /> : <Crown size={24} />}
          <span>
            {hadTrialBefore 
              ? 'Continuar Jornada Premium' 
              : 'Começar Meus 7 Dias Grátis'
            }
          </span>
        </button>

        <p className="text-sm text-gray-500 mt-4">
          {hadTrialBefore 
            ? 'Acesso imediato • Suporte dedicado • Conteúdo sempre atualizado'
            : 'Sem compromisso • Cancele a qualquer momento • Comece agora mesmo'
          }
        </p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Mais de 10.000 pessoas já transformaram sua vida espiritual conosco
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumRequired; 