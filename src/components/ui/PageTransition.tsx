import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import LoadingLogo from './LoadingLogo';

const PageTransition: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(location.pathname);
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    // Quando a rota muda, ativa a tela de carregamento
    if (key !== location.pathname) {
      setIsLoading(true);
      
      // Determina o título da página baseado na rota
      const path = location.pathname;
      if (path === "/") {
        setPageTitle("Página Inicial");
      } else if (path === "/quiz") {
        setPageTitle("Quiz");
      } else if (path.includes("portfolio")) {
        const projectName = path.split("/").pop()?.split("-").join(" ");
        setPageTitle(`Projeto: ${projectName ? projectName.charAt(0).toUpperCase() + projectName.slice(1) : ''}`);
      } else {
        setPageTitle("Carregando nova página");
      }
      
      // Simula o tempo de carregamento da página
      const timer = setTimeout(() => {
        setIsLoading(false);
        setKey(location.pathname);
      }, 800); // Reduzido para melhorar a experiência
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, key]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[90] bg-black/95 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingLogo size={70} showText={false} />
            <motion.div
              className="mt-5 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-sm text-gray-300 mb-2">Navegando para</div>
              <div className="text-white font-medium text-lg">
                {pageTitle}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition; 