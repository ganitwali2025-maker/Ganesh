
import React, { useState } from 'react';
import { updateData, getData } from '../../utils/storage';

export default function IncomeForm({ onSave }) {
  const [formData, setFormData] = useState({ memberName: '', amount: '', month: '', paymentMode: 'Cash' });
  const members = getData('members');

  const handleSubmit = (e) => {
    e.preventDefault();
    const income = getData('income');
    const newEntry = { ...formData, id: Date.now(), date: new Date().toLocaleDateString(), type: 'income', status: formData.paymentMode === 'Credit' ? 'Pending' : 'Paid' };
    
    updateData('income', [newEntry, ...income]);
    
    // Add to general transactions too
    const txns = getData('transactions');
    updateData('transactions', [newEntry, ...txns]);

    if (onSave) onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Member</label>
        <select className="form-input" required value={formData.memberName} onChange={e => setFormData({...formData, memberName: e.target.value})}>
          <option value="">Select Member</option>
          {members.map(m => <option key={m.sn} value={m.name}>{m.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Month (मासिक)</label>
        <input type="month" className="form-input" required value={formData.month} onChange={e => setFormData({...formData, month: e.target.value})} />
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
      <button type="submit" className="btn-primary">Save Jama</button>
    </form>
  );
}
