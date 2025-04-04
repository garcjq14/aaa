import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { crmService } from '@/lib/crmService';
import { DashboardStats, LeadStatus, LeadData } from '@/types/crm';
import { 
  Users, 
  UserPlus, 
  Percent, 
  TrendingUp, 
  Calendar,
  Download
} from 'lucide-react';
import { useLeads } from '@/hooks/useLeads';

// Componente de cards de estatísticas
const StatCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  colorClass 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  description?: string;
  colorClass: string;
}) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {description && (
          <p className="text-xs text-gray-500 mt-2">{description}</p>
        )}
      </div>
      <div className={`p-3 rounded-full ${colorClass}`}>
        {icon}
      </div>
    </div>
  </div>
);

// Gráfico de barras simples para leads por status
const StatusBarChart = ({ data }: { data: Array<{status: LeadStatus, count: number}> }) => {
  // Encontrar o valor máximo para calcular porcentagens
  const maxCount = Math.max(...data.map(item => item.count), 1);
  
  // Mapeamento de cores por status
  const statusColors: Record<LeadStatus, string> = {
    [LeadStatus.NEW]: 'bg-blue-500',
    [LeadStatus.CONTACTED]: 'bg-yellow-500',
    [LeadStatus.IN_PROGRESS]: 'bg-purple-500',
    [LeadStatus.CONVERTED]: 'bg-green-500',
    [LeadStatus.LOST]: 'bg-gray-500'
  };
  
  // Mapeamento de nomes para exibição
  const statusNames: Record<LeadStatus, string> = {
    [LeadStatus.NEW]: 'Novos',
    [LeadStatus.CONTACTED]: 'Contatados',
    [LeadStatus.IN_PROGRESS]: 'Em Andamento',
    [LeadStatus.CONVERTED]: 'Convertidos',
    [LeadStatus.LOST]: 'Perdidos'
  };
  
  return (
    <div className="mt-4 space-y-3">
      {data.map(item => (
        <div key={item.status} className="flex items-center">
          <span className="w-24 text-sm text-gray-600">{statusNames[item.status]}</span>
          <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${statusColors[item.status]}`} 
              style={{ width: `${(item.count / maxCount) * 100}%` }}
            />
          </div>
          <span className="ml-2 text-sm font-medium">{item.count}</span>
        </div>
      ))}
    </div>
  );
};

// Tabela de leads recentes
const RecentLeadsTable = ({ leads }: { leads: LeadData[] }) => (
  <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nome</th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Contato</th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Data</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {leads.map(lead => (
          <tr key={lead.id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{lead.name}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{lead.email}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm">
              <span className={`px-2 py-1 rounded-full text-xs ${
                lead.status === LeadStatus.NEW ? 'bg-blue-100 text-blue-800' :
                lead.status === LeadStatus.CONTACTED ? 'bg-yellow-100 text-yellow-800' :
                lead.status === LeadStatus.IN_PROGRESS ? 'bg-purple-100 text-purple-800' :
                lead.status === LeadStatus.CONVERTED ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {lead.status}
              </span>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {new Date(lead.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const DashboardPage = () => {
  const { leads, exportLeadsToCsv } = useLeads();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadStats = async () => {
      try {
        const dashboardStats = await crmService.getDashboardStats();
        setStats(dashboardStats);
      } catch (err) {
        console.error('Erro ao carregar estatísticas:', err);
        setError('Não foi possível carregar as estatísticas.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStats();
  }, [leads]);
  
  // Obter os 5 leads mais recentes
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          
          <button 
            onClick={exportLeadsToCsv}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar Leads (CSV)
          </button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        ) : stats ? (
          <>
            {/* Cards de estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total de Leads"
                value={stats.totalLeads}
                icon={<Users className="h-6 w-6 text-blue-500" />}
                colorClass="bg-blue-100"
              />
              
              <StatCard
                title="Novos Leads Hoje"
                value={stats.newLeadsToday}
                icon={<UserPlus className="h-6 w-6 text-green-500" />}
                colorClass="bg-green-100"
              />
              
              <StatCard
                title="Taxa de Conversão"
                value={`${stats.conversionRate.toFixed(1)}%`}
                icon={<Percent className="h-6 w-6 text-yellow-500" />}
                description="Leads convertidos / total"
                colorClass="bg-yellow-100"
              />
              
              <StatCard
                title="Resultado Popular"
                value={stats.popularQuizResult}
                icon={<TrendingUp className="h-6 w-6 text-purple-500" />}
                colorClass="bg-purple-100"
              />
            </div>
            
            {/* Gráficos e estatísticas detalhadas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Leads por status */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Leads por Status</h2>
                <StatusBarChart data={stats.leadsByStatus} />
              </div>
              
              {/* Leads por dia (últimos 7 dias) */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Leads por Dia (últimos 7 dias)</h2>
                <div className="mt-4 space-y-3">
                  {stats.leadsPerDay.map(day => (
                    <div key={day.date} className="flex items-center">
                      <span className="w-24 text-sm text-gray-600">{day.date}</span>
                      <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500" 
                          style={{ width: `${(day.count / Math.max(...stats.leadsPerDay.map(d => d.count), 1)) * 100}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm font-medium">{day.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Leads recentes */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Leads Recentes</h2>
                <button 
                  onClick={() => window.location.href = '/admin/leads'}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Ver todos
                </button>
              </div>
              
              {recentLeads.length > 0 ? (
                <RecentLeadsTable leads={recentLeads} />
              ) : (
                <p className="text-gray-500 py-4">Nenhum lead registrado ainda.</p>
              )}
            </div>
          </>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
            Nenhum dado disponível no momento.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}; 