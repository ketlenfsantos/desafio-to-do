import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/desafio-to-do/',  // Substitua "desafio-to-do" pelo nome do seu repositório
  plugins: [react()],
  server: {
    port:3001,
  }
})
