import os
import json

base_dir = r"c:\Users\lr690\OneDrive\Desktop\new app"

# 1. Update vite.config.js
vite_config = """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'UJJAWAL APP',
        short_name: 'UJJAWAL',
        description: 'Ganesh Samiti Finance Application',
        theme_color: '#16A34A',
        background_color: '#FFFFFF',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'icon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
"""
with open(os.path.join(base_dir, "vite.config.js"), "w", encoding="utf-8") as f:
    f.write(vite_config)

# 2. vercel.json
vercel_config = {
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
with open(os.path.join(base_dir, "vercel.json"), "w", encoding="utf-8") as f:
    json.dump(vercel_config, f, indent=2)

# 3. .env and .env.example
env_content = "VITE_GOOGLE_SCRIPT_URL=your_google_apps_script_url_here\n"
with open(os.path.join(base_dir, ".env.example"), "w", encoding="utf-8") as f:
    f.write(env_content)
with open(os.path.join(base_dir, ".env"), "w", encoding="utf-8") as f:
    f.write(env_content)

print("Config files generated.")
