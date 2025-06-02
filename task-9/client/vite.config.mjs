import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss()
    ],
    server: {
        host: true,
        proxy: {
            '/chat': {
                target: 'http://backend:8000',
                changeOrigin: true
            }
        }
    }
})
