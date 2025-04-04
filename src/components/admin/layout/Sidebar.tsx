import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, FileText, Package, BarChart, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    
      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <div className="flex items-center">
            <span className="text-xl font-semibold">Admin Panel</span>
          </div>
          <button 
            className="p-1 rounded-md lg:hidden hover:bg-gray-800"
            onClick={toggleSidebar}
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="px-4 py-6">
          <ul className="space-y-1">
            <li>
              <NavLink 
                to="/admin" 
                end
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-sm rounded-lg hover:bg-gray-800 ${
                    isActive ? 'bg-gray-800 text-white' : 'text-gray-300'
                  }`
                }
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to="/admin/leads" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-sm rounded-lg hover:bg-gray-800 ${
                    isActive ? 'bg-gray-800 text-white' : 'text-gray-300'
                  }`
                }
              >
                <Users className="mr-3 h-5 w-5" />
                Leads
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to="/admin/kanban" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-sm rounded-lg hover:bg-gray-800 ${
                    isActive ? 'bg-gray-800 text-white' : 'text-gray-300'
                  }`
                }
              >
                <BarChart className="mr-3 h-5 w-5" />
                Kanban
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to="/admin/content" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-sm rounded-lg hover:bg-gray-800 ${
                    isActive ? 'bg-gray-800 text-white' : 'text-gray-300'
                  }`
                }
              >
                <FileText className="mr-3 h-5 w-5" />
                Conteúdo
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to="/admin/portfolio" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-sm rounded-lg hover:bg-gray-800 ${
                    isActive ? 'bg-gray-800 text-white' : 'text-gray-300'
                  }`
                }
              >
                <Package className="mr-3 h-5 w-5" />
                Portfólio
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to="/admin/settings" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-sm rounded-lg hover:bg-gray-800 ${
                    isActive ? 'bg-gray-800 text-white' : 'text-gray-300'
                  }`
                }
              >
                <Settings className="mr-3 h-5 w-5" />
                Configurações
              </NavLink>
            </li>
          </ul>
        </nav>
        
        <div className="px-6 py-4 mt-6 border-t border-gray-800">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-400">Administrador</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}; 