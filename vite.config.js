import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['ganesha.jpg', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png'],
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'श्री बजरंग युवा गणेश उत्सव समिति',
        short_name: 'Ganesh Samiti',
        description: 'Ganesh Samiti Finance Application',
        theme_color: '#7C3AED',
        background_color: '#FFFFFF',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'ganesha.jpg',
            sizes: '360x360',
            type: 'image/jpeg'
          }
        ]
      }
    })
  ],
})
