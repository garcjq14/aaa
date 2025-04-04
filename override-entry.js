// This file is a simpler version that avoids TypeScript imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// Dynamically import App to avoid direct TSX imports
const LazyApp = React.lazy(() => import('./src/App.js'));

// Create root and render
ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      React.Suspense, 
      { fallback: React.createElement('div', null, 'Loading...') },
      React.createElement(LazyApp, null)
    )
  )
); 