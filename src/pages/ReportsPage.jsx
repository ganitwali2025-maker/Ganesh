import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Folder, FileText, Calendar, User, IndianRupee, Tag, ChevronRight } from 'lucide-react';
import { getData } from '../utils/storage';
import { formatINR } from '../utils/formatters';

export default function ReportsPage() {
  const location = useLocation();
  const initialCategory = location.state?.category || 'monthly'; // 'monthly' | 'chanda' | 'members' | 'expenses'
  const [activeTab, setActiveTab] = useState(initialCategory);

  const [monthlyData, setMonthlyData] = useState([]);
  const [chandaData, setChandaData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    setMonthlyData(getData('income', []));
    setChandaData(getData('chanda', []));
    setExpenseData(getData('expenses', []));
  }, []);

  const totalMonthly = monthlyData.reduce((sum, item) => sum + (parseFloat(item.paidAmount || item.amount) || 0), 0);
  const totalChanda = chandaData.reduce((sum, item) => sum + (parseFloat(item.paidAmount || item.amount) || 0), 0);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">रिपोर्ट्स & फाइलें</h2>
        <p className="page-subtitle">सभी संग्रह और रिकॉर्ड्स का विवरण</p>
      </div>

      {/* Tabs / Folder Selection */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
        <button
          onClick={() => setActiveTab('monthly')}
          className={`btn-pill ${activeTab === 'monthly' ? 'active' : ''}`}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: '20px',
            background: activeTab === 'monthly' ? '#6D28D9' : '#F3E8FF',
            color: activeTab === 'monthly' ? '#FFFFFF' : '#6D28D9',
            fontWeight: 600,
            whiteSpace: 'nowrap'
          }}
        >
          📁 मासिक संग्रह ({monthlyData.length})
        </button>

        <button
          onClick={() => setActiveTab('chanda')}
          className={`btn-pill ${activeTab === 'chanda' ? 'active' : ''}`}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: '20px',
            background: activeTab === 'chanda' ? '#16A34A' : '#DCFCE7',
            color: activeTab === 'chanda' ? '#FFFFFF' : '#16A34A',
            fontWeight: 600,
            whiteSpace: 'nowrap'
          }}
        >
          📁 चंदा / योगदान ({chandaData.length})
        </button>

        <button
          onClick={() => setActiveTab('expenses')}
          className={`btn-pill ${activeTab === 'expenses' ? 'active' : ''}`}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: '20px',
            background: activeTab === 'expenses' ? '#EA580C' : '#FFEDD5',
            color: activeTab === 'expenses' ? '#EA580C' : '#EA580C',
            color: activeTab === 'expenses' ? '#FFFFFF' : '#EA580C',
            fontWeight: 600,
            whiteSpace: 'nowrap'
          }}
        >
          📁 खर्च विवरण ({expenseData.length})
        </button>
      </div>

      {/* Monthly Jama Folder View */}
      {activeTab === 'monthly' && (
        <div>
          <div style={{ background: '#F9F5FF', border: '1px solid #EBE4FF', borderRadius: '16px', padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748B' }}>कुल मासिक संग्रह</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#6D28D9' }}>{formatINR(totalMonthly)}</div>
            </div>
            <Folder size={32} color="#6D28D9" />
          </div>

          {monthlyData.length === 0 ? (
            <div className="empty-state" style={{ textAlign: 'center', padding: '2rem', background: 'white', borderRadius: '16px', color: '#64748B' }}>
              अभी कोई मासिक जमा रिकॉर्ड नहीं है।
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {monthlyData.map((item, idx) => (
                <div key={idx} style={{ background: 'white', borderRadius: '14px', padding: '1rem', border: '1px solid #F1F5F9', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <User size={16} color="#6D28D9" /> {item.memberName || 'सदस्य'}
                    </div>
                    <div style={{ fontWeight: 700, color: '#16A34A', fontSize: '1rem' }}>
                      {formatINR(parseFloat(item.paidAmount || item.amount) || 0)}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#64748B' }}>
                    <span><Calendar size={12} /> {item.date || 'N/A'}</span>
                    {item.months && <span><Tag size={12} /> {item.months}</span>}
                    {item.paymentMode && <span>💳 {item.paymentMode}</span>}
                  </div>

                  {item.remark && (
                    <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.4rem', fontStyle: 'italic' }}>
                      टिप्पणी: {item.remark}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Chanda / Yogdan Folder View */}
      {activeTab === 'chanda' && (
        <div>
          <div style={{ background: '#F2FCF3', border: '1px solid #E4F9E6', borderRadius: '16px', padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748B' }}>कुल चंदा / योगदान</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#16A34A' }}>{formatINR(totalChanda)}</div>
            </div>
            <Folder size={32} color="#16A34A" />
          </div>

          {chandaData.length === 0 ? (
            <div className="empty-state" style={{ textAlign: 'center', padding: '2rem', background: 'white', borderRadius: '16px', color: '#64748B' }}>
              अभी कोई चंदा / योगदान रिकॉर्ड नहीं है।
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {chandaData.map((item, idx) => (
                <div key={idx} style={{ background: 'white', borderRadius: '14px', padding: '1rem', border: '1px solid #F1F5F9', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <User size={16} color="#16A34A" /> {item.memberName || 'दानदाता'}
                    </div>
                    <div style={{ fontWeight: 700, color: '#16A34A', fontSize: '1rem' }}>
                      {formatINR(parseFloat(item.paidAmount || item.amount) || 0)}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#64748B' }}>
                    <span><Calendar size={12} /> {item.date || 'N/A'}</span>
                    <span><Tag size={12} /> {item.jamaCategory || 'चंदा'}</span>
                  </div>

                  {item.remark && (
                    <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.4rem', fontStyle: 'italic' }}>
                      टिप्पणी: {item.remark}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Expenses Folder View */}
      {activeTab === 'expenses' && (
        <div>
          {expenseData.length === 0 ? (
            <div className="empty-state" style={{ textAlign: 'center', padding: '2rem', background: 'white', borderRadius: '16px', color: '#64748B' }}>
              अभी कोई खर्च रिकॉर्ड नहीं है।
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {expenseData.map((item, idx) => (
                <div key={idx} style={{ background: 'white', borderRadius: '14px', padding: '1rem', border: '1px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <div style={{ fontWeight: 600, color: '#0F172A' }}>{item.title || 'खर्च'}</div>
                    <div style={{ fontWeight: 700, color: '#DC2626' }}>{formatINR(parseFloat(item.amount) || 0)}</div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}><Calendar size={12} /> {item.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
