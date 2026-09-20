import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Folder, RefreshCw, CheckCircle, Wallet, CreditCard, Clock, ExternalLink } from 'lucide-react';
import { formatINR } from '../utils/formatters';

export default function ExpenseReportPage() {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [lastSync, setLastSync] = useState(null);
  const [filter, setFilter] = useState('all'); // all, paid, due
  const [error, setError] = useState(null);

  // Example mock data matching user request
  const mockData = [
    { id: 1, sNo: 1, date: '28/07/2026', name: 'डीजे बुकिंग', desc: 'गणेश विसर्जन के लिए एडवांस + पेट्रोल 100', mode: 'नकद', total: 5100, paid: 5100, due: 0, status: 'भुगतान हो गया' },
    { id: 2, sNo: 2, date: '05/08/2026', name: 'गणेश मूर्ति', desc: 'गणेश मूर्ति की अग्रिम राशि', mode: 'नकद', total: 1000, paid: 1000, due: 0, status: 'भुगतान हो गया' },
    { id: 3, sNo: 3, date: '09/09/2026', name: 'केला, दूध एवं रस्सी', desc: '2 किलो केला ₹20, मूर्ति केला एवं दूध रस्सी 5 पीस', mode: 'नकद', total: 330, paid: 330, due: 0, status: 'भुगतान हो गया' },
    { id: 4, sNo: 4, date: '11/09/2026', name: 'लाइट एवं कील', desc: 'लाइट एवं कील', mode: 'नकद', total: 110, paid: 110, due: 0, status: 'भुगतान हो गया' },
    { id: 5, sNo: 5, date: '13/09/2026', name: '50W LED लाइट / सीलिंग पंडाल', desc: '15×15 साइज, लाइट रेट ₹650 + पंडाल ₹2,100', mode: 'UPI / नकद', total: 2750, paid: 2750, due: 0, status: 'भुगतान पूर्ण' },
    { id: 6, sNo: 6, date: '13/09/2026', name: 'त्रिपाल', desc: '2 पीस – 15×12 साइज ₹550 + 15×24 साइज ₹850', mode: 'UPI / नकद', total: 1400, paid: 1400, due: 0, status: 'भुगतान पूर्ण' },
    { id: 7, sNo: 7, date: '13/09/2026', name: 'ब्लूटूथ बॉक्स DJ Bass', desc: 'DJ बॉक्स का एडवांस', mode: 'UPI / नकद', total: 4500, paid: 4500, due: 0, status: 'भुगतान पूर्ण' },
    { id: 8, sNo: 8, date: '13/09/2026', name: 'इलेक्ट्रिकल सामान', desc: 'बोर्ड, टेस्टर, टेप आदि', mode: 'UPI / नकद', total: 680, paid: 680, due: 0, status: 'भुगतान पूर्ण' },
    { id: 9, sNo: 9, date: '14/09/2026', name: 'गणेश मूर्ति', desc: 'बाकी का पैसा', mode: 'UPI / नकद', total: 5250, paid: 5250, due: 0, status: 'भुगतान पूर्ण' },
    { id: 10, sNo: 10, date: '14/09/2026', name: 'गणेश पूजा', desc: 'फल, मिठाई, माला', mode: 'UPI / नकद', total: 420, paid: 420, due: 0, status: 'भुगतान पूर्ण' },
    { id: 11, sNo: 11, date: '14/09/2026', name: 'लाइट होल्डर और वायर', desc: 'लाइट होल्डर और वायर', mode: 'UPI / नकद', total: 48, paid: 48, due: 0, status: 'भुगतान पूर्ण' },
    { id: 12, sNo: 12, date: '20/09/2026', name: 'प्रसाद', desc: 'सूजी, डालडा, शक्कर, काजू, किशमिश, लौंग, इलायची', mode: 'नकद', total: 275, paid: 275, due: 0, status: 'भुगतान पूर्ण' },
  ];

  const fetchGoogleSheetsData = () => {
    setLoading(true);
    setError(null);
    // Simulate network delay for sync
    setTimeout(() => {
      setData(mockData);
      
      const now = new Date();
      const dateString = now.toLocaleDateString('en-GB'); // DD/MM/YYYY
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; 
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
      
      setLastSync(`${dateString} ${timeString}`);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchGoogleSheetsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate totals
  const totalExpense = data.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const totalPaid = data.reduce((acc, curr) => acc + (curr.paid || 0), 0);
  const totalDue = data.reduce((acc, curr) => acc + (curr.due || 0), 0);

  // Filter Logic
  const filteredData = data.filter(item => {
    if (filter === 'paid') return item.due === 0;
    if (filter === 'due') return item.due > 0;
    return true; // 'all'
  });

  const countAll = data.length;
  const countPaid = data.filter(i => i.due === 0).length;
  const countDue = data.filter(i => i.due > 0).length;

  return (
    <div className="report-page-container" style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '6rem' }}>
      
      {/* Top Header Row */}
      <div style={{ background: 'white', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={() => navigate(-1)} style={{ background: '#F1F5F9', border: 'none', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6D28D9', cursor: 'pointer' }}>
            <ArrowLeft size={20} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: '#F3E8FF', padding: '0.6rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Folder size={24} color="#6D28D9" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.1rem', lineHeight: '1.2' }}>खर्च विवरण</h2>
              <p style={{ fontSize: '0.65rem', fontWeight: 600, color: '#6D28D9', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ganesh Samiti - Kharch Sheet 2026</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={fetchGoogleSheetsData}
          disabled={loading}
          style={{ background: '#6D28D9', color: 'white', border: 'none', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', opacity: loading ? 0.7 : 1, transition: 'all 0.2s' }}
        >
          <RefreshCw size={14} className={loading ? 'spin' : ''} />
          Sync
        </button>
      </div>

      <div style={{ padding: '1rem' }}>
        
        {/* Summary Cards */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          
          <div style={{ flex: '1', minWidth: '110px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ background: '#F3E8FF', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <Wallet size={16} color="#6D28D9" />
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.2rem' }}>कुल खर्च</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#6D28D9' }}>{formatINR(totalExpense)}</div>
          </div>

          <div style={{ flex: '1', minWidth: '110px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ background: '#DCFCE7', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <CreditCard size={16} color="#16A34A" />
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#166534', marginBottom: '0.2rem' }}>भुगतान</div>
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

        {/* Filter Tabs */}
        <div style={{ display: 'flex', background: 'white', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0', marginBottom: '1rem' }}>
          <button 
            onClick={() => setFilter('all')}
            style={{ flex: '1', padding: '0.6rem', border: 'none', background: filter === 'all' ? '#6D28D9' : 'transparent', color: filter === 'all' ? 'white' : '#64748B', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, transition: 'all 0.2s', cursor: 'pointer' }}
          >
            सभी ({countAll})
          </button>
          <button 
            onClick={() => setFilter('paid')}
            style={{ flex: '1', padding: '0.6rem', border: 'none', background: filter === 'paid' ? '#6D28D9' : 'transparent', color: filter === 'paid' ? 'white' : '#64748B', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, transition: 'all 0.2s', cursor: 'pointer' }}
          >
            भुगतान ({countPaid})
          </button>
          <button 
            onClick={() => setFilter('due')}
            style={{ flex: '1', padding: '0.6rem', border: 'none', background: filter === 'due' ? '#6D28D9' : 'transparent', color: filter === 'due' ? 'white' : '#64748B', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, transition: 'all 0.2s', cursor: 'pointer' }}
          >
            बकाया ({countDue})
          </button>
        </div>

        {/* Data Table Wrapper */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: '#475569', width: '50px' }}>क्र.सं.</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: '#475569', width: '90px' }}>दिनांक</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: '#475569', width: '140px' }}>खर्च का नाम</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: '#475569', minWidth: '200px' }}>विवरण</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: '#475569', width: '100px' }}>भुगतान माध्यम</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontSize: '0.7rem', fontWeight: 700, color: '#475569', width: '80px' }}>कुल राशि</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontSize: '0.7rem', fontWeight: 700, color: '#475569', width: '80px' }}>भुगतान राशि</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontSize: '0.7rem', fontWeight: 700, color: '#475569', width: '80px' }}>बकाया राशि</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'center', fontSize: '0.7rem', fontWeight: 700, color: '#475569', width: '100px' }}>स्थिति</th>
                </tr>
              </thead>
              <tbody>
                {loading && data.length === 0 ? (
                  <tr>
                    <td colSpan="9" style={{ padding: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.85rem' }}>
                      <RefreshCw size={24} className="spin" style={{ margin: '0 auto 1rem', color: '#6D28D9' }} />
                      Google Sheets से डेटा सिंक हो रहा है...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="9" style={{ padding: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.85rem' }}>
                      अभी कोई खर्च दर्ज नहीं है।
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, idx) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9', background: idx % 2 === 0 ? 'white' : '#FAFAFA' }}>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: '#1E293B' }}>{item.sNo}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: '#475569' }}>{item.date}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: '#1E293B' }}>{item.name}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: '#64748B', lineHeight: '1.4' }}>{item.desc}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: '#475569' }}>{item.mode}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: '#1E293B', textAlign: 'right' }}>{formatINR(item.total)}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: '#1E293B', textAlign: 'right' }}>{formatINR(item.paid)}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: '#1E293B', textAlign: 'right' }}>{formatINR(item.due)}</td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                        {item.due > 0 ? (
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
