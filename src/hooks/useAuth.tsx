import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { authService } from '@/lib/authService';
import { AdminUser } from '@/types/crm';
import { useNavigate } from 'react-router-dom';

// Tipo para o contexto de autenticação
interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Criar o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Propriedades do provedor
interface AuthProviderProps {
  children: ReactNode;
}

// Provedor de autenticação
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Verificar o estado de autenticação quando o componente montar
  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  // Função de login
  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const loggedUser = await authService.login(username, password);
      
      if (loggedUser) {
        setUser(loggedUser);
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setIsLoading(false);
      return false;
    }
  };
  
  // Função de logout
  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/admin/login');
  };
  
  // Valor do contexto
  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para usar o contexto de autenticação
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};

// Componente para proteger rotas administrativas
interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }
  
  return isAuthenticated ? <>{children}</> : null;
}; 