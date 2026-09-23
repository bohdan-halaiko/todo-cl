import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The GitHub Pages build passes --base=/todo-cl/ (see the "build:pages" script).
export default defineConfig({
  plugins: [react()],
});
