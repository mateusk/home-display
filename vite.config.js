import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }
  // Development settings:
  if (command === 'serve') {
    return {
      // Server settings to run local dev environment in HTTPS.
      // To be reviewed before deployment:
      server: {
        public: 'https://localhost:3000/',
        port: 3000,
      },
      plugins: [vue({})],
      publicDir: process.env.REMOTE_ASSETS_FOLDER,
      // Vite does not have the '@' alias to './src' by default, so we add one:
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
    }
  } else {
    // Production settings:
    return {
      plugins: [vue({})],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
    }
  }
})
