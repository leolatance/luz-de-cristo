import React from 'react';
import { BookOpen, Heart, Sparkles, Cross } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface WeeklyWordData {
  id: string;
  week: string;
  verse: string;
  reference: string;
  interpretation: string;
  prayer: string;
}

// Função para gerar palavra da semana baseada no usuário e semana atual
const generateWeeklyWord = (userId: string): WeeklyWordData => {
  const weeklyWords = [
    {
      id: '1',
      week: 'Semana da Confiança',
      verse: 'O Senhor te guiará continuamente, e fartará a tua alma em lugares áridos.',
      reference: 'Isaías 58:11',
      interpretation: 'Essa semana, Deus te chama à confiança. Mesmo que seus caminhos pareçam incertos, Ele já está à frente. Confie na direção d\'Ele — a paz virá pela obediência.',
      prayer: 'Senhor, guia meus passos com sabedoria e paz. Silencia minha ansiedade e me mostra o caminho. Eu confio na Tua Palavra. Amém.'
    },
    {
      id: '2',
      week: 'Semana da Renovação',
      verse: 'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.',
      reference: 'Jeremias 29:11',
      interpretation: 'Deus tem planos de prosperidade para sua vida. Esta semana é de renovação espiritual. Deixe que Ele transforme seus medos em fé e suas lágrimas em alegria.',
      prayer: 'Pai celestial, renove meu coração e minha mente. Que eu possa ver Seus planos de amor se manifestarem em minha vida. Obrigado por cuidar de mim. Amém.'
    },
    {
      id: '3',
      week: 'Semana da Força',
      verse: 'Tudo posso naquele que me fortalece.',
      reference: 'Filipenses 4:13',
      interpretation: 'Você não está sozinho nas suas batalhas. Cristo é sua força quando você se sente fraco. Esta semana, descanse na certeza de que Ele te capacita para vencer.',
      prayer: 'Jesus, Tu és minha força e meu refúgio. Quando me sentir fraco, lembra-me de que posso tudo em Ti. Capacita-me para os desafios desta semana. Amém.'
    },
    {
      id: '4',
      week: 'Semana da Gratidão',
      verse: 'Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.',
      reference: '1 Tessalonicenses 5:18',
      interpretation: 'A gratidão abre as portas do céu. Esta semana, pratique a gratidão mesmo nas pequenas coisas. Deus está preparando bênçãos maiores para um coração grato.',
      prayer: 'Senhor, obrigado por todas as bênçãos em minha vida. Que eu tenha olhos para ver Tua bondade em cada momento. Enche meu coração de gratidão. Amém.'
    },
    {
      id: '5',
      week: 'Semana da Paz',
      verse: 'A paz vos deixo, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.',
      reference: 'João 14:27',
      interpretation: 'A paz de Cristo é diferente da paz do mundo. Ela permanece mesmo na tempestade. Esta semana, busque essa paz que excede todo entendimento.',
      prayer: 'Príncipe da Paz, acalma meu coração ansioso. Que Tua paz reine em minha mente e em meu lar. Afasta de mim todo medo e inquietação. Amém.'
    },
    {
      id: '6',
      week: 'Semana do Perdão',
      verse: 'Antes, sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo.',
      reference: 'Efésios 4:32',
      interpretation: 'Esta é a semana para libertar seu coração do peso do ressentimento. O perdão cura feridas profundas e abre espaço para a paz. Assim como Deus te perdoa, libere perdão aos outros.',
      prayer: 'Senhor, dá-me um coração capaz de perdoar. Ajuda-me a liberar aqueles que me feriram, assim como Tu me perdoas todos os dias. Amém.'
    },
    {
      id: '7',
      week: 'Semana da Prosperidade',
      verse: 'Honra ao Senhor com os teus bens e com as primícias de toda a tua renda; e se encherão os teus celeiros.',
      reference: 'Provérbios 3:9-10',
      interpretation: 'Prosperidade verdadeira começa com um coração generoso e fiel. Esta semana, plante sementes com fé e espere colheitas abundantes da parte de Deus.',
      prayer: 'Pai, consagro meus bens e meu trabalho a Ti. Abençoa minhas mãos e abre portas de provisão. Que eu prospere para também abençoar. Amém.'
    },
    {
      id: '8',
      week: 'Semana da União',
      verse: 'Oh! Quão bom e quão suave é que os irmãos vivam em união!',
      reference: 'Salmo 133:1',
      interpretation: 'Deus habita onde há unidade. Esta semana, fortaleça seus laços familiares, perdoe e reconcilie. A presença de Deus se manifesta quando há amor e união.',
      prayer: 'Senhor, une minha família e meus relacionamentos. Restaura vínculos quebrados e planta amor onde há divisão. Amém.'
    },
    {
      id: '9',
      week: 'Semana da Vitória',
      verse: 'Mas em todas estas coisas somos mais do que vencedores, por meio daquele que nos amou.',
      reference: 'Romanos 8:37',
      interpretation: 'Você nasceu para vencer. Deus te dá autoridade espiritual. Esta semana, declare vitórias sobre áreas de luta. O céu luta ao seu favor.',
      prayer: 'Deus poderoso, toma minha causa em Tuas mãos. Dá-me vitória sobre todo obstáculo. Eu confio que em Ti sou mais que vencedor. Amém.'
    },
    {
      id: '10',
      week: 'Semana da Esperança',
      verse: 'Bendito o homem que confia no Senhor e cuja esperança é o Senhor.',
      reference: 'Jeremias 17:7',
      interpretation: 'Mesmo quando tudo parece escuro, Deus está preparando algo novo. Esta semana, renove sua esperança n’Ele. A última palavra sempre será de Deus.',
      prayer: 'Pai, renova minha esperança. Tira o desânimo do meu coração e me faz crer de novo. Sei que Tu és Deus de promessas. Amém.'
    },
    {
      id: '11',
      week: 'Semana da Fé Inabalável',
      verse: 'Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.',
      reference: 'Hebreus 11:1',
      interpretation: 'A fé move o impossível. Esta semana, caminhe por fé, não por vista. Mesmo sem ver, creia que Deus está agindo.',
      prayer: 'Senhor, fortalece minha fé. Que eu confie mesmo sem entender, sabendo que Tu nunca falhas. Amém.'
    },
    {
      id: '12',
      week: 'Semana do Recomeço',
      verse: 'Eis que faço nova todas as coisas.',
      reference: 'Apocalipse 21:5',
      interpretation: 'O passado não define quem você é. Esta é a semana para recomeçar com Deus. Cada dia é uma nova chance de viver propósitos eternos.',
      prayer: 'Deus, apaga as marcas do passado. Restaura minha vida e guia-me por novos caminhos. Estou pronto(a) para recomeçar contigo. Amém.'
    },
    {
      id: '13',
      week: 'Semana do Amor',
      verse: 'Acima de tudo, porém, revistam-se do amor, que é o elo perfeito.',
      reference: 'Colossenses 3:14',
      interpretation: 'O amor é o maior mandamento. Esta semana, seja canal do amor de Deus. Ame sem esperar retorno, pois o amor transforma corações.',
      prayer: 'Senhor, enche-me com Teu amor. Que eu ame como Tu amas, mesmo quando é difícil. Que meu amor reflita o Teu. Amém.'
    },
    {
      id: '14',
      week: 'Semana da Coragem',
      verse: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus.',
      reference: 'Isaías 41:10',
      interpretation: 'Deus te chama para agir com coragem. Mesmo com medo, vá. A presença d’Ele vai contigo. Você é mais forte do que pensa.',
      prayer: 'Pai, dá-me coragem para enfrentar o que preciso. Que eu não me paralise pelo medo, mas caminhe em fé. Amém.'
    },
    {
      id: '15',
      week: 'Semana da Obediência',
      verse: 'Se quiserdes e me ouvirdes, comereis o melhor desta terra.',
      reference: 'Isaías 1:19',
      interpretation: 'A obediência atrai bênçãos. Esta semana, ouça a voz de Deus e siga Suas instruções com alegria. Há tesouros escondidos na obediência.',
      prayer: 'Senhor, ajuda-me a obedecer mesmo quando não entendo. Ensina-me a confiar e seguir Tua vontade. Amém.'
    },
    {
      id: '16',
      week: 'Semana da Intimidade com Deus',
      verse: 'Chegai-vos a Deus, e ele se chegará a vós.',
      reference: 'Tiago 4:8',
      interpretation: 'Deus deseja relacionamento, não apenas religião. Esta semana, separe tempo para estar a sós com Ele. Quanto mais perto de Deus, mais paz.',
      prayer: 'Pai, eu quero Te conhecer mais. Fala comigo no silêncio e guia-me com Teu amor. Amém.'
    },
    {
      id: '17',
      week: 'Semana da Restauração',
      verse: 'Restituir-vos-ei os anos que foram consumidos...',
      reference: 'Joel 2:25',
      interpretation: 'O que foi perdido será restaurado. Esta é a semana da restituição. Deus está trabalhando no invisível para reconstruir o que se quebrou.',
      prayer: 'Senhor, restaura o que foi destruído na minha vida. Toca minhas emoções, meus relacionamentos e meu futuro. Amém.'
    },
    {
      id: '18',
      week: 'Semana da Alegria no Espírito',
      verse: 'A alegria do Senhor é a nossa força.',
      reference: 'Neemias 8:10',
      interpretation: 'A alegria de Deus não depende das circunstâncias. Ela vem de dentro, pela presença d’Ele. Esta semana, permita que a alegria vença a tristeza.',
      prayer: 'Espírito Santo, enche-me com a Tua alegria. Renova meu ânimo e transborda meu coração com Tua presença. Amém.'
    },
    {
      id: '19',
      week: 'Semana da Libertação',
      verse: 'Se, pois, o Filho vos libertar, verdadeiramente sereis livres.',
      reference: 'João 8:36',
      interpretation: 'Deus quer te livrar de todo peso espiritual. Esta semana, Ele quebra grilhões e vícios. Caminhe como filho livre do Altíssimo.',
      prayer: 'Jesus, liberta-me de tudo que me prende. Quebra cadeias que me impedem de viver plenamente. Em Teu nome, sou livre. Amém.'
    },
    {
      id: '20',
      week: 'Semana da Aliança',
      verse: 'Porei a minha lei no seu interior e a escreverei no seu coração.',
      reference: 'Jeremias 31:33',
      interpretation: 'Deus quer renovar a aliança com você. Esta semana, lembre-se do compromisso eterno com o Pai e renove sua entrega.',
      prayer: 'Senhor, renovo minha aliança contigo. Escreve Teus mandamentos no meu coração. Quero viver pra Ti. Amém.'
    },
    {
      id: '21',
      week: 'Semana da Visão Profética',
      verse: 'Clama a mim, e responder-te-ei, e anunciar-te-ei coisas grandes e firmes que não sabes.',
      reference: 'Jeremias 33:3',
      interpretation: 'Deus quer abrir seus olhos espirituais. Esta semana, Ele te mostra direções e segredos do céu. Esteja sensível à voz d’Ele.',
      prayer: 'Pai, abre meus olhos espirituais. Dá-me discernimento e revela Tua vontade sobre meu futuro. Amém.'
    },
    {
      id: '22',
      week: 'Semana da Misericórdia',
      verse: 'As misericórdias do Senhor são a causa de não sermos consumidos.',
      reference: 'Lamentações 3:22',
      interpretation: 'Não é sobre merecer — é sobre graça. Deus é misericordioso mesmo quando falhamos. Esta semana, receba esse amor sem culpa.',
      prayer: 'Senhor, obrigado por Tua misericórdia. Ensina-me a viver não pela culpa, mas pela Tua graça. Amém.'
    },
    {
      id: '23',
      week: 'Semana da Colheita',
      verse: 'Quem semeia com lágrimas, com alegria colherá.',
      reference: 'Salmo 126:5',
      interpretation: 'As sementes plantadas com dor trarão frutos de alegria. Esta semana, Deus começa a manifestar a colheita que você esperava.',
      prayer: 'Pai, consagro cada lágrima que derramei. Que a colheita venha com alegria e louvor. Amém.'
    },
    {
      id: '24',
      week: 'Semana da Luz',
      verse: 'Vós sois a luz do mundo.',
      reference: 'Mateus 5:14',
      interpretation: 'Você é chamado(a) para iluminar. Esta semana, brilhe mesmo em lugares escuros. Sua luz vem de Cristo.',
      prayer: 'Senhor, faz de mim luz onde há escuridão. Que minha vida glorifique Teu nome. Amém.'
    },
    {
      id: '25',
      week: 'Semana do Milagre',
      verse: 'E tudo o que pedirdes em oração, crendo, recebereis.',
      reference: 'Mateus 21:22',
      interpretation: 'Nada é impossível para Deus. Esta semana, espere o milagre. Ele virá no tempo certo, com poder.',
      prayer: 'Pai, eu creio no Teu poder. Entra com Teu milagre na minha vida. Em nome de Jesus. Amém.'
    }    
  ];

  // Gerar índice baseado no ID do usuário e semana atual
  const currentWeek = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7));
  const userHash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = (userHash + currentWeek) % weeklyWords.length;
  
  return weeklyWords[index];
};

