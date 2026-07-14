import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  define: {
    __DEV__: JSON.stringify(mode === 'development'),
  },
  plugins: [react()],
}))
