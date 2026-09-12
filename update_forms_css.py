import os

css_file = r'c:\Users\lr690\OneDrive\Desktop\new app\src\styles\forms.css'

with open(css_file, 'r', encoding='utf-8') as f:
    content = f.read()

append_css = """
/* Income Page Form Styles */
.page-container {
  padding: 1.25rem;
  padding-bottom: 5rem;
  animation: fadeIn 0.4s ease;
}
.page-header {
  margin-bottom: 1.5rem;
}
.page-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 0.25rem;
}
.page-subtitle {
  font-size: 0.85rem;
  color: #64748B;
  font-weight: 500;
}
.status-alert {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  animation: fadeIn 0.3s ease;
}
.status-alert.success { background: #DCFCE7; color: #16A34A; }
.status-alert.error { background: #FEE2E2; color: #DC2626; }

.form-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  border: 1px solid #F1F5F9;
}
.entry-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  flex: 1 1 calc(50% - 0.75rem);
  min-width: 140px;
}
.form-group.full-width {
  flex: 1 1 100%;
}
.form-group label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: #334155;
  margin-bottom: 0.5rem;
}
.form-group input,
.form-group select,
.form-group textarea {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 0.8rem 1rem;
  font-size: 0.9rem;
  font-family: inherit;
  color: #0F172A;
  transition: all 0.2s;
  outline: none;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #6D28D9;
  background: white;
  box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.1);
}
.form-group input.readonly-input {
  background: #F1F5F9;
  color: #64748B;
  pointer-events: none;
}
.submit-btn {
  background: #6D28D9;
  color: white;
  border: none;
  border-radius: 14px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  box-shadow: 0 4px 15px rgba(109, 40, 217, 0.3);
}
.submit-btn:hover { background: #5B21B6; }
.submit-btn:active { transform: scale(0.98); }
.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
"""

with open(css_file, 'a', encoding='utf-8') as f:
    f.write(append_css)

print("Form CSS updated successfully.")
