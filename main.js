// Arquivo principal alternativo em JavaScript puro
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App';
import './src/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(App)
  )
); 