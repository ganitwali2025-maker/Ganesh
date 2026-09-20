import React, { useState } from 'react';
import { 
  Calendar, Users, User, List, Wallet, 
  IndianRupee, MessageSquare, Plus, RefreshCw, 
  CheckCircle, Search, Coins, FileText
} from 'lucide-react';
import { saveData, getData } from '../utils/storage';

export default function IncomePage() {
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', message: '' });

  const initialFormState = {
    date: new Date().toISOString().split('T')[0],
    memberName: '',
    designation: 'सदस्य',
    jamaCategory: 'मासिक जमा',
    paymentMode: 'Cash',
    amount: '',
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
      paidAmount: parseFloat(formData.amount) || 0, // Assuming full payment
      creditAmount: 0,
      jamaCategory: formData.jamaCategory === 'मासिक जमा' ? 'Monthly Jama' : formData.jamaCategory
    };

    // Save to LocalStorage according to Category
    if (newRecord.jamaCategory === 'Monthly Jama') {
      const existingIncome = getData('income', []);
      saveData('income', [newRecord, ...existingIncome]);
    } else {
      const existingChanda = getData('chanda', []);
      saveData('chanda', [newRecord, ...existingChanda]);
    }

    // Also add to transactions list
    const existingTx = getData('transactions', []);
    saveData('transactions', [{...newRecord, type: 'Income'}, ...existingTx]);

    setStatusMsg({ type: 'success', message: 'जमा सफलतापूर्वक सेव हो गया!' });
    
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
    <div className="page-container" style={{ background: 'white', padding: '1rem', paddingBottom: '6rem', minHeight: '100vh' }}>
      
      {statusMsg.message && (
        <div className={`status-alert ${statusMsg.type}`} style={{ marginBottom: '1rem' }}>
          <CheckCircle size={20} />
          <span>{statusMsg.message}</span>
        </div>
      )}

      <div>
        
        {/* Header Banner */}
        <div style={{ background: '#F3E8FF', borderRadius: '8px', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6D28D9', fontWeight: 800, fontSize: '1.1rem' }}>
            <Coins size={22} /> जमा फ़ॉर्म
          </div>
          <div style={{ fontSize: '0.7rem', color: '#6D28D9', fontWeight: 500 }}>
            सभी सदस्यों का मासिक जमा यहाँ दर्ज करें
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Date */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
              <Calendar size={16} color="#6D28D9" /> दिनांक <span style={{ color: '#DC2626' }}>*</span>
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

          {/* Member Name */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
              <Users size={16} color="#6D28D9" /> सदस्य का नाम <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                name="memberName" 
                value={formData.memberName} 
                onChange={handleChange}
                placeholder="सदस्य का नाम खोजें..."
                required
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.2rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          {/* Designation */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
              <User size={16} color="#6D28D9" /> पद <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input 
              type="text" 
              name="designation" 
              value={formData.designation} 
              onChange={handleChange}
              readOnly
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.85rem', background: '#F8FAFC', color: '#64748B' }}
            />
          </div>

          {/* Jama Category */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
              <List size={16} color="#6D28D9" /> जमा का प्रकार <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <select 
              name="jamaCategory" 
              value={formData.jamaCategory} 
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.85rem', background: 'white' }}
            >
              <option value="मासिक जमा">मासिक जमा</option>
              <option value="चंदा">चंदा</option>
              <option value="योगदान">योगदान</option>
            </select>
          </div>

          {/* Payment Mode (Segmented Control) */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
              <Wallet size={16} color="#6D28D9" /> भुगतान माध्यम <span style={{ color: '#DC2626' }}>*</span>
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

          {/* Remark */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
              <MessageSquare size={16} color="#6D28D9" /> Remark / टिप्पणी
            </label>
            <textarea 
              name="remark" 
              value={formData.remark} 
              onChange={handleChange}
              placeholder="किसी भी अतिरिक्त जानकारी के लिए लिखें..."
              rows="3"
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
              <Plus size={18} /> जमा जोड़ें
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
