import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Keep React and Firebase in their own files so browsers can cache
        // them between deploys instead of re-downloading one big bundle.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          // auth + storage are deliberately left out: they belong to the
          // admin chunk so visitors never download them.
          firebase: ['firebase/app', 'firebase/firestore'],
        },
      },
    },
  },
})
