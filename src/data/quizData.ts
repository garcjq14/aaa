export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    value: string;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual é a sua área de atuação?",
    options: [
      { id: "1a", text: "Sou um profissional autônomo (médico, advogado, etc.)", value: "professional" },
      { id: "1b", text: "Sou artista ou trabalho com design/criação", value: "creative" },
      { id: "1c", text: "Tenho uma pequena empresa ou comércio", value: "business" },
      { id: "1d", text: "Quero vender produtos pela internet", value: "ecommerce" },
      { id: "1e", text: "Estou começando meu negócio agora", value: "startup" }
    ]
  },
  {
    id: 2,
    question: "O que você quer que as pessoas façam ao visitar seu site?",
    options: [
      { id: "2a", text: "Me ligar ou enviar mensagem para contratar meus serviços", value: "professional" },
      { id: "2b", text: "Ver meus trabalhos e projetos", value: "portfolio" },
      { id: "2c", text: "Comprar produtos online", value: "ecommerce" },
      { id: "2d", text: "Conhecer melhor minha empresa e serviços", value: "business" },
      { id: "2e", text: "Preencher um formulário de contato", value: "landing" }
    ]
  },
  {
    id: 3,
    question: "O que é mais importante para você em um site?",
    options: [
      { id: "3a", text: "Que seja bonito e passe credibilidade", value: "professional" },
      { id: "3b", text: "Que destaque bem minhas fotos e trabalhos", value: "gallery" },
      { id: "3c", text: "Que seja fácil de comprar e pagar", value: "ecommerce" },
      { id: "3d", text: "Que apareça bem nas buscas do Google", value: "seo" },
      { id: "3e", text: "Que seja simples e carregue rápido", value: "basic" }
    ]
  },
  {
    id: 4,
    question: "Como você pretende se comunicar com seus clientes?",
    options: [
      { id: "4a", text: "Principalmente por telefone e WhatsApp", value: "contact" },
      { id: "4b", text: "Através de um formulário de contato no site", value: "form" },
      { id: "4c", text: "Por redes sociais integradas ao site", value: "social" },
      { id: "4d", text: "Sistema de agendamento online", value: "appointment" },
      { id: "4e", text: "Chat ao vivo no site", value: "chat" }
    ]
  },
  {
    id: 5,
    question: "Quanto tempo você tem para cuidar do seu site?",
    options: [
      { id: "5a", text: "Quase nenhum, preciso que seja automático", value: "lowmaintenance" },
      { id: "5b", text: "Posso atualizar de vez em quando", value: "occasional" },
      { id: "5c", text: "Tenho interesse em atualizar regularmente", value: "regular" },
      { id: "5d", text: "Quero me envolver bastante com o site", value: "highinvolvement" },
      { id: "5e", text: "Prefiro que alguém faça tudo para mim", value: "outsource" }
    ]
  },
  {
    id: 6,
    question: "Qual a importância do seu site para seu negócio?",
    options: [
      { id: "6a", text: "É apenas uma presença online básica", value: "basic" },
      { id: "6b", text: "É uma ferramenta importante de marketing", value: "marketing" },
      { id: "6c", text: "É o principal canal de vendas/contatos", value: "primary" },
      { id: "6d", text: "É uma extensão da minha marca/identidade", value: "branding" },
      { id: "6e", text: "É crucial para o crescimento do negócio", value: "growth" }
    ]
  }
];

