import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
 
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/court': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/api':{
        target:'http://192.168.29.232:8080',
        changeOrigin:true,
        secure: false,
      },
      '/odata': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/legalcasetype' :{
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false, 
      }
    }
  }
});
