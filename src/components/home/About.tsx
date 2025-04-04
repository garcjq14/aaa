import React, { useEffect, useRef, useState } from 'react';
import { Cross, Star, FlameIcon, WavyLine } from '../ui/GraphicsElements';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const About = () => {
  const isMobile = useIsMobile();
  
  // Referências para animações baseadas em scroll
  const sectionRef = useRef<HTMLElement>(null);
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // State para os contadores
  const [projectsCount, setProjectsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  
  // Verificar se as seções estão visíveis no viewport
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const statsInView = useInView(statsSectionRef, { once: true, amount: 0.5 });
  
  // Animar quando a seção ficar visível
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  // Animar os contadores quando a seção de estatísticas ficar visível
  useEffect(() => {
    if (statsInView) {
      // Animação do contador de projetos
      const projectsInterval = setInterval(() => {
        setProjectsCount(prev => {
          if (prev >= 37) {
            clearInterval(projectsInterval);
            return 37;
          }
          return prev + 1;
        });
      }, 30);
      
      // Animação do contador de clientes
      const clientsInterval = setInterval(() => {
        setClientsCount(prev => {
          if (prev >= 100) {
            clearInterval(clientsInterval);
            return 100;
          }
          return prev + 1;
        });
      }, 15);
      
      // Animação do contador de anos
      const yearsInterval = setInterval(() => {
        setYearsCount(prev => {
          if (prev >= 5) {
            clearInterval(yearsInterval);
            return 5;
          }
          return prev + 1;
        });
      }, 300);
      
      return () => {
        clearInterval(projectsInterval);
        clearInterval(clientsInterval);
        clearInterval(yearsInterval);
      };
    }
  }, [statsInView]);
  
  // Variantes para animações
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
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
  
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.section 
      id="sobre" 
      ref={sectionRef}
      className="bg-gray-900 text-white py-12 sm:py-16 md:py-20 relative overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            staggerChildren: 0.1,
            delayChildren: 0.2 
          }
        }
      }}
    >
      {/* Background graphics - simplificados no mobile */}
      {!isMobile && (
        <>
          <motion.div 
            className="absolute top-10 left-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Star size={40} color="#FF0066" />
          </motion.div>
          <motion.div 
            className="absolute bottom-10 right-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Cross size={30} color="#FF0066" />
          </motion.div>
          <motion.div 
            className="absolute top-1/2 right-20 transform -translate-y-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <FlameIcon size={60} color="#FF0066" />
          </motion.div>
        </>
      )}
      
      {isMobile && (
        <motion.div 
          className="absolute top-10 right-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Star size={30} color="#FF0066" />
        </motion.div>
      )}

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            className="relative order-2 md:order-1"
            variants={imageVariants}
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Primeiro card - imagem do site */}
              <motion.div 
                className="bg-gray-800 rounded-lg overflow-hidden w-full sm:w-[280px] h-[400px] shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="h-full relative">
                  <img 
                    src="/images/site-image.png" 
                    alt="Design do site" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <h4 className="text-white font-bold">Design de Sites</h4>
                    <p className="text-gray-300 text-sm">Sites profissionais e responsivos</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Segundo card - habilidades */}
              <motion.div 
                className="bg-gray-700 rounded-lg p-4 sm:p-6 w-full sm:w-[280px] h-[400px] shadow-lg flex flex-col"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg sm:text-xl">Ane Garcia</h3>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <Star size={16} />
                  </motion.div>
                </div>
                
                <div className="space-y-3 flex-grow">
                  <motion.div 
                    className="flex justify-between items-center"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    <span className="text-sm">Criatividade</span>
                    <div className="w-16 sm:w-24 bg-gray-600 h-2 rounded-full">
                      <motion.div 
                        className="bg-highlight h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ delay: 0.7, duration: 1 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex justify-between items-center"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    <span className="text-sm">Design</span>
                    <div className="w-16 sm:w-24 bg-gray-600 h-2 rounded-full">
                      <motion.div 
                        className="bg-highlight h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "80%" }}
                        transition={{ delay: 0.9, duration: 1 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex justify-between items-center"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 0.8 }}
                  >
                    <span className="text-sm">Desenvolvimento</span>
                    <div className="w-16 sm:w-24 bg-gray-600 h-2 rounded-full">
                      <motion.div 
                        className="bg-highlight h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ delay: 1.1, duration: 1 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex justify-between items-center"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  >
                    <span className="text-sm">SEO</span>
                    <div className="w-16 sm:w-24 bg-gray-600 h-2 rounded-full">
                      <motion.div 
                        className="bg-highlight h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ delay: 1.3, duration: 1 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="absolute -bottom-4 -right-4"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <Cross size={20} />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:order-2"
            variants={fadeInUp}
            custom={1}
          >
            <motion.span 
              className="inline-block text-highlight mb-2"
              variants={fadeInUp}
              custom={2}
            >
              Sobre mim
            </motion.span>
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
              variants={fadeInUp}
              custom={3}
            >
              Transformo sua <span className="text-highlight">visão</span> em uma presença online de sucesso
            </motion.h2>
            <motion.p 
              className="text-gray-300 mb-4 sm:mb-6 text-base sm:text-lg"
              variants={fadeInUp}
              custom={4}
            >
              Olá! Sou apaixonado por criar sites que não só impressionam visualmente, mas também trazem resultados reais para seu negócio. Com minha experiência, transformo ideias em uma presença online que realmente conecta você aos seus clientes.
            </motion.p>
            <motion.p 
              className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg"
              variants={fadeInUp}
              custom={5}
            >
              Entendo que ter um site é fundamental hoje em dia, mas sei que pode parecer complicado para quem não é da área. Por isso, cuido de todo o processo para você, desde o design até a publicação, com uma abordagem simples e sem jargões técnicos.
            </motion.p>
            
            <motion.div
              variants={fadeInUp}
              custom={6}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6"
            >
              <div className="flex items-center">
                <div className="bg-highlight bg-opacity-10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Star size={20} color="#FF0066" />
                </div>
                <div>
                  <span className="block font-semibold">Design criativo</span>
                  <span className="text-sm text-gray-400">Sites únicos que encantam</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-highlight bg-opacity-10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Star size={20} color="#FF0066" />
                </div>
                <div>
                  <span className="block font-semibold">Fácil de usar</span>
                  <span className="text-sm text-gray-400">Simples e intuitivo</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Stats section */}
        <div 
          ref={statsSectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16 max-w-3xl mx-auto"
        >
          <motion.div 
            className="text-center"
            variants={fadeInUp}
            custom={6}
          >
            <p className="text-4xl sm:text-5xl font-bold text-highlight mb-2">{projectsCount}+</p>
            <p className="text-gray-300">Projetos realizados</p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            variants={fadeInUp}
            custom={7}
          >
            <p className="text-4xl sm:text-5xl font-bold text-highlight mb-2">{clientsCount}%</p>
            <p className="text-gray-300">Clientes satisfeitos</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