export const quizResults = {
  "landing": {
    title: "Página de Captação de Clientes",
    description: "Uma página única e eficiente, ideal para conseguir contatos de potenciais clientes para seu negócio.",
    features: [
      "Design atraente que funciona em celulares",
      "Formulário para captar contatos",
      "Depoimentos de clientes satisfeitos",
      "Botão para WhatsApp",
      "Aparece nas buscas do Google"
    ],
    benefits: [
      "Consegue mais contatos de clientes",
      "Carrega rapidamente mesmo em conexões lentas",
      "Comunica sua mensagem de forma direta",
      "Ideal para campanhas de divulgação",
      "Custo mais acessível"
    ],
    price: "R$ 1.500 - R$ 3.000",
    timeframe: "1 a 2 semanas",
    recommendation: "Perfeito para quem está começando ou quer testar uma ideia de negócio sem grande investimento inicial."
  },
  "professional": {
    title: "Site Profissional Essencial",
    description: "Um site completo que passa credibilidade e gera mais contatos de clientes para profissionais e pequenos negócios.",
    features: [
      "Design elegante e personalizado",
      "Apresentação clara dos seus serviços",
      "Página sobre você ou sua empresa",
      "Depoimentos de clientes",
      "Otimizado para buscas no Google"
    ],
    benefits: [
      "Passa mais credibilidade para seus clientes",
      "Aparece melhor nas buscas do Google",
      "Atrai clientes mais qualificados",
      "Você se destaca da concorrência",
      "Funciona 24 horas por dia captando contatos"
    ],
    price: "R$ 3.500 - R$ 6.000",
    timeframe: "3 a 4 semanas",
    recommendation: "Ideal para profissionais autônomos e pequenas empresas que querem crescer com uma presença digital profissional."
  },
  "portfolio": {
    title: "Site Portfólio Visual",
    description: "Um site que destaca seus trabalhos de forma visual e impactante, ideal para profissionais criativos.",
    features: [
      "Galeria de trabalhos com filtros",
      "Detalhes de cada projeto",
      "Design personalizado e criativo",
      "Conexão com suas redes sociais",
      "Formulário para contatos de novos projetos"
    ],
    benefits: [
      "Mostra seus trabalhos de forma profissional",
      "Atrai novos clientes e projetos",
      "Se destaca visualmente da concorrência",
      "Fácil de adicionar novos projetos",
      "Demonstra sua qualidade e estilo"
    ],
    price: "R$ 3.000 - R$ 5.500",
    timeframe: "2 a 4 semanas",
    recommendation: "Perfeito para designers, fotógrafos, arquitetos e outros profissionais que precisam mostrar visualmente seu trabalho."
  },
  "business": {
    title: "Site Institucional Completo",
    description: "Um site completo para empresas que querem se posicionar profissionalmente e destacar seus diferenciais.",
    features: [
      "Várias páginas bem organizadas",
      "Apresentação da empresa e equipe",
      "Detalhes dos produtos e serviços",
      "Casos de sucesso e depoimentos",
      "Área para notícias e atualizações"
    ],
    benefits: [
      "Fortalecer a imagem da sua empresa",
      "Aumentar a confiança dos clientes",
      "Melhorar o atendimento online",
      "Destacar diferenciais competitivos",
      "Gerar mais contatos qualificados"
    ],
    price: "R$ 5.000 - R$ 9.000",
    timeframe: "4 a 6 semanas",
    recommendation: "Recomendado para empresas que já estão estabelecidas e querem aumentar sua presença online e conseguir mais clientes."
  },
  "ecommerce": {
    title: "Loja Virtual Completa",
    description: "Uma loja online para vender seus produtos pela internet de forma profissional e segura.",
    features: [
      "Catálogo de produtos organizado",
      "Carrinho de compras otimizado",
      "Pagamento seguro integrado",
      "Cálculo automático de frete",
      "Painel para gerenciar pedidos e estoque"
    ],
    benefits: [
      "Venda seus produtos 24 horas por dia",
      "Alcance clientes em qualquer lugar",
      "Automatize suas vendas",
      "Reduza custos operacionais",
      "Aumente seu faturamento"
    ],
    price: "R$ 8.000 - R$ 15.000",
    timeframe: "6 a 8 semanas",
    recommendation: "Ideal para negócios que querem vender produtos online e expandir seu alcance para além da loja física."
  },
  "startup": {
    title: "Site para Startups e Novos Negócios",
    description: "Um site dinâmico e moderno para apresentar sua startup ou novo empreendimento de forma impactante.",
    features: [
      "Design moderno e inovador",
      "Página de apresentação do produto/serviço",
      "Seção para captar leads e investidores",
      "Integração com ferramentas de marketing",
      "Otimizado para crescimento rápido"
    ],
    benefits: [
      "Comunicar sua proposta de valor com clareza",
      "Atrair primeiros clientes e parceiros",
      "Estabelecer credibilidade no mercado",
      "Perfeito para apresentações para investidores",
      "Flexível para crescer com seu negócio"
    ],
    price: "R$ 4.000 - R$ 7.000",
    timeframe: "3 a 5 semanas",
    recommendation: "Perfeito para startups, novos negócios e empreendedores que precisam de uma presença digital que transmita inovação."
  }
};

