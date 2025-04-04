import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Cross, Circle } from '@/components/ui/GraphicsElements';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

export interface QuizResultType {
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  price: string;
  timeframe: string;
  recommendation: string;
}

interface QuizResultProps {
  result: QuizResultType;
  onRestart: () => void;
  onContinue?: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({
  result,
  onRestart,
  onContinue
}) => {
  const isMobile = useIsMobile();
  
  // Exemplos visuais para cada tipo de resultado
  const getExampleImage = (title: string) => {
    if (title.includes("Profissional Essencial")) {
      return "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    } else if (title.includes("Portfólio Visual")) {
      return "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    } else if (title.includes("Loja Virtual")) {
      return "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    } else if (title.includes("Site Completo com Blog")) {
      return "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    } else { // Página de Captação
      return "https://images.unsplash.com/photo-1586892478025-2b5472316601?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    }
  };
  
  // Variantes para animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      className="bg-black rounded-xl p-5 md:p-8 lg:p-10 relative border border-gray-800"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Elementos decorativos simples */}
      <div className="absolute -top-3 -left-3">
        <Circle size={isMobile ? 16 : 24} color="#FF0066" />
      </div>
      <div className="absolute -bottom-3 -right-3">
        <Star size={isMobile ? 16 : 24} color="#FF0066" />
      </div>
      <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 hidden md:block">
        <Cross size={16} color="#FF0066" />
      </div>

      <motion.div 
        className="text-center mb-6 md:mb-8"
        variants={itemVariants}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-highlight bg-opacity-20 mb-3 md:mb-4">
          <CheckCircle size={isMobile ? 30 : 40} className="text-highlight" />
        </div>
        
        <motion.h2 
          className="text-xl md:text-2xl lg:text-3xl font-bold mb-2"
          variants={itemVariants}
        >
          Seu resultado está pronto!
        </motion.h2>
        <motion.p 
          className="text-gray-400 text-sm md:text-base"
          variants={itemVariants}
        >
          Confira a recomendação personalizada para seu negócio
        </motion.p>
      </motion.div>
      
      <motion.div 
        className="bg-gray-900 rounded-lg p-4 md:p-6 mb-6 md:mb-10"
        variants={itemVariants}
      >
        <motion.h3 
          className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-highlight"
          variants={itemVariants}
        >
          {result.title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-300 text-sm md:text-base mb-4 md:mb-6"
          variants={itemVariants}
        >
          {result.description}
        </motion.p>

        {/* Exemplo visual do tipo de site */}
        <div className="relative w-full h-40 md:h-52 overflow-hidden rounded-lg mb-6">
          <img 
            src={getExampleImage(result.title)} 
            alt={`Exemplo de ${result.title}`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          <div className="absolute bottom-0 left-0 p-3 md:p-4">
            <p className="text-xs md:text-sm font-medium text-white">Exemplo visual</p>
            <p className="text-xs text-gray-300">Este é um exemplo de como pode ficar seu site</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <div>
            <h4 className="font-medium mb-2 md:mb-3 text-sm md:text-base">Principais características:</h4>
            <ul className="space-y-2">
              {result.features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-start"
                >
                  <CheckCircle size={isMobile ? 14 : 16} className="text-highlight mr-2 mt-1 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-4 md:mt-0">
            <h4 className="font-medium mb-2 md:mb-3 text-sm md:text-base">Benefícios para você:</h4>
            <ul className="space-y-2">
              {result.benefits.map((benefit, index) => (
                <li 
                  key={index} 
                  className="flex items-start"
                >
                  <CheckCircle size={isMobile ? 14 : 16} className="text-highlight mr-2 mt-1 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-gray-300">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Investimento e Prazo - Agora em layout de bloco em vez de grid */}
        <div className="space-y-4 mt-6 md:mt-8">
          <div className="bg-black bg-opacity-30 p-4 rounded-lg">
            <h4 className="text-xs md:text-sm text-gray-400 mb-2">Investimento estimado:</h4>
            <p className="font-medium text-sm md:text-base">{result.price}</p>
          </div>
          
          <div className="bg-black bg-opacity-30 p-4 rounded-lg">
            <h4 className="text-xs md:text-sm text-gray-400 mb-2">Prazo de desenvolvimento:</h4>
            <p className="font-medium text-sm md:text-base">{result.timeframe}</p>
          </div>
        </div>
        
        <div className="mt-6 md:mt-8 border-t border-gray-800 pt-5 md:pt-6">
          <h4 className="font-medium mb-2 md:mb-3 text-sm md:text-base">Recomendação:</h4>
          <p className="text-xs md:text-sm text-gray-300">
            {result.recommendation}
          </p>
        </div>
      </motion.div>
      
      <div className="mt-6 space-y-4">
        <h4 className="font-medium text-sm md:text-base mb-2">Próximos passos:</h4>
        
        <div className="grid grid-cols-1 gap-3 md:gap-4">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <h5 className="text-sm font-medium mb-2">Conte mais sobre seu projeto</h5>
            <p className="text-xs text-gray-400 mb-3">Continue para preencher um breve formulário sobre seu projeto</p>
            <div className="flex">
              <Button 
                className="w-full bg-highlight hover:bg-highlight hover:bg-opacity-90 text-xs py-1.5 flex items-center justify-center gap-1"
                onClick={onContinue}
              >
                Continuar para a consulta personalizada
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <h5 className="text-sm font-medium mb-2">Refazer o Quiz</h5>
            <p className="text-xs text-gray-400 mb-3">Tente novamente para ver outras opções</p>
            <Button 
              variant="outline" 
              className="w-full text-xs py-1.5"
              onClick={onRestart}
            >
              Refazer Quiz
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-800 flex justify-center">
        <Button 
          variant="ghost" 
          className="text-xs text-gray-500 flex items-center gap-1"
          asChild
        >
          <Link to="/">
            <ArrowLeft size={14} />
            Voltar à página principal
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default QuizResult;
