import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Star, Cross, Circle } from '@/components/ui/GraphicsElements';
import { ArrowLeft, Send } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Interface para os dados do formulário
export interface PreBriefingFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  howFound: string;
  budget: string;
  deadline: string;
  notes: string;
  // Adicionar o tipo de site escolhido pelo quiz
  projectType: string;
}

interface PreBriefingFormProps {
  projectType: string; // Resultado do quiz
  onSubmit: (data: PreBriefingFormData) => void;
  onBack: () => void; // Voltar para o resultado do quiz
}

// Seu número de WhatsApp (substitua pelo número real)
// Formato internacional sem + ou espaços (ex: 5511999999999 para +55 11 99999-9999)
const WHATSAPP_NUMBER = "5511999999999";

const PreBriefingForm: React.FC<PreBriefingFormProps> = ({ projectType, onSubmit, onBack }) => {
  const isMobile = useIsMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PreBriefingFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: '',
    howFound: '',
    budget: '',
    deadline: '',
    notes: '',
    projectType: projectType
  });
  
  // Lidar com mudanças nos campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Enviar para WhatsApp
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, preencha os campos obrigatórios (nome, email e telefone).",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Preparar a mensagem de WhatsApp
      const message = formatWhatsAppMessage(formData);
      
      // Enviar dados do formulário para o componente pai
      onSubmit(formData);
      
      // Redirecionar para o WhatsApp
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Informações enviadas com sucesso!",
        description: "Redirecionando para o WhatsApp para enviar suas informações.",
      });
    } catch (error) {
      console.error('Erro ao processar dados:', error);
      toast({
        title: "Erro ao processar",
        description: "Ocorreu um erro ao processar suas informações. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Formatar a mensagem para o WhatsApp
  const formatWhatsAppMessage = (data: PreBriefingFormData): string => {
    return `Oi Ane! 👋

Acabei de visitar seu site e fiz o quiz para saber qual tipo de site mais combina com meu projeto. Meu resultado foi: *${data.projectType}*

Gostaria de continuar a conversa sobre o desenvolvimento do meu site. Aqui estão minhas informações:

*DADOS PESSOAIS*
Nome: ${data.name}
Email: ${data.email}
Telefone: ${data.phone}
Empresa: ${data.company || "Não informado"}

*SOBRE O PROJETO*
Tipo de negócio: ${data.businessType || "Não informado"}
Como nos encontrou: ${data.howFound || "Não informado"}
Orçamento: ${data.budget || "Não informado"}
Prazo: ${data.deadline || "Não informado"}

*OBSERVAÇÕES*
${data.notes || "Nenhuma observação adicional"}`;
  };
  
  const formVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      className="bg-black rounded-xl p-5 md:p-8 lg:p-10 relative border border-gray-800 max-w-5xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      {/* Elementos decorativos simples */}
      <div className="absolute -top-3 -left-3">
        <Circle size={isMobile ? 16 : 24} color="#FF0066" />
      </div>
      <div className="absolute -bottom-3 -right-3">
        <Star size={isMobile ? 16 : 24} color="#FF0066" />
      </div>
      <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 hidden md:block">
        <Cross size={16} color="#FF0066" />
      </div>

      <motion.div 
        className="text-center mb-6 md:mb-8"
        variants={itemVariants}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-highlight bg-opacity-20 mb-3 md:mb-4">
          <Send size={isMobile ? 30 : 40} className="text-highlight" />
        </div>
        
        <motion.h2 
          className="text-xl md:text-2xl lg:text-3xl font-bold mb-2"
          variants={itemVariants}
        >
          Informações iniciais do projeto
        </motion.h2>
        <motion.p 
          className="text-gray-400 text-sm md:text-base"
          variants={itemVariants}
        >
          Conte mais sobre você e seu projeto para continuarmos via WhatsApp
        </motion.p>
      </motion.div>
      
      <motion.div 
        className="bg-gray-900 rounded-lg p-5 md:p-7"
        variants={itemVariants}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Informações pessoais */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium mb-4 text-highlight">Suas informações</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-200">
                    Nome completo <span className="text-highlight">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-highlight"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-200">
                    Email <span className="text-highlight">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-highlight"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-200">
                    Telefone / WhatsApp <span className="text-highlight">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-highlight"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2 text-gray-200">
                    Empresa / Negócio
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-highlight"
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Informações do projeto */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium mb-4 text-highlight">Sobre seu projeto</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="businessType" className="block text-sm font-medium mb-2 text-gray-200">
                    Tipo de negócio
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-highlight"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="Profissional Autônomo">Profissional Autônomo</option>
                    <option value="Pequena Empresa">Pequena Empresa</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Serviços">Serviços</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="howFound" className="block text-sm font-medium mb-2 text-gray-200">
                    Como nos encontrou?
                  </label>
                  <select
                    id="howFound"
                    name="howFound"
                    value={formData.howFound}
                    onChange={handleChange}
                    className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-highlight"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="Google">Google</option>
                    <option value="Redes Sociais">Redes Sociais</option>
                    <option value="Indicação">Indicação</option>
                    <option value="Anúncio">Anúncio</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium mb-2 text-gray-200">
                    Orçamento aproximado
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-highlight"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="Até R$ 3.000">Até R$ 3.000</option>
                    <option value="R$ 3.000 a R$ 6.000">R$ 3.000 a R$ 6.000</option>
                    <option value="R$ 6.000 a R$ 10.000">R$ 6.000 a R$ 10.000</option>
                    <option value="Acima de R$ 10.000">Acima de R$ 10.000</option>
                    <option value="A definir">A definir</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium mb-2 text-gray-200">
                    Prazo desejado
                  </label>
                  <select
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-highlight"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="Urgente (até 15 dias)">Urgente (até 15 dias)</option>
                    <option value="Curto (15 a 30 dias)">Curto (15 a 30 dias)</option>
                    <option value="Médio (1 a 2 meses)">Médio (1 a 2 meses)</option>
                    <option value="Longo (mais de 2 meses)">Longo (mais de 2 meses)</option>
                    <option value="Flexível">Flexível</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="notes" className="block text-sm font-medium mb-2 text-gray-200">
                  Observações e detalhes importantes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-highlight"
                  placeholder="Conte mais detalhes sobre o que você precisa..."
                ></textarea>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col md:flex-row gap-4 pt-4 border-t border-gray-800"
              variants={itemVariants}
            >
              <Button
                type="button"
                variant="outline"
                className="md:w-1/3 py-2"
                onClick={onBack}
              >
                <ArrowLeft size={16} className="mr-2" />
                Voltar ao resultado
              </Button>
              
              <Button
                type="submit"
                className="md:w-2/3 bg-highlight hover:bg-highlight hover:bg-opacity-90 py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Continuar para WhatsApp
                    <Send size={16} className="ml-2" />
                  </span>
                )}
              </Button>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PreBriefingForm; 