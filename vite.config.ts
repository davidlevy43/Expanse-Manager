import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    base: '/',
    build: {
      target: ['es2022', 'chrome87', 'edge88', 'firefox78', 'safari14'],
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            chart: ['chart.js', 'react-chartjs-2'],
            supabase: ['@supabase/supabase-js'],
            pdf: ['pdf-lib', 'pdfjs-dist', 'jspdf', 'jspdf-autotable'],
            image: ['html2canvas', 'tesseract.js']
          }
        }
      },
      chunkSizeWarningLimit: 2000
    },
    server: {
      port: 5173,
      hmr: {
        overlay: false
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    define: {
      'process.env': env
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@supabase/supabase-js',
        'chart.js',
        'react-chartjs-2'
      ]
    }
  };
});