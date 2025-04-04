import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { PreloaderProvider } from "./hooks/use-preloader.tsx";
import Preloader from "./components/ui/Preloader";
import PageTransition from "./components/ui/PageTransition";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import NotFound from "./pages/NotFound";
import PortfolioDrHelenaPage from "./pages/PortfolioDrHelenaPage";
import PortfolioCafeBistroPage from "./pages/PortfolioCafeBistroPage";
import PortfolioCoachMariaPage from "./pages/PortfolioCoachMariaPage";
import PortfolioFisioBemEstarPage from "./pages/PortfolioFisioBemEstarPage";
import PortfolioTechSolutionsPage from "./pages/PortfolioTechSolutionsPage";
import PortfolioStudioArquiteturaPage from "./pages/PortfolioStudioArquiteturaPage";

const queryClient = new QueryClient();

// Componente para garantir scroll ao topo ao navegar
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    // Só faz o scroll para o topo se não houver um hash na URL
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PreloaderProvider>
        <Preloader />
        <Toaster />
        <Sonner />
        <HashRouter>
          <ScrollToTop />
          <PageTransition />
          <Routes>
            {/* Rotas do Site */}
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/quiz" element={<Layout><QuizPage /></Layout>} />
            <Route path="/portfolio/dr-helena-mendes" element={<Layout><PortfolioDrHelenaPage /></Layout>} />
            <Route path="/portfolio/cafe-bistro" element={<Layout><PortfolioCafeBistroPage /></Layout>} />
            <Route path="/portfolio/coach-maria-silva" element={<Layout><PortfolioCoachMariaPage /></Layout>} />
            <Route path="/portfolio/fisio-bem-estar" element={<Layout><PortfolioFisioBemEstarPage /></Layout>} />
            <Route path="/portfolio/tech-solutions" element={<Layout><PortfolioTechSolutionsPage /></Layout>} />
            <Route path="/portfolio/studio-arquitetura" element={<Layout><PortfolioStudioArquiteturaPage /></Layout>} />
            
            {/* Rota 404 */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </HashRouter>
      </PreloaderProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
