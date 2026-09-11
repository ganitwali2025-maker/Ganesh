import os

base_dir = r"c:\Users\lr690\OneDrive\Desktop\new app"
src_dir = os.path.join(base_dir, "src")

directories = [
    "components/ui",
    "components/forms",
    "components/layout",
    "components/transactions",
    "pages",
    "services",
    "utils",
    "styles"
]

for d in directories:
    os.makedirs(os.path.join(src_dir, d), exist_ok=True)

# CSS FILES
css_files = {
    "global.css": """
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --primary: #16A34A;
  --primary-light: #DCFCE7;
  --primary-dark: #15803D;
  --accent: #F97316;
  --accent-light: #FFEDD5;
  --danger: #DC2626;
  --danger-light: #FEE2E2;
  --bg-color: #F8F9FA;
  --card-bg: #FFFFFF;
  --text-main: #111827;
  --text-muted: #6B7280;
  --border-color: #F3F4F6;
  --font-family: 'Inter', system-ui, sans-serif;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--font-family); background-color: var(--bg-color); color: var(--text-main); -webkit-font-smoothing: antialiased; }
a { text-decoration: none; color: inherit; }
button { cursor: pointer; font-family: inherit; border: none; background: none; }
ul, li { list-style: none; }
""",
    "layout.css": """
.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.mobile-frame {
  width: 100%;
  max-width: 412px;
  min-height: 100dvh;
  background-color: var(--bg-color);
  position: relative;
  display: flex;
  flex-direction: column;
}

@media (min-width: 640px) {
  .app-container { padding-top: 2rem; padding-bottom: 2rem; background-color: #e5e7eb; }
  .mobile-frame { height: 915px; min-height: 915px; border-radius: 36px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 8px solid #1f2937; overflow: hidden; }
}

.header { background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color: white; padding: 2rem 1.25rem 3.5rem 1.25rem; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; flex-shrink: 0; }
.header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.header-title { font-size: 0.75rem; font-weight: 600; opacity: 0.9; letter-spacing: 0.05em; }
.header-actions button { background: rgba(255,255,255,0.2); border-radius: 50%; padding: 0.5rem; display: flex; align-items: center; justify-content: center; color: white; margin-left: 0.5rem; transition: background 0.2s; }
.header-actions button:hover { background: rgba(255,255,255,0.3); }

.header-content { display: flex; align-items: center; gap: 1rem; }
.header-logo { width: 64px; height: 64px; border-radius: 50%; background: white; padding: 2px; border: 3px solid var(--accent); flex-shrink: 0; }
.header-logo img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
.header-info h1 { font-size: 1.1rem; font-weight: 700; line-height: 1.2; margin-bottom: 0.25rem; }
.header-info p { font-size: 0.75rem; opacity: 0.9; display: flex; align-items: center; gap: 0.25rem; }

.main-content { flex: 1; padding: 1.25rem; overflow-y: auto; padding-bottom: 6rem; }
.main-content::-webkit-scrollbar { display: none; }

.bottom-nav { position: absolute; bottom: 0; width: 100%; background: white; border-top: 1px solid var(--border-color); display: flex; justify-content: space-around; padding: 0.75rem 0 1.5rem 0; box-shadow: 0 -4px 20px rgba(0,0,0,0.03); z-index: 20; }
.nav-item { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; min-width: 64px; color: var(--text-muted); }
.nav-item.active { color: var(--primary); }
.nav-icon { padding: 0.25rem; border-radius: 50%; transition: background 0.2s; }
.nav-item.active .nav-icon { background: var(--primary-light); }
.nav-label { font-size: 0.65rem; font-weight: 700; }
""",
    "dashboard.css": """
.dashboard-page { animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.balance-card-container { padding: 0 1.25rem; margin-top: -3rem; position: relative; z-index: 10; margin-bottom: 1.5rem; flex-shrink: 0; }
.balance-card { background: white; border-radius: 24px; padding: 1.25rem; box-shadow: 0 8px 30px rgba(0,0,0,0.04); border: 1px solid var(--border-color); }
.balance-top { display: flex; justify-content: space-between; align-items: flex-start; }
.balance-label { display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.875rem; font-weight: 600; margin-bottom: 0.25rem; }
.balance-amount { font-size: 2rem; font-weight: 800; color: var(--text-main); }
.balance-icon-wrap { background: var(--primary-light); padding: 0.75rem; border-radius: 16px; color: var(--primary); }

.balance-stats { display: flex; gap: 1rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); }
.stat-col { flex: 1; display: flex; align-items: center; gap: 0.75rem; }
.stat-icon { border-radius: 50%; padding: 0.4rem; display: flex; align-items: center; justify-content: center; }
.stat-icon.green { background: var(--primary-light); color: var(--primary); }
.stat-icon.red { background: var(--danger-light); color: var(--danger); }
.stat-label { font-size: 0.7rem; color: var(--text-muted); font-weight: 700; margin-bottom: 0.125rem; }
.stat-val { font-size: 0.875rem; font-weight: 700; }
.stat-val.green { color: var(--primary); }
.stat-val.red { color: var(--danger); }
.stat-divider { width: 1px; background: var(--border-color); margin: 0.25rem 0; }

.quick-actions { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; margin-bottom: 1.5rem; }
.action-card { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; width: 100%; }
.action-icon-wrap { width: 3.5rem; height: 3.5rem; border-radius: 16px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
.action-label { font-size: 0.7rem; font-weight: 700; color: var(--text-main); display: flex; align-items: center; gap: 2px; }
""",
    "transactions.css": """
.recent-transactions { background: white; border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid var(--border-color); overflow: hidden; margin-bottom: 1.5rem; }
.rt-header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; border-bottom: 1px solid var(--border-color); }
.rt-title { display: flex; align-items: center; gap: 0.5rem; font-weight: 800; font-size: 0.95rem; color: var(--text-main); }
.rt-title-icon { background: var(--primary); padding: 0.25rem; border-radius: 6px; color: white; }
.rt-view-all { font-size: 0.8rem; font-weight: 700; color: var(--primary); display: flex; align-items: center; }

.txn-item { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border-bottom: 1px solid var(--border-color); transition: background 0.2s; }
.txn-item:last-child { border-bottom: none; }
.txn-item:hover { background: #f9fafb; }
.txn-icon { width: 2.5rem; height: 2.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); color: white; }
.txn-info { flex: 1; min-width: 0; }
.txn-title { font-weight: 700; font-size: 0.875rem; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.txn-subtitle { font-size: 0.7rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.25rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.txn-amount-col { display: flex; flex-direction: column; align-items: flex-end; flex-shrink: 0; }
.txn-amount { font-weight: 700; font-size: 0.875rem; }
.txn-badge { font-size: 0.55rem; font-weight: 800; padding: 0.125rem 0.5rem; border-radius: 999px; margin-top: 0.25rem; }

.txn-icon.green { background: var(--primary); }
.txn-icon.red { background: var(--danger); }
.txn-icon.orange { background: var(--accent); }

.txn-amount.green { color: var(--primary); }
.txn-amount.red { color: var(--danger); }
.txn-amount.orange { color: var(--accent); }

.txn-badge.green { background: var(--primary-light); color: var(--primary-dark); }
.txn-badge.orange { background: var(--accent-light); color: var(--accent); }
""",
    "forms.css": """
.form-group { margin-bottom: 1rem; }
.form-label { display: block; font-size: 0.75rem; font-weight: 600; color: var(--text-main); margin-bottom: 0.25rem; }
.form-input { width: 100%; background: #F9FAFB; border: 1px solid var(--border-color); border-radius: 12px; padding: 0.75rem 1rem; font-size: 0.875rem; outline: none; transition: border 0.2s; font-family: inherit; }
.form-input:focus { border-color: var(--primary); }
.btn-primary { width: 100%; background: var(--primary); color: white; border-radius: 12px; padding: 0.875rem; font-size: 0.875rem; font-weight: 700; text-align: center; display: block; box-shadow: 0 4px 6px rgba(22, 163, 74, 0.2); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

.sheet-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 50; display: flex; align-items: flex-end; justify-content: center; }
.sheet-content { width: 100%; max-width: 412px; background: white; border-top-left-radius: 28px; border-top-right-radius: 28px; padding: 1.25rem; max-height: 90vh; overflow-y: auto; }
.sheet-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.sheet-title { font-size: 1rem; font-weight: 800; color: var(--text-main); }
.sheet-close { background: var(--bg-color); padding: 0.5rem; border-radius: 50%; color: var(--text-muted); }
""",
    "cards.css": """
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.page-title { font-size: 0.95rem; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 0.5rem; }
.page-title span { color: var(--primary); }

.member-card { background: white; border-radius: 20px; padding: 1rem; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.02); border: 1px solid var(--border-color); }
.member-avatar { width: 3rem; height: 3rem; border-radius: 50%; background: var(--primary-light); color: var(--primary); font-weight: 800; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.member-info { flex: 1; min-width: 0; }
.member-name { font-weight: 800; font-size: 0.95rem; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 0.125rem; }
.member-sub { font-size: 0.7rem; font-weight: 500; color: var(--text-muted); }

.credit-card-wrap { display: flex; gap: 0.75rem; margin-bottom: 1.25rem; }
.credit-card { flex: 1; background: white; border-radius: 20px; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.02); border: 1px solid var(--border-color); }
.credit-label { font-size: 0.7rem; font-weight: 800; color: var(--text-muted); margin-bottom: 0.25rem; }
.credit-val { font-size: 1.25rem; font-weight: 800; color: var(--danger); }

.empty-state { padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.875rem; font-weight: 500; }
"""
}

for name, content in css_files.items():
    with open(os.path.join(src_dir, "styles", name), "w", encoding="utf-8") as f:
        f.write(content)

print("Directories and CSS generated successfully!")
