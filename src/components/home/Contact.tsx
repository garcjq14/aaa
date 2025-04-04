import React, { useState } from 'react';
import { Cross, Circle } from '@/components/ui/GraphicsElements';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import EnhancedMovingStars from '../ui/EnhancedMovingStars';
import { useIsMobile } from '@/hooks/use-mobile';
import Logo from '../ui/Logo';

interface FormData {
  name: string;
  email: string;
  phone: string;
  business: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entrarei em contato em breve.",
      });
      setIsSubmitting(false);
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        business: '',
        message: ''
      });
      
      // Redirect to WhatsApp
      const whatsappNumber = "5511999999999"; // Replace with actual number
      const message = `Olá Ane, sou ${formData.name}! Gostaria de conversar sobre um projeto.`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }, 1000);
  };

  return (
    <section id="contato" className="bg-gray-900 text-white py-20 relative overflow-hidden">
      {/* Fundo de estrelas animadas */}
      <EnhancedMovingStars 
        count={isMobile ? 12 : 25} 
        color="#ffffff" 
        className="z-0 opacity-50"
        maxSize={isMobile ? 12 : 16}
        minSize={isMobile ? 3 : 5}
      />
      
      {/* Background graphics */}
      <div className="absolute top-20 right-20">
        <Cross size={30} />
      </div>
      <div className="absolute bottom-20 left-20">
        <Circle size={60} />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto opacity-0 animate-fade-in">
          <div className="inline-block mb-2">
            <div className="flex items-center justify-center">
              <div className="h-[2px] w-6 bg-highlight mr-2"></div>
              <span className="text-highlight uppercase tracking-wider font-medium">Contato</span>
              <div className="h-[2px] w-6 bg-highlight ml-2"></div>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center mb-4">
            <Logo width={60} height={60} withLink={false} className="mb-4" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold flex flex-col items-center justify-center text-center">
              <span className="inline-block">
                Vamos <span className="text-highlight">transformar</span> sua ideia
              </span>
              <span className="inline-block">em realidade?</span>
            </h2>
          </div>
          
          <p className="text-gray-300 text-lg">
            Estou aqui para tirar seu projeto do papel! Me conte um pouco sobre seu negócio e como posso ajudar a criar sua presença online.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="col-span-1 lg:col-span-2 opacity-0 animate-fade-in animate-delay-200">
            <div className="bg-black p-8 rounded-lg border border-gray-800 h-full">
              <h3 className="text-2xl font-bold mb-6">Fale comigo</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-highlight bg-opacity-10 p-3 rounded-full mr-4">
                    <Phone className="text-highlight" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Telefone / WhatsApp</h4>
                    <p className="text-gray-400">+55 (11) 99999-9999</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-highlight bg-opacity-10 p-3 rounded-full mr-4">
                    <Mail className="text-highlight" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">E-mail</h4>
                    <p className="text-gray-400">contato@anegarcia.com.br</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="font-medium mb-4">Quando estou disponível</h4>
                <p className="text-gray-400 mb-2">Segunda a Sexta: 13h às 18h</p>
                <p className="text-gray-400">Sábado: 10h às 16h</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="col-span-1 lg:col-span-3 opacity-0 animate-fade-in animate-delay-400">
            <div className="bg-black p-8 rounded-lg border border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Me conte sobre seu projeto</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nome completo <span className="text-highlight">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-gray-900 border border-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-highlight"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      E-mail <span className="text-highlight">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-gray-900 border border-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-highlight"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Telefone / WhatsApp <span className="text-highlight">*</span>
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-gray-900 border border-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-highlight"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="business" className="block text-sm font-medium mb-2">
                      Tipo de projeto
                    </label>
                    <select 
                      id="business" 
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      className="bg-gray-900 border border-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-highlight"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="Site profissional">Site profissional</option>
                      <option value="Loja virtual">Loja virtual</option>
                      <option value="Página de vendas">Página de vendas</option>
                      <option value="Blog">Blog</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensagem <span className="text-highlight">*</span>
                  </label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-gray-900 border border-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-highlight"
                  ></textarea>
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    className="w-full bg-highlight hover:bg-highlight hover:bg-opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Iniciar conversa"}
                  </Button>
                  
                  <p className="text-center text-xs text-gray-400 mt-4">
                    Ao enviar, você será redirecionado para o WhatsApp para iniciar a conversa.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
