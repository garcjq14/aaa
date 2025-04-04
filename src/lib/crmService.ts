import { LeadData, PreBriefingData, LeadStatus, CrmConfig, LeadInteraction, DashboardStats } from '@/types/crm';

// Configuração padrão do CRM
const defaultCrmConfig: CrmConfig = {
  syncEnabled: false,
  syncFrequency: "daily",
  leadsTags: ["quiz"]
};

// Classe para gerenciar o serviço de CRM
class CrmService {
  private config: CrmConfig;
  
  constructor() {
    // Carrega a configuração do localStorage ou usa a padrão
    const savedConfig = localStorage.getItem('crmConfig');
    this.config = savedConfig ? JSON.parse(savedConfig) : defaultCrmConfig;
  }
  
  // Salvar um novo lead com dados do pré-briefing
  async createLead(preBriefing: PreBriefingData): Promise<LeadData> {
    const newLead: LeadData = {
      ...preBriefing,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: LeadStatus.NEW,
      tags: [...this.config.leadsTags],
      interactions: [],
      source: "quiz"
    };
    
    // Salva o lead localmente
    await this.saveLeadLocally(newLead);
    
    // Sincroniza com CRM externo se configurado
    if (this.config.syncEnabled && this.config.apiUrl) {
      try {
        await this.syncLeadWithExternalCrm(newLead);
      } catch (error) {
        console.error('Erro ao sincronizar com CRM externo:', error);
      }
    }
    
    return newLead;
  }
  
  // Atualizar um lead existente com os resultados do quiz
  async updateLeadWithQuizResults(
    leadId: string, 
    quizAnswers: Record<number, string>,
    quizResult: string
  ): Promise<LeadData | null> {
    const lead = await this.getLeadById(leadId);
    
    if (!lead) return null;
    
    const updatedLead: LeadData = {
      ...lead,
      quizAnswers,
      quizResult,
      updatedAt: new Date(),
      tags: [...lead.tags, `resultado:${quizResult}`]
    };
    
    await this.saveLeadLocally(updatedLead);
    
    // Sincroniza com CRM externo se configurado
    if (this.config.syncEnabled && this.config.apiUrl) {
      try {
        await this.syncLeadWithExternalCrm(updatedLead);
      } catch (error) {
        console.error('Erro ao sincronizar com CRM externo:', error);
      }
    }
    
    return updatedLead;
  }
  
  // Obter todos os leads
  async getAllLeads(): Promise<LeadData[]> {
    const leadsJson = localStorage.getItem('crmLeads');
    if (!leadsJson) return [];
    
    const leads: LeadData[] = JSON.parse(leadsJson);
    
    // Conversão de datas
    return leads.map(lead => ({
      ...lead,
      createdAt: new Date(lead.createdAt),
      updatedAt: new Date(lead.updatedAt),
      followUpDate: lead.followUpDate ? new Date(lead.followUpDate) : undefined,
      interactions: lead.interactions.map(interaction => ({
        ...interaction,
        date: new Date(interaction.date)
      }))
    }));
  }
  
  // Obter um lead específico pelo ID
  async getLeadById(id: string): Promise<LeadData | null> {
    const leads = await this.getAllLeads();
    return leads.find(lead => lead.id === id) || null;
  }
  
  // Atualizar o status de um lead
  async updateLeadStatus(id: string, status: LeadStatus): Promise<LeadData | null> {
    const lead = await this.getLeadById(id);
    
    if (!lead) return null;
    
    const updatedLead: LeadData = {
      ...lead,
      status,
      updatedAt: new Date()
    };
    
    await this.saveLeadLocally(updatedLead);
    return updatedLead;
  }
  
  // Adicionar uma interação a um lead
  async addLeadInteraction(
    leadId: string,
    interaction: Omit<LeadInteraction, 'id' | 'date'>
  ): Promise<LeadData | null> {
    const lead = await this.getLeadById(leadId);
    
    if (!lead) return null;
    
    const newInteraction = {
      ...interaction,
      id: this.generateId(),
      date: new Date()
    };
    
    const updatedLead: LeadData = {
      ...lead,
      interactions: [...lead.interactions, newInteraction],
      updatedAt: new Date()
    };
    
    await this.saveLeadLocally(updatedLead);
    return updatedLead;
  }

  // Atualizar um lead
  async updateLead(updatedLead: LeadData): Promise<LeadData | null> {
    const lead = await this.getLeadById(updatedLead.id);
    
    if (!lead) return null;
    
    const newLead: LeadData = {
      ...updatedLead,
      updatedAt: new Date()
    };
    
    await this.saveLeadLocally(newLead);
    return newLead;
  }
  
