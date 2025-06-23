
export interface DailyQuote {
  id: string;
  quote: string;
  reference: string;
  date: string;
}

export interface Prayer {
  id: string;
  title: string;
  content: string;
  category: string;
  timeOfDay?: 'morning' | 'afternoon' | 'evening';
}

export interface BiblicalStory {
  id: string;
  title: string;
  summary: string;
  fullText: string;
  reference: string;
  lesson: string;
}

export interface Segulot {
  id: string;
  title: string;
  description: string;
  prayer: string;
  purpose: string;
}

export const dailyQuotes: DailyQuote[] = [
  {
    id: '1',
    quote: 'Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.',
    reference: 'Salmos 37:5',
    date: '2024-01-01'
  },
  {
    id: '2',
    quote: 'Porque Eu sei os planos que tenho para vocês, diz o Senhor, planos de prosperidade e não de malefício, para dar-lhes esperança e um futuro.',
    reference: 'Jeremias 29:11',
    date: '2024-01-02'
  },
  {
    id: '3',
    quote: 'Tudo posso naquele que me fortalece.',
    reference: 'Filipenses 4:13',
    date: '2024-01-03'
  }
];

export const prayers: Prayer[] = [
  {
    id: '1',
    title: 'Oração da Manhã',
    content: 'Senhor, ao despertar neste novo dia, agradeço pela vida e pelas bênçãos que me concedes. Que eu possa caminhar em Tua luz e fazer a Tua vontade em todas as minhas ações. Protege-me dos perigos e guia meus passos. Amém.',
    category: 'Rotina Diária',
    timeOfDay: 'morning'
  },
  {
    id: '2',
    title: 'Oração da Tarde',
    content: 'Pai celestial, no meio do dia, venho a Ti para renovar minhas forças. Que eu possa encontrar paz em meio às atividades e lembrar-me sempre de Tua presença. Ajuda-me a ser uma luz para aqueles que encontro. Amém.',
    category: 'Rotina Diária',
    timeOfDay: 'afternoon'
  },
  {
    id: '3',
    title: 'Oração da Noite',
    content: 'Senhor, ao final deste dia, agradeço por Tua proteção e cuidado. Perdoa-me pelos erros cometidos e ajuda-me a ser melhor amanhã. Que eu tenha um sono tranquilo sob Tua guarda. Amém.',
    category: 'Rotina Diária',
    timeOfDay: 'evening'
  },
  {
    id: '4',
    title: 'Oração pela Família',
    content: 'Deus de amor, abençoa minha família com união, saúde e prosperidade. Que nosso lar seja um lugar de paz e amor, onde Teu nome seja honrado. Protege cada membro e nos mantenha unidos em Teu amor. Amém.',
    category: 'Família'
  },
  {
    id: '5',
    title: 'Oração pela Cura',
    content: 'Senhor Jesus, Tu que curaste os enfermos, venho a Ti pedindo cura e restauração. Toca com Tuas mãos santas aqueles que sofrem e concede-lhes saúde plena. Que Tua paz e força os acompanhem. Amém.',
    category: 'Cura'
  },
  {
    id: '6',
    title: 'Oração de Gratidão',
    content: 'Pai celestial, meu coração transborda de gratidão por todas as bênçãos que recebi. Agradeço pela vida, pela saúde, pela família e por Teu amor incondicional. Que eu nunca esqueça de Te glorificar. Amém.',
    category: 'Gratidão'
  },
  {
    id: '7',
    title: 'Oração pela Sabedoria',
    content: 'Senhor, fonte de toda sabedoria, concede-me discernimento para tomar as decisões certas. Que eu possa buscar sempre Tua vontade e agir conforme Teus ensinamentos. Ilumina minha mente e meu coração. Amém.',
    category: 'Sabedoria'
  },
  {
    id: '8',
    title: 'Oração pela Paz Interior',
    content: 'Príncipe da Paz, acalma meu coração e mente. Remove de mim toda ansiedade e preocupação, e enche-me com Tua paz que excede todo entendimento. Que eu encontre descanso em Ti. Amém.',
    category: 'Paz Interior'
  }
];

