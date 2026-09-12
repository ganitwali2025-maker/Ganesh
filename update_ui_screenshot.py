import os

jsx_file = r'c:\Users\lr690\OneDrive\Desktop\new app\src\pages\Dashboard.jsx'
css_file = r'c:\Users\lr690\OneDrive\Desktop\new app\src\styles\dashboard.css'

with open(jsx_file, 'r', encoding='utf-8') as f:
    jsx_content = f.read()

# Replace Quick Actions Section
quick_actions_old = """      {/* Quick Actions Grid */}
      <div className="section-container">
        <div className="section-header">
          <div className="section-title"><Zap size={18} className="text-primary" /> त्वरित कार्य</div>
          <button className="view-all-btn">सभी देखें <ChevronRight size={14}/></button>
        </div>
        <div className="quick-action-grid">
          <div className="action-item" onClick={() => navigate('/income')}>
            <div className="action-icon-bg bg-purple"><Download size={24} className="text-purple-600" /></div>
            <span>जमा</span>
          </div>
          <div className="action-item" onClick={() => navigate('/expense')}>
            <div className="action-icon-bg bg-blue"><Upload size={24} className="text-blue-600" /></div>
            <span>खर्च</span>
          </div>
          <div className="action-item" onClick={() => navigate('/income')}>
            <div className="action-icon-bg bg-green"><IndianRupee size={24} className="text-green-600" /></div>
            <span>चंदा / योगदान</span>
          </div>
          <div className="action-item" onClick={() => navigate('/members')}>
            <div className="action-icon-bg bg-orange"><Users size={24} className="text-orange-600" /></div>
            <span>सदस्य</span>
          </div>
          <div className="action-item" onClick={() => navigate('/reports')}>
            <div className="action-icon-bg bg-indigo"><BarChart2 size={24} className="text-indigo-600" /></div>
            <span>रिपोर्ट</span>
          </div>
        </div>
      </div>"""

quick_actions_new = """      {/* Quick Actions Grid */}
      <div className="section-container">
        <div className="section-header">
          <div className="section-title-wrapper">
            <div className="section-title-icon bg-purple-light"><Zap size={20} className="text-purple-600" fill="currentColor" /></div>
            <div>
              <div className="section-title text-xl">त्वरित कार्य</div>
              <div className="section-subtitle">जल्दी से जरूरी काम करें</div>
            </div>
          </div>
          <button className="view-all-btn btn-pill">सभी देखें <ChevronRight size={16}/></button>
        </div>
        <div className="quick-action-grid">
          <div className="action-item" onClick={() => navigate('/income')}>
            <div className="action-icon-bg bg-purple-soft"><Download size={28} className="text-purple-700" strokeWidth={2.5} /></div>
            <span className="underline-purple">जमा</span>
          </div>
          <div className="action-item" onClick={() => navigate('/expense')}>
            <div className="action-icon-bg bg-blue-soft"><Upload size={28} className="text-blue-600" strokeWidth={2.5} /></div>
            <span className="underline-blue">खर्च</span>
          </div>
          <div className="action-item" onClick={() => navigate('/income')}>
            <div className="action-icon-bg bg-green-soft"><IndianRupee size={28} className="text-green-700" strokeWidth={2.5} /></div>
            <span className="underline-green">चंदा / योगदान</span>
          </div>
          <div className="action-item" onClick={() => navigate('/members')}>
            <div className="action-icon-bg bg-orange-soft"><Users size={28} className="text-orange-700" strokeWidth={2.5} /></div>
            <span className="underline-orange">सदस्य</span>
          </div>
          <div className="action-item" onClick={() => navigate('/reports')}>
            <div className="action-icon-bg bg-indigo-soft"><BarChart2 size={28} className="text-indigo-700" strokeWidth={2.5} /></div>
            <span className="underline-indigo">रिपोर्ट</span>
          </div>
        </div>
      </div>"""

jsx_content = jsx_content.replace(quick_actions_old, quick_actions_new)

