import React from 'react';

interface Stat {
  value: string;
  label: string;
  description: string;
}

const StatsSection: React.FC = () => {
  const stats: Stat[] = [
    {
      value: "120+",
      label: "Projetos Concluídos",
      description: "Entregamos mais de 120 projetos com excelência e satisfação dos clientes."
    },
    {
      value: "15",
      label: "Anos de Experiência",
      description: "Temos 15 anos de experiência no mercado de arquitetura e design."
    },
    {
      value: "35",
      label: "Prêmios Recebidos",
      description: "Nossos projetos foram reconhecidos com 35 prêmios nacionais e internacionais."
    },
    {
      value: "18",
      label: "Profissionais",
      description: "Nossa equipe é composta por 18 profissionais altamente qualificados."
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Nossa Trajetória em Números</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Ao longo dos anos, construímos uma reputação sólida baseada em resultados 
            excepcionais e relacionamentos duradouros com nossos clientes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 bg-gray-800 rounded-lg text-center hover:bg-gray-700 transition-colors">
              <div className="text-4xl font-bold text-blue-400 mb-3">{stat.value}</div>
              <h3 className="text-xl font-semibold mb-3">{stat.label}</h3>
              <p className="text-gray-400">{stat.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="/sobre" className="inline-flex items-center text-blue-400 hover:text-blue-300">
            <span className="mr-2">Conheça nossa história completa</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 