const WeeklyWord: React.FC = () => {
  const { user, hasAccessToPremium } = useAuth();

  if (!hasAccessToPremium()) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
            Palavra da Semana
          </h1>
          <p className="text-slate-600">Direção espiritual para sua jornada</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-3xl p-8 border border-blue-100 shadow-lg text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <BookOpen size={32} className="text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Receba Sua Palavra Semanal
            </h2>
            
            <p className="text-slate-700 mb-6 leading-relaxed">
              Cada semana, Deus tem uma palavra especial para você. Receba direção espiritual personalizada com versículos, interpretações e orações que falarão diretamente ao seu coração.
            </p>

            <div className="grid gap-4 text-left mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 text-sm">✓</span>
                </div>
                <span className="text-slate-700">Palavra profética personalizada</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 text-sm">✓</span>
                </div>
                <span className="text-slate-700">Interpretação espiritual profunda</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 text-sm">✓</span>
                </div>
                <span className="text-slate-700">Oração direcionada para a semana</span>
              </div>
            </div>

            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              🎁 Começar 7 Dias Grátis
            </button>
          </div>
        </div>
      </div>
    );
  }

  const weeklyWord = generateWeeklyWord(user?.id || '');

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Cabeçalho com impacto emocional */}
      <div className="text-center bg-gradient-to-br from-blue-50 via-white to-slate-50 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-slate-100/20 rounded-3xl"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <Sparkles size={28} className="text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-3">
            ✨ Palavra da Semana ✨
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Direção espiritual para sua jornada
          </p>
          <div className="mt-4 inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
            {weeklyWord.week}
          </div>
        </div>
      </div>

      {/* Versículo-chave em destaque */}
      <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <BookOpen size={24} className="text-blue-600 mr-2" />
          <h2 className="text-xl font-bold text-slate-800">Versículo da Semana</h2>
        </div>
        
        <blockquote className="text-center">
          <p className="text-2xl lg:text-3xl font-serif text-slate-800 leading-relaxed mb-4 italic">
            "{weeklyWord.verse}"
          </p>
          <cite className="text-lg text-blue-700 font-semibold">
            — {weeklyWord.reference}
          </cite>
        </blockquote>
      </div>

      {/* Interpretação espiritual */}
      <div className="bg-white rounded-2xl p-8 border-2 border-slate-100 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
            <Heart size={20} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">🧭 Interpretação</h3>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            {weeklyWord.interpretation}
          </p>
        </div>
      </div>

      {/* Oração da Semana */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4">
            <Cross size={20} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">🙏 Oração da Semana</h3>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-green-100">
          <p className="text-lg text-slate-700 leading-relaxed font-medium italic text-center">
            {weeklyWord.prayer}
          </p>
        </div>
      </div>

      {/* Footer inspiracional */}
      <div className="text-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
        <p className="text-lg font-medium">
          ✨ Que esta palavra ressoe em seu coração durante toda a semana ✨
        </p>
        <p className="text-blue-100 mt-2">
          "A palavra de Deus é viva e eficaz" - Hebreus 4:12
        </p>
      </div>
    </div>
  );
};

export default WeeklyWord; 