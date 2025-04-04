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
}

interface MovingStarsProps {
  count?: number;
  color?: string;
  maxSize?: number;
  minSize?: number;
  className?: string;
  includeCircles?: boolean;
}

const MovingStars: React.FC<MovingStarsProps> = ({ 
  count = 20, 
  color = "#ffffff",
  maxSize = 12,
  minSize = 4,
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
      
      generatedStars.push({
        x: Math.random() * 100, // posição X (0-100%)
        y: Math.random() * 100, // posição Y (0-100%)
        size: Math.random() * (maxSize - minSize) + minSize,
        duration: Math.random() * 15 + 10, // duração entre 10-25s
        delay: Math.random() * 5, // delay aleatório até 5s
        opacity: Math.random() * 0.5 + 0.3, // opacidade entre 0.3-0.8
        type,
        rotate: Math.random() > 0.5 // 50% chance de rotacionar
      });
    }
    
    setStars(generatedStars);
  }, [count, maxSize, minSize, includeCircles]);
  
  // Criar um efeito de brilho
  const pulseVariants = {
    pulse: (star: StarProps) => ({
      scale: [1, star.rotate ? 1.2 : 1.3, 1],
      opacity: [star.opacity, star.opacity + 0.3, star.opacity],
      transition: {
        duration: Math.random() * 2 + 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
        delay: Math.random() * 3
      }
    })
  };
  
  // Criar um efeito de movimento
  const floatVariants = {
    float: (star: StarProps) => ({
      x: [
        Math.random() * 30 - 15, // entre -15px e +15px
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
            transform: `rotate(${Math.random() * 360}deg)`
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
              <Star size={star.size} color={color} />
            ) : (
              <Circle size={star.size * 0.8} color={color} />
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default MovingStars; 