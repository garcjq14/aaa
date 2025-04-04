import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Mail, Phone } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer = () => {
  // Função para scroll suave para os links com hash
  const scrollWithOffset = (el: HTMLElement) => {
    // Offset fixo para compensar o cabeçalho
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -100;
    
    // Scroll direto para a posição com offset
    window.scrollTo({
      top: yCoordinate + yOffset,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-black text-white py-12 md:py-16 relative overflow-hidden">
      {/* Graphics */}
      <div className="graphic-element top-0 left-0">
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="100" fill="#FF0066" fillOpacity="0.05" />
        </svg>
      </div>

      <div className="graphic-element bottom-0 right-0">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M200 0L0 200" stroke="#FF0066" strokeOpacity="0.2" strokeWidth="2" />
          <path d="M180 0L0 180" stroke="#FF0066" strokeOpacity="0.2" strokeWidth="2" />
          <path d="M160 0L0 160" stroke="#FF0066" strokeOpacity="0.2" strokeWidth="2" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <Logo width={48} height={48} className="mr-3" />
              <div className="font-display text-2xl font-bold tracking-tighter">
                <span className="text-highlight">Ane</span> Garcia
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Desenvolvimento de sites para profissionais autônomos e negócios. 
              Transformando ideias em presença digital impactante.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className="font-display text-lg font-bold mb-6">Links rápidos</h3>
            <ul className="space-y-3">
              <li>
                <HashLink 
                  to="/#sobre" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  scroll={scrollWithOffset}
                >
                  Sobre Mim
                </HashLink>
              </li>
              <li>
                <Link to="/quiz" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Quiz
                </Link>
              </li>
              <li>
                <HashLink 
                  to="/#portfolio" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  scroll={scrollWithOffset}
                >
                  Portfólio
                </HashLink>
              </li>
              <li>
                <HashLink 
                  to="/#faq" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  scroll={scrollWithOffset}
                >
                  FAQ
                </HashLink>
              </li>
              <li>
                <HashLink 
                  to="/#contato" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  scroll={scrollWithOffset}
                >
                  Contato
                </HashLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="font-display text-lg font-bold mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail size={20} className="text-highlight mr-2" />
                <a 
                  href="mailto:contato@anegarcia.com.br" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  contato@anegarcia.com.br
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-highlight mr-2" />
                <a 
                  href="https://wa.me/5511999999999" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  +55 (11) 99999-9999
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Ane Garcia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
