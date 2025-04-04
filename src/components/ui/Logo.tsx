import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  withLink?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  width = 40,
  height = 40,
  className = "",
  withLink = true
}) => {
  
  const logoImg = (
    <img 
      src="/logo/logo.png" 
      alt="Logo" 
      width={width} 
      height={height} 
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );

  if (withLink) {
    return (
      <Link to="/" className="flex items-center">
        {logoImg}
      </Link>
    );
  }

  return logoImg;
};

export default Logo; 