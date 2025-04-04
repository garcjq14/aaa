import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Cross, Circle } from '@/components/ui/GraphicsElements';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

interface QuizOption {
  id: string;
  text: string;
}

interface QuizStepProps {
  stepNumber: number;
  totalSteps: number;
  question: string;
  options: QuizOption[];
  selectedOption: string | null;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const QuizStep: React.FC<QuizStepProps> = ({
  stepNumber,
  totalSteps,
  question,
  options,
  selectedOption,
  onSelect,
  onNext,
  onPrevious,
}) => {
  const isMobile = useIsMobile();
  const progressPercentage = (stepNumber / totalSteps) * 100;
  
  // Variantes de animação para transições mais suaves
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { 
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  return (
    <motion.div 
      className="bg-black rounded-xl p-5 md:p-8 lg:p-10 relative border border-gray-800"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      {/* Elementos decorativos com animação */}
      <motion.div 
        className="absolute -top-3 -left-3"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <Circle size={isMobile ? 16 : 24} color="#FF0066" />
      </motion.div>
      <motion.div 
        className="absolute -bottom-3 -right-3"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <Star size={isMobile ? 16 : 24} color="#FF0066" />
      </motion.div>
      <motion.div 
        className="absolute top-1/2 -right-3 transform -translate-y-1/2 hidden md:block"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <Cross size={16} color="#FF0066" />
      </motion.div>
      
      {/* Barra de progresso simplificada */}
      <div className="mb-6 md:mb-8">
        <div className="flex justify-between items-center text-xs md:text-sm text-gray-400 mb-2">
          <span>Pergunta {stepNumber} de {totalSteps}</span>
          <span>{Math.round(progressPercentage)}% concluído</span>
        </div>
        <div className="w-full bg-gray-800 h-2 rounded-full">
          <motion.div 
            className="bg-highlight h-2 rounded-full"
            initial={{ width: `${((stepNumber - 1) / totalSteps) * 100}%` }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
      
      {/* Questão com animação */}
      <motion.h3 
        className="text-xl md:text-2xl lg:text-3xl font-bold mb-5 md:mb-6"
        variants={itemVariants}
      >
        {question}
      </motion.h3>
      
      {/* Opções com animação e hover melhorado */}
      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            className={`w-full text-left p-4 md:p-5 rounded-lg border ${
              selectedOption === option.id 
                ? 'border-highlight bg-highlight bg-opacity-10' 
                : 'border-gray-700 hover:border-gray-500 hover:bg-gray-900'
            } transition-all`}
            onClick={() => onSelect(option.id)}
            variants={itemVariants}
            custom={index}
            whileHover={{ scale: 1.005, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.995 }}
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                selectedOption === option.id 
                  ? 'bg-highlight' 
                  : 'border-2 border-gray-500'
              } transition-all flex-shrink-0`}>
                {selectedOption === option.id && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                )}
              </div>
              <span className="text-sm md:text-base">{option.text}</span>
            </div>
          </motion.button>
        ))}
      </div>
      
      {/* Botões de navegação */}
      <motion.div 
        className="flex justify-between mt-8"
        variants={itemVariants}
      >
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={stepNumber === 1}
          className="text-sm md:text-base px-3 py-2 md:px-4 md:py-2 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
        >
          Anterior
        </Button>
        <Button
          className="bg-highlight text-white hover:bg-highlight/90 text-sm md:text-base px-3 py-2 md:px-4 md:py-2 transition-all duration-300 hover:scale-[1.03] hover:shadow-glow active:scale-[0.98]"
          onClick={onNext}
          disabled={!selectedOption}
        >
          {stepNumber === totalSteps ? "Ver resultado" : "Próxima"}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default QuizStep;