  // Atualizar as configurações do CRM
  updateConfig(newConfig: Partial<CrmConfig>): void {
    this.config = {
      ...this.config,
      ...newConfig
    };
    
    localStorage.setItem('crmConfig', JSON.stringify(this.config));
  }

  // Obter configurações
  getConfig(): CrmConfig {
    return {...this.config};
  }
  
  // Gerar ID único
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
  
  // Salvar lead no armazenamento local
  private async saveLeadLocally(lead: LeadData): Promise<void> {
    const leads = await this.getAllLeads();
    const existingIndex = leads.findIndex(l => l.id === lead.id);
    
    if (existingIndex >= 0) {
      leads[existingIndex] = lead;
    } else {
      leads.push(lead);
    }
    
    localStorage.setItem('crmLeads', JSON.stringify(leads));
  }
  
  // Sincronizar com CRM externo
  private async syncLeadWithExternalCrm(lead: LeadData): Promise<void> {
    if (!this.config.apiUrl || !this.config.apiKey) {
      throw new Error('Configuração de API incompleta');
    }
    
    try {
      const response = await fetch(`${this.config.apiUrl}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify(lead)
      });
      
      if (!response.ok) {
        throw new Error(`Erro na sincronização: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro na sincronização com CRM externo:', error);
      throw error;
    }
  }
  
  // Exportar todos os leads para CSV
  async exportToCsv(): Promise<string> {
    const leads = await this.getAllLeads();
    
    if (leads.length === 0) {
      return '';
    }
    
    // Cabeçalhos
    const headers = [
      'ID', 'Nome', 'Email', 'Telefone', 'Empresa', 
      'Tipo de Negócio', 'Status', 'Criado em', 'Atualizado em',
      'Resultado do Quiz', 'Tags'
    ].join(',');
    
    // Linhas de dados
    const rows = leads.map(lead => {
      return [
        lead.id,
        `"${lead.name}"`,
        lead.email,
        lead.phone,
        `"${lead.company || ''}"`,
        `"${lead.businessType || ''}"`,
        lead.status,
        this.formatDate(lead.createdAt),
        this.formatDate(lead.updatedAt),
        `"${lead.quizResult || ''}"`,
        `"${lead.tags.join(', ')}"`
      ].join(',');
    });
    
    return [headers, ...rows].join('\n');
  }

  // Obter estatísticas para o dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    const leads = await this.getAllLeads();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const newLeadsToday = leads.filter(lead => {
      const leadDate = new Date(lead.createdAt);
      leadDate.setHours(0, 0, 0, 0);
      return leadDate.getTime() === today.getTime();
    }).length;
    
    // Contagem de leads por status
    const leadsByStatus = Object.values(LeadStatus).map(status => {
      const count = leads.filter(lead => lead.status === status).length;
      return { status, count };
    });
    
    // Contagem de leads por dia (últimos 7 dias)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      return date;
    }).reverse();
    
    const leadsPerDay = last7Days.map(date => {
      const count = leads.filter(lead => {
        const leadDate = new Date(lead.createdAt);
        leadDate.setHours(0, 0, 0, 0);
        return leadDate.getTime() === date.getTime();
      }).length;
      
      return { 
        date: this.formatDate(date), 
        count 
      };
    });
    
    // Resultado mais popular
    const resultCounts: Record<string, number> = {};
    leads.forEach(lead => {
      if (lead.quizResult) {
        resultCounts[lead.quizResult] = (resultCounts[lead.quizResult] || 0) + 1;
      }
    });
    
    let popularQuizResult = "Nenhum";
    let maxCount = 0;
    
    Object.entries(resultCounts).forEach(([result, count]) => {
      if (count > maxCount) {
        maxCount = count;
        popularQuizResult = result;
      }
    });
    
    // Taxa de conversão (leads convertidos / total)
    const convertedLeads = leads.filter(lead => lead.status === LeadStatus.CONVERTED).length;
    const conversionRate = leads.length > 0 ? (convertedLeads / leads.length) * 100 : 0;
    
    return {
      totalLeads: leads.length,
      newLeadsToday,
      conversionRate,
      popularQuizResult,
      leadsPerDay,
      leadsByStatus
    };
  }
  
  // Formatação de data para CSV
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}

// Exportar uma única instância do serviço
export const crmService = new CrmService(); 