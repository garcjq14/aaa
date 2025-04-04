import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

interface LoadingLogoProps {
  size?: number;
  text?: string;
  showText?: boolean;
}

const LoadingLogo: React.FC<LoadingLogoProps> = ({
  size = 60,
  text = "Carregando...",
  showText = true
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        animate={{
          opacity: [0.7, 1, 0.7],
          scale: [0.97, 1, 0.97]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <Logo width={size} height={size} withLink={false} />
      </motion.div>
      
      {showText && (
        <motion.div
          className="mt-3 text-gray-400 text-sm font-light tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ 
            delay: 0.3,
            duration: 0.5
          }}
        >
          {text}
        </motion.div>
      )}
    </div>
  );
};

export default LoadingLogo; 