import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // eslint-disable-next-line node/prefer-global/process
  base: process.env.GITHUB_PAGES ? 'deckgl-react-demo' : './',
})
