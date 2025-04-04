import { useState, useEffect, useContext, createContext, ReactNode } from 'react';

interface PreloaderContextType {
  loading: boolean;
  progress: number;
  setProgress: (value: number) => void;
  setLoading: (value: boolean) => void;
}

// Criar o contexto com valores padrão
const PreloaderContext = createContext<PreloaderContextType>({
  loading: true,
  progress: 0,
  setProgress: () => {},
  setLoading: () => {}
});

// Props para o provider
interface PreloaderProviderProps {
  children: ReactNode;
}

// Componente Provider
export const PreloaderProvider = ({ children }: PreloaderProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (!loading) return;
    
    const startTime = Date.now();
    const duration = 3000; // 3 segundos para carregamento simulado
    const minDisplayTime = 1500; // Tempo mínimo de exibição
    
    // Simulação de progresso
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min((elapsed / duration) * 100, 99.9);
      
      setProgress(nextProgress);
      
      // Quando terminar o carregamento dos recursos, complete a barra
      if (nextProgress >= 99.9) {
        clearInterval(interval);
        
        // Garante tempo mínimo de exibição
        const remainingTime = Math.max(0, minDisplayTime - elapsed);
        setTimeout(() => {
          setProgress(100);
          
          // Aguarda um curto período para mostrar 100% antes de esconder
          setTimeout(() => setLoading(false), 300);
        }, remainingTime);
      }
    }, 50);
    
    // Monitorar evento de carregamento real da página
    const handleLoad = () => {
      // Manter pelo menos o tempo mínimo de exibição
      const elapsed = Date.now() - startTime;
      if (elapsed < minDisplayTime) {
        setTimeout(() => {
          setProgress(100);
          setTimeout(() => setLoading(false), 300);
        }, minDisplayTime - elapsed);
      } else {
        setProgress(100);
        setTimeout(() => setLoading(false), 300);
      }
      
      clearInterval(interval);
    };
    
    window.addEventListener('load', handleLoad);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, [loading]);
  
  const value = { loading, progress, setProgress, setLoading };
  
  return (
    <PreloaderContext.Provider value={value}>
      {children}
    </PreloaderContext.Provider>
  );
};

// Hook para usar o contexto
export const usePreloader = () => useContext(PreloaderContext); 