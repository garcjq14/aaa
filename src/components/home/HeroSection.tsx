import React from 'react';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Arquitetura Elegante e Moderna",
  subtitle = "Transformando visões em espaços extraordinários"
}) => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl mb-8">{subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-100 transition-colors">
              Explorar Projetos
            </button>
            <button className="px-8 py-3 border border-white text-white font-semibold rounded-md hover:bg-white/10 transition-colors">
              Entre em Contato
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-1/2 h-full hidden lg:block">
        {/* Imagem ou decoração poderia ser adicionada aqui */}
      </div>
    </section>
  );
};

export default HeroSection; 