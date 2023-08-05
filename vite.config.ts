import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "@uppy/react",
      "@uppy/drag-drop",
      "@uppy/status-bar",
      "@uppy/dashboard",
    ],
  },
})
