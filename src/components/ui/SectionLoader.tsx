import React from 'react';
import { motion } from 'framer-motion';
import LoadingLogo from './LoadingLogo';

interface SectionLoaderProps {
  size?: number;
  message?: string;
  transparent?: boolean;
}

const SectionLoader: React.FC<SectionLoaderProps> = ({
  size = 50,
  message = "Carregando conteúdo...",
  transparent = false
}) => {
  return (
    <motion.div
      className={`w-full py-12 flex flex-col items-center justify-center ${transparent ? 'bg-transparent' : 'bg-black/30'} rounded-lg`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <LoadingLogo size={size} showText={false} />
      <motion.div
        className="mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm text-gray-300 opacity-90">
          {message}
        </p>
        <p className="text-xs text-gray-400 mt-1 opacity-70">
          Por favor, aguarde um momento
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SectionLoader; 