export const biblicalStories: BiblicalStory[] = [
  {
    id: '1',
    title: 'A Parábola do Bom Samaritano',
    summary: 'Jesus ensina sobre o amor ao próximo através da história de um homem que foi salvo por um samaritano.',
    fullText: 'Um homem descia de Jerusalém para Jericó e caiu nas mãos de assaltantes. Eles o espancaram e foram embora, deixando-o quase morto. Por acaso, um sacerdote descia pela mesma estrada e, quando o viu, passou pelo outro lado. Da mesma forma, um levita chegou ao lugar e, quando o viu, passou pelo outro lado. Mas um samaritano, estando de viagem, chegou onde se encontrava o homem e, quando o viu, teve compaixão dele. Aproximou-se, enfaixou-lhe as feridas, derramando óleo e vinho; depois o colocou sobre o seu próprio animal, levou-o para uma hospedaria e cuidou dele.',
    reference: 'Lucas 10:30-34',
    lesson: 'O verdadeiro amor ao próximo não conhece barreiras sociais, religiosas ou étnicas. Devemos ajudar a todos que necessitam, independentemente de quem sejam.'
  },
  {
    id: '2',
    title: 'Davi e Golias',
    summary: 'O jovem pastor Davi vence o gigante filisteu com fé em Deus.',
    fullText: 'O filisteu Golias, de Gate, era um guerreiro cujo nome se tornou famoso; tinha dois metros e noventa centímetros de altura. Ele saiu das fileiras dos filisteus e gritou para as tropas de Israel: "Escolham um homem para lutar comigo". Davi disse a Saul: "Que ninguém perca a coragem por causa desse filisteu; teu servo irá lutar contra ele". Davi tomou seu cajado, escolheu cinco pedras lisas do riacho, colocou-as em sua bolsa de pastor e, com a funda na mão, aproximou-se do filisteu. Davi colocou a mão na bolsa, apanhou uma pedra e atirou-a com a funda, acertando o filisteu na testa. A pedra penetrou-lhe na testa, e ele caiu com o rosto em terra.',
    reference: '1 Samuel 17',
    lesson: 'Com fé em Deus, podemos vencer qualquer gigante em nossa vida. O tamanho do obstáculo não importa quando temos Deus ao nosso lado.'
  },
  {
    id: '3',
    title: 'Jesus Acalma a Tempestade',
    summary: 'Jesus demonstra seu poder sobre a natureza ao acalmar uma grande tempestade no mar.',
    fullText: 'Naquele dia, ao anoitecer, Jesus disse aos seus discípulos: "Vamos para o outro lado do lago". Deixando a multidão, eles o levaram no barco, assim como estava. Outros barcos também o acompanhavam. Levantou-se um forte vendaval, e as ondas se lançavam sobre o barco, de forma que este já estava se enchendo de água. Jesus estava na popa, dormindo sobre uma almofada. Os discípulos o acordaram e gritaram: "Mestre, não te importas que morramos?" Ele se levantou, repreendeu o vento e disse ao mar: "Acalma-te! Aquieta-te!" O vento parou, e fez-se completa bonança.',
    reference: 'Marcos 4:35-39',
    lesson: 'Jesus tem poder sobre todas as tempestades da vida. Quando clamamos a Ele em meio às dificuldades, Ele pode trazer paz e solução.'
  }
];

export const segulots: Segulot[] = [
  {
    id: '1',
    title: 'Unção para Proteção',
    description: 'Uma oração especial da tradição judaico-cristã para proteção divina.',
    prayer: 'Que o Anjo do Senhor acampe ao redor dos que O temem e os livre. Que a luz divina me envolva e me proteja de todo mal. Que a presença do Altíssimo seja minha fortaleza e refúgio.',
    purpose: 'Proteção contra perigos físicos e espirituais'
  },
  {
    id: '2',
    title: 'Unção para Prosperidade',
    description: 'Oração ancestral para atrair bênçãos materiais e espirituais.',
    prayer: 'Que as portas dos céus se abram para derramar bênçãos sobre minha vida. Que meus caminhos sejam prósperos e meu trabalho abençoado. Que eu seja canal de bênçãos para outros.',
    purpose: 'Atrair abundância e prosperidade com propósito divino'
  },
  {
    id: '3',
    title: 'Unção para Cura',
    description: 'Poderosa oração de cura baseada na tradição mística cristã.',
    prayer: 'Que a luz curativa do Criador flua através de cada célula do meu ser. Que a energia divina restaure minha saúde e vitalidade. Que eu seja renovado(a) em corpo, mente e espírito.',
    purpose: 'Cura física, emocional e espiritual'
  }
];

export const getCurrentTimeOfDay = (): 'morning' | 'afternoon' | 'evening' => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'evening';
};

export const getTodayQuote = (): DailyQuote => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return dailyQuotes[dayOfYear % dailyQuotes.length];
};

export const getPrayerByTimeOfDay = (timeOfDay: 'morning' | 'afternoon' | 'evening'): Prayer | undefined => {
  return prayers.find(prayer => prayer.timeOfDay === timeOfDay);
};
