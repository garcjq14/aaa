import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { useLeads } from '@/hooks/useLeads';
import { LeadData, LeadStatus } from '@/types/crm';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Download, 
  Plus, 
  Eye, 
  Edit, 
  MoreHorizontal,
  X,
  Check
} from 'lucide-react';

// Componente de filtro de status
const StatusFilter = ({ 
  selectedStatus, 
  onChange 
}: { 
  selectedStatus: LeadStatus | 'all'; 
  onChange: (status: LeadStatus | 'all') => void;
}) => {
  const statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: LeadStatus.NEW, label: 'Novos' },
    { value: LeadStatus.CONTACTED, label: 'Contatados' },
    { value: LeadStatus.IN_PROGRESS, label: 'Em Andamento' },
    { value: LeadStatus.CONVERTED, label: 'Convertidos' },
    { value: LeadStatus.LOST, label: 'Perdidos' }
  ];
  
  return (
    <div className="flex flex-wrap items-center gap-2">
      {statusOptions.map(option => (
        <button
          key={option.value}
          onClick={() => onChange(option.value as LeadStatus | 'all')}
          className={`px-3 py-1 text-sm rounded-full transition ${
            selectedStatus === option.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export const LeadsPage = () => {
  const { leads, isLoading, updateLeadStatus, exportLeadsToCsv } = useLeads();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | 'all'>('all');
  const [sortField, setSortField] = useState<keyof LeadData>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [leadStatusUpdating, setLeadStatusUpdating] = useState<string | null>(null);
  
  const leadsPerPage = 10;
  
  // Filtrar leads
  const filteredLeads = leads.filter(lead => {
    // Filtro de pesquisa
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      searchQuery === '' || 
      lead.name.toLowerCase().includes(searchLower) ||
      lead.email.toLowerCase().includes(searchLower) ||
      lead.phone.toLowerCase().includes(searchLower) ||
      (lead.company && lead.company.toLowerCase().includes(searchLower));
    
    // Filtro de status
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  // Ordenar leads
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (sortField === 'createdAt' || sortField === 'updatedAt') {
      const dateA = new Date(a[sortField]).getTime();
      const dateB = new Date(b[sortField]).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    const valA = String(a[sortField] || '').toLowerCase();
    const valB = String(b[sortField] || '').toLowerCase();
    
    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Paginação
  const totalPages = Math.ceil(sortedLeads.length / leadsPerPage);
  const startIndex = (currentPage - 1) * leadsPerPage;
  const paginatedLeads = sortedLeads.slice(startIndex, startIndex + leadsPerPage);
  
  // Alternar ordenação
  const toggleSort = (field: keyof LeadData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Atualizar status do lead
  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setLeadStatusUpdating(leadId);
    await updateLeadStatus(leadId, newStatus);
    setLeadStatusUpdating(null);
  };
  
  // Botão de ordenação
  const SortButton = ({ field, label }: { field: keyof LeadData, label: string }) => (
    <button
      onClick={() => toggleSort(field)}
      className="group flex items-center space-x-1 text-left font-semibold text-gray-900"
    >
      <span>{label}</span>
      <ArrowUpDown size={14} className={`
        transition
        ${sortField === field ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}
        ${sortField === field && sortDirection === 'desc' ? 'rotate-180' : ''}
      `} />
    </button>
  );
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Leads</h1>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <button 
              onClick={exportLeadsToCsv}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download size={16} className="mr-1" />
              Exportar
            </button>
          </div>
        </div>
        
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Pesquisa */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Filtro de Status */}
            <div>
              <StatusFilter
                selectedStatus={selectedStatus}
                onChange={setSelectedStatus}
              />
            </div>
          </div>
        </div>
        
        {/* Lista de Leads */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Nenhum lead encontrado.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm sm:pl-6">
                        <SortButton field="name" label="Nome" />
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm">
                        <SortButton field="email" label="Contato" />
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm">
                        <SortButton field="status" label="Status" />
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm">
                        <SortButton field="createdAt" label="Data" />
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm">
                        <span className="font-semibold text-gray-900">Ações</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {paginatedLeads.map(lead => (
                      <tr key={lead.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          <div className="flex flex-col">
                            <span>{lead.name}</span>
                            {lead.company && (
                              <span className="text-xs text-gray-500">{lead.company}</span>
                            )}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex flex-col">
                            <span>{lead.email}</span>
                            <span>{lead.phone}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <div className="relative">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                              disabled={leadStatusUpdating === lead.id}
                              className={`
                                px-2 py-1 rounded text-sm border-0 focus:ring-2 focus:ring-blue-500
                                ${leadStatusUpdating === lead.id ? 'opacity-50 cursor-not-allowed' : ''}
                                ${lead.status === LeadStatus.NEW ? 'bg-blue-100 text-blue-800' :
                                  lead.status === LeadStatus.CONTACTED ? 'bg-yellow-100 text-yellow-800' :
                                  lead.status === LeadStatus.IN_PROGRESS ? 'bg-purple-100 text-purple-800' :
                                  lead.status === LeadStatus.CONVERTED ? 'bg-green-100 text-green-800' :
                                  'bg-gray-100 text-gray-800'}
                              `}
                            >
                              {Object.values(LeadStatus).map(status => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                            
                            {leadStatusUpdating === lead.id && (
                              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                                <div className="animate-spin h-4 w-4 border-b-2 border-blue-600 rounded-full"></div>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/admin/leads/${lead.id}`}
                              className="p-1 rounded-full hover:bg-gray-100"
                              title="Ver detalhes"
                            >
                              <Eye size={18} className="text-blue-600" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{startIndex + 1}</span> a{' '}
                        <span className="font-medium">
                          {Math.min(startIndex + leadsPerPage, filteredLeads.length)}
                        </span>{' '}
                        de <span className="font-medium">{filteredLeads.length}</span> resultados
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === 1
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          Anterior
                        </button>
                        
                        {/* Números das páginas */}
                        {Array.from({ length: totalPages }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                              currentPage === index + 1
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === totalPages
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          Próxima
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}; 