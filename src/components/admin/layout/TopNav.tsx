import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { AdminUser } from '@/types/crm';

interface TopNavProps {
  toggleSidebar: () => void;
  user: AdminUser | null;
}

export const TopNav: React.FC<TopNavProps> = ({ toggleSidebar, user }) => {
  const { logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    if (notificationsOpen) setNotificationsOpen(false);
  };
  
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (userMenuOpen) setUserMenuOpen(false);
  };
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left side - Mobile menu button & title */}
        <div className="flex items-center">
          <button 
            className="p-1 mr-4 rounded-md lg:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>
          
          <h1 className="text-xl font-semibold text-gray-900">
            Painel Administrativo
          </h1>
        </div>
        
        {/* Right side - User menu, notifications, etc. */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button 
              className="p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={toggleNotifications}
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            {/* Dropdown menu for notifications */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="text-sm font-semibold">Notificações</h3>
                </div>
                
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                    <p className="text-sm font-medium">Novo lead registrado</p>
                    <p className="text-xs text-gray-500">Há 5 minutos</p>
                  </div>
                  
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm font-medium">Resposta de formulário</p>
                    <p className="text-xs text-gray-500">Há 2 horas</p>
                  </div>
                </div>
                
                <div className="px-4 py-2 border-t border-gray-200">
                  <Link to="/admin/notifications" className="text-xs text-blue-600 hover:text-blue-800">
                    Ver todas as notificações
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* User menu */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2 p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={toggleUserMenu}
            >
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={18} className="text-gray-600" />
              </div>
              <span className="text-sm font-medium hidden md:block">
                {user?.name || 'Administrador'}
              </span>
              <ChevronDown size={16} />
            </button>
            
            {/* Dropdown menu for user */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                <Link 
                  to="/admin/profile" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User className="h-4 w-4 mr-2" />
                  Perfil
                </Link>
                
                <Link 
                  to="/admin/settings" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </Link>
                
                <button 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}; 