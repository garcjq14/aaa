// Simple build script for Vercel deployment with Vite
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Running Vercel build helper script...');

// Create a 404.html file for client-side routing
try {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  const notFoundPath = path.join(__dirname, 'dist', '404.html');
  
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, notFoundPath);
    console.log('✅ Successfully created 404.html for client-side routing');
  } else {
    console.error('⚠️ index.html not found in dist folder');
  }
} catch (error) {
  console.error('Error creating 404.html:', error);
}

// List files in the dist directory to verify the build
try {
  const distPath = path.join(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    console.log('📁 Contents of dist directory:');
    const files = fs.readdirSync(distPath);
    files.forEach(file => {
      console.log(`- ${file}`);
    });
  } else {
    console.error('⚠️ dist directory does not exist');
  }
} catch (error) {
  console.error('Error listing dist directory:', error);
} 