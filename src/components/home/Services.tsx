import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Circle, Cross } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Services = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="bg-black text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Background graphics - reduzidos em mobile */}
      <div className="absolute top-0 right-0 opacity-20">
        <svg width={isMobile ? "200" : "300"} height={isMobile ? "200" : "300"} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="150" r="150" fill="#FF0066" fillOpacity="0.1" />
          <circle cx="150" cy="150" r="100" stroke="#FF0066" strokeOpacity="0.2" strokeWidth="2" />
          <circle cx="150" cy="150" r="50" stroke="#FF0066" strokeOpacity="0.3" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto opacity-0 animate-fade-in">
          <div className="inline-block mb-2">
            <div className="flex items-center justify-center">
              <div className="h-[2px] w-6 bg-highlight mr-2"></div>
              <span className="text-highlight uppercase tracking-wider text-sm font-medium">Como posso ajudar</span>
              <div className="h-[2px] w-6 bg-highlight ml-2"></div>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Vamos encontrar o site perfeito para você
          </h2>
          
          <p className="text-gray-300 text-base sm:text-lg">
            Não tem certeza de qual tipo de site você precisa? Sem problema! Responda algumas perguntas simples e vou ajudar você a descobrir a melhor solução para o seu negócio.
          </p>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto relative opacity-0 animate-fade-in animate-delay-300">
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4">
            <Circle size={isMobile ? 20 : 24} color="#FF0066" strokeWidth={2} />
          </div>
          <div className="absolute -bottom-4 -right-4">
            <Star size={isMobile ? 20 : 24} color="#FF0066" strokeWidth={2} />
          </div>
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 hidden sm:block">
            <Cross size={24} color="#FF0066" strokeWidth={2} />
          </div>
          
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
              Que tipo de site combina mais com o seu negócio?
            </h3>
            
            <p className="text-gray-300 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
              Em apenas alguns minutos, você descobrirá qual solução pode trazer mais resultados para sua empresa ou serviço. É rápido e descomplicado!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div className="bg-black bg-opacity-50 p-4 sm:p-6 rounded-lg border border-gray-800 hover:border-highlight transition-all">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-highlight bg-opacity-20 rounded-full flex items-center justify-center text-highlight font-bold mb-3 sm:mb-4 mx-auto">
                  1
                </div>
                <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Conte sobre seu negócio</h4>
                <p className="text-xs sm:text-sm text-gray-400">Com perguntas simples e diretas</p>
              </div>
              
              <div className="bg-black bg-opacity-50 p-4 sm:p-6 rounded-lg border border-gray-800 hover:border-highlight transition-all">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-highlight bg-opacity-20 rounded-full flex items-center justify-center text-highlight font-bold mb-3 sm:mb-4 mx-auto">
                  2
                </div>
                <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Receba sugestões</h4>
                <p className="text-xs sm:text-sm text-gray-400">Feitas especialmente para você</p>
              </div>
              
              <div className="bg-black bg-opacity-50 p-4 sm:p-6 rounded-lg border border-gray-800 hover:border-highlight transition-all">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-highlight bg-opacity-20 rounded-full flex items-center justify-center text-highlight font-bold mb-3 sm:mb-4 mx-auto">
                  3
                </div>
                <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Comece seu projeto</h4>
                <p className="text-xs sm:text-sm text-gray-400">Com uma solução sob medida</p>
              </div>
            </div>
            
            <Button asChild size={isMobile ? "default" : "lg"} className="bg-highlight hover:bg-highlight hover:bg-opacity-90 w-full sm:w-auto">
              <Link to="/quiz" className="flex items-center justify-center">
                Fazer o teste agora
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
