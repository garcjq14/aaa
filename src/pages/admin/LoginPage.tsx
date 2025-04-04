import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples
    if (!username || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const success = await login(username, password);
      
      if (success) {
        navigate('/admin');
      } else {
        setError('Usuário ou senha incorretos.');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Painel Administrativo
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Faça login para acessar o painel
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px">
            <div className="mb-4">
              <label htmlFor="username" className="sr-only">Usuário</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 rounded-t-md focus:outline-none focus:ring-highlight focus:border-highlight focus:z-10 sm:text-sm"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 rounded-b-md focus:outline-none focus:ring-highlight focus:border-highlight focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          {error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`
                group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight
                ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'}
              `}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
          
          <div className="text-center text-xs text-gray-400">
            <p>Para demonstração, use:</p>
            <p>Usuário: <strong>admin</strong> | Senha: <strong>admin123</strong></p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}; 