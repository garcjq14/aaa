import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PreBriefingData } from '@/types/crm';
import { crmService } from '@/lib/crmService';
import { toast } from '@/hooks/use-toast';

interface PreBriefingFormProps {
  onComplete: (leadId: string) => void;
}

export const PreBriefingForm: React.FC<PreBriefingFormProps> = ({ onComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PreBriefingData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: '',
    howFound: '',
    budget: '',
    deadline: '',
    notes: ''
  });
  
  // Lidar com mudanças nos campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Enviar formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, preencha os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Criar lead no CRM
      const lead = await crmService.createLead(formData);
      
      toast({
        title: "Dados salvos com sucesso!",
        description: "Agora você pode prosseguir para o quiz.",
      });
      
      // Callback para o componente pai com o ID do lead
      onComplete(lead.id);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      toast({
        title: "Erro ao salvar dados",
        description: "Ocorreu um erro ao processar suas informações.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
      className="max-w-2xl mx-auto bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-800"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <motion.h2 
        className="text-2xl md:text-3xl font-bold mb-6 text-white"
        variants={itemVariants}
      >
        Preencha seus dados
      </motion.h2>
      
      <motion.p 
        className="text-gray-300 mb-8"
        variants={itemVariants}
      >
        Precisamos de algumas informações para personalizar sua experiência e 
        para que possamos entrar em contato com as melhores soluções para seu negócio.
      </motion.p>
      
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
                  <option value="Urgente (até 2 semanas)">Urgente (até 2 semanas)</option>
                  <option value="Curto (2-4 semanas)">Curto (2-4 semanas)</option>
                  <option value="Médio (1-2 meses)">Médio (1-2 meses)</option>
                  <option value="Flexível (acima de 2 meses)">Flexível (acima de 2 meses)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium mb-2 text-gray-200">
                Observações adicionais
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-highlight"
                placeholder="Descreva brevemente seu projeto ou necessidades específicas..."
              />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="pt-4">
            <p className="text-sm text-gray-400 mb-6">
              Ao preencher este formulário, você concorda com nossa política de privacidade 
              e aceita receber comunicações relacionadas ao seu projeto.
            </p>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full bg-highlight text-white font-medium py-3 rounded-lg transition
                ${isSubmitting 
                  ? 'opacity-70 cursor-not-allowed' 
                  : 'hover:bg-opacity-90'}
              `}
            >
              {isSubmitting ? 'Processando...' : 'Enviar informações'}
            </button>
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
}; 