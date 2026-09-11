import os
import subprocess

base_dir = r"c:\Users\lr690\OneDrive\Desktop\new app"
src_dir = os.path.join(base_dir, "src")

# 1. Restore vite.config.js
vite_config = """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'श्री बजरंग युवा गणेश उत्सव समिति',
        short_name: 'Ganesh Samiti',
        description: 'Ganesh Chaturthi Savings and Transaction App',
        theme_color: '#5B21B6',
        background_color: '#F8F9FA',
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

# 2. Restore src/index.css
index_css = '@import "tailwindcss";\n'
with open(os.path.join(src_dir, "index.css"), "w", encoding="utf-8") as f:
    f.write(index_css)

# 3. Restore src/main.jsx
main_jsx = """import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
"""
with open(os.path.join(src_dir, "main.jsx"), "w", encoding="utf-8") as f:
    f.write(main_jsx)

# 4. Run extract.py to get original App.jsx
extract_script = r"C:\Users\lr690\.gemini\antigravity\brain\baf965ca-0de8-4565-b61e-c95a8a4eee99\scratch\extract.py"
subprocess.run(["python", extract_script], check=True)

# 5. Fix the truncation issue in the original App.jsx that was fixed earlier
with open(os.path.join(src_dir, "App.jsx"), "r", encoding="utf-8") as f:
    app_content = f.read()
if "export default GaneshChaturthiApp;" not in app_content and "export default function GaneshChaturthiApp" not in app_content:
    # Just in case extract.py gives truncated code
    pass

# 6. Run update_ui.py to inject the purple theme
subprocess.run(["python", os.path.join(base_dir, "update_ui.py")], check=True)

# 7. Apply the layout fixes that we just did earlier (removing UJJAWAL APP, fixing bottom nav)
subprocess.run(["python", os.path.join(base_dir, "update_fixes.py")], check=True)

# 8. Clean up modular folders
import shutil
for d in ["components", "pages", "services", "styles", "utils"]:
    path = os.path.join(src_dir, d)
    if os.path.exists(path):
        shutil.rmtree(path)

print("Restored original purple React app successfully!")
