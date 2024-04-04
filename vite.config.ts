import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //change port for production
  preview: {
    port: 3001,
  },
// for dev
  server: {
    port: 3000,
  },
})
