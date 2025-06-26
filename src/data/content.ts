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
  },
  {
    id: '4',
    quote: 'O Senhor é meu pastor; nada me faltará.',
    reference: 'Salmos 23:1',
    date: '2024-01-04'
  },
  {
    id: '5',
    quote: 'Buscai primeiro o reino de Deus e a sua justiça, e todas essas coisas vos serão acrescentadas.',
    reference: 'Mateus 6:33',
    date: '2024-01-05'
  },
  {
    id: '6',
    quote: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus.',
    reference: 'Isaías 41:10',
    date: '2024-01-06'
  },
  {
    id: '7',
    quote: 'O amor nunca falha.',
    reference: '1 Coríntios 13:8',
    date: '2024-01-07'
  },
  {
    id: '8',
    quote: 'Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.',
    reference: 'Josué 1:9',
    date: '2024-01-08'
  },
  {
    id: '9',
    quote: 'Aquietai-vos e sabei que eu sou Deus.',
    reference: 'Salmos 46:10',
    date: '2024-01-09'
  },
  {
    id: '10',
    quote: 'A alegria do Senhor é a vossa força.',
    reference: 'Neemias 8:10',
    date: '2024-01-10'
  },
  {
    id: '11',
    quote: 'Porque pela graça sois salvos, por meio da fé; e isso não vem de vós; é dom de Deus.',
    reference: 'Efésios 2:8',
    date: '2024-01-11'
  },
  {
    id: '12',
    quote: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.',
    reference: 'Provérbios 3:5',
    date: '2024-01-12'
  },
  {
    id: '13',
    quote: 'Eu sou o caminho, a verdade e a vida.',
    reference: 'João 14:6',
    date: '2024-01-13'
  },
  {
    id: '14',
    quote: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.',
    reference: 'Mateus 11:28',
    date: '2024-01-14'
  },
  {
    id: '15',
    quote: 'Posso todas as coisas naquele que me fortalece.',
    reference: 'Filipenses 4:13',
    date: '2024-01-15'
  },
  {
    id: '16',
    quote: 'O Senhor é bom, uma fortaleza no dia da angústia; e conhece os que confiam nele.',
    reference: 'Naum 1:7',
    date: '2024-01-16'
  },
  {
    id: '17',
    quote: 'Porque onde estiver o vosso tesouro, aí estará também o vosso coração.',
    reference: 'Mateus 6:21',
    date: '2024-01-17'
  },
  {
    id: '18',
    quote: 'Deus é amor.',
    reference: '1 João 4:8',
    date: '2024-01-18'
  },
  {
    id: '19',
    quote: 'Mas os que esperam no Senhor renovarão as suas forças.',
    reference: 'Isaías 40:31',
    date: '2024-01-19'
  },
  {
    id: '20',
    quote: 'Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.',
    reference: '1 Tessalonicenses 5:18',
    date: '2024-01-20'
  },
  {
    id: '21',
    quote: 'O Senhor é a minha luz e a minha salvação; a quem temerei?',
    reference: 'Salmos 27:1',
    date: '2024-01-21'
  },
  {
    id: '22',
    quote: 'Porque o meu jugo é suave, e o meu fardo é leve.',
    reference: 'Mateus 11:30',
    date: '2024-01-22'
  },
  {
    id: '23',
    quote: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.',
    reference: 'Romanos 8:28',
    date: '2024-01-23'
  },
  {
    id: '24',
    quote: 'A palavra de Deus é viva e eficaz.',
    reference: 'Hebreus 4:12',
    date: '2024-01-24'
  },
  {
    id: '25',
    quote: 'Não andeis ansiosos por coisa alguma.',
    reference: 'Filipenses 4:6',
    date: '2024-01-25'
  },
  {
    id: '26',
    quote: 'O Senhor fará por ti maravilhas.',
    reference: 'Êxodo 34:10',
    date: '2024-01-26'
  },
  {
    id: '27',
    quote: 'Bem-aventurados os que têm fome e sede de justiça, porque eles serão fartos.',
    reference: 'Mateus 5:6',
    date: '2024-01-27'
  },
  {
    id: '28',
    quote: 'Porque eu vivo, vós também vivereis.',
    reference: 'João 14:19',
    date: '2024-01-28'
  },
  {
    id: '29',
    quote: 'Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.',
    reference: '1 Pedro 5:7',
    date: '2024-01-29'
  },
  {
    id: '30',
    quote: 'Porque grande é a sua misericórdia para conosco.',
    reference: 'Salmos 117:2',
    date: '2024-01-30'
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
  },
  {
    id: '9',
    title: 'Oração pelo Sustento',
    content: 'Deus Provedor, abre as portas da abundância sobre minha vida. Concede-me oportunidades justas, sabedoria para administrar e força para prosperar honestamente. Que nunca me falte o pão, nem a generosidade para compartilhar. Amém.',
    category: 'Financeira'
  },
  {
    id: '10',
    title: 'Oração pela Prosperidade',
    content: 'Senhor dos Exércitos, derrama sobre mim Tua bênção de prosperidade. Que tudo o que eu plantar floresça. Livra-me de dívidas, escassez e medos. Ensina-me a ser fiel, mesmo na fartura. Amém.',
    category: 'Financeira'
  },
  {
    id: '11',
    title: 'Oração pela Alma Gêmea',
    content: 'Pai de amor, prepara meu coração e os passos daquela pessoa que escolheste para mim. Que nosso encontro seja guiado por Ti, cheio de propósito, respeito e aliança espiritual. Em Ti confio, Amém.',
    category: 'Relacionamentos'
  },
  {
    id: '12',
    title: 'Oração pela Proteção Espiritual',
    content: 'Altíssimo, cobre-me com Teu manto de luz. Que nenhum mal prevaleça contra mim, minha casa ou minha família. Que anjos guerreiros estejam ao nosso redor, protegendo-nos em todos os caminhos. Amém.',
    category: 'Proteção'
  },
  {
    id: '13',
    title: 'Oração pelos Filhos',
    content: 'Senhor, guarda meus filhos sob Tua direção. Que cresçam com sabedoria, saúde e fé. Livra-os de más influências e conduz seus passos na verdade. Que eu seja exemplo e amor para eles. Amém.',
    category: 'Família'
  },
  {
    id: '14',
    title: 'Oração pelos Pais',
    content: 'Pai eterno, abençoa meus pais com saúde, força e alegria. Que sejam cercados de carinho, cuidado e paz. Recompensa cada sacrifício que fizeram com bênçãos multiplicadas. Amém.',
    category: 'Família'
  },
  {
    id: '15',
    title: 'Oração para Vencer o Medo',
    content: 'Deus Poderoso, fortalece meu espírito e afasta de mim todo medo. Que eu caminhe confiante, sabendo que estás comigo em cada desafio. Tua presença me basta. Amém.',
    category: 'Coragem'
  },
  {
    id: '16',
    title: 'Oração para Abertura de Caminhos',
    content: 'Deus de Israel, abre caminhos onde não há saída. Remove obstáculos, fecha portas erradas e guia-me para as oportunidades que vêm de Ti. Em Ti confio meus passos. Amém.',
    category: 'Direção Espiritual'
  },
  {
    id: '17',
    title: 'Oração para Libertação',
    content: 'Senhor Jesus, quebra correntes invisíveis e liberta-me de tudo que me prende espiritualmente. Que o Teu sangue me purifique, e Teu Espírito me conduza à vitória. Amém.',
    category: 'Libertação'
  },
  {
    id: '18',
    title: 'Oração para Restituição',
    content: 'Deus da justiça, tudo que me foi tirado injustamente, que seja restituído em dobro. Restaura minha honra, meus recursos e minha paz. A Tua restauração é perfeita. Amém.',
    category: 'Justiça'
  },
  {
    id: '19',
    title: 'Oração para Tomada de Decisões',
    content: 'Senhor, coloco diante de Ti cada escolha que preciso fazer. Dá-me clareza, sabedoria e paz. Que minha vontade esteja alinhada à Tua. Amém.',
    category: 'Sabedoria'
  },
  {
    id: '20',
    title: 'Oração pela Vida Profissional',
    content: 'Pai, abençoa meu trabalho, meus colegas, meus esforços e meus resultados. Que eu prospere com honestidade, seja respeitado e encontre propósito no que faço. Amém.',
    category: 'Financeira'
  },
  {
    id: '21',
    title: 'Oração pela Saúde Emocional',
    content: 'Deus de paz, visita meu interior. Cura as feridas da alma, alivia o peso da ansiedade e restaura minha alegria. Que eu encontre equilíbrio no Teu amor. Amém.',
    category: 'Cura'
  },
  {
    id: '22',
    title: 'Oração para Atrair Boas Pessoas',
    content: 'Senhor, afasta de mim tudo que não vem de Ti. Atrai para minha vida pessoas justas, leais e espiritualmente alinhadas. Que eu reconheça o bem e saiba preservar. Amém.',
    category: 'Relacionamentos'
  },
  {
    id: '23',
    title: 'Oração para Riqueza com Propósito',
    content: 'Deus fiel, confio em Ti também na área financeira. Que a riqueza não me corrompa, mas me transforme em instrumento do Teu Reino. Dá-me sabedoria para usar os recursos segundo Tua vontade. Amém.',
    category: 'Financeira'
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
  },
  {
    id: '4',
    title: 'José do Egito – Da Prisão ao Palácio',
    summary: 'José é traído pelos irmãos, vendido como escravo e preso injustamente, mas Deus o exalta.',
    fullText: 'José foi vendido por seus irmãos e levado ao Egito. Lá, foi preso injustamente após ser acusado pela esposa de Potifar. Mesmo assim, permaneceu fiel a Deus. No tempo certo, Deus o levantou e ele se tornou governador do Egito, salvando sua família da fome e sendo instrumento de perdão e reconciliação.',
    reference: 'Gênesis 37–50',
    lesson: 'Mesmo em meio às injustiças, Deus está agindo. A fidelidade a Deus, mesmo no sofrimento, abre portas para grandes propósitos.'
  },
  {
    id: '5',
    title: 'Moisés e a Abertura do Mar Vermelho',
    summary: 'Deus livra o povo de Israel de forma milagrosa, abrindo o mar para que escapem do Egito.',
    fullText: 'Ao fugir do Egito, o povo de Israel ficou preso entre o exército de Faraó e o Mar Vermelho. Deus então ordenou que Moisés levantasse o cajado, e o mar se abriu. O povo atravessou em terra seca, e os egípcios foram destruídos quando tentaram seguir.',
    reference: 'Êxodo 14',
    lesson: 'Deus abre caminhos onde não há saída. Quando confiamos, Ele age com poder sobrenatural.'
  },
  {
    id: '6',
    title: 'Jó – A Fé em Meio à Dor',
    summary: 'Mesmo perdendo tudo, Jó mantém sua fé e é restaurado por Deus.',
    fullText: 'Jó era um homem íntegro, mas perdeu seus filhos, seus bens e sua saúde. Ainda assim, não blasfemou contra Deus. Após sua fidelidade ser provada, Deus o restaurou em dobro, e sua história se tornou símbolo de fé e perseverança.',
    reference: 'Jó 1–42',
    lesson: 'A fidelidade a Deus nos momentos de dor é recompensada. Deus nunca esquece os justos.'
  },
  {
    id: '7',
    title: 'Daniel na Cova dos Leões',
    summary: 'Daniel é lançado aos leões por sua fé, mas Deus o livra.',
    fullText: 'Daniel orava três vezes ao dia, mesmo quando isso foi proibido. Por causa disso, foi lançado na cova dos leões. Deus enviou um anjo e fechou a boca dos leões. No dia seguinte, ele foi encontrado ileso, e o rei glorificou o Deus de Daniel.',
    reference: 'Daniel 6',
    lesson: 'Deus honra quem é fiel a Ele. Nenhum mal pode tocar aquele que está sob Sua proteção.'
  },
  {
    id: '8',
    title: 'A Viúva de Sarepta',
    summary: 'Deus multiplica o azeite e a farinha de uma viúva obediente em tempo de seca.',
    fullText: 'Durante um tempo de grande seca, o profeta Elias pediu comida a uma viúva que só tinha um pouco de farinha e azeite. Mesmo com pouco, ela obedeceu e compartilhou. Deus então multiplicou os alimentos em sua casa, e nada faltou durante toda a seca.',
    reference: '1 Reis 17:8-16',
    lesson: 'A obediência e a fé, mesmo na escassez, atraem milagres e provisão divina.'
  },
  {
    id: '9',
    title: 'A Mulher com Fluxo de Sangue',
    summary: 'Uma mulher doente há 12 anos toca Jesus com fé e é curada instantaneamente.',
    fullText: 'Uma mulher sofria há doze anos com uma hemorragia incurável. Ao ouvir falar de Jesus, creu que apenas tocando em Suas vestes seria curada. Ela tocou e imediatamente foi curada. Jesus disse: "Filha, a tua fé te salvou."',
    reference: 'Marcos 5:25-34',
    lesson: 'A fé sincera, mesmo em silêncio, move o poder de Deus. Basta um toque.'
  },
  {
    id: '10',
    title: 'Abraão e a Promessa',
    summary: 'Deus promete um filho a Abraão e Sara na velhice, e cumpre Sua palavra.',
    fullText: 'Abraão e Sara não tinham filhos, e já eram idosos. Mesmo assim, Deus prometeu um filho, e mesmo diante da impossibilidade, eles creram. No tempo certo, Sara deu à luz Isaque, e a promessa se cumpriu.',
    reference: 'Gênesis 17–21',
    lesson: 'Deus cumpre Suas promessas, mesmo quando tudo parece impossível aos olhos humanos.'
  },
  {
    id: '11',
    title: 'Ester – Coragem para Salvar um Povo',
    summary: 'Ester arrisca sua vida e intercede diante do rei, salvando os judeus do extermínio.',
    fullText: 'Ester, uma jovem judia, tornou-se rainha da Pérsia. Quando seu povo foi ameaçado de extermínio, ela arriscou a própria vida, entrou na presença do rei e intercedeu. Deus usou sua coragem para salvar toda uma nação.',
    reference: 'Ester 4–7',
    lesson: 'Deus levanta pessoas no tempo certo. A coragem de um justo pode mudar o destino de muitos.'
  },
  {
    id: '12',
    title: 'Jesus Multiplica os Pães e Peixes',
    summary: 'Jesus alimenta uma multidão com apenas cinco pães e dois peixes.',
    fullText: 'Uma multidão seguia Jesus e estava com fome. Um menino tinha cinco pães e dois peixes. Jesus abençoou a comida e a distribuiu. Todos comeram e ainda sobraram doze cestos cheios.',
    reference: 'Mateus 14:13-21',
    lesson: 'Quando colocamos o pouco que temos nas mãos de Jesus, Ele multiplica e supre a todos.'
  },
  {
    id: '13',
    title: 'Pedro Anda sobre as Águas',
    summary: 'Jesus chama Pedro para andar sobre as águas, e ele caminha até começar a duvidar.',
    fullText: 'Durante uma tempestade, Jesus apareceu andando sobre as águas. Pedro pediu para ir até Ele, e Jesus o chamou. Pedro andou sobre as águas, mas começou a afundar quando duvidou. Jesus o segurou e o salvou.',
    reference: 'Mateus 14:22-33',
    lesson: 'A fé nos faz andar sobre o impossível. Mas mesmo quando vacilamos, Jesus nos estende a mão.'
  },
  {
    id: '14',
    title: 'Paulo e Silas na Prisão',
    summary: 'Mesmo presos e açoitados, Paulo e Silas louvam a Deus, e um terremoto os liberta.',
    fullText: 'Paulo e Silas foram presos injustamente. Mesmo com dores, cantavam e oravam. Um terremoto sacudiu a prisão, abrindo as portas. O carcereiro se converteu ao ver o poder de Deus.',
    reference: 'Atos 16:16-34',
    lesson: 'O louvor em meio à dor atrai a intervenção de Deus. Até na prisão, há propósito e salvação.'
  },
  {
    id: '15',
    title: 'A Ressurreição de Lázaro',
    summary: 'Jesus ressuscita Lázaro após quatro dias morto, demonstrando Seu poder sobre a morte.',
    fullText: 'Lázaro, amigo de Jesus, morreu. Mesmo após quatro dias, Jesus foi até o túmulo e disse: "Lázaro, vem para fora!" E o morto saiu, vivo. Muitos creram ao ver este milagre.',
    reference: 'João 11:1-44',
    lesson: 'Mesmo quando parece tarde demais, Deus ainda pode agir. A morte não é o fim quando Jesus está presente.'
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
  },
  {
    id: '4',
    title: 'Unção para Abertura de Caminhos',
    description: 'Inspirada em antigas orações hebraicas para remover bloqueios e atrair oportunidades.',
    prayer: 'Que os caminhos se abram diante de mim como o Mar Vermelho diante de Moisés. Que portas de bênção e justiça se escancarem, e que toda barreira seja removida pelo poder do Altíssimo.',
    purpose: 'Quebrar bloqueios espirituais e atrair novas oportunidades'
  },
  {
    id: '5',
    title: 'Unção para Sabedoria e Decisão',
    description: 'Baseada na sabedoria de Salomão, essa oração clama por clareza espiritual.',
    prayer: 'Que o Espírito de Sabedoria repouse sobre mim. Que minhas decisões estejam alinhadas com a vontade de Deus. Concede-me discernimento e visão clara, como concedeste a Salomão.',
    purpose: 'Tomada de decisões importantes com clareza divina'
  },
  {
    id: '6',
    title: 'Unção para Restituição',
    description: 'Inspirada em Jó e na promessa de dupla honra.',
    prayer: 'Que tudo o que me foi tirado injustamente seja restituído em dobro. Que a justiça do Senhor prevaleça e que minha dignidade seja restaurada como prata refinada.',
    purpose: 'Recuperar o que foi perdido ou roubado — honra, bens ou paz'
  },
  {
    id: '7',
    title: 'Unção para Almas Gêmeas',
    description: 'Baseada no encontro de Isaque e Rebeca — uma união guiada por Deus.',
    prayer: 'Que meus olhos encontrem aquele(a) que o Senhor preparou. Que a conexão venha do céu e seja marcada por paz, propósito e aliança. Que o amor verdadeiro me alcance com leveza.',
    purpose: 'Atrair o parceiro(a) certo segundo a vontade divina'
  },
  {
    id: '8',
    title: 'Unção para Libertação Espiritual',
    description: 'Oração profunda para quebra de amarras espirituais e vícios.',
    prayer: 'Em nome do Senhor dos Exércitos, declaro liberdade sobre minha mente, corpo e espírito. Toda cadeia invisível seja quebrada e que a luz de Cristo dissipe toda escuridão.',
    purpose: 'Libertação de vícios, opressões e forças negativas'
  },
  {
    id: '9',
    title: 'Unção para Riqueza com Propósito',
    description: 'Baseada no conceito de bênçãos que enriquecem e não trazem dores.',
    prayer: 'Que a riqueza que vem do Senhor me alcance — limpa, justa e com propósito. Que eu saiba semear, colher e compartilhar para a glória de Deus.',
    purpose: 'Atrair riquezas alinhadas à missão espiritual'
  },
  {
    id: '10',
    title: 'Unção para Proteção da Casa',
    description: 'Uma oração ancestral adaptada para consagração do lar.',
    prayer: 'Que meu lar seja cercado por muralhas espirituais. Que a paz reine em cada cômodo e que nenhum mal habite onde o nome do Senhor é exaltado.',
    purpose: 'Blindar espiritualmente a residência e proteger a família'
  },
  {
    id: '11',
    title: 'Unção para Conexão com os Anjos',
    description: 'Baseada nas escrituras sobre Miguel, Gabriel e anjos de guerra e consolo.',
    prayer: 'Que os anjos designados pelo Senhor me acompanhem. Que Miguel lute por mim, Gabriel me traga direção e que a presença celestial esteja ao meu redor todos os dias.',
    purpose: 'Fortalecer a sensação de proteção espiritual e amparo divino'
  },
  {
    id: '12',
    title: 'Unção para Estabilidade Emocional',
    description: 'Para acalmar o coração, mente e alma em tempos difíceis.',
    prayer: 'Que o bálsamo do Senhor cure minhas emoções. Que eu encontre estabilidade mesmo na tempestade, e que meu interior seja como águas tranquilas guiadas pelo Pastor.',
    purpose: 'Curar instabilidade emocional, ansiedade e aflições internas'
  },
  {
    id: '13',
    title: 'Unção com Salmo 91',
    description: 'Baseada no salmo de proteção mais conhecido da Bíblia.',
    prayer: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará. Declaro: Tu és meu refúgio, meu Deus em quem confio. Nenhum mal me atingirá. Amém.',
    purpose: 'Blindagem total contra acidentes, ataques e perigos ocultos'
  },
  {
    id: '14',
    title: 'Unção com Pedra de Jaspe Vermelho',
    description: 'Elemento usado como ponto de contato simbólico para força e coragem.',
    prayer: 'Senhor, assim como a pedra jaspe representa firmeza e sangue real, que eu me lembre de quem sou em Ti. Fortalece meus passos e dá-me coragem para avançar com fé.',
    purpose: 'Aumentar força interior e coragem em tempos difíceis'
  },
  {
    id: '15',
    title: 'Unção para Atrair Clientes e Prosperidade Justa',
    description: 'Ideal para empreendedores e profissionais liberais.',
    prayer: 'Que o Senhor envie pessoas corretas ao meu trabalho. Que minha mão seja próspera, meu serviço honrado e minha prosperidade contínua. Amém.',
    purpose: 'Bênção sobre negócios, vendas e vida profissional'
  },
  {
    id: '16',
    title: 'Unção para Rompimento Espiritual',
    description: 'Para momentos onde tudo parece travado ou estagnado.',
    prayer: 'Deus das batalhas, quebra os grilhões que me cercam. Que o rompimento venha dos céus, trazendo movimento, liberdade e novos ciclos. Em nome de Jesus, Amém.',
    purpose: 'Desbloquear ciclos travados e trazer renovação espiritual'
  },
  {
    id: '17',
    title: 'Unção para Visões Espirituais',
    description: 'Clamor por maior sensibilidade espiritual e direção profética.',
    prayer: 'Abre meus olhos espirituais, Senhor. Que eu veja além da carne. Que Tua voz e Tua visão estejam nítidas em minha vida. Revela-me Teus segredos. Amém.',
    purpose: 'Aumentar discernimento, revelação e conexão espiritual'
  },
  {
    id: '18',
    title: 'Unção para o Perdão',
    description: 'Baseada nos ensinamentos do Messias sobre perdão verdadeiro.',
    prayer: 'Senhor, ajuda-me a liberar o perdão que liberta. Tira de mim toda mágoa, rancor e lembrança dolorosa. Que eu perdoe como fui perdoado. Em Ti, sou livre. Amém.',
    purpose: 'Libertação emocional por meio do perdão'
  },
  {
    id: '19',
    title: 'Unção para Alinhamento com o Propósito',
    description: 'Inspirada nos profetas, essa oração busca reconectar sua alma com o plano divino original.',
    prayer: 'Senhor, alinha meu coração ao Teu propósito. Se meus passos se desviaram, guia-me de volta ao centro da Tua vontade. Que minha vida glorifique Teu nome e que eu cumpra o que fui criado para viver. Amém.',
    purpose: 'Descobrir e cumprir o propósito de vida dado por Deus'
  },
  {
    id: '20',
    title: 'Unção para Romper Gerações de Escassez',
    description: 'Baseada em princípios de libertação familiar e bênção hereditária.',
    prayer: 'Em nome de Jesus, declaro que toda maldição de escassez na minha linhagem seja quebrada. Que a prosperidade que vem do céu me alcance, e que minha geração conheça a abundância e não a miséria. Amém.',
    purpose: 'Quebra de ciclos familiares de pobreza ou bloqueios financeiros'
  },
  {
    id: '21',
    title: 'Unção de Recomeço',
    description: 'Para quem deseja deixar o passado e começar de novo com força espiritual.',
    prayer: 'Senhor, dá-me um novo começo. Lava-me do passado, fecha ciclos antigos e abre portas de novidade. Que eu caminhe leve, limpo e cheio de esperança. O novo já começou. Amém.',
    purpose: 'Força emocional e espiritual para virar a página e recomeçar'
  },
  {
    id: '22',
    title: 'Unção para Libertar os Sonhos',
    description: 'Uma oração para restaurar sonhos esquecidos e ativar visões paradas.',
    prayer: 'Deus dos sonhos, revive em mim os propósitos adormecidos. Sopra vida nos projetos que parei de acreditar. Que cada talento e visão volte à tona, com Tua unção. Amém.',
    purpose: 'Restaurar projetos e sonhos pessoais paralisados'
  },
  {
    id: '23',
    title: 'Unção com Salmo 23',
    description: 'Baseada em um dos salmos mais reconfortantes e poderosos das escrituras.',
    prayer: 'O Senhor é meu Pastor, nada me faltará. Guia-me por verdes pastos e águas tranquilas. Mesmo no vale da sombra, não temerei, pois Tu estás comigo. Tua bondade me seguirá todos os dias. Amém.',
    purpose: 'Consolo, provisão, proteção e confiança total em Deus'
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
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  
  return dailyQuotes[dayOfYear % dailyQuotes.length];
};

export const getPrayerByTimeOfDay = (timeOfDay: 'morning' | 'afternoon' | 'evening'): Prayer | undefined => {
  return prayers.find(prayer => prayer.timeOfDay === timeOfDay);
};
