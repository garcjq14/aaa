import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Cross, Star, Circle } from '@/components/ui/GraphicsElements';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import Logo from '../ui/Logo';
import SectionLoader from '../ui/SectionLoader';

// Portfolio data
const projects = [
  {
    id: 1,
    title: "Dr. Helena Mendes",
    category: "Site Profissional",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: "Site para clínica médica com agendamento online integrado e blog informativo para pacientes.",
    link: "/portfolio/dr-helena-mendes"
  },
  {
    id: 2,
    title: "Studio Arquitetura",
    category: "Portfólio",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: "Portfólio para escritório de arquitetura com galeria de projetos e formulário de contato personalizado.",
    link: "/portfolio/studio-arquitetura"
  },
  {
    id: 3,
    title: "Café Bistrô",
    category: "Landing Page",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: "Landing page para café local com menu digital, mapa de localização e área para reservas.",
    link: "/portfolio/cafe-bistro"
  },
  {
    id: 4,
    title: "Coach Maria Silva",
    category: "Site Profissional",
    image: "https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: "Site profissional para coach com agenda, venda de e-books e integração com plataforma de cursos online.",
    link: "/portfolio/coach-maria-silva"
  },
  {
    id: 5,
    title: "Fisio Bem-Estar",
    category: "Site Institucional",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: "Site institucional para clínica de fisioterapia com apresentação da equipe, serviços e blog especializado.",
    link: "/portfolio/fisio-bem-estar"
  },
  {
    id: 6,
    title: "Tech Solutions",
    category: "Site Corporativo",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: "Website corporativo para empresa de tecnologia com apresentação de serviços, cases e área de suporte.",
    link: "/portfolio/tech-solutions"
  }
];

