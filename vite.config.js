import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/', // ✅ IMPORTANT for production deployment
  plugins: [
    react(),
    tailwindcss()
  ],
  define: {
    global: 'globalThis',
  },
  server: { 
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    cors: true,
    hmr: {
      port: 5174
    }
  }
})
