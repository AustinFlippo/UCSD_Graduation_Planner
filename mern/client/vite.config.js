import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: '../../', // Look for .env files in root directory
  define: {
    // Make Node.js process.env available in browser
    'process.env': 'import.meta.env'
  }
})
