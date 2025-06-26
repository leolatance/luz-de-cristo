import React, { useState } from 'react';
import { Crown, Heart, Book, Cross, Clock, Shield, Star, Sparkles, Check, ArrowRight, Users, Zap, Trophy, Gift, Calendar } from 'lucide-react';
import AuthModal from './AuthModal';
import { openCheckout } from '../config/checkout';

const LandingPage: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleGetPremium = () => {
    openCheckout();
  };

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              {/* Logo do App - usando scale para aumentar logo 250x60px */}
              <div className="w-14 h-14 sm:w-16 h-16 flex items-center justify-center relative overflow-visible">
                <img 
                  src="/logo.png" 
                  alt="Luz de Cristo Logo" 
                  className="object-contain z-10 transform scale-[1.85] sm:scale-[2.6] translate-x-2"
                  style={{ width: '250px', height: '60px' }}
                  onError={(e) => {
                    // Fallback: se a imagem não carregar, mostra círculo com ícone da cruz
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.fallback-logo')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'fallback-logo w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg z-10 transform translate-x-2';
                      fallback.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>';
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <button
                onClick={() => openAuthModal('login')}
                className="border border-slate-300 text-slate-700 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-slate-50 transition-all duration-200 font-medium text-sm sm:text-base"
              >
                Entrar
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="bg-blue-600 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Criar Conta</span>
                <span className="sm:hidden">Cadastro</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          {/* Urgência */}
          <div className="inline-block bg-red-500 text-white px-6 py-2 rounded-full mb-8 animate-pulse">
            <span className="font-bold">⚡ OFERTA LIMITADA - 7 DIAS GRÁTIS</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
            Transforme Sua Vida
            <br />
            <span className="text-blue-600">Espiritual Hoje</span>
          </h1>

          <p className="text-2xl text-slate-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            <strong>Pare de buscar conteúdo cristão disperso na internet.</strong> Acesse a única plataforma que reúne TUDO que você precisa para fortalecer sua fé e transformar sua vida espiritual.
          </p>

          {/* Proof Points */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-slate-600">
            <div className="flex items-center space-x-2">
              <Users size={24} className="text-blue-500" />
              <span className="font-semibold">+10.000 Cristãos Ativos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star size={24} className="text-blue-500" />
              <span className="font-semibold">Avaliação 4.9/5</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield size={24} className="text-blue-500" />
              <span className="font-semibold">100% Seguro</span>
            </div>
          </div>

          {/* CTA Principal */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center mb-6">
              <Gift size={32} className="text-blue-500 mr-3" />
              <h3 className="text-3xl font-bold text-slate-800">Comece GRÁTIS Agora!</h3>
            </div>
            
            <p className="text-xl text-slate-700 mb-6">
              <strong>Não perca tempo!</strong> Milhares de cristãos já estão transformando suas vidas. Junte-se a eles hoje mesmo.
            </p>

            <button
              onClick={() => openAuthModal('login')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-12 py-6 rounded-2xl font-bold text-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-xl mb-6 w-full sm:w-auto"
            >
              🎁 QUERO MEUS 7 DIAS GRÁTIS
            </button>

            <div className="grid md:grid-cols-3 gap-4 text-slate-700">
              <div className="flex items-center justify-center">
                <Check size={20} className="text-green-500 mr-2" />
                <span>Acesso Imediato</span>
              </div>
              <div className="flex items-center justify-center">
                <Check size={20} className="text-green-500 mr-2" />
                <span>Sem Cartão de Crédito</span>
              </div>
              <div className="flex items-center justify-center">
                <Check size={20} className="text-green-500 mr-2" />
                <span>Cancele Quando Quiser</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problema/Solução */}
      <section className="bg-slate-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-800 mb-6">
                  Você Está Cansado de...
                </h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1">
                      <span className="text-white text-sm">✗</span>
                    </div>
                    <p className="text-lg text-slate-700">Perder tempo procurando conteúdo cristão de qualidade na internet?</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1">
                      <span className="text-white text-sm">✗</span>
                    </div>
                    <p className="text-lg text-slate-700">Sentir que sua vida espiritual está estagnada?</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1">
                      <span className="text-white text-sm">✗</span>
                    </div>
                    <p className="text-lg text-slate-700">Não ter um lugar confiável para suas orações e estudos?</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-blue-600 mb-6">
                  Agora Você Pode...
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <Check size={16} className="text-white" />
                    </div>
                    <p className="text-lg text-slate-700"><strong>Ter tudo em um só lugar:</strong> Orações, unções, histórias bíblicas, inspirações diárias e direção espiritual semanal</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <Check size={16} className="text-white" />
                    </div>
                    <p className="text-lg text-slate-700"><strong>Crescer espiritualmente:</strong> Conteúdo curado por especialistas em teologia</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <Check size={16} className="text-white" />
                    </div>
                    <p className="text-lg text-slate-700"><strong>Economizar tempo:</strong> Acesso instantâneo ao melhor conteúdo cristão</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos Premium */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-800 mb-6">
              O Que Você Recebe
              <span className="text-blue-600"> HOJE</span>
            </h2>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              Acesso completo e imediato a todos os recursos premium. Sem pegadinhas, sem limites.
            </p>
          </div>

          {/* Grid responsivo para 5 recursos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {/* Recurso 1 - Frase do Dia */}
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-200 border-2 border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Sparkles size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 text-center">Frase do Dia</h3>
              <p className="text-slate-600 text-center mb-4 text-sm">
                Inspiração diária com versículos poderosos e reflexões profundas
              </p>
              <div className="text-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                  PREMIUM
                </span>
              </div>
            </div>

            {/* Recurso 2 - Palavra da Semana */}
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-200 border-2 border-blue-100 relative">
              <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                NOVO!
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Calendar size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 text-center">Palavra da Semana</h3>
              <p className="text-slate-600 text-center mb-4 text-sm">
                Direção espiritual profética personalizada com interpretação e oração semanal
              </p>
              <div className="text-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                  PREMIUM
                </span>
              </div>
            </div>

            {/* Recurso 3 - Orações Completas */}
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-200 border-2 border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Heart size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 text-center">Orações Completas</h3>
              <p className="text-slate-600 text-center mb-4 text-sm">
                Biblioteca com centenas de orações categorizadas para cada situação
              </p>
              <div className="text-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                  PREMIUM
                </span>
              </div>
            </div>

            {/* Recurso 4 - Unções Sagradas */}
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-200 border-2 border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Crown size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 text-center">Unções Sagradas</h3>
              <p className="text-slate-600 text-center mb-4 text-sm">
                Orações poderosas da tradição judaico-cristã para proteção e prosperidade
              </p>
              <div className="text-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                  PREMIUM
                </span>
              </div>
            </div>

            {/* Recurso 5 - Histórias Bíblicas */}
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-200 border-2 border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Book size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 text-center">Histórias Bíblicas</h3>
              <p className="text-slate-600 text-center mb-4 text-sm">
                Narrativas inspiradoras com interpretações profundas e lições práticas
              </p>
              <div className="text-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                  PREMIUM
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos de Usuários */}
      <section className="bg-gradient-to-br from-blue-50 to-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-800 mb-6">
              O Que Nossos Membros
              <span className="text-blue-600"> Estão Dizendo</span>
            </h2>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              Milhares de vidas transformadas através da fé. Veja os relatos reais de quem já faz parte da nossa comunidade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Depoimento 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-200 border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="flex text-blue-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-slate-700 mb-4 italic">
                "Desde que comecei a usar a plataforma, minha vida espiritual mudou completamente. As orações diárias me dão força para enfrentar qualquer desafio. Recomendo para todos os cristãos!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-slate-800">Maria Silva</p>
                  <p className="text-sm text-slate-600">São Paulo, SP</p>
                </div>
              </div>
            </div>

            {/* Depoimento 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-200 border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="flex text-blue-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-slate-700 mb-4 italic">
                "As unções sagradas trouxeram uma paz inexplicável para minha família. Meu casamento melhorou, meus filhos estão mais próximos de Deus. Vale cada centavo!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-slate-800">João Santos</p>
                  <p className="text-sm text-slate-600">Rio de Janeiro, RJ</p>
                </div>
              </div>
            </div>

            {/* Depoimento 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-200 border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="flex text-blue-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-slate-700 mb-4 italic">
                "Aos 58 anos, pensava que já sabia tudo sobre a Bíblia. As histórias bíblicas aqui me mostraram interpretações que nunca havia considerado. Estou aprendendo tanto!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-slate-800">Ana Costa</p>
                  <p className="text-sm text-slate-600">Belo Horizonte, MG</p>
                </div>
              </div>
            </div>

            {/* Depoimento 4 - Atualizado para Palavra da Semana */}
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-200 border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="flex text-blue-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-slate-700 mb-4 italic">
                "A nova 'Palavra da Semana' mudou minha forma de orar! Cada semana recebo uma direção espiritual personalizada que parece ter sido feita especialmente para o que estou vivendo. É profético!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  P
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-slate-800">Pedro Oliveira</p>
                  <p className="text-sm text-slate-600">Porto Alegre, RS</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action após depoimentos */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                Junte-se a Eles Hoje Mesmo!
              </h3>
              <p className="text-lg text-slate-700 mb-6">
                Mais de <strong>10.000 cristãos</strong> já transformaram suas vidas. Sua vez chegou!
              </p>
              <button
                onClick={() => openAuthModal('login')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-4 rounded-xl font-bold text-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🎁 COMEÇAR MEUS 7 DIAS GRÁTIS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Urgência e Escassez */}
      <section className="bg-slate-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-500 text-white px-6 py-3 rounded-full inline-block mb-8">
              <span className="font-bold text-lg">⏰ ATENÇÃO: Oferta por tempo limitado!</span>
            </div>
            
            <h2 className="text-5xl font-bold text-white mb-6">
              Não Deixe Sua Vida Espiritual
              <br />
              <span className="text-blue-400">Para Amanhã</span>
            </h2>
            
            <p className="text-xl text-slate-300 mb-8">
              <strong>Milhares de cristãos já estão vivendo uma vida espiritual plena.</strong> 
              Enquanto você hesita, eles estão crescendo na fé e recebendo bênçãos. 
              <strong>Não fique para trás!</strong>
            </p>

            <div className="bg-white rounded-2xl p-8 mb-8">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                🔥 ÚLTIMA CHANCE - 7 DIAS GRÁTIS
              </h3>
              <p className="text-lg text-slate-700 mb-6">
                Esta é sua oportunidade de transformar sua vida espiritual SEM PAGAR NADA por 7 dias completos.
              </p>
              
              <button
                onClick={() => openAuthModal('login')}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-12 py-6 rounded-2xl font-bold text-2xl hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-xl"
              >
                GARANTIR MINHA VAGA GRÁTIS
              </button>
              
              <p className="text-sm text-slate-600 mt-4">
                ✅ Sem compromisso • ✅ Sem cartão de crédito • ✅ Acesso imediato
              </p>
            </div>

            <div className="flex justify-center items-center space-x-8 text-slate-400">
              <div className="flex items-center space-x-2">
                <Shield size={20} />
                <span>Pagamento Seguro</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star size={20} />
                <span>Satisfação Garantida</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users size={20} />
                <span>+10k Membros</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Crown size={64} className="mx-auto mb-6 text-white" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Sua Transformação Espiritual
              <br />
              Começa Agora
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Não espere mais. Sua vida espiritual merece o melhor. 
              Junte-se aos milhares de cristãos que já descobriram o poder da fé através da nossa plataforma.
            </p>
            
            <button
              onClick={() => openAuthModal('login')}
              className="bg-white text-blue-600 px-12 py-6 rounded-2xl font-bold text-2xl hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-xl"
            >
              🚀 COMEÇAR TRANSFORMAÇÃO GRÁTIS
            </button>
            
            <p className="text-blue-100 mt-6 text-lg">
              ⚡ Acesso instantâneo • 🎁 7 dias grátis • 🔒 100% seguro
            </p>
          </div>
        </div>
      </section>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default LandingPage; 