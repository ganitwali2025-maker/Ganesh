import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Folder, FileSpreadsheet, Search, RefreshCw, ExternalLink, Calendar, User, IndianRupee, Tag } from 'lucide-react';
import { getData } from '../utils/storage';
import { formatINR } from '../utils/formatters';

export default function ReportsPage() {
  const location = useLocation();
  const initialCategory = location.state?.category || 'monthly'; // 'monthly' | 'chanda' | 'expenses'
  const [activeTab, setActiveTab] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const [monthlyData, setMonthlyData] = useState([]);
  const [chandaData, setChandaData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    setMonthlyData(getData('income', []));
    setChandaData(getData('chanda', []));
    setExpenseData(getData('expenses', []));
  }, []);

  // Filter based on search query
  const filterList = (list) => {
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(item => 
      (item.memberName && item.memberName.toLowerCase().includes(q)) ||
      (item.months && item.months.toLowerCase().includes(q)) ||
      (item.jamaCategory && item.jamaCategory.toLowerCase().includes(q)) ||
      (item.date && item.date.includes(q))
    );
  };

  const currentList = filterList(
    activeTab === 'monthly' ? monthlyData :
    activeTab === 'chanda' ? chandaData : expenseData
  );

  const totalMonthly = monthlyData.reduce((sum, item) => sum + (parseFloat(item.paidAmount || item.amount) || 0), 0);
  const totalChanda = chandaData.reduce((sum, item) => sum + (parseFloat(item.paidAmount || item.amount) || 0), 0);
  const totalExpenses = expenseData.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  return (
    <div className="page-container">
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <h2 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileSpreadsheet color="#6D28D9" size={24} /> रिपोर्ट्स & शीट्स डेटा
        </h2>
        <p className="page-subtitle">Google Sheets एवं समिति के रिकॉर्ड्स की लाइव तालिका</p>
      </div>

      {/* Tab Selectors */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setActiveTab('monthly')}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: '20px',
            background: activeTab === 'monthly' ? '#6D28D9' : '#F3E8FF',
            color: activeTab === 'monthly' ? '#FFFFFF' : '#6D28D9',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.85rem',
            whiteSpace: 'nowrap'
          }}
        >
          📁 मासिक संग्रह ({monthlyData.length})
        </button>

        <button
          onClick={() => setActiveTab('chanda')}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: '20px',
            background: activeTab === 'chanda' ? '#16A34A' : '#DCFCE7',
            color: activeTab === 'chanda' ? '#FFFFFF' : '#16A34A',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.85rem',
            whiteSpace: 'nowrap'
          }}
        >
          📁 चंदा / योगदान ({chandaData.length})
        </button>

        <button
          onClick={() => setActiveTab('expenses')}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: '20px',
            background: activeTab === 'expenses' ? '#EA580C' : '#FFEDD5',
            color: activeTab === 'expenses' ? '#FFFFFF' : '#EA580C',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.85rem',
            whiteSpace: 'nowrap'
          }}
        >
          📁 खर्च विवरण ({expenseData.length})
        </button>
      </div>

      {/* Summary Banner */}
      <div style={{
        background: activeTab === 'monthly' ? 'linear-gradient(135deg, #F3E8FF, #E6DEFF)' : activeTab === 'chanda' ? 'linear-gradient(135deg, #DCFCE7, #C7F1C9)' : 'linear-gradient(135deg, #FFEDD5, #FFE8D0)',
        borderRadius: '16px',
        padding: '1rem',
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 500 }}>
            {activeTab === 'monthly' ? 'कुल मासिक जमा संग्रह' : activeTab === 'chanda' ? 'कुल चंदा / योगदान संग्रह' : 'कुल खर्च राशि'}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: activeTab === 'monthly' ? '#6D28D9' : activeTab === 'chanda' ? '#16A34A' : '#EA580C' }}>
            {formatINR(activeTab === 'monthly' ? totalMonthly : activeTab === 'chanda' ? totalChanda : totalExpenses)}
          </div>
        </div>
        <Folder size={36} color={activeTab === 'monthly' ? '#6D28D9' : activeTab === 'chanda' ? '#16A34A' : '#EA580C'} />
      </div>

      {/* Search Input Bar */}
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        <input 
          type="text"
          placeholder="खोजें (सदस्य नाम, महीना, श्रेणी...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '0.65rem 1rem 0.65rem 2.4rem',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            fontSize: '0.85rem',
            outline: 'none'
          }}
        />
      </div>

      {/* Spreadsheet Table View */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
        <div style={{ padding: '0.75rem 1rem', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FileSpreadsheet size={16} color="#16A34A" /> 
            {activeTab === 'monthly' ? 'मासिक जमा शीट्स रिकॉर्ड्स' : activeTab === 'chanda' ? 'चंदा & योगदान शीट्स रिकॉर्ड्स' : 'खर्च शीट्स तालिका'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>कुल: {currentList.length} प्रविष्टियां</div>
        </div>

        {currentList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#64748B', fontSize: '0.85rem' }}>
            कोई रिकॉर्ड उपलब्ध नहीं है। फॉर्म भरें और प्रविष्टि जोड़ें!
          </div>
        ) : (
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ background: '#F1F5F9', color: '#334155', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap' }}>#</th>
                  <th style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap' }}>दिनांक (Date)</th>
                  <th style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap' }}>सदस्य का नाम</th>
                  <th style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap' }}>महीना</th>
                  <th style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap' }}>श्रेणी</th>
                  <th style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap' }}>भुगतान मोड</th>
                  <th style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap', textAlign: 'right' }}>कुल राशि</th>
                  <th style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap', textAlign: 'right' }}>जमा राशि</th>
                  <th style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap', textAlign: 'right' }}>उधारी राशि</th>
                  <th style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap' }}>टिप्पणी</th>
                </tr>
              </thead>
              <tbody>
                {currentList.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9', background: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                    <td style={{ padding: '0.6rem 0.75rem', color: '#94A3B8' }}>{idx + 1}</td>
                    <td style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap', fontWeight: 500, color: '#334155' }}>{row.date || 'N/A'}</td>
                    <td style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap', fontWeight: 600, color: '#0F172A' }}>{row.memberName || row.name || 'N/A'}</td>
                    <td style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap', color: '#475569' }}>{row.months || '-'}</td>
                    <td style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap' }}>
                      <span style={{ padding: '0.2rem 0.5rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 600, background: row.jamaCategory === 'Monthly Jama' ? '#F3E8FF' : '#DCFCE7', color: row.jamaCategory === 'Monthly Jama' ? '#6D28D9' : '#16A34A' }}>
                        {row.jamaCategory || 'जमा'}
                      </span>
                    </td>
                    <td style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap', color: '#475569' }}>{row.paymentMode || 'Cash'}</td>
                    <td style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap', textAlign: 'right', fontWeight: 600, color: '#334155' }}>
                      {formatINR(parseFloat(row.amount) || 0)}
                    </td>
                    <td style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap', textAlign: 'right', fontWeight: 700, color: '#16A34A' }}>
                      {formatINR(parseFloat(row.paidAmount || row.amount) || 0)}
                    </td>
                    <td style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap', textAlign: 'right', fontWeight: 600, color: row.creditAmount > 0 ? '#DC2626' : '#94A3B8' }}>
                      {formatINR(parseFloat(row.creditAmount) || 0)}
                    </td>
                    <td style={{ padding: '0.6rem 0.75rem', color: '#64748B', minWidth: '120px' }}>{row.remark || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
