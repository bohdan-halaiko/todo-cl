import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// The GitHub Pages build passes --base=/todo-cl/ (see the "build:pages" script).
export default defineConfig({
  plugins: [react()],
})
