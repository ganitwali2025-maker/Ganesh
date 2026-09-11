import os

base_dir = r"c:\Users\lr690\OneDrive\Desktop\new app"
src_dir = os.path.join(base_dir, "src")

# 1. Update global.css
global_css_path = os.path.join(src_dir, "styles", "global.css")
with open(global_css_path, "r", encoding="utf-8") as f:
    global_content = f.read()

global_content = global_content.replace("--primary: #16A34A;", "--primary: #7C3AED;")
global_content = global_content.replace("--primary-light: #DCFCE7;", "--primary-light: #F3E8FF;")
global_content = global_content.replace("--primary-dark: #15803D;", "--primary-dark: #5B21B6;")

with open(global_css_path, "w", encoding="utf-8") as f:
    f.write(global_content)

# 2. Update layout.css
layout_css_path = os.path.join(src_dir, "styles", "layout.css")
with open(layout_css_path, "r", encoding="utf-8") as f:
    layout_content = f.read()

# Remove max-width from mobile-frame
layout_content = layout_content.replace("  max-width: 412px;\n", "")

# Remove min-width: 640px desktop frame blocks
layout_content = layout_content.replace("""@media (min-width: 640px) {
  .app-container { padding-top: 2rem; padding-bottom: 2rem; background-color: #e5e7eb; }
  .mobile-frame { height: 915px; min-height: 915px; border-radius: 36px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 8px solid #1f2937; overflow: hidden; }
}""", "")

layout_content = layout_content.replace("""@media (min-width: 640px) {
  .bottom-nav { position: absolute; left: 0; transform: none; max-width: 100%; border-bottom-left-radius: 36px; border-bottom-right-radius: 36px; padding-bottom: 0.75rem; }
}""", "")

# Fix bottom-nav to span 100% and remove max-width
layout_content = layout_content.replace(
    ".bottom-nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 412px;",
    ".bottom-nav { position: fixed; bottom: 0; left: 0; width: 100%;"
)

with open(layout_css_path, "w", encoding="utf-8") as f:
    f.write(layout_content)

print("Theme and Full-size updates applied.")
