import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Circle } from './GraphicsElements';

interface StarProps {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: 'star' | 'circle';
  rotate?: boolean;
  color: string;
}

interface EnhancedMovingStarsProps {
  count?: number;
  color?: string;
  maxSize?: number;
  minSize?: number;
  className?: string;
  includeCircles?: boolean;
}

const EnhancedMovingStars: React.FC<EnhancedMovingStarsProps> = ({ 
  count = 20, // Reduzido de 30 para 20
  color = "#ffffff",
  maxSize = 14, // Reduzido de 16 para 14
  minSize = 4, // Reduzido de 5 para 4
  className = "",
  includeCircles = true
}) => {
  const [stars, setStars] = useState<StarProps[]>([]);
  
  // Gerar estrelas com posições aleatórias
  useEffect(() => {
    const generatedStars: StarProps[] = [];
    
    for (let i = 0; i < count; i++) {
      // Decide se é estrela ou círculo
      const type = includeCircles && Math.random() > 0.7 ? 'circle' : 'star';
      
      // Algumas estrelas terão cores diferentes para destacar (reduzido de 20% para 15%)
      const starColor = Math.random() > 0.85 
        ? i % 3 === 0 
          ? '#ffdd99' // tom amarelo 
          : i % 2 === 0 
            ? '#99ccff' // tom azulado
            : '#ff99cc' // tom rosado
        : color;
      
      generatedStars.push({
        x: Math.random() * 100, // posição X (0-100%)
        y: Math.random() * 100, // posição Y (0-100%)
        size: Math.random() * (maxSize - minSize) + minSize,
        duration: Math.random() * 15 + 15, // duração entre 15-30s (mais lento)
        delay: Math.random() * 5, // delay aleatório até 5s
        opacity: Math.random() * 0.4 + 0.35, // opacidade entre 0.35-0.75 (reduzida)
        type,
        rotate: Math.random() > 0.5, // 50% chance de rotacionar
        color: starColor
      });
    }
    
    setStars(generatedStars);
  }, [count, color, maxSize, minSize, includeCircles]);
  
  // Criar um efeito de brilho mais suave
  const pulseVariants = {
    pulse: (star: StarProps) => ({
      scale: [1, star.rotate ? 1.3 : 1.4, 1], // Reduzido de 1.4/1.5 para 1.3/1.4
      opacity: [star.opacity, Math.min(star.opacity + 0.3, 0.85), star.opacity], // Reduzido de +0.5 para +0.3
      transition: {
        duration: Math.random() * 2 + 2, // Um pouco mais lento
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
        delay: Math.random() * 3
      }
    })
  };
  
  // Criar um efeito de movimento mais suave
  const floatVariants = {
    float: (star: StarProps) => ({
      x: [
        Math.random() * 30 - 15, // Reduzido de 50-25 para 30-15
        Math.random() * 30 - 15,
        Math.random() * 30 - 15
      ],
      y: [
        Math.random() * 30 - 15,
        Math.random() * 30 - 15,
        Math.random() * 30 - 15
      ],
      rotate: star.rotate ? [0, 360] : [0, 0],
      transition: {
        duration: star.duration,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
        delay: star.delay,
        times: [0, 0.5, 1]
      }
    })
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            opacity: star.opacity,
            transform: `rotate(${Math.random() * 360}deg)`,
            filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))" // Reduzido de 3px/0.8 para 2px/0.5
          }}
          variants={floatVariants}
          custom={star}
          animate="float"
        >
          <motion.div
            variants={pulseVariants}
            custom={star}
            animate="pulse"
          >
            {star.type === 'star' ? (
              <Star size={star.size} color={star.color} />
            ) : (
              <Circle size={star.size * 0.8} color={star.color} />
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default EnhancedMovingStars; 