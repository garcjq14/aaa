import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePreloader } from '@/hooks/use-preloader.tsx';
import LoadingLogo from './LoadingLogo';

const Preloader = () => {
  const { loading, progress } = usePreloader();
  const [maxProgress, setMaxProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  
  // Atualiza o valor máximo de progresso
  useEffect(() => {
    if (progress > maxProgress) {
      setMaxProgress(progress);
    }
  }, [progress, maxProgress]);

  // Mensagens rotativas para tornar o carregamento mais interessante
  const messages = [
    "Carregando recursos...",
    "Preparando conteúdo...",
    "Quase pronto...",
    "Iniciando aplicação..."
  ];
  
  // Alternar mensagens a cada 2.5 segundos
  useEffect(() => {
    if (!loading) return;
    
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 2500);
    
    return () => clearInterval(interval);
  }, [loading, messages.length]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { 
              duration: 0.8, 
              ease: "easeInOut" 
            } 
          }}
        >
          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo animado centralizado */}
            <LoadingLogo size={80} showText={false} />
            
            {/* Texto do site */}
            <motion.h1
              className="mt-4 text-lg md:text-xl font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white">Ane</span> <span className="text-highlight">Garcia</span>
            </motion.h1>
            
            {/* Mensagem de carregamento */}
            <motion.div
              className="h-5 my-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentMessage}
                  className="text-sm text-gray-400"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {messages[currentMessage]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
            
            {/* Barra de progresso mais minimalista */}
            <motion.div 
              className="w-48 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative h-1 bg-gray-800 rounded-full w-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-highlight rounded-full"
                  style={{ width: `${maxProgress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${maxProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex justify-end mt-2">
                <span className="text-sm text-gray-400">{Math.round(maxProgress)}%</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader; 