// Filter categories
const categories = ["Todos", "Site Profissional", "Portfólio", "Landing Page", "Site Institucional", "E-commerce"];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  // Filter projects by category
  const filteredProjects = activeCategory === "Todos" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
    
  // Ref para animação baseada em scroll
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  // Lidar com mudança de categoria com efeito de carregamento
  const handleCategoryChange = (category: string) => {
    if (category === activeCategory) return;
    
    setIsLoading(true);
    
    // Simular tempo de carregamento para melhor experiência visual
    setTimeout(() => {
      setActiveCategory(category);
      setIsLoading(false);
    }, 600);
  };

  return (
    <motion.section 
      id="portfolio" 
      ref={sectionRef}
      className="bg-gray-900 text-white py-12 sm:py-16 md:py-20 relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }}
    >
      {/* Background graphics com animação */}
      {!isMobile && (
        <>
          {/* Logo flutuante removido */}
          
          <motion.div 
            className="absolute top-20 right-20"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Star size={40} />
          </motion.div>
          <motion.div 
            className="absolute bottom-20 left-20"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 5, repeat: Infinity, repeatType: "reverse" }
            }}
          >
            <Cross size={30} />
          </motion.div>
          <motion.div 
            className="absolute top-1/2 left-10"
            animate={{
              x: [0, 20, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Circle size={60} />
          </motion.div>
        </>
      )}
      
      {isMobile && (
        <motion.div 
          className="absolute top-10 right-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Star size={30} />
        </motion.div>
      )}

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto"
          variants={titleVariants}
        >
          <div className="inline-block mb-2">
            <div className="flex items-center justify-center">
              <motion.div 
                className="h-[2px] bg-highlight mr-2"
                initial={{ width: 0 }}
                animate={{ width: "1.5rem" }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
              <div className="flex items-center">
                <Logo width={18} height={18} withLink={false} className="mr-2" />
                <span className="text-highlight uppercase tracking-wider text-sm font-medium">Portfólio</span>
              </div>
              <motion.div 
                className="h-[2px] bg-highlight ml-2"
                initial={{ width: 0 }}
                animate={{ width: "1.5rem" }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            </div>
          </div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
            variants={titleVariants}
          >
            Conheça alguns <span className="text-highlight">projetos</span> que já realizei
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 text-sm sm:text-base md:text-lg mb-4"
            variants={titleVariants}
          >
            Aqui estão alguns exemplos de como tenho ajudado empreendedores e profissionais a crescerem na internet
          </motion.p>

          <motion.div 
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 max-w-2xl mx-auto mb-8"
            variants={titleVariants}
          >
            <p className="text-gray-300 text-sm sm:text-base text-center">
              <span className="text-highlight font-medium">Importante:</span> Estes são exemplos do meu trabalho. Quando criamos seu site, ele será totalmente personalizado para atender as necessidades específicas do seu negócio e refletir sua identidade.
            </p>
          </motion.div>
        </motion.div>

        {/* Categories filter com animação */}
        <motion.div 
          className="flex overflow-x-auto pb-4 hide-scrollbar justify-start sm:justify-center gap-2 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {categories.map((category, idx) => (
            <motion.button
              key={category}
              className={`px-3 sm:px-4 py-2 rounded-full transition-all whitespace-nowrap text-sm ${
                activeCategory === category 
                  ? "bg-highlight text-white" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => handleCategoryChange(category)}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: activeCategory === category ? "#FF0066" : "#333333"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.3 + (idx * 0.05)
              }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid com stagger */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full min-h-[400px] flex items-center justify-center"
            >
              <SectionLoader 
                size={45} 
                message={`Carregando projetos de ${activeCategory.toLowerCase()}`} 
              />
            </motion.div>
          ) : (
            <motion.div 
              key={activeCategory}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredProjects.map((project, index) => (
                <motion.div 
                  key={project.id} 
                  className="relative group"
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  onHoverStart={() => setHoveredItem(project.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="relative h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden">
                      {/* Project image */}
                      <motion.img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      {/* Overlay */}
                      <motion.div 
                        className={`absolute inset-0 bg-black flex flex-col justify-end p-4 sm:p-6`}
                        initial={{ opacity: isMobile ? 0.8 : 0 }}
                        animate={{ 
                          opacity: isMobile ? 0.8 : hoveredItem === project.id ? 0.7 : 0 
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.span 
                          className="text-highlight text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ 
                            y: isMobile || hoveredItem === project.id ? 0 : 20,
                            opacity: isMobile || hoveredItem === project.id ? 1 : 0
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          {project.category}
                        </motion.span>
                        <motion.h3 
                          className="text-lg sm:text-xl font-bold mb-1 sm:mb-2"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ 
                            y: isMobile || hoveredItem === project.id ? 0 : 20,
                            opacity: isMobile || hoveredItem === project.id ? 1 : 0
                          }}
                          transition={{ duration: 0.3, delay: 0.15 }}
                        >
                          {project.title}
                        </motion.h3>
                        <motion.p 
                          className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ 
                            y: isMobile || hoveredItem === project.id ? 0 : 20,
                            opacity: isMobile || hoveredItem === project.id ? 1 : 0
                          }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          {project.description}
                        </motion.p>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ 
                            y: isMobile || hoveredItem === project.id ? 0 : 20,
                            opacity: isMobile || hoveredItem === project.id ? 1 : 0
                          }}
                          transition={{ duration: 0.3, delay: 0.25 }}
                        >
                          <Button variant="outline" size="sm" className="w-fit" asChild>
                            <Link to={project.link}>
                              Ver detalhes
                            </Link>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Category badge */}
                    <motion.div 
                      className="absolute top-4 left-4 bg-highlight rounded-full px-2 sm:px-3 py-1 text-xs font-medium"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                    >
                      {project.category}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to action com animação */}
        <motion.div 
          className="text-center mt-10 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <motion.p 
            className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Procurando por mais inspiração? Veja outros projetos ou entre em contato para discutir o seu.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild className="bg-highlight hover:bg-highlight hover:bg-opacity-80 w-full sm:w-auto">
              <a 
                href="/#contato"
                onClick={(e) => {
                  e.preventDefault();
                  const targetElement = document.getElementById('contato');
                  if (targetElement) {
                    const yOffset = -100;
                    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({top: y, behavior: 'smooth'});
                  }
                }}
              >
                Vamos conversar sobre seu projeto
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Portfolio;