# Replace Reports Section
reports_old = """      {/* Reports & Sheets */}
      <div className="section-container">
        <div className="section-header">
          <div className="section-title"><FolderOpen size={18} className="text-primary" /> रिपोर्ट्स & शीट्स</div>
          <button className="view-all-btn" onClick={() => navigate('/reports')}>सभी देखें <ChevronRight size={14}/></button>
        </div>
        <div className="reports-grid">
          <div className="report-card blue-border">
            <div className="report-card-top">
              <div className="r-icon blue-bg"><Folder size={18} className="text-blue-600" /></div>
              <ChevronRight size={16} className="text-muted" />
            </div>
            <div className="r-title">सदस्य सूची</div>
            <div className="r-subtitle">Google Sheets</div>
          </div>
          <div className="report-card green-border">
            <div className="report-card-top">
              <div className="r-icon green-bg"><Folder size={18} className="text-green-600" /></div>
              <ChevronRight size={16} className="text-muted" />
            </div>
            <div className="r-title">चंदा / योगदान</div>
            <div className="r-subtitle">Google Sheets</div>
          </div>
          <div className="report-card orange-border">
            <div className="report-card-top">
              <div className="r-icon orange-bg"><Folder size={18} className="text-orange-600" /></div>
              <ChevronRight size={16} className="text-muted" />
            </div>
            <div className="r-title">खर्च विवरण</div>
            <div className="r-subtitle">Google Sheets</div>
          </div>
          <div className="report-card purple-border">
            <div className="report-card-top">
              <div className="r-icon purple-bg"><Folder size={18} className="text-purple-600" /></div>
              <ChevronRight size={16} className="text-muted" />
            </div>
            <div className="r-title">मासिक संग्रह</div>
            <div className="r-subtitle">Google Sheets</div>
          </div>
        </div>
      </div>"""

reports_new = """      {/* Reports & Sheets */}
      <div className="section-container">
        <div className="section-header">
          <div className="section-title-wrapper">
            <div className="section-title-icon bg-blue-light"><Folder size={20} className="text-blue-600" fill="currentColor" /></div>
            <div>
              <div className="section-title text-xl">रिपोर्ट्स & शीट्स</div>
              <div className="section-subtitle">Google Sheets से जुड़ी फाइलें और रिपोर्ट्स</div>
            </div>
          </div>
          <button className="view-all-btn btn-pill" onClick={() => navigate('/reports')}>सभी देखें <ChevronRight size={16}/></button>
        </div>
        <div className="reports-grid">
          <div className="report-card theme-blue">
            <div className="report-card-top">
              <div className="r-icon"><Folder size={24} className="r-icon-svg" /></div>
              <div className="r-arrow"><ChevronRight size={16} className="r-arrow-svg" /></div>
            </div>
            <div className="report-card-content">
              <div className="r-title">सदस्य सूची</div>
              <div className="r-subtitle">
                <FileText size={12} className="text-green-600" fill="#16A34A" color="white" /> Google Sheets
              </div>
            </div>
          </div>
          <div className="report-card theme-green">
            <div className="report-card-top">
              <div className="r-icon"><Folder size={24} className="r-icon-svg" /></div>
              <div className="r-arrow"><ChevronRight size={16} className="r-arrow-svg" /></div>
            </div>
            <div className="report-card-content">
              <div className="r-title">चंदा / योगदान</div>
              <div className="r-subtitle">
                <FileText size={12} className="text-green-600" fill="#16A34A" color="white" /> Google Sheets
              </div>
            </div>
          </div>
          <div className="report-card theme-orange">
            <div className="report-card-top">
              <div className="r-icon"><Folder size={24} className="r-icon-svg" /></div>
              <div className="r-arrow"><ChevronRight size={16} className="r-arrow-svg" /></div>
            </div>
            <div className="report-card-content">
              <div className="r-title">खर्च विवरण</div>
              <div className="r-subtitle">
                <FileText size={12} className="text-green-600" fill="#16A34A" color="white" /> Google Sheets
              </div>
            </div>
          </div>
          <div className="report-card theme-purple">
            <div className="report-card-top">
              <div className="r-icon"><Folder size={24} className="r-icon-svg" /></div>
              <div className="r-arrow"><ChevronRight size={16} className="r-arrow-svg" /></div>
            </div>
            <div className="report-card-content">
              <div className="r-title">मासिक संग्रह</div>
              <div className="r-subtitle">
                <FileText size={12} className="text-green-600" fill="#16A34A" color="white" /> Google Sheets
              </div>
            </div>
          </div>
        </div>
      </div>"""

