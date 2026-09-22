import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // The app is served from https://bohdan-halaiko.github.io/todo-cl/
  base: process.env.GITHUB_ACTIONS ? '/todo-cl/' : '/',
  plugins: [react()],
})
