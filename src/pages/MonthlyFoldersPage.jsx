import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Folder, Calendar } from 'lucide-react';

const months = [
  { id: 'jan', name: 'जनवरी', eng: 'January' },
  { id: 'feb', name: 'फरवरी', eng: 'February' },
  { id: 'mar', name: 'मार्च', eng: 'March' },
  { id: 'apr', name: 'अप्रैल', eng: 'April' },
  { id: 'may', name: 'मई', eng: 'May' },
  { id: 'jun', name: 'जून', eng: 'June' },
  { id: 'jul', name: 'जुलाई', eng: 'July' },
  { id: 'aug', name: 'अगस्त', eng: 'August' },
  { id: 'sep', name: 'सितंबर', eng: 'September' },
  { id: 'oct', name: 'अक्टूबर', eng: 'October' },
  { id: 'nov', name: 'नवंबर', eng: 'November' },
  { id: 'dec', name: 'दिसंबर', eng: 'December' }
];

export default function MonthlyFoldersPage() {
  const navigate = useNavigate();

  return (
    <div className="report-page-container" style={{ margin: '-1.25rem', background: '#F8FAFC', minHeight: '100vh', paddingBottom: '6rem' }}>
      
      {/* Top Header Row */}
      <div style={{ background: 'white', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={() => navigate('/dashboard')} style={{ background: '#F5F3FF', border: 'none', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED', cursor: 'pointer' }}>
            <ArrowLeft size={20} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: '#EDE9FE', padding: '0.6rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={24} color="#7C3AED" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.1rem', lineHeight: '1.2' }}>महीने चुनें</h2>
              <p style={{ fontSize: '0.65rem', fontWeight: 600, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Select Month</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '2rem 1rem 1rem 1rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
          gap: '1rem' 
        }}>
          {months.map((month) => (
            <div 
              key={month.id}
              onClick={() => navigate(`/monthly-report/${month.name}`)}
              style={{ 
                background: 'white', 
                border: '1px solid #E2E8F0', 
                borderRadius: '12px', 
                padding: '1.25rem 0.5rem', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                gap: '0.5rem'
              }}
              className="month-folder-card"
            >
              <div style={{ background: '#F5F3FF', padding: '0.75rem', borderRadius: '12px' }}>
                <Folder size={28} color="#7C3AED" fill="#EDE9FE" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>{month.name}</div>
                <div style={{ fontSize: '0.65rem', color: '#64748B' }}>{month.eng}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