jsx_content = jsx_content.replace(reports_old, reports_new)

with open(jsx_file, 'w', encoding='utf-8') as f:
    f.write(jsx_content)

# Now update CSS
with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

css_append = """
/* UPDATED DASHBOARD UI STYLES */
.section-title-wrapper {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
.section-title-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg-purple-light { background: #EBE4FF; }
.bg-blue-light { background: #E0E7FF; }

.section-title.text-xl {
  font-size: 1.3rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 0.1rem;
}
.section-subtitle {
  font-size: 0.75rem;
  color: #64748B;
  font-weight: 500;
}
.btn-pill {
  background: #F3E8FF;
  color: #6D28D9;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  transition: all 0.2s;
}
.btn-pill:hover {
  background: #EBE4FF;
}

/* Updated Quick Action Grid */
.bg-purple-soft { background: #E6DEFF; }
.bg-blue-soft { background: #D9EAF7; }
.bg-green-soft { background: #C7F1C9; }
.bg-orange-soft { background: #FFE8D0; }
.bg-indigo-soft { background: #E2E0FF; }

.action-icon-bg {
  width: 60px;
  height: 60px;
  border-radius: 18px;
}
.action-item span {
  font-size: 0.85rem;
  font-weight: 800;
  color: #1E293B;
  text-align: center;
  position: relative;
  padding-bottom: 0.3rem;
  margin-top: 0.2rem;
}

.underline-purple::after { content: ''; position: absolute; bottom: 0; left: 10%; width: 80%; height: 4px; background: #581C87; border-radius: 4px; }
.underline-blue::after { content: ''; position: absolute; bottom: 0; left: 10%; width: 80%; height: 4px; background: #0284C7; border-radius: 4px; }
.underline-green::after { content: ''; position: absolute; bottom: 0; left: 10%; width: 80%; height: 4px; background: #16A34A; border-radius: 4px; }
.underline-orange::after { content: ''; position: absolute; bottom: 0; left: 10%; width: 80%; height: 4px; background: #EA580C; border-radius: 4px; }
.underline-indigo::after { content: ''; position: absolute; bottom: 0; left: 10%; width: 80%; height: 4px; background: #6366F1; border-radius: 4px; }

/* Updated Reports Grid Cards */
.report-card {
  padding: 1rem;
  border-radius: 16px;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 110px;
}
.report-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0;
}
.r-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.r-arrow {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.report-card-content {
  display: flex;
  flex-direction: column;
}
.r-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 0.25rem;
}
.r-subtitle {
  font-size: 0.75rem;
  color: #475569;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

/* Card Themes */
.theme-blue { background: #F0F6FF; border: 1px solid #E0EFFF; }
.theme-blue .r-icon { background: #D9EAF7; }
.theme-blue .r-icon-svg { color: #0284C7; }
.theme-blue .r-arrow { background: #E0EFFF; color: #0284C7; }

.theme-green { background: #F2FCF3; border: 1px solid #E4F9E6; }
.theme-green .r-icon { background: #C7F1C9; }
.theme-green .r-icon-svg { color: #16A34A; }
.theme-green .r-arrow { background: #E4F9E6; color: #16A34A; }

.theme-orange { background: #FFF9F2; border: 1px solid #FFEED9; }
.theme-orange .r-icon { background: #FFE8D0; }
.theme-orange .r-icon-svg { color: #9A3412; }
.theme-orange .r-arrow { background: #FFEED9; color: #9A3412; }

.theme-purple { background: #F9F5FF; border: 1px solid #F3EAFF; }
.theme-purple .r-icon { background: #EBE4FF; }
.theme-purple .r-icon-svg { color: #6D28D9; }
.theme-purple .r-arrow { background: #F3EAFF; color: #6D28D9; }
"""

css_content += css_append

with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css_content)

print("UI successfully updated.")
