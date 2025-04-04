import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Star, Cross, Circle } from '@/components/ui/GraphicsElements';
import { useIsMobile } from '@/hooks/use-mobile';

const PortfolioCoachMariaPage = () => {
  const isMobile = useIsMobile();
  
  // Galeria de imagens do projeto
  const projectImages = [
    "https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1591291621164-2c6367723315?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  ];

  return (
    <section className="min-h-screen bg-black text-white pt-20 pb-16 md:pb-20 relative overflow-hidden">
      {/* Elementos gráficos de fundo */}
      <div className="absolute top-40 left-4 md:left-10 opacity-50 md:opacity-100">
        <Star size={isMobile ? 24 : 40} color="#FF0066" />
      </div>
      <div className="absolute bottom-20 md:bottom-40 right-4 md:right-10 opacity-50 md:opacity-100">
        <Cross size={isMobile ? 20 : 30} color="#FF0066" />
      </div>
      <div className="absolute top-1/3 right-1/5 opacity-50 md:opacity-100 hidden md:block">
        <Circle size={50} color="#FF0066" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Voltar ao portfólio */}
        <div className="mb-6 md:mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            className="mb-4 text-gray-400 hover:text-white flex items-center gap-1"
            asChild
          >
            <Link to="/#portfolio">
              <ArrowLeft size={16} />
              <span className="text-sm md:text-base">Voltar ao portfólio</span>
            </Link>
          </Button>
        </div>

        {/* Cabeçalho do projeto */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div>
              <div className="inline-block mb-2">
                <div className="flex items-center">
                  <span className="bg-highlight rounded-full px-2 py-1 text-xs font-medium">Site Profissional</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Coach Maria Silva</h1>
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-4">
              <a 
                href="https://coachmaria.example.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors px-3 py-2 rounded-md text-sm"
              >
                <ExternalLink size={14} />
                Visitar site
              </a>
              
              <Button 
                asChild 
                className="bg-highlight hover:bg-highlight hover:bg-opacity-90"
              >
                <Link to="/#contato">
                  Projeto similar
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Imagem principal do projeto */}
        <div className="rounded-lg overflow-hidden mb-8 md:mb-12">
          <img 
            src={projectImages[0]} 
            alt="Coach Maria Silva - Visão geral" 
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          />
        </div>

        {/* Descrição do projeto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-16">
          <div className="md:col-span-2">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-6">
              <p className="text-gray-300 text-sm">
                <span className="text-highlight font-medium">Nota:</span> Este é um projeto exemplo que demonstra as possibilidades e funcionalidades que posso implementar. Cada projeto é único e desenvolvido de acordo com as necessidades específicas do cliente.
              </p>
            </div>

            <h2 className="text-xl md:text-2xl font-bold mb-4">Sobre o projeto</h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base">
              <p>
                Maria Silva é uma coach de carreira e desenvolvimento pessoal que precisava de um site profissional 
                para fortalecer sua marca pessoal e expandir seu alcance. O objetivo era criar uma plataforma que 
                transmitisse sua abordagem motivacional e integrasse ferramentas de marketing digital para 
                crescimento do seu negócio.
              </p>
              <p>
                O design foi desenvolvido para refletir a personalidade vibrante e inspiradora da cliente, 
                utilizando cores energéticas e elementos visuais motivacionais. A estrutura do site foi 
                planejada para guiar os visitantes por uma jornada que apresenta a metodologia da coach, 
                seus serviços e produtos digitais.
              </p>
              <p>
                Um diferencial importante foi a integração com plataformas de cursos online e e-commerce 
                para venda de e-books, além de um sistema de agendamento para sessões individuais e um blog 
                com conteúdo estratégico para captação de leads.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-900 p-5 md:p-6 rounded-lg border border-gray-800 h-fit">
            <h3 className="text-lg font-bold mb-4">Detalhes do projeto</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Categoria</h4>
                <p className="text-sm md:text-base">Site Profissional</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Cliente</h4>
                <p className="text-sm md:text-base">Maria Silva</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Prazo</h4>
                <p className="text-sm md:text-base">5 semanas</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Tecnologias</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-black px-2 py-1 rounded text-xs">WordPress</span>
                  <span className="bg-black px-2 py-1 rounded text-xs">WooCommerce</span>
                  <span className="bg-black px-2 py-1 rounded text-xs">LearnDash</span>
                  <span className="bg-black px-2 py-1 rounded text-xs">Elementor</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Galeria de imagens secundárias */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Galeria do projeto</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projectImages.slice(1).map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden h-[200px] md:h-[220px]">
                <img 
                  src={image} 
                  alt={`Coach Maria Silva - Imagem ${index + 2}`} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recursos e desafios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-16">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">Funcionalidades</h2>
            <ul className="space-y-3">
              {[
                "Plataforma integrada de cursos online com área de membros",
                "Loja virtual para venda de e-books e materiais digitais",
                "Sistema de agendamento para sessões de coaching",
                "Blog estratégico com conteúdo para captação de leads",
                "Formulários para inscrição em newsletter com segmentação",
                "Integração com redes sociais e ferramentas de marketing"
              ].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check size={16} className="text-highlight mr-2 mt-1 flex-shrink-0" />
                  <span className="text-sm md:text-base text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">Desafios</h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base">
              <p>
                Um dos principais desafios foi integrar múltiplas plataformas (cursos, e-commerce, 
                blog e agendamento) em uma experiência coesa para o usuário, mantendo a navegação 
                intuitiva e o design consistente.
              </p>
              <p>
                Também foi necessário desenvolver um sistema de automação de marketing que permitisse 
                à coach acompanhar a jornada dos leads, desde o primeiro contato até a conversão em 
                cliente, otimizando suas estratégias de vendas.
              </p>
            </div>
          </div>
        </div>

        {/* Resultados e testemunho */}
        <div className="bg-gray-900 rounded-lg p-6 md:p-8 mb-10 md:mb-16 border border-gray-800">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Resultados</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
              <div className="text-highlight text-2xl sm:text-3xl md:text-4xl font-bold mb-2">120%</div>
              <p className="text-xs sm:text-sm text-gray-400">Aumento na lista de email</p>
            </div>
            
            <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
              <div className="text-highlight text-2xl sm:text-3xl md:text-4xl font-bold mb-2">85%</div>
              <p className="text-xs sm:text-sm text-gray-400">Mais vendas de produtos</p>
            </div>
            
            <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
              <div className="text-highlight text-2xl sm:text-3xl md:text-4xl font-bold mb-2">65%</div>
              <p className="text-xs sm:text-sm text-gray-400">Aumento na receita mensal</p>
            </div>
          </div>
          
          <div className="bg-black bg-opacity-50 p-5 md:p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="text-highlight text-3xl font-bold mr-2">"</div>
              <h3 className="text-lg font-medium">Vantagens do Projeto</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Check size={16} className="text-highlight mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm md:text-base">
                  Sistema de agendamento integrado com calendário e confirmação automática
                </p>
              </div>
              <div className="flex items-start">
                <Check size={16} className="text-highlight mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm md:text-base">
                  Área de membros para acesso a conteúdo exclusivo e materiais de apoio
                </p>
              </div>
              <div className="flex items-start">
                <Check size={16} className="text-highlight mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm md:text-base">
                  Integração com plataformas de pagamento para venda de produtos digitais
                </p>
              </div>
              <div className="flex items-start">
                <Check size={16} className="text-highlight mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm md:text-base">
                  Blog com sistema de categorização para melhor organização do conteúdo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Interessado em um projeto similar?</h2>
          <p className="text-gray-300 text-sm md:text-base mb-6 max-w-2xl mx-auto">
            Posso desenvolver um site profissional personalizado para seu negócio de coaching, consultoria 
            ou infoprodutos, integrando ferramentas de marketing, vendas e gestão de clientes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              className="bg-highlight hover:bg-highlight hover:bg-opacity-90 flex items-center justify-center"
            >
              <Link to="/#contato">
                Vamos conversar sobre seu projeto
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              asChild
            >
              <Link to="/#portfolio">
                Ver mais projetos
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCoachMariaPage;
