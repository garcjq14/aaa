import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';

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
    const duration = 4000; // 4 segundos para carregamento mais suave
    const minDisplayTime = 2000; // Tempo mínimo de exibição aumentado
    
    // Progresso mais linear e previsível
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      // Curva mais gradual para que o progresso não pareça irregular
      let nextProgress = Math.min((elapsed / duration) * 100, 99);
      
      // Garante que o progresso sempre avança de forma suave
      nextProgress = Math.max(nextProgress, progress + 0.5);
      
      setProgress(nextProgress);
      
      // Quando terminar o carregamento dos recursos, complete a barra
      if (nextProgress >= 99) {
        clearInterval(interval);
        
        // Garante tempo mínimo de exibição
        const remainingTime = Math.max(0, minDisplayTime - elapsed);
        setTimeout(() => {
          setProgress(100);
          
          // Aguarda um período um pouco maior para mostrar 100% antes de esconder
          setTimeout(() => setLoading(false), 500);
        }, remainingTime);
      }
    }, 30); // Intervalo menor para animação mais suave
    
    // Monitorar evento de carregamento real da página
    const handleLoad = () => {
      // Manter pelo menos o tempo mínimo de exibição
      const elapsed = Date.now() - startTime;
      if (elapsed < minDisplayTime) {
        setTimeout(() => {
          // Avançar para 99% e depois para 100% para uma transição mais suave
          setProgress(99);
          setTimeout(() => {
            setProgress(100);
            setTimeout(() => setLoading(false), 500);
          }, 300);
        }, minDisplayTime - elapsed);
      } else {
        // Avançar para 99% e depois para 100% para uma transição mais suave
        setProgress(99);
        setTimeout(() => {
          setProgress(100);
          setTimeout(() => setLoading(false), 500);
        }, 300);
      }
      
      clearInterval(interval);
    };
    
    window.addEventListener('load', handleLoad);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, [loading, progress]);
  
  return (
    <PreloaderContext.Provider value={{ loading, progress, setProgress, setLoading }}>
      {children}
    </PreloaderContext.Provider>
  );
};

// Hook para usar o contexto
export const usePreloader = () => useContext(PreloaderContext); 