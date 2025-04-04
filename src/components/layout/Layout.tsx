import React from 'react';
import Header from './Header';
import Footer from './Footer';
import EnhancedMovingStars from '../ui/EnhancedMovingStars';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      {/* Efeito de fundo com estrelas que se movem por toda a página */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <EnhancedMovingStars 
          count={isMobile ? 15 : 25} 
          color="#ffffff" 
          maxSize={isMobile ? 10 : 12} 
          minSize={isMobile ? 3 : 4} 
          className="opacity-30" 
        />
      </div>
      
      <Header />
      <main className="flex-grow z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
