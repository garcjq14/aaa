import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Star, Cross, Circle } from '@/components/ui/GraphicsElements';
import { useIsMobile } from '@/hooks/use-mobile';

const PortfolioFisioBemEstarPage = () => {
  const isMobile = useIsMobile();
  
  // Galeria de imagens do projeto
  const projectImages = [
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1573166953836-c078140a1758?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1581056771107-24247a210b28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
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
                  <span className="bg-highlight rounded-full px-2 py-1 text-xs font-medium">Site Institucional</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Fisio Bem-Estar</h1>
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-4">
              <a 
                href="https://fisiobemestar.example.com" 
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
            alt="Fisio Bem-Estar - Visão geral" 
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
                Fisio Bem-Estar é uma clínica de fisioterapia que buscava estabelecer uma presença online 
                profissional para atrair novos pacientes e divulgar seus serviços especializados. O objetivo 
                era criar um site institucional que transmitisse confiança, profissionalismo e destacasse 
                a equipe de especialistas.
              </p>
              <p>
                O design foi desenvolvido para transmitir tranquilidade e bem-estar, utilizando uma paleta 
                de cores suaves e imagens que representam cuidado e recuperação. A estrutura do site foi 
                planejada para apresentar de forma clara os diversos tratamentos oferecidos, a equipe 
                de profissionais e as instalações da clínica.
              </p>
              <p>
                Um diferencial importante foi a criação de um blog especializado com conteúdo educativo 
                sobre fisioterapia, saúde e bem-estar, além de uma área de depoimentos de pacientes que 
                fortalece a credibilidade do serviço e um sistema de agendamento integrado.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-900 p-5 md:p-6 rounded-lg border border-gray-800 h-fit">
            <h3 className="text-lg font-bold mb-4">Detalhes do projeto</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Categoria</h4>
                <p className="text-sm md:text-base">Site Institucional</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Cliente</h4>
                <p className="text-sm md:text-base">Clínica Fisio Bem-Estar</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Prazo</h4>
                <p className="text-sm md:text-base">6 semanas</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Tecnologias</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-black px-2 py-1 rounded text-xs">WordPress</span>
                  <span className="bg-black px-2 py-1 rounded text-xs">PHP</span>
                  <span className="bg-black px-2 py-1 rounded text-xs">JavaScript</span>
                  <span className="bg-black px-2 py-1 rounded text-xs">CSS</span>
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
                  alt={`Fisio Bem-Estar - Imagem ${index + 2}`} 
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
                "Apresentação detalhada de todos os tratamentos oferecidos",
                "Página da equipe com perfil de cada profissional",
                "Sistema de agendamento online integrado",
                "Blog especializado sobre fisioterapia e saúde",
                "Galeria de fotos das instalações da clínica",
                "Área de depoimentos de pacientes para fortalecer a credibilidade"
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
                Um dos principais desafios foi criar páginas detalhadas para cada tipo de tratamento 
                oferecido, com informações técnicas de forma acessível e compreensível para os pacientes, 
                mantendo o SEO otimizado para cada especialidade.
              </p>
              <p>
                Também foi necessário desenvolver um sistema que permitisse à equipe atualizar facilmente 
                o blog com novos conteúdos, sem depender de suporte técnico, o que foi solucionado com um 
                painel administrativo personalizado e intuitivo.
              </p>
            </div>
          </div>
        </div>

        {/* Resultados e testemunho */}
        <div className="bg-gray-900 rounded-lg p-6 md:p-8 mb-10 md:mb-16 border border-gray-800">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Resultados</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
              <div className="text-highlight text-2xl sm:text-3xl md:text-4xl font-bold mb-2">40%</div>
              <p className="text-xs sm:text-sm text-gray-400">Aumento nos agendamentos</p>
            </div>
            
            <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
              <div className="text-highlight text-2xl sm:text-3xl md:text-4xl font-bold mb-2">300%</div>
              <p className="text-xs sm:text-sm text-gray-400">Mais visitas orgânicas</p>
            </div>
            
            <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
              <div className="text-highlight text-2xl sm:text-3xl md:text-4xl font-bold mb-2">25%</div>
              <p className="text-xs sm:text-sm text-gray-400">Novos pacientes por mês</p>
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
                  Sistema de agendamento online com lembretes automáticos por email e SMS
                </p>
              </div>
              <div className="flex items-start">
                <Check size={16} className="text-highlight mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm md:text-base">
                  Área de blog especializada com conteúdo sobre fisioterapia e bem-estar
                </p>
              </div>
              <div className="flex items-start">
                <Check size={16} className="text-highlight mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm md:text-base">
                  Galeria de fotos das instalações e equipamentos da clínica
                </p>
              </div>
              <div className="flex items-start">
                <Check size={16} className="text-highlight mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm md:text-base">
                  Formulário de contato com opções de agendamento e dúvidas frequentes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Interessado em um projeto similar?</h2>
          <p className="text-gray-300 text-sm md:text-base mb-6 max-w-2xl mx-auto">
            Posso desenvolver um site institucional para sua clínica ou centro de saúde, destacando seus 
            serviços, equipe e diferenciais, além de implementar ferramentas que facilitam o agendamento 
            e a comunicação com seus pacientes.
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

export default PortfolioFisioBemEstarPage;
