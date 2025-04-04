import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
}

const projects: Project[] = [
  {
    title: "Studio Arquitetura",
    description: "Site elegante e sofisticado para escritório de arquitetura, com foco em apresentação de projetos e experiência do usuário.",
    image: "https://images.unsplash.com/photo-1613252632647-13a0294a0d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/portfolio/studio-arquitetura",
    category: "Portfólio"
  },
  {
    title: "Tech Solutions",
    description: "Plataforma de soluções tecnológicas para empresas, com foco em transformação digital e inovação.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/portfolio/tech-solutions",
    category: "Sistema"
  },
  {
    title: "Café Bistro",
    description: "Site para restaurante com cardápio digital, sistema de reservas e integração com delivery.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/portfolio/cafe-bistro",
    category: "E-commerce"
  }
];

export const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Portfólio</h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
            Conheça alguns dos nossos projetos mais recentes e veja como ajudamos nossos clientes a alcançarem seus objetivos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-4 right-4">{project.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="ghost" className="w-full">
                  <Link to={project.link}>
                    Ver detalhes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}; 