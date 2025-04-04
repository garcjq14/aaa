import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronDown } from 'lucide-react';
import EnhancedMovingStars from '../ui/EnhancedMovingStars';
import Logo from '../ui/Logo';

// Definição de tipos para os componentes de navegação
type NavItem = {
  title: string;
  href: string;
  isExternal?: boolean;
};

// Links de navegação
const navItems: NavItem[] = [
  { title: "Sobre mim", href: "#sobre" },
  { title: "Portfólio", href: "#portfolio" },
  { title: "FAQ", href: "#faq" },
  { title: "Contato", href: "#contato" },
  { title: "Quiz", href: "/quiz", isExternal: true },
];

// Componente único para os links com navegação por hash
const HashNavLink = ({ href, title, onClick, isExternal }: { href: string; title: string; onClick?: () => void; isExternal?: boolean }) => {
  const location = useLocation();
  
  // Se for um link externo, usamos o componente Link diretamente
  if (isExternal) {
    return (
      <Link 
        to={href} 
        className="inline-block text-sm font-medium tracking-wider px-1 py-2 hover:text-highlight transition-colors relative"
        onClick={onClick}
      >
        {title}
      </Link>
    );
  }
  
  // Para links de hash, usamos o HashLink
  return (
    <HashLink 
      to={location.pathname !== '/' ? `/${href}` : href}
      className="inline-block text-sm font-medium tracking-wider px-1 py-2 hover:text-highlight transition-colors relative"
      onClick={onClick}
      scroll={(el) => {
        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }}
    >
      {title}
    </HashLink>
  );
};

// Versão do HashNavLink para o menu mobile
const MobileHashNavLink = ({ href, title, onClick, isExternal }: { href: string; title: string; onClick?: () => void; isExternal?: boolean }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Se for um link externo, usamos o componente Link diretamente
  if (isExternal) {
    return (
      <Link 
        to={href} 
        className="relative flex items-center justify-center py-4 text-xl font-medium hover:text-highlight transition-colors rounded-lg"
        onClick={onClick}
      >
        <span className="relative z-10">
          {title}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
        </span>
      </Link>
    );
  }
  
  // Para links de hash, usamos o HashLink
  return (
    <HashLink
      to={location.pathname !== '/' ? `/${href}` : href}
      className="relative flex items-center justify-center py-4 text-xl font-medium hover:text-highlight transition-colors rounded-lg"
      onClick={onClick}
      scroll={(el) => {
        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }}
    >
      <span className="relative z-10">
        {title}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
      </span>
    </HashLink>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  
  // Detectar rolagem para mudar a aparência do cabeçalho
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (show !== isScrolled) {
        setIsScrolled(show);
      }
    };
    
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Impedir rolagem do body quando o menu está aberto
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-black' : 'py-5 bg-transparent'}`}>
      {/* Estrelas sutis no fundo do header quando rolado */}
      {isScrolled && (
        <div className="absolute inset-0 overflow-hidden">
          <EnhancedMovingStars 
            count={isMobile ? 8 : 15} 
            color="#ffffff" 
            maxSize={isMobile ? 7 : 10}
            minSize={2}
            className="opacity-40" 
          />
        </div>
      )}
      
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between relative z-10">
        <Link to="/" className="flex items-center z-50" onClick={closeMenu}>
          <Logo width={42} height={42} className="mr-2" />
          <div className="font-display text-xl font-bold tracking-tighter">
            Ane <span className="text-highlight">Garcia</span>
          </div>
        </Link>
        
        {/* Menu Desktop */}
        {!isMobile && (
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item, i) => (
              <HashNavLink
                key={i}
                href={item.href}
                title={item.title}
                isExternal={item.isExternal}
              />
            ))}
          </nav>
        )}
        
        {/* Menu Mobile Trigger - Melhorado com foco melhor */}
        <button
          className="block md:hidden z-50 w-10 h-10 relative p-2 rounded-full hover:bg-gray-800 transition-colors"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <svg width="100%" height="100%" viewBox="0 0 100 100" 
              className={`transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
            >
              <path d="M20 35H80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M20 50H80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M20 65H80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            
            <svg width="100%" height="100%" viewBox="0 0 100 100" 
              className={`absolute transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}`}
            >
              <path d="M30 30L70 70" stroke="#FF0066" strokeWidth="2" strokeLinecap="round" />
              <path d="M30 70L70 30" stroke="#FF0066" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </button>
      </div>
      
      {/* Menu Mobile - Overlay com animações melhoradas */}
      <div 
        className={cn(
          'fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-95 backdrop-blur-lg z-40 transition-all duration-500 ease-in-out',
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
        )}
        aria-hidden={!isMenuOpen}
      >
        {/* Botão de voltar explícito */}
        <button
          className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-800 transition-colors"
          onClick={closeMenu}
          aria-label="Fechar menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Elementos decorativos */}
        <div className="absolute top-20 right-20 opacity-20">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="#FF0066" strokeWidth="1" />
          </svg>
        </div>
        
        <div className="absolute bottom-20 left-20 opacity-20">
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
            <path d="M20 20L80 80M20 80L80 20" stroke="#FF0066" strokeWidth="1" />
          </svg>
        </div>
        
        {/* Logo em versão reduzida */}
        <div className="mb-10">
          <Logo width={60} height={60} withLink={false} />
        </div>
        
        <nav className="flex flex-col w-full px-6 max-w-xs">
          {navItems.map((item, i) => (
            <div 
              key={i} 
              className="mb-4 transform transition-transform duration-500 group"
              style={{ 
                transitionDelay: `${i * 100}ms`,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMenuOpen ? 1 : 0
              }}
            >
              <MobileHashNavLink
                href={item.href}
                title={item.title}
                onClick={closeMenu}
                isExternal={item.isExternal}
              />
              <div className="h-px bg-gray-800 mt-4 w-full"></div>
            </div>
          ))}
        </nav>
        
        {/* Botão de contato direto */}
        <div 
          className="mt-8 transform transition-all duration-500"
          style={{ 
            transitionDelay: `${navItems.length * 100 + 100}ms`,
            transform: isMenuOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
            opacity: isMenuOpen ? 1 : 0
          }}
        >
          <Link 
            to="/#contato" 
            className="bg-highlight hover:bg-opacity-80 transition-colors px-6 py-3 rounded-lg text-white font-medium inline-block"
            onClick={() => {
              closeMenu();
            }}
          >
            Fale comigo
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
