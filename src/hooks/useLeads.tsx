import { useState, useEffect, useCallback } from 'react';
import { crmService } from '@/lib/crmService';
import { LeadData, LeadStatus, LeadInteraction } from '@/types/crm';

// Hook para gerenciar leads
export const useLeads = () => {
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Carregar leads
  const loadLeads = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const loadedLeads = await crmService.getAllLeads();
      setLeads(loadedLeads);
    } catch (err) {
      console.error('Erro ao carregar leads:', err);
      setError('Não foi possível carregar os leads. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Carregar leads ao montar o componente
  useEffect(() => {
    loadLeads();
  }, [loadLeads]);
  
  // Atualizar o status de um lead
  const updateLeadStatus = async (leadId: string, status: LeadStatus) => {
    try {
      const updatedLead = await crmService.updateLeadStatus(leadId, status);
      
      if (updatedLead) {
        setLeads(prevLeads => 
          prevLeads.map(lead => 
            lead.id === leadId ? updatedLead : lead
          )
        );
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Erro ao atualizar status do lead:', err);
      setError('Não foi possível atualizar o status do lead.');
      return false;
    }
  };
  
  // Adicionar uma interação a um lead
  const addLeadInteraction = async (
    leadId: string,
    interaction: Omit<LeadInteraction, 'id' | 'date'>
  ) => {
    try {
      const updatedLead = await crmService.addLeadInteraction(leadId, interaction);
      
      if (updatedLead) {
        setLeads(prevLeads => 
          prevLeads.map(lead => 
            lead.id === leadId ? updatedLead : lead
          )
        );
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Erro ao adicionar interação:', err);
      setError('Não foi possível adicionar a interação.');
      return false;
    }
  };
  
  // Filtrar leads por status
  const filterLeadsByStatus = (status: LeadStatus) => {
    return leads.filter(lead => lead.status === status);
  };
  
  // Filtrar leads por tag
  const filterLeadsByTag = (tag: string) => {
    return leads.filter(lead => lead.tags.includes(tag));
  };
  
  // Exportar leads para CSV
  const exportLeadsToCsv = async () => {
    try {
      const csvContent = await crmService.exportToCsv();
      
      // Criar blob e iniciar download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return true;
    } catch (err) {
      console.error('Erro ao exportar leads:', err);
      setError('Não foi possível exportar os leads para CSV.');
      return false;
    }
  };

  // Atualizar um lead
  const updateLead = async (lead: LeadData) => {
    try {
      const updatedLead = await crmService.updateLead(lead);
      
      if (updatedLead) {
        setLeads(prevLeads => 
          prevLeads.map(l => 
            l.id === lead.id ? updatedLead : l
          )
        );
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Erro ao atualizar lead:', err);
      setError('Não foi possível atualizar o lead.');
      return false;
    }
  };
  
  return {
    leads,
    isLoading,
    error,
    loadLeads,
    updateLeadStatus,
    addLeadInteraction,
    filterLeadsByStatus,
    filterLeadsByTag,
    exportLeadsToCsv,
    updateLead
  };
}; 