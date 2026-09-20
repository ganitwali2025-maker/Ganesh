
import React, { useState } from 'react';
import { 
  FileText, Calendar, AlignLeft, Wallet, 
  IndianRupee, List, MessageSquare, 
  Plus, RefreshCw, CheckCircle
} from 'lucide-react';
import { saveData, getData } from '../utils/storage';

export default function ExpensePage() {
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', message: '' });

  const initialFormState = {
    expenseName: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    paymentMode: 'Cash',
    amount: '',
    status: 'Payment Complete',
    remark: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentModeSelect = (mode) => {
    setFormData(prev => ({ ...prev, paymentMode: mode }));
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setStatusMsg({ type: '', message: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    const newRecord = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      amount: parseFloat(formData.amount) || 0,
      paidAmount: parseFloat(formData.amount) || 0,
      creditAmount: 0,
    };

    const existingExpenses = getData('expenses', []);
    saveData('expenses', [newRecord, ...existingExpenses]);

    // Also add to transactions list
    const existingTx = getData('transactions', []);
    saveData('transactions', [{...newRecord, type: 'Expense'}, ...existingTx]);

    setStatusMsg({ type: 'success', message: 'खर्च सफलतापूर्वक सेव हो गया!' });
    
    setTimeout(() => {
      handleReset();
    }, 2000);
    
    setLoading(false);
  };

  const PaymentModeBtn = ({ mode, label, icon }) => {
    const isActive = formData.paymentMode === mode;
    return (
      <button
        type="button"
        onClick={() => handlePaymentModeSelect(mode)}
        style={{
          flex: '1',
          padding: '0.6rem 0.2rem',
          borderRadius: '8px',
          border: isActive ? '1px solid #6D28D9' : '1px solid #E2E8F0',
          background: isActive ? '#6D28D9' : 'white',
          color: isActive ? 'white' : '#475569',
          fontSize: '0.75rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.3rem',
          cursor: 'pointer',
          transition: 'all 0.2s',
          whiteSpace: 'nowrap'
        }}
      >
        {icon}
        {label}
      </button>
    );
  };

  return (
    <div className="page-container" style={{ background: '#F8FAFC' }}>
      
      {statusMsg.message && (
        <div className={`status-alert ${statusMsg.type}`} style={{ marginBottom: '1rem' }}>
          <CheckCircle size={20} />
          <span>{statusMsg.message}</span>
        </div>
      )}

      <div style={{ background: 'white', borderRadius: '12px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Expense Name */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
              <FileText size={16} color="#475569" /> खर्च का नाम <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input 
              type="text" 
              name="expenseName" 
              value={formData.expenseName} 
              onChange={handleChange}
              placeholder="उदाहरण: DJ बुकिंग, प्रसाद, लाइट आदि"
              required
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.85rem' }}
            />
          </div>

          {/* Date */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
              <Calendar size={16} color="#475569" /> दिनांक <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.85rem' }}
            />
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
              <AlignLeft size={16} color="#475569" /> विवरण <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              placeholder="खर्च का पूरा विवरण लिखें..."
              required
              rows="3"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.85rem', resize: 'vertical' }}
            />
          </div>

          {/* Payment Mode (Segmented Control) */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
              <Wallet size={16} color="#475569" /> भुगतान माध्यम <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <PaymentModeBtn mode="Cash" label="नकद" icon={<IndianRupee size={14} />} />
              <PaymentModeBtn mode="UPI" label="UPI" icon={<span style={{ fontStyle: 'italic', fontWeight: 800 }}>//</span>} />
              <PaymentModeBtn mode="UPI/Cash" label="UPI / नकद" icon={<span style={{ fontSize: '0.7rem' }}>QR</span>} />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
              <div style={{ background: '#6D28D9', borderRadius: '50%', padding: '2px', display: 'flex' }}><IndianRupee size={10} color="white" /></div> 
              राशि (₹) <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input 
              type="number" 
              name="amount" 
              value={formData.amount} 
              onChange={handleChange} 
              required 
              placeholder="0" 
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }} 
            />
          </div>

          {/* Status */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
              <List size={16} color="#475569" /> स्थिति <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#16A34A', display: 'flex' }}>
                <CheckCircle size={16} />
              </span>
              <select name="status" value={formData.status} onChange={handleChange} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.2rem', border: '1px solid #E2E8F0', borderRadius: '8px', appearance: 'none', background: 'white', fontSize: '0.85rem', fontWeight: 500 }}>
                <option value="Payment Complete">भुगतान पूर्ण (Payment Complete)</option>
                <option value="Pending">लंबित (Pending)</option>
              </select>
            </div>
          </div>

          {/* Remark */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
              <MessageSquare size={16} color="#475569" /> Remark / टिप्पणी
            </label>
            <textarea 
              name="remark" 
              value={formData.remark} 
              onChange={handleChange}
              placeholder="कोई अतिरिक्त जानकारी, नोट या टिप्पणी लिखें..."
              rows="2"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.85rem', resize: 'vertical' }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button 
              type="submit" 
              disabled={loading}
              style={{ flex: '1', background: '#6D28D9', color: 'white', border: 'none', borderRadius: '8px', padding: '0.8rem', fontWeight: 700, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
            >
              <Plus size={18} /> खर्च जोड़ें
            </button>
            <button 
              type="button"
              onClick={handleReset}
              style={{ flex: '1', background: '#F8FAFC', color: '#6D28D9', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.8rem', fontWeight: 700, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
            >
              <RefreshCw size={18} /> रीसेट
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
