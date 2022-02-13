import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      // Server settings to run local dev environment in HTTPS.
      // To be reviewed before deployment:
      server: {
        https: {
          key: fs.readFileSync('.cert/key.pem'),
          cert: fs.readFileSync('.cert/cert.pem'),
        },
        public: 'https://localhost:3000/',
        port: 3000,
      },
      plugins: [
        vue({
          // template: {
          //   compilerOptions: {
          //     isCustomElement: (tag) =>
          //       tag.includes('custom-tag') || tag.startsWith('a-'),
          //   },
          // },
        }),
      ],
      // Vite does not have the '@' alias to './src' by default, so we add one:
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
    }
  } else {
    return {
      plugins: [
        vue({
          // template: {
          //   compilerOptions: {
          //     isCustomElement: (tag) =>
          //       tag.includes('custom-tag') || tag.startsWith('a-'),
          //   },
          // },
        }),
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
    }
  }
})
