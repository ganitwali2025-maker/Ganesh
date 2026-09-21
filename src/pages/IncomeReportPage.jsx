import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Folder, RefreshCw, CheckCircle, Wallet, CreditCard, Clock, ExternalLink } from 'lucide-react';
import { formatINR, formatDate } from '../utils/formatters';

export default function IncomeReportPage() {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [lastSync, setLastSync] = useState(null);
  const [error, setError] = useState(null);
  
  const fetchGoogleSheetsData = async () => {
    setLoading(true);
    setError(null);
    try {
      // ?type=income pass karenge jisse Google Apps Script sirft Income ka data bheje
      const response = await fetch('https://script.google.com/macros/s/AKfycbxVMu77qQB9rtYyNnWiMUdlCdUNOCHxQntc6u321oWF_CgZnI521W68isq_m64RBYVLvg/exec?type=income');
      const result = await response.json();
      
      if (result.status === 'success') {
        setData(result.data || []);
        
        const now = new Date();
        const dateString = now.toLocaleDateString('en-GB'); // DD/MM/YYYY
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
        
        setLastSync(`${dateString} ${timeString}`);
      } else {
        setError(result.message || 'डेटा सिंक नहीं हो पाया');
        console.error("Google Sheets Sync Error:", result);
      }
    } catch (err) {
      setError('नेटवर्क एरर। डेटा सिंक नहीं हो पाया।');
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoogleSheetsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate totals
  const totalAmount = data.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const totalPaid = data.reduce((acc, curr) => acc + (curr.paidAmount || 0), 0);
  const totalDue = data.reduce((acc, curr) => acc + (curr.dueAmount || 0), 0);

  return (
    <div className="report-page-container" style={{ margin: '-1.25rem', background: '#F8FAFC', minHeight: '100vh', paddingBottom: '6rem' }}>
      
      {/* Top Header Row */}
      <div style={{ background: 'white', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={() => navigate(-1)} style={{ background: '#F0FDF4', border: 'none', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A', cursor: 'pointer' }}>
            <ArrowLeft size={20} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: '#DCFCE7', padding: '0.6rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Folder size={24} color="#16A34A" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.1rem', lineHeight: '1.2' }}>चंदा / जमा विवरण</h2>
              <p style={{ fontSize: '0.65rem', fontWeight: 600, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ganesh Samiti - Income Sheet 2026</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={fetchGoogleSheetsData}
          disabled={loading}
          style={{ background: '#16A34A', color: 'white', border: 'none', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', opacity: loading ? 0.7 : 1, transition: 'all 0.2s' }}
        >
          <RefreshCw size={14} className={loading ? 'spin' : ''} />
          Sync
        </button>
      </div>

      <div style={{ padding: '2rem 1rem 1rem 1rem' }}>
        
        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '0.75rem', marginBottom: '1.5rem', color: '#DC2626', fontSize: '0.8rem', fontWeight: 600, textAlign: 'center' }}>
            {error}
          </div>
        )}

        {/* Summary Cards */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          
          <div style={{ flex: '1', minWidth: '110px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ background: '#E0F2FE', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <Wallet size={16} color="#0284C7" />
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.2rem' }}>कुल राशि</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284C7' }}>{formatINR(totalAmount)}</div>
          </div>

          <div style={{ flex: '1', minWidth: '110px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ background: '#DCFCE7', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <CreditCard size={16} color="#16A34A" />
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#166534', marginBottom: '0.2rem' }}>प्राप्त राशि</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#16A34A' }}>{formatINR(totalPaid)}</div>
          </div>

          <div style={{ flex: '1', minWidth: '110px', background: '#FFF7ED', border: '1px solid #FFEDD5', borderRadius: '12px', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ background: '#FFEDD5', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <Clock size={16} color="#EA580C" />
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9A3412', marginBottom: '0.2rem' }}>बकाया</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#EA580C' }}>{formatINR(totalDue)}</div>
          </div>

        </div>

        {/* Data Table Wrapper */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '950px' }}>
              <thead>
                <tr style={{ background: '#16A34A', color: 'white', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: 'white', width: '50px', whiteSpace: 'nowrap' }}>क्र.सं.</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: 'white', width: '90px', whiteSpace: 'nowrap' }}>दिनांक</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: 'white', width: '80px', whiteSpace: 'nowrap' }}>माह</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: 'white', minWidth: '150px', whiteSpace: 'nowrap' }}>सदस्य का नाम</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: 'white', width: '100px', whiteSpace: 'nowrap' }}>पद</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: 'white', width: '100px', whiteSpace: 'nowrap' }}>जमा श्रेणी</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: 'white', width: '100px', whiteSpace: 'nowrap' }}>भुगतान माध्यम</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontSize: '0.7rem', fontWeight: 700, color: 'white', width: '80px', whiteSpace: 'nowrap' }}>राशि</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontSize: '0.7rem', fontWeight: 700, color: 'white', width: '80px', whiteSpace: 'nowrap' }}>जमा राशि</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontSize: '0.7rem', fontWeight: 700, color: 'white', width: '80px', whiteSpace: 'nowrap' }}>उधारी राशि</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'center', fontSize: '0.7rem', fontWeight: 700, color: 'white', width: '90px', whiteSpace: 'nowrap' }}>स्थिति</th>
                </tr>
              </thead>
              <tbody>
                {loading && data.length === 0 ? (
                  <tr>
                    <td colSpan="11" style={{ padding: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.85rem' }}>
                      <RefreshCw size={24} className="spin" style={{ margin: '0 auto 1rem', color: '#16A34A' }} />
                      Google Sheets से डेटा सिंक हो रहा है...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan="11" style={{ padding: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.85rem' }}>
                      अभी कोई आय/जमा दर्ज नहीं है।
                    </td>
                  </tr>
                ) : (
                  data.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9', background: idx % 2 === 0 ? 'white' : '#FAFAFA' }}>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: '#1E293B' }}>{item.sNo}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: '#475569' }}>{formatDate(item.date)}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: '#475569' }}>{item.month}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: '#1E293B', whiteSpace: 'nowrap' }}>{item.memberName}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: '#475569' }}>{item.designation}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: '#64748B' }}>{item.category}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: '#475569' }}>{item.paymentMode}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: '#1E293B', textAlign: 'right' }}>{formatINR(item.amount)}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: '#16A34A', textAlign: 'right' }}>{formatINR(item.paidAmount)}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: '#EA580C', textAlign: 'right' }}>{formatINR(item.dueAmount)}</td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                        {item.dueAmount > 0 ? (
                          <span style={{ display: 'inline-flex', padding: '0.2rem 0.5rem', background: '#FEF2F2', color: '#DC2626', borderRadius: '12px', fontSize: '0.65rem', fontWeight: 700 }}>
                            बकाया
                          </span>
                        ) : (
                          <span style={{ display: 'inline-flex', padding: '0.2rem 0.5rem', background: '#F0FDF4', color: '#16A34A', borderRadius: '12px', fontSize: '0.65rem', fontWeight: 700 }}>
                            भुगतान
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
