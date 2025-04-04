import React, { useEffect, useRef, useState } from 'react';
import { Cross, Star, Circle, FlameIcon } from '../ui/GraphicsElements';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import EnhancedMovingStars from '../ui/EnhancedMovingStars';
import Logo from '../ui/Logo';

const Hero = () => {
  const isMobile = useIsMobile();
  
  // Variantes para animações
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.7,
        ease: "easeOut"
      }
    })
  };
  
  // Referência para o título
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Texto digitado normal e destacado
  const normalText = "Seu site ";
  const highlightText = "profissional sem complicações";
  
  useEffect(() => {
    if (!titleRef.current) return;
    
    const normalSpan = document.createElement('span');
    normalSpan.textContent = '';
    
    const highlightSpan = document.createElement('span');
    highlightSpan.className = 'text-highlight';
    highlightSpan.textContent = '';
    
    // Limpa o conteúdo anterior
    titleRef.current.innerHTML = '';
    titleRef.current.appendChild(normalSpan);
    titleRef.current.appendChild(highlightSpan);
    
    // Texto completo para animação
    const fullText = normalText + highlightText;
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        const char = fullText[currentIndex];
        
        // Decide em qual span adicionar a letra
        if (currentIndex < normalText.length) {
          normalSpan.textContent += char;
        } else {
          highlightSpan.textContent += char;
        }
        
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="relative min-h-[100svh] bg-black text-white pt-16 pb-10 overflow-hidden flex items-center">
      {/* Fundo de estrelas animadas */}
      <EnhancedMovingStars 
        count={isMobile ? 15 : 35} 
        color="#ffffff" 
        className="z-0 opacity-60"
        maxSize={isMobile ? 14 : 18}
        minSize={isMobile ? 4 : 6}
      />
      
      {/* Background graphics com motion */}
      {!isMobile && (
        <>
          <motion.div 
            className="absolute top-20 left-10"
            animate={{ 
              y: [0, -10, 0], 
              rotate: [0, 5, 0] 
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            <Cross size={30} />
          </motion.div>
          <motion.div 
            className="absolute top-40 right-20"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            <Star size={40} />
          </motion.div>
          <motion.div 
            className="absolute bottom-20 left-1/4"
            animate={{ 
              x: [0, 15, 0],
              y: [0, -15, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            <Circle size={50} />
          </motion.div>
          <motion.div 
            className="absolute top-1/3 right-1/4"
            animate={{ 
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <FlameIcon size={40} />
          </motion.div>
        </>
      )}
      
      {/* Versão simplificada dos gráficos para mobile */}
      {isMobile && (
        <>
          <motion.div 
            className="absolute top-20 right-10"
            animate={{ 
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            <Star size={30} />
          </motion.div>
          <motion.div 
            className="absolute bottom-20 left-10"
            animate={{ 
              rotate: [0, 10, 0, -10, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            <Cross size={20} />
          </motion.div>
        </>
      )}

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <motion.div 
            className="col-span-1 md:col-span-7"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={0}
          >
            <motion.div 
              className="inline-block mb-4 bg-highlight bg-opacity-10 rounded-full px-4 py-1 text-highlight font-medium text-xs sm:text-sm"
              variants={fadeIn}
              custom={1}
            >
              <div className="flex items-center">
                <Logo width={18} height={18} withLink={false} className="mr-2" />
                Criação de Sites e Presença Digital
              </div>
            </motion.div>
            <motion.h1 
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6"
              variants={fadeIn}
              custom={2}
            >
              {/* O conteúdo será preenchido via JavaScript */}
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-xl"
              variants={fadeIn}
              custom={3}
            >
              Olá! Sou especialista em criar sites bonitos e eficientes que conectam você aos seus clientes. Transformo suas ideias em uma presença online que realmente faz seu negócio crescer.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeIn}
              custom={4}
            >
              <Button asChild size={isMobile ? "default" : "lg"} className="bg-highlight hover:bg-highlight hover:bg-opacity-80 text-white w-full sm:w-auto">
                <Link to="/quiz">
                  Descubra o site ideal para o seu negócio
                </Link>
              </Button>
              <Button asChild variant="outline" size={isMobile ? "default" : "lg"} className="w-full sm:w-auto">
                <a 
                  href="/#portfolio"
                  onClick={(e) => {
                    e.preventDefault();
                    const targetElement = document.getElementById('portfolio');
                    if (targetElement) {
                      const yOffset = -100;
                      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({top: y, behavior: 'smooth'});
                    }
                  }}
                >
                  Ver meus trabalhos
                </a>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Hero Image / Card com animação */}
          <motion.div 
            className="col-span-1 md:col-span-5 mt-6 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.6,
              ease: "easeOut"
            }}
          >
            <motion.div 
              className="relative mx-auto md:mx-0" 
              style={{ maxWidth: '380px' }}
              whileHover={{ 
                rotate: 2,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              {/* ID Card inspired by the reference image */}
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 sm:p-6 transform rotate-3 shadow-lg">
                <div className="flex flex-col">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gray-800 overflow-hidden mr-3 sm:mr-4">
                      <img src="/images/site-image.png" alt="Design do site" className="w-full h-full object-cover object-center" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-400">Desenvolvedora Web</div>
                      <h3 className="text-xl sm:text-2xl font-bold">Ane Garcia</h3>
                    </div>
                    <div className="ml-auto">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ 
                          duration: 10, 
                          repeat: Infinity,
                          ease: "linear" 
                        }}
                      >
                        <Star size={isMobile ? 24 : 30} />
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-700 pt-3 sm:pt-4 text-xs sm:text-sm">
                    <div className="mb-2 flex">
                      <span className="text-gray-400 w-28 sm:w-32 flex-shrink-0">Especialidades:</span>
                      <span>Sites Profissionais</span>
                    </div>
                    <div className="mb-2 flex">
                      <span className="text-gray-400 w-28 sm:w-32 flex-shrink-0">Foco:</span>
                      <span>Resultados reais</span>
                    </div>
                    <div className="mb-2 flex">
                      <span className="text-gray-400 w-28 sm:w-32 flex-shrink-0">Projetos:</span>
                      <span>+37 concluídos</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-6 flex justify-end">
                    <motion.div 
                      className="bg-highlight bg-opacity-20 px-2 sm:px-3 py-1 rounded-full text-highlight text-xs sm:text-sm"
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    >
                      Disponível para projetos
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements around the card */}
              <motion.div 
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -left-6"
              >
                <Cross size={20} />
              </motion.div>
              <motion.div 
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                className="absolute -bottom-6 -right-6"
              >
                <Circle size={24} />
              </motion.div>
              <motion.div 
                animate={{ height: ["32px", "40px", "32px"] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                className="absolute -right-4 sm:-right-8 top-1/2 transform -translate-y-1/2 w-2 sm:w-6 bg-highlight bg-opacity-10 rounded-full hidden sm:block"
              ></motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 sm:h-16 md:h-24">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.56,20.44,238.36,62.76,321.39,56.44Z" className="fill-gray-900"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
