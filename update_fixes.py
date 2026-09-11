import os
import re

base_dir = r"c:\Users\lr690\OneDrive\Desktop\new app"
src_dir = os.path.join(base_dir, "src")

# 1. Update Header.jsx
header_path = os.path.join(src_dir, "components", "layout", "Header.jsx")
with open(header_path, "r", encoding="utf-8") as f:
    header_content = f.read()

header_content = header_content.replace(
    '<h1>UJJAWAL APP</h1>',
    '<h1 className="header-title">श्री बजरंग युवा गणेश उत्सव समिति</h1>'
)
header_content = header_content.replace(
    '<p><MapPin size={12} /> गणेश समिति</p>',
    '<p className="header-subtitle"><MapPin size={12} /> गणेश समिति</p>'
)

with open(header_path, "w", encoding="utf-8") as f:
    f.write(header_content)

# 2. Update layout.css
layout_css_path = os.path.join(src_dir, "styles", "layout.css")
with open(layout_css_path, "r", encoding="utf-8") as f:
    layout_content = f.read()

# Fix header padding
layout_content = layout_content.replace(
    'padding: 2rem 1.25rem 3.5rem 1.25rem;',
    'padding: 1.5rem 1.25rem 2rem 1.25rem; min-height: 170px; width: 100%; position: relative;'
)

# Fix main content padding
layout_content = layout_content.replace(
    'padding-bottom: 6rem;',
    'padding-bottom: 90px;'
)

# Fix bottom nav positioning
layout_content = layout_content.replace(
    '.bottom-nav { position: absolute; bottom: 0; width: 100%;',
    '.bottom-nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 412px;\n'
)

# Add header responsive fonts and desktop fix for bottom-nav
responsive_css = """
.header-title { font-size: 17px; font-weight: 700; line-height: 1.3; margin-bottom: 0.25rem; }
.header-subtitle { font-size: 13px; opacity: 0.9; display: flex; align-items: center; gap: 0.25rem; }

@media (max-width: 380px) {
    .header-title { font-size: 14px; }
    .header-subtitle { font-size: 12px; }
}
@media (min-width: 640px) {
  .bottom-nav { position: absolute; left: 0; transform: none; max-width: 100%; border-bottom-left-radius: 36px; border-bottom-right-radius: 36px; padding-bottom: 0.75rem; }
}
"""
with open(layout_css_path, "w", encoding="utf-8") as f:
    f.write(layout_content + responsive_css)

# 3. Update dashboard.css
dashboard_css_path = os.path.join(src_dir, "styles", "dashboard.css")
with open(dashboard_css_path, "r", encoding="utf-8") as f:
    dash_content = f.read()

# Fix balance card overlapping header
dash_content = dash_content.replace(
    'margin-top: -3rem;',
    'margin-top: 12px;'
)

with open(dashboard_css_path, "w", encoding="utf-8") as f:
    f.write(dash_content)

# 4. Update vite.config.js to remove UJJAWAL APP
vite_path = os.path.join(base_dir, "vite.config.js")
with open(vite_path, "r", encoding="utf-8") as f:
    vite_content = f.read()

vite_content = vite_content.replace("'UJJAWAL APP'", "'श्री बजरंग युवा गणेश उत्सव समिति'")
vite_content = vite_content.replace("'UJJAWAL'", "'Ganesh Samiti'")

with open(vite_path, "w", encoding="utf-8") as f:
    f.write(vite_content)

# 5. Update index.html
html_path = os.path.join(base_dir, "index.html")
with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

html_content = html_content.replace("Vite + React", "श्री बजरंग युवा गणेश उत्सव समिति")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print("UI fixes applied.")
