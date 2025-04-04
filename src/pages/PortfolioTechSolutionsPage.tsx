import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Star, Cross, Circle } from '@/components/ui/GraphicsElements';
import { useIsMobile } from '@/hooks/use-mobile';

const PortfolioTechSolutionsPage = () => {
  const isMobile = useIsMobile();
  
  // Galeria de imagens do projeto
  const projectImages = [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1573164574026-dd900f5d5998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1573497491765-55b568cea7e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
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
                  <span className="bg-highlight rounded-full px-2 py-1 text-xs font-medium">Site Corporativo</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Tech Solutions</h1>
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-4">
              <a 
                href="/website/tech-solutions" 
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
            alt="Tech Solutions - Visão geral" 
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
                Tech Solutions é uma empresa de tecnologia com foco em soluções para pequenas e médias empresas. 
                O desafio era criar um site corporativo moderno que apresentasse os serviços da empresa de forma 
                clara e objetiva, transmitindo confiança e inovação.
              </p>
              <p>
                O site foi desenvolvido com uma abordagem focada na experiência do usuário, com uma navegação intuitiva 
                e apresentação de informações de forma objetiva. Foi utilizada uma paleta de cores moderna e tecnológica, 
                combinando tons de azul e cinza com detalhes em verde para destacar elementos importantes.
              </p>
              <p>
                Além da apresentação institucional, o site conta com um blog de conteúdos sobre tecnologia e inovação, 
                área de cases de sucesso e um sistema de suporte integrado para os clientes da empresa.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-900 p-5 md:p-6 rounded-lg border border-gray-800 h-fit">
            <h3 className="text-lg font-bold mb-4">Detalhes do projeto</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Categoria</h4>
                <p className="text-sm md:text-base">Site Corporativo</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Cliente</h4>
                <p className="text-sm md:text-base">Tech Solutions</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Prazo</h4>
                <p className="text-sm md:text-base">6 semanas</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Tecnologias</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-black px-2 py-1 rounded text-xs">React</span>
                  <span className="bg-black px-2 py-1 rounded text-xs">TypeScript</span>
                  <span className="bg-black px-2 py-1 rounded text-xs">Node.js</span>
                  <span className="bg-black px-2 py-1 rounded text-xs">MySQL</span>
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
                  alt={`Tech Solutions - Imagem ${index + 2}`} 
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
                "Apresentação de serviços com módulo de solicitação de orçamento",
                "Blog de conteúdos sobre tecnologia e inovação",
                "Galeria de cases de sucesso com detalhes dos projetos",
                "Sistema de suporte integrado para clientes",
                "Integração com CRM para gestão de leads",
                "Painel administrativo para gerenciamento de conteúdo"
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
                Um dos principais desafios foi integrar o sistema de suporte ao site, permitindo 
                que os clientes acessassem tickets e documentação técnica de forma segura e personalizada.
              </p>
              <p>
                Outro ponto importante foi a implementação do blog com um sistema de categorização 
                e filtragem eficiente, permitindo que os usuários encontrassem facilmente os conteúdos 
                de seu interesse.
              </p>
            </div>
          </div>
        </div>

        {/* Resultados e vantagens */}
        <div className="bg-gray-900 rounded-lg p-6 md:p-8 mb-10 md:mb-16 border border-gray-800">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Resultados</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
              <div className="text-highlight text-2xl sm:text-3xl md:text-4xl font-bold mb-2">48%</div>
              <p className="text-xs sm:text-sm text-gray-400">Aumento de leads</p>
            </div>
            
            <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
              <div className="text-highlight text-2xl sm:text-3xl md:text-4xl font-bold mb-2">32%</div>
              <p className="text-xs sm:text-sm text-gray-400">Redução no tempo de suporte</p>
            </div>
            
            <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
              <div className="text-highlight text-2xl sm:text-3xl md:text-4xl font-bold mb-2">12</div>
              <p className="text-xs sm:text-sm text-gray-400">Novos clientes em 3 meses</p>
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
                  Sistema de suporte integrado com tickets e documentação técnica
                </p>
              </div>
              <div className="flex items-start">
                <Check size={16} className="text-highlight mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm md:text-base">
                  Blog com sistema de categorização e filtros avançados
                </p>
              </div>
              <div className="flex items-start">
                <Check size={16} className="text-highlight mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm md:text-base">
                  Área de cases com apresentação detalhada dos projetos realizados
                </p>
              </div>
              <div className="flex items-start">
                <Check size={16} className="text-highlight mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm md:text-base">
                  Integração com CRM para gestão eficiente de leads e clientes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Interessado em um projeto similar?</h2>
          <p className="text-gray-300 text-sm md:text-base mb-6 max-w-2xl mx-auto">
            Posso criar um site corporativo personalizado para sua empresa de tecnologia ou qualquer outro 
            segmento, ajudando a fortalecer sua presença online e converter visitantes em clientes.
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

export default PortfolioTechSolutionsPage;
