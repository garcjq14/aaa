// Tipos para o sistema de CRM integrado ao quiz

// Status do lead/cliente
export enum LeadStatus {
  NEW = "novo",
  CONTACTED = "contatado",
  IN_PROGRESS = "em_andamento",
  CONVERTED = "convertido",
  LOST = "perdido"
}

// Informações do usuário coletadas antes do quiz
export interface PreBriefingData {
  name: string;
  email: string;
  phone: string;
  company?: string; 
  businessType?: string;
  howFound?: string;
  budget?: string;
  deadline?: string;
  notes?: string;
}

// Resultado completo do lead incluindo informações do quiz
export interface LeadData extends PreBriefingData {
  id: string; // ID único para o lead
  createdAt: Date; // Data de criação
  updatedAt: Date; // Data da última atualização
  status: LeadStatus; // Status atual do lead
  quizAnswers?: Record<number, string>; // Respostas do quiz (opcional, caso o usuário não complete)
  quizResult?: string; // Resultado do quiz
  assignedTo?: string; // Pessoa responsável pelo lead
  followUpDate?: Date; // Data para follow-up
  tags: string[]; // Tags para categorização
  interactions: LeadInteraction[]; // Histórico de interações
  source: string; // Origem do lead (ex: "quiz", "contato direto", etc.)
}

// Interação com o lead
export interface LeadInteraction {
  id: string;
  date: Date;
  type: "email" | "call" | "meeting" | "message" | "other";
  description: string;
  by: string; // Quem realizou a interação
}

// Configurações de integração CRM
export interface CrmConfig {
  apiUrl?: string; // URL da API do CRM externo
  apiKey?: string; // Chave de API para autenticação
  syncEnabled: boolean; // Se a sincronização está ativada
  syncFrequency: "realtime" | "hourly" | "daily"; // Frequência de sincronização
  leadsTags: string[]; // Tags padrão para leads do quiz
}

// Usuário administrador
export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  lastLogin?: Date;
}

// Estatísticas do dashboard
export interface DashboardStats {
  totalLeads: number;
  newLeadsToday: number;
  conversionRate: number;
  popularQuizResult: string;
  leadsPerDay: Array<{date: string, count: number}>;
  leadsByStatus: Array<{status: LeadStatus, count: number}>;
} 