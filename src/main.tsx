import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Use App para o aplicativo real do portfólio
// Use TestApp para verificar se o deploy está funcionando corretamente
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
