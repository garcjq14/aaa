import React, { useState, useRef } from 'react';
import { Star, Cross } from '@/components/ui/GraphicsElements';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import EnhancedMovingStars from '../ui/EnhancedMovingStars';
import { useIsMobile } from '@/hooks/use-mobile';

const faqData = [
  {
    question: "Quanto custa para ter um site?",
    answer: "O valor varia de acordo com o que você precisa. Posso criar desde uma página simples até sites completos com lojas virtuais, adaptando o projeto ao seu orçamento. Vamos conversar sobre o que você imagina para seu negócio e encontrar a melhor solução para você."
  },
  {
    question: "Quanto tempo leva para o site ficar pronto?",
    answer: "Para uma página simples, geralmente levo cerca de 1 semana. Um site mais completo pode levar de 2 a 4 semanas. Após nossa primeira conversa, você receberá um cronograma claro com todas as etapas do projeto."
  },
  {
    question: "O que você precisa de mim para criar o site?",
    answer: "Basicamente suas ideias, algumas fotos do seu negócio e informações sobre o que você oferece. Não se preocupe se não tiver tudo isso pronto - posso ajudar com textos e sugerir imagens profissionais se necessário."
  },
  {
    question: "Meu site vai aparecer no Google?",
    answer: "Sim! Todos os sites que crio seguem as práticas recomendadas para aparecerem bem nas buscas. Para resultados ainda melhores, também ofereço serviços específicos para ajudar seu site a se destacar no Google."
  },
  {
    question: "Preciso pagar mensalmente pelo site?",
    answer: "Existe apenas um custo anual para manter seu site no ar (hospedagem e domínio), que é bem acessível. A criação do site é um pagamento único, sem mensalidades escondidas ou surpresas."
  },
  {
    question: "Vou conseguir atualizar o site sozinho depois?",
    answer: "Se você quiser, posso criar seu site em uma plataforma fácil de atualizar, mesmo sem conhecimentos técnicos. Também ofereço planos de manutenção onde cuido de todas as atualizações para você."
  }
];

const Faq = () => {
  const [openItemId, setOpenItemId] = useState<number | null>(0);
  const isMobile = useIsMobile();

  const toggleItem = (index: number) => {
    setOpenItemId(openItemId === index ? null : index);
  };
  
  // Ref para animação baseada em scroll
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section id="faq" className="py-20 md:py-32 relative overflow-hidden">
      {/* Fundo de estrelas animadas */}
      <EnhancedMovingStars 
        count={isMobile ? 12 : 25} 
        color="#ffffff" 
        maxSize={isMobile ? 12 : 14} 
        minSize={isMobile ? 3 : 4}
        className="z-0 opacity-40" 
      />
      
      {/* Background graphics com animação */}
      <motion.div 
        className={`absolute ${isMobile ? 'top-8 left-6' : 'top-20 left-20'}`}
        animate={{ 
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Star size={isMobile ? 30 : 40} />
      </motion.div>
      <motion.div 
        className="absolute bottom-20 right-20"
        animate={{ 
          x: [0, 15, 0, -15, 0],
          y: [0, -15, 0, 15, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Cross size={30} />
      </motion.div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          ref={sectionRef}
        >
          <div className="inline-block mb-2">
            <div className="flex items-center justify-center">
              <motion.div 
                className="h-[2px] w-6 bg-highlight mr-2"
                initial={{ width: 0 }}
                animate={{ width: "1.5rem" }}
                transition={{ delay: 0.5, duration: 0.5 }}
              ></motion.div>
              <span className="text-highlight uppercase tracking-wider font-medium">FAQ</span>
              <motion.div 
                className="h-[2px] w-6 bg-highlight ml-2"
                initial={{ width: 0 }}
                animate={{ width: "1.5rem" }}
                transition={{ delay: 0.5, duration: 0.5 }}
              ></motion.div>
            </div>
          </div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Dúvidas <span className="text-highlight">frequentes</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Aqui estão as respostas para as perguntas que recebo com mais frequência. Se você tiver outras dúvidas, é só me perguntar!
          </motion.p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {faqData.map((item, index) => (
            <motion.div 
              key={index} 
              className={`mb-4 border-b border-gray-800 pb-4`}
              variants={itemVariants}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.button
                className="flex justify-between items-center w-full text-left font-medium py-2 focus:outline-none"
                onClick={() => toggleItem(index)}
                aria-expanded={openItemId === index}
                whileHover={{ color: "#FF0066" }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xl">{item.question}</span>
                <motion.span 
                  className="text-highlight"
                  animate={openItemId === index ? { rotate: 180 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} />
                </motion.span>
              </motion.button>
              
              <AnimatePresence>
                {openItemId === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.p 
                      className="py-4 text-gray-300"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {item.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action with pulse animation */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          <motion.p 
            className="text-gray-300 mb-6"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            Ainda tem alguma dúvida? Vamos conversar sobre o seu projeto!
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: ["0px 0px 0px rgba(255, 0, 102, 0)", "0px 0px 15px rgba(255, 0, 102, 0.5)", "0px 0px 0px rgba(255, 0, 102, 0)"]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            className="inline-block"
          >
            <Button 
              asChild 
              size="lg"
              className="bg-highlight hover:bg-highlight hover:bg-opacity-80 min-w-[200px] px-8 py-6 text-base"
            >
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
                Entrar em contato
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
