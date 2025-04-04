
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, Cross, Circle } from '@/components/ui/GraphicsElements';

const NotFound = () => {
  return (
    <section className="min-h-screen bg-black text-white pt-24 flex items-center relative overflow-hidden">
      {/* Background graphics */}
      <div className="absolute top-20 left-10">
        <Star size={40} />
      </div>
      <div className="absolute bottom-20 right-10">
        <Cross size={30} />
      </div>
      <div className="absolute top-1/2 right-1/4">
        <Circle size={50} />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <h1 className="text-7xl md:text-9xl font-bold text-highlight mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Página não encontrada</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          A página que você está procurando não existe ou foi movida para outro endereço.
        </p>
        
        <Button asChild className="bg-highlight hover:bg-highlight hover:bg-opacity-80">
          <Link to="/">
            Voltar para a página inicial
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
