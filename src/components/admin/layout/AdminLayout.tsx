import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { useAuth } from '@/hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNav toggleSidebar={toggleSidebar} user={user} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-white p-4 border-t border-gray-200 text-center text-sm text-gray-600">
          Painel Administrativo © {new Date().getFullYear()} - Todos os direitos reservados
        </footer>
      </div>
    </div>
  );
}; 