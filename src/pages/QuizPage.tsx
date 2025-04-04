import React from 'react';
import { Star, Cross, Circle, FlameIcon } from '@/components/ui/GraphicsElements';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import QuizWithPreBriefing from '@/components/quiz/QuizWithPreBriefing';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const QuizPage = () => {
  const isMobile = useIsMobile();
  
  // Variantes para animação da seção
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.05
      }
    }
  };

  return (
    <motion.section 
      className="min-h-screen bg-black text-white pt-20 md:pt-24 pb-16 md:pb-20 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      {/* Elementos gráficos animados de fundo */}
      <motion.div 
        className="absolute top-40 left-4 md:left-10 opacity-50 md:opacity-100"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Star size={isMobile ? 24 : 40} color="#FF0066" />
      </motion.div>
      <motion.div 
        className="absolute bottom-20 md:bottom-40 right-4 md:right-10 opacity-50 md:opacity-100"
        animate={{ 
          x: [0, 15, 0],
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Cross size={isMobile ? 20 : 30} color="#FF0066" />
      </motion.div>
      <motion.div 
        className="absolute top-1/3 right-1/5 opacity-50 md:opacity-100 hidden md:block"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, repeatType: "reverse" }
        }}
      >
        <Circle size={50} color="#FF0066" />
      </motion.div>
      <motion.div 
        className="absolute bottom-1/4 left-1/4 opacity-30 hidden md:block"
        animate={{ 
          scale: [1, 1.2, 1],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <FlameIcon size={40} color="#FF0066" />
      </motion.div>

      {/* Container do conteúdo */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Botão para voltar à página principal */}
          <motion.div
            className="mb-6"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 text-gray-400 hover:text-white hover:bg-gray-900"
              asChild
            >
              <Link to="/">
                <ArrowLeft size={16} />
                Voltar para a página inicial
              </Link>
            </Button>
          </motion.div>
        
          {/* Título da página */}
          <motion.div 
            className="text-center mb-12"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Descubra a Solução Ideal para Seu Negócio
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Conhecendo seus objetivos e necessidades, podemos encontrar a melhor alternativa para você.
            </p>
          </motion.div>
          
          {/* Quiz */}
          <QuizWithPreBriefing />
        </div>
      </div>
    </motion.section>
  );
};

export default QuizPage;
