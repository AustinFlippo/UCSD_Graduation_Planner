import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { existsSync } from 'fs'

// Determine environment directory based on execution context
const getEnvDir = () => {
  // If running from client directory (Render deployment)
  const currentDir = './';
  // If running from project root (local development)
  const rootDir = '../../';
  
  // Check if we can find env files in root directory
  if (existsSync(resolve(rootDir, '.env.production'))) {
    return rootDir;
  }
  
  // Fallback to current directory
  return currentDir;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: getEnvDir(),
  define: {
    // Make Node.js process.env available in browser
    'process.env': 'import.meta.env'
  }
})
