import React, { useState } from 'react';
import { Crown, Heart, Book, Cross, Clock, Shield, Star, Sparkles, Check, ArrowRight } from 'lucide-react';
import AuthModal from './AuthModal';
import { openCheckout } from '../config/checkout';

const LandingPage: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleGetPremium = () => {
    openCheckout();
  };

  return (
    <div className="min-h-screen christian-gradient">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-golden-400 to-golden-600 rounded-full flex items-center justify-center">
              <Cross size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Luz de Cristo</h1>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-2 rounded-lg hover:bg-white transition-all duration-200 border border-gray-200"
          >
            Entrar
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-golden-400 to-golden-600 rounded-full flex items-center justify-center shadow-lg">
              <Crown size={32} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Transforme sua vida com o poder da
              <span className="text-golden-600"> Fé</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 leading-relaxed max-w-2xl mx-auto">
              Descubra orações poderosas, histórias inspiradoras e unções sagradas que irão fortalecer sua jornada espiritual todos os dias.
            </p>
            <div className="bg-blue-50 border border-blue-300 rounded-xl p-4 max-w-xl mx-auto mb-8">
              <p className="text-blue-800 font-bold text-lg flex items-center justify-center">
                <Crown size={20} className="mr-2" />
                🎁 Ao criar sua conta, você ganha 7 dias de Premium GRÁTIS!
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={handleGetPremium}
              className="bg-gradient-to-r from-golden-500 to-golden-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-golden-600 hover:to-golden-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <Crown size={20} />
              <span>Adquirir Premium</span>
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="border-2 border-blue-500 text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-200 flex items-center space-x-2 relative"
            >
              <Sparkles size={20} />
              <span>Criar Conta = 7 Dias Grátis!</span>
              <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                GRÁTIS
              </div>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600 mb-16">
            <div className="flex items-center space-x-2">
              <Shield size={20} className="text-golden-500" />
              <span>100% Seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star size={20} className="text-golden-500" />
              <span>Conteúdo Autêntico</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart size={20} className="text-golden-500" />
              <span>Milhares de Vidas Transformadas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Tudo que você precisa para sua jornada espiritual
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Recursos cuidadosamente selecionados para nutrir sua fé e fortalecer sua conexão com o divino
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-200 border border-gray-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <Sparkles size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Frase do Dia</h3>
            <p className="text-gray-600">
              Inspiração diária com versículos e reflexões que tocam o coração
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-200 border border-gray-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <Clock size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Orações Diárias</h3>
            <p className="text-gray-600">
              Orações para manhã, tarde e noite, guiando cada momento do seu dia
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-200 border border-gray-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
              <Book size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Histórias Bíblicas</h3>
            <p className="text-gray-600">
              Narrativas inspiradoras que fortalecem a fé e ensinam valores eternos
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-200 border border-golden-200 relative">
            <div className="absolute -top-2 -right-2 bg-golden-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              PREMIUM
            </div>
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-golden-400 to-golden-600 rounded-full flex items-center justify-center">
              <Cross size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Unções Sagradas</h3>
            <p className="text-gray-600">
              Orações poderosas da tradição judaico-cristã para proteção, cura e prosperidade
            </p>
          </div>
        </div>
      </section>

      {/* Premium Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-golden-50 to-heavenly-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-golden-400 to-golden-600 rounded-full flex items-center justify-center shadow-lg">
              <Crown size={32} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Desbloqueie Todo o Poder Espiritual
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Com o Premium, você tem acesso completo a todos os recursos exclusivos para transformar sua vida espiritual
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Premium Benefits */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Star className="text-golden-500 mr-3" size={24} />
                Benefícios Premium
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-golden-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Unções Sagradas Completas</h4>
                    <p className="text-gray-600 text-sm">Acesso a todas as orações poderosas para proteção, cura, prosperidade e sabedoria</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-golden-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Histórias Bíblicas Exclusivas</h4>
                    <p className="text-gray-600 text-sm">Narrativas especiais e interpretações profundas das escrituras</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-golden-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Orações Personalizadas</h4>
                    <p className="text-gray-600 text-sm">Orações específicas para suas necessidades e momentos especiais</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-golden-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Conteúdo Semanal</h4>
                    <p className="text-gray-600 text-sm">Novos conteúdos espirituais adicionados regularmente</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-golden-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Suporte Prioritário</h4>
                    <p className="text-gray-600 text-sm">Atendimento especial para membros premium</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Free Features */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Heart className="text-blue-500 mr-3" size={24} />
                Recursos Gratuitos
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Frase Inspiradora Diária</h4>
                    <p className="text-gray-600 text-sm">Versículos e reflexões para começar bem o dia</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Orações Básicas</h4>
                    <p className="text-gray-600 text-sm">Orações essenciais para manhã, tarde e noite</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Histórias Bíblicas Básicas</h4>
                    <p className="text-gray-600 text-sm">Narrativas fundamentais da fé cristã</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Acesso Multiplataforma</h4>
                    <p className="text-gray-600 text-sm">Use em qualquer dispositivo, a qualquer hora</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check size={14} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800">🎁 7 Dias Premium Grátis ao Criar Conta</h4>
                    <p className="text-green-700 text-sm font-medium">Acesso completo a todos os recursos premium automaticamente!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleGetPremium}
              className="bg-gradient-to-r from-golden-500 to-golden-600 text-white px-12 py-4 rounded-xl font-bold text-xl hover:from-golden-600 hover:to-golden-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-3 mx-auto"
            >
              <Crown size={24} />
              <span>Adquirir Premium Agora</span>
              <ArrowRight size={24} />
            </button>
            <p className="text-gray-600 mt-4">
              Transforme sua vida espiritual hoje mesmo
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Vidas Transformadas pela Fé
          </h2>
          <p className="text-xl text-gray-600">
            Veja como o App Luz de Cristo tem impactado vidas ao redor do mundo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold">M</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Maria Santos</h4>
                <p className="text-gray-600 text-sm">São Paulo, SP</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "As orações diárias me deram uma paz que eu não sentia há anos. Recomendo para todos que buscam fortalecer sua fé."
            </p>
            <div className="flex text-golden-500 mt-4">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold">J</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">João Silva</h4>
                <p className="text-gray-600 text-sm">Rio de Janeiro, RJ</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "As unções premium transformaram minha vida. Sinto uma proteção e prosperidade que nunca experimentei antes."
            </p>
            <div className="flex text-golden-500 mt-4">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Ana Costa</h4>
                <p className="text-gray-600 text-sm">Belo Horizonte, MG</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "O app me ajuda a manter minha conexão com Deus todos os dias. As histórias bíblicas são muito inspiradoras."
            </p>
            <div className="flex text-golden-500 mt-4">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-golden-500 to-golden-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comece Sua Jornada Espiritual Hoje
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já transformaram suas vidas com o poder da fé
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 relative"
            >
              <Sparkles size={20} />
              <span>Criar Conta + 7 Dias Grátis</span>
              <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                GRÁTIS
              </div>
            </button>
            <button
              onClick={handleGetPremium}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-200 flex items-center space-x-2"
            >
              <Crown size={20} />
              <span>Ir Direto ao Premium</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-golden-400 to-golden-600 rounded-full flex items-center justify-center">
            <Cross size={16} className="text-white" />
          </div>
          <span className="font-bold text-gray-800">Luz de Cristo</span>
        </div>
        <p className="text-sm">
          © 2024 Luz de Cristo. Todos os direitos reservados. Transformando vidas através da fé.
        </p>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default LandingPage; 