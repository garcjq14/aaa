import { AdminUser } from '@/types/crm';

// Chave para armazenar token de autenticação no localStorage
const AUTH_TOKEN_KEY = 'admin_auth_token';
const ADMIN_USER_KEY = 'admin_user';

// Usuário administrador padrão (para demo)
const DEFAULT_ADMIN: AdminUser = {
  id: 'admin1',
  username: 'admin',
  name: 'Administrador',
  email: 'admin@exemplo.com',
  role: 'admin'
};

class AuthService {
  private isInitialized = false;
  
  constructor() {
    this.initialize();
  }
  
  // Inicializar o serviço de autenticação
  private initialize(): void {
    if (this.isInitialized) return;
    
    // Verifica se já existe um usuário admin no localStorage
    const savedUser = localStorage.getItem(ADMIN_USER_KEY);
    
    if (!savedUser) {
      // Se não existir, cria o usuário padrão (apenas para demonstração)
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify([DEFAULT_ADMIN]));
    }
    
    this.isInitialized = true;
  }
  
  // Realizar login
  async login(username: string, password: string): Promise<AdminUser | null> {
    // Em um sistema real, isso seria uma requisição a uma API
    // Para este exemplo, estamos usando dados estáticos (demo)
    
    // Por segurança, em produção NÃO faça isso
    // Esta é apenas uma implementação demo para exemplificar
    if (username === 'admin' && password === 'admin123') {
      const user = DEFAULT_ADMIN;
      
      // Atualiza a data do último login
      const updatedUser = {
        ...user,
        lastLogin: new Date()
      };
      
      // Salva o token (seria um JWT em um sistema real)
      const token = this.generateDemoToken(updatedUser);
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      
      return updatedUser;
    }
    
    return null;
  }
  
  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem(AUTH_TOKEN_KEY) !== null;
  }
  
  // Obter o usuário logado
  getCurrentUser(): AdminUser | null {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    
    if (!token) return null;
    
    try {
      // Em um sistema real, isso decodificaria um JWT
      const encodedUserData = token.split('.')[1]; // Simulando parte de payload do JWT
      const userData = atob(encodedUserData);
      return JSON.parse(userData);
    } catch (error) {
      this.logout(); // Se houver erro, faz logout
      return null;
    }
  }
  
  // Realizar logout
  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
  
  // Atualizar dados do usuário
  updateUserProfile(user: AdminUser): void {
    const token = this.generateDemoToken(user);
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
  
  // Gerar um token demo (não seguro - apenas para demonstração)
  private generateDemoToken(user: AdminUser): string {
    // Este NÃO é um JWT real, apenas uma simulação para demo
    const header = btoa(JSON.stringify({ alg: "demo", typ: "JWT" }));
    const payload = btoa(JSON.stringify(user));
    const signature = btoa("demo-signature");
    
    return `${header}.${payload}.${signature}`;
  }
}

// Exportar uma única instância do serviço
export const authService = new AuthService(); 