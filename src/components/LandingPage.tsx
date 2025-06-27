import React, { useState, useEffect } from 'react';
import { Crown, Heart, Book, Cross, Clock, Shield, Star, Sparkles, Check, ArrowRight, Users, Zap, Trophy, Gift, Calendar, Lock, Eye, EyeOff, X } from 'lucide-react';
import AuthModal from './AuthModal';
import { openCheckout } from '../config/checkout';

const LandingPage: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showFullPrayer, setShowFullPrayer] = useState(false);
  const [onlineCount, setOnlineCount] = useState(847);
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(0);

  // Diferentes notificações para rotacionar
  const notifications = [
    { name: 'Maria Clara', location: 'São Paulo', initial: 'MC', color: 'from-pink-400 to-pink-600', time: '2 minutos' },
    { name: 'Ana Beatriz', location: 'Rio de Janeiro', initial: 'AB', color: 'from-purple-400 to-purple-600', time: '3 minutos' },
    { name: 'Fernanda Silva', location: 'Belo Horizonte', initial: 'FS', color: 'from-blue-400 to-blue-600', time: '1 minuto' },
    { name: 'Patricia Santos', location: 'Salvador', initial: 'PS', color: 'from-green-400 to-green-600', time: '5 minutos' },
    { name: 'Rosângela Costa', location: 'Brasília', initial: 'RC', color: 'from-red-400 to-red-600', time: '4 minutos' }
  ];

  // Simular pessoas online
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => {
        const change = Math.floor(Math.random() * 7) - 3; // -3 a +3
        const newCount = prev + change;
        return Math.max(823, Math.min(891, newCount)); // mantém entre 823 e 891
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Mostrar notificação após 5 segundos e depois alternar
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 5000);

    // Alternar notificações a cada 15 segundos
    const interval = setInterval(() => {
      setShowNotification(false);
      setTimeout(() => {
        setCurrentNotification(prev => (prev + 1) % notifications.length);
        setShowNotification(true);
      }, 500);
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleGetPremium = () => {
    openCheckout();
  };

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  // Oração de exemplo que seria mostrada
  const samplePrayer = {
    title: "Oração Poderosa para Abrir Caminhos",
    preview: `Senhor, meu Deus, venho até Ti com o coração aberto e humilde.
Tu que conheces todas as minhas aflições e necessidades,
Peço-te que abras os caminhos que parecem fechados em minha vida...`,
    full: `Senhor, meu Deus, venho até Ti com o coração aberto e humilde.
Tu que conheces todas as minhas aflições e necessidades,
Peço-te que abras os caminhos que parecem fechados em minha vida.

Remove todos os obstáculos que me impedem de alcançar as bênçãos
que preparaste para mim desde o princípio dos tempos.
Que tua luz divina ilumine cada passo do meu caminho,
E que tua sabedoria me guie nas decisões difíceis.

Pai celestial, quebra todas as correntes que me prendem,
Desfaz todo mal que foi lançado contra mim e minha família.
Transforma minha angústia em alegria, meu choro em riso,
E minha derrota em vitória gloriosa.

Declaro que portas se abrirão onde antes havia muros,
Que bênçãos fluirão onde antes havia escassez,
E que tua graça me acompanhará todos os dias da minha vida.

Em nome de Jesus, eu creio e recebo. Amém!`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Simplificado */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <div className="w-14 h-14 sm:w-16 h-16 flex items-center justify-center relative overflow-visible">
                <img 
                  src="/logo.png" 
                  alt="Luz de Cristo Logo" 
                  className="object-contain z-10 transform scale-[1.85] sm:scale-[2.6] translate-x-2"
                  style={{ width: '250px', height: '60px' }}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => openAuthModal('login')}
                className="text-slate-600 hover:text-slate-800 px-3 sm:px-4 py-2 font-medium text-sm sm:text-base transition-colors"
              >
                Entrar
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium text-sm sm:text-base shadow-md"
              >
                Criar Conta
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section Completamente Reformulada */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Contador de Pessoas Online */}
          <div className="flex justify-center mb-4">
                          <div className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                <span className="font-semibold">{onlineCount} pessoas online agora</span>
              </div>
          </div>

          {/* Alerta de Urgência */}
                      <div className="bg-red-600 text-white px-4 py-3 rounded-lg mb-6 text-center">
              <p className="font-bold text-lg">
                ⚠️ ATENÇÃO: Você veio do Instagram para ver a oração completa? 
                <span className="block sm:inline"> Está AQUI EMBAIXO! 👇</span>
              </p>
            </div>

          {/* Título Principal - Direto ao Ponto */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-6 text-center leading-tight">
            Finalmente! A Oração Completa
            <br />
            <span className="text-blue-600">Que Vai Mudar Sua Vida</span>
          </h1>

          {/* Preview da Oração com Blur */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 mb-8 relative overflow-hidden">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                {samplePrayer.title}
              </h2>
              <p className="text-slate-600">
                <Eye className="inline mr-2" size={20} />
                Mais de 47.000 mulheres já fizeram esta oração
              </p>
            </div>

            {/* Texto da Oração */}
            <div className="relative">
              <div className="text-lg sm:text-xl text-slate-700 leading-relaxed whitespace-pre-line">
                {samplePrayer.preview}
              </div>
              
              {/* Parte bloqueada */}
              {!showFullPrayer && (
                <div className="relative mt-4">
                  <div className="text-lg sm:text-xl text-slate-400 leading-relaxed blur-sm select-none">
                    {samplePrayer.full.split('\n').slice(3).join('\n').substring(0, 300)}...
                  </div>
                  
                  {/* Overlay com CTA */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-transparent flex items-center justify-center">
                    <div className="text-center p-6">
                      <Lock size={48} className="mx-auto mb-4 text-blue-600" />
                      <p className="text-xl font-bold text-slate-800 mb-4">
                        🔒 Cadastre-se GRÁTIS para Ver a Oração Completa
                      </p>
                      <button
                        onClick={() => openAuthModal('register')}
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold text-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-xl"
                      >
                        LIBERAR ORAÇÃO COMPLETA AGORA →
                      </button>
                      <p className="text-sm text-slate-600 mt-3">
                         Leva só 30 segundos •   100% Grátis •   Sem pegadinhas
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Botão alternativo para mobile */}
            {!showFullPrayer && (
              <div className="mt-6 text-center sm:hidden">
                <button
                  onClick={() => openAuthModal('register')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg w-full"
                >
                  VER ORAÇÃO COMPLETA
                </button>
              </div>
            )}
          </div>

          {/* Benefícios Rápidos */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
            <p className="text-center text-lg font-semibold text-slate-800 mb-4">
              🎁 Ao criar sua conta GRÁTIS você também recebe:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-slate-700">
              <div className="flex items-center">
                <Check size={20} className="text-green-500 mr-2 flex-shrink-0" />
                <span>Oração do dia personalizada</span>
              </div>
              <div className="flex items-center">
                <Check size={20} className="text-green-500 mr-2 flex-shrink-0" />
                <span>Centenas de orações poderosas</span>
              </div>
              <div className="flex items-center">
                <Check size={20} className="text-green-500 mr-2 flex-shrink-0" />
                <span>Versículos que fortalecem</span>
              </div>
              <div className="flex items-center">
                <Check size={20} className="text-green-500 mr-2 flex-shrink-0" />
                <span>Comunidade de fé ativa</span>
              </div>
            </div>
          </div>

          {/* Depoimentos Rápidos */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-center text-slate-800 mb-6">
              O Que Nossas Irmãs em Cristo Dizem:
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="flex text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-2">
                  "Aos 52 anos, encontrei paz como nunca antes. As orações diárias mudaram minha vida!"
                </p>
                <p className="font-semibold text-slate-800">- Rosa M., São Paulo</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="flex text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-2">
                  "Meu casamento foi restaurado depois que comecei a orar com vocês. Deus é fiel!"
                </p>
                <p className="font-semibold text-slate-800">- Ana Paula, RJ</p>
              </div>
            </div>
          </div>

          {/* CTA Final Agressivo */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">
              Não Perca Mais Tempo!
            </h3>
            <p className="text-xl mb-6">
              Milhares de mulheres já estão orando e recebendo bênçãos AGORA MESMO.
              <br />
              <strong>Você vai ficar de fora?</strong>
            </p>
            <button
              onClick={() => openAuthModal('register')}
              className="bg-white text-red-600 px-10 py-5 rounded-xl font-bold text-2xl hover:bg-red-50 transition-all duration-200 transform hover:scale-105 shadow-xl"
            >
              QUERO MINHA ORAÇÃO COMPLETA! →
            </button>
            <p className="text-white/90 mt-4 text-lg">
              ⏰ Leva menos de 1 minuto para criar sua conta
            </p>
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

      {/* Notificação Flutuante */}
      <div className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-white rounded-lg shadow-2xl p-4 z-40 transform transition-all duration-700 ease-out ${
        showNotification ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-95 pointer-events-none'
      }`}>
          <button
            onClick={() => setShowNotification(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className={`w-12 h-12 bg-gradient-to-br ${notifications[currentNotification].color} rounded-full flex items-center justify-center text-white font-bold`}>
                {notifications[currentNotification].initial}
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-800">{notifications[currentNotification].name} de {notifications[currentNotification].location}</p>
              <p className="text-sm text-slate-600">acabou de se cadastrar e já está vendo as orações!</p>
              <p className="text-xs text-slate-500 mt-1">há {notifications[currentNotification].time}</p>
            </div>
          </div>
        </div>

      {/* Versão Simplificada - Apenas Depoimentos Relevantes */}
      <section className="bg-gradient-to-br from-blue-50 to-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
              Veja o Que Elas Dizem Sobre as Orações:
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Depoimento Específico sobre Orações */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-4">
                  "A oração para abrir caminhos mudou minha vida! Em 3 dias consegui o emprego que tanto sonhava. Deus é maravilhoso!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-slate-800">Sandra Lima</p>
                    <p className="text-sm text-slate-600">42 anos, Belo Horizonte</p>
                  </div>
                </div>
              </div>

              {/* Depoimento sobre Relacionamento */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-4">
                  "Meu marido voltou para casa depois de 2 meses separados. A oração de restauração funciona mesmo! Glória a Deus!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    R
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-slate-800">Regina Santos</p>
                    <p className="text-sm text-slate-600">38 anos, Rio de Janeiro</p>
                  </div>
                </div>
              </div>

              {/* Depoimento sobre Saúde */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-4">
                  "Depois de anos com insônia, finalmente durmo em paz. A oração do sono tranquilo é poderosa demais!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    E
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-slate-800">Eliane Costa</p>
                    <p className="text-sm text-slate-600">55 anos, Fortaleza</p>
                  </div>
                </div>
              </div>

              {/* Depoimento sobre Prosperidade */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-4">
                  "Quitei todas as minhas dívidas em 6 meses! A oração da prosperidade abriu portas que eu nem imaginava."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-slate-800">Aparecida Ferreira</p>
                    <p className="text-sm text-slate-600">48 anos, Salvador</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA após depoimentos */}
            <div className="text-center mt-12">
              <p className="text-xl text-slate-700 mb-6">
                <strong>Não espere mais!</strong> Sua benção pode estar a uma oração de distância.
              </p>
              <button
                onClick={() => openAuthModal('register')}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-5 rounded-xl font-bold text-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-xl"
              >
                VER TODAS AS ORAÇÕES AGORA →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Simplificado */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Última Chance de Ver a Oração Completa
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              {onlineCount} mulheres estão acessando as orações agora mesmo.
              <br />
              <strong className="text-white">Não fique de fora!</strong>
            </p>
            
            <button
              onClick={() => openAuthModal('register')}
              className="bg-white text-slate-800 px-12 py-6 rounded-2xl font-bold text-2xl hover:bg-slate-100 transition-all duration-200 transform hover:scale-105 shadow-2xl"
            >
              CRIAR MINHA CONTA GRÁTIS →
            </button>
            
            <p className="text-slate-400 mt-6 text-lg">
              ✅ Cadastro em 30 segundos • ✅ Acesso imediato • ✅ 100% grátis
            </p>
          </div>
        </div>
      </section>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />

      {/* Botão Sticky Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent sm:hidden z-30">
        <button
          onClick={() => openAuthModal('register')}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-2xl"
        >
          🔓 VER ORAÇÃO COMPLETA
        </button>
      </div>
    </div>
  );
};

export default LandingPage; 