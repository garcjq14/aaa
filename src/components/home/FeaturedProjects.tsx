import React from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

const FeaturedProjects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Residência Harmonia",
      description: "Uma casa moderna que integra espaços internos e externos de forma harmoniosa.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Residencial"
    },
    {
      id: 2,
      title: "Escritório Panorama",
      description: "Espaço corporativo com design biofílico e amplas janelas para maximizar a luz natural.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Comercial"
    },
    {
      id: 3,
      title: "Centro Cultural Athena",
      description: "Um centro cultural que preserva elementos históricos enquanto introduz conceitos modernos.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Institucional"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Projetos em Destaque</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conheça alguns dos nossos projetos mais recentes e inovadores que transformaram ideias em realidade.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <span className="text-sm font-medium px-3 py-1 bg-gray-100 rounded-full mb-3 inline-block">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <button className="text-blue-600 font-medium hover:underline">
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-6 py-3 border border-gray-300 rounded-md font-medium hover:bg-gray-100 transition-colors">
            Ver todos os projetos
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects; 