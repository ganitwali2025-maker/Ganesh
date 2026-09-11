
import React, { useState } from 'react';
import { updateData, getData } from '../../utils/storage';

export default function ChandaForm({ onSave }) {
  const [formData, setFormData] = useState({ name: '', purpose: 'Ganesh Chanda', amount: '', paymentMode: 'Cash', remark: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const chanda = getData('chanda');
    const newEntry = { ...formData, sn: chanda.length + 1, date: new Date().toLocaleDateString(), type: 'chanda', status: formData.paymentMode === 'Credit' ? 'Pending' : 'Paid' };
    
    updateData('chanda', [newEntry, ...chanda]);

    const txns = getData('transactions');
    updateData('transactions', [newEntry, ...txns]);

    if (onSave) onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Name (नाम)</label>
        <input className="form-input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
      </div>
      <div className="form-group">
        <label className="form-label">Purpose</label>
        <input className="form-input" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} />
      </div>
      <div className="form-group">
        <label className="form-label">Amount</label>
        <input type="number" className="form-input" required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
      </div>
      <div className="form-group">
        <label className="form-label">Payment Mode</label>
        <select className="form-input" value={formData.paymentMode} onChange={e => setFormData({...formData, paymentMode: e.target.value})}>
          <option>Cash</option>
          <option>UPI</option>
          <option>Credit</option>
        </select>
      </div>
      <button type="submit" className="btn-primary">Save Chanda</button>
    </form>
  );
}