// Function to calculate quiz results based on user answers
export const calculateQuizResult = (answers: Record<number, string>) => {
  // Count the occurrences of each type in answers
  const counts: Record<string, number> = {};
  const weightedScores: Record<string, number> = {
    "professional": 0,
    "portfolio": 0,
    "ecommerce": 0,
    "landing": 0,
    "business": 0,
    "startup": 0
  };
  
  // Processar os valores das respostas
  Object.entries(answers).forEach(([questionId, optionId]) => {
    const questionNumber = parseInt(questionId);
    const question = quizQuestions.find(q => q.id === questionNumber);
    const option = question?.options.find(o => o.id === optionId);
    
    if (option) {
      // Contagem simples
      if (counts[option.value]) {
        counts[option.value]++;
      } else {
        counts[option.value] = 1;
      }
      
      // Pontuação ponderada com base na pergunta e resposta
      if (questionNumber === 1) { // Área de atuação (peso alto)
        // Mapeamento direto para resultados
        if (option.value === "professional") weightedScores["professional"] += 3;
        if (option.value === "creative") weightedScores["portfolio"] += 3;
        if (option.value === "business") weightedScores["business"] += 3;
        if (option.value === "ecommerce") weightedScores["ecommerce"] += 3;
        if (option.value === "startup") weightedScores["startup"] += 3;
      }
      
      if (questionNumber === 2) { // Objetivo do site (peso muito alto)
        if (option.value === "professional") weightedScores["professional"] += 4;
        if (option.value === "portfolio") weightedScores["portfolio"] += 4;
        if (option.value === "ecommerce") weightedScores["ecommerce"] += 4;
        if (option.value === "business") weightedScores["business"] += 3;
        if (option.value === "landing") weightedScores["landing"] += 4;
      }
      
      if (questionNumber === 3) { // Prioridade no site
        if (option.value === "professional") weightedScores["professional"] += 2;
        if (option.value === "gallery") weightedScores["portfolio"] += 3;
        if (option.value === "ecommerce") weightedScores["ecommerce"] += 3;
        if (option.value === "seo") {
          weightedScores["business"] += 2;
          weightedScores["professional"] += 1;
        }
        if (option.value === "basic") weightedScores["landing"] += 2;
      }
      
      if (questionNumber === 4) { // Comunicação
        if (option.value === "contact") {
          weightedScores["professional"] += 2;
          weightedScores["landing"] += 1;
        }
        if (option.value === "form") {
          weightedScores["business"] += 1;
          weightedScores["landing"] += 2;
        }
        if (option.value === "social") weightedScores["portfolio"] += 2;
        if (option.value === "appointment") weightedScores["professional"] += 2;
        if (option.value === "chat") weightedScores["ecommerce"] += 2;
      }
      
      if (questionNumber === 5) { // Tempo disponível
        if (option.value === "lowmaintenance") {
          weightedScores["landing"] += 2;
          weightedScores["professional"] += 1;
        }
        if (option.value === "occasional") weightedScores["portfolio"] += 2;
        if (option.value === "regular") {
          weightedScores["business"] += 2;
          weightedScores["ecommerce"] += 1;
        }
        if (option.value === "highinvolvement") weightedScores["startup"] += 2;
        if (option.value === "outsource") {
          weightedScores["professional"] += 1;
          weightedScores["ecommerce"] += 1;
        }
      }
      
      if (questionNumber === 6) { // Importância do site
        if (option.value === "basic") weightedScores["landing"] += 2;
        if (option.value === "marketing") {
          weightedScores["professional"] += 2;
          weightedScores["business"] += 1;
        }
        if (option.value === "primary") weightedScores["ecommerce"] += 3;
        if (option.value === "branding") {
          weightedScores["portfolio"] += 2;
          weightedScores["professional"] += 1;
        }
        if (option.value === "growth") {
          weightedScores["business"] += 2;
          weightedScores["startup"] += 2;
        }
      }
    }
  });
  
  // Encontrar o tipo com maior pontuação
  let maxScore = 0;
  let resultType = "professional"; // Default
  
  for (const [type, score] of Object.entries(weightedScores)) {
    if (score > maxScore) {
      maxScore = score;
      resultType = type;
    }
  }
  
  // Se a pontuação é muito baixa (menos de 3), vamos recorrer a um cálculo secundário baseado em contagem
  if (maxScore < 3) {
    let maxCount = 0;
    let countResultType = "professional";
    
    // Mapeamentos específicos para tipos de contagem
    const mappings: Record<string, string> = {
      "creative": "portfolio",
      "gallery": "portfolio",
      "shop": "ecommerce",
      "online": "ecommerce",
      "basic": "landing",
      "seo": "business",
      "marketing": "business",
      "growth": "business"
    };
    
    for (const [type, count] of Object.entries(counts)) {
      // Verificar se este tipo tem um mapeamento
      const mappedType = mappings[type] || type;
      
      if (count > maxCount) {
        maxCount = count;
        countResultType = mappedType;
      }
    }
    
    // Se ainda temos um resultado baseado em contagem, usamos ele
    if (countResultType && quizResults[countResultType as keyof typeof quizResults]) {
      resultType = countResultType;
    }
  }
  
  // Retornar o resultado com base no tipo determinado
  return quizResults[resultType as keyof typeof quizResults];
};
