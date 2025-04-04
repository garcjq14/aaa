
import React from 'react';

// Interface para os elementos gráficos
interface GraphicElementProps {
  size?: number;
  className?: string;
  color?: string;
}

// Elemento Cruz
export const Cross: React.FC<GraphicElementProps> = ({ size = 24, className = "", color = "currentColor" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M18 6L6 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6L18 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// Elemento Estrela
export const Star: React.FC<GraphicElementProps> = ({ size = 24, className = "", color = "currentColor" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

// Elemento Círculo
export const Circle: React.FC<GraphicElementProps> = ({ size = 24, className = "", color = "currentColor" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

// Elemento Chama
export const FlameIcon: React.FC<GraphicElementProps> = ({ size = 24, className = "", color = "currentColor" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M12 2C8 2 6 4 6 8C6 12 12 18 12 18C12 18 18 12 18 8C18 4 16 2 12 2Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

// Elemento Linha Ondulada
export const WavyLine: React.FC<GraphicElementProps> = ({ className = "", color = "currentColor" }) => {
  return (
    <svg 
      width="100" 
      height="8" 
      viewBox="0 0 100 8" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <path 
        d="M1 4C1 4 20 1 25 4C30 7 35 7 40 4C45 1 50 1 55 4C60 7 65 7 75 4C85 1 95 4 95 4" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
    </svg>
  );
};
