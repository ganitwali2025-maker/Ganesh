
import React, { useState } from 'react';
import { updateData, getData } from '../../utils/storage';

export default function ExpenseForm({ onSave }) {
  const [formData, setFormData] = useState({ particular: '', amount: '', paymentMode: 'Cash', status: 'Paid', category: 'Kirana' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenses = getData('expenses');
    const newEntry = { ...formData, id: Date.now(), date: new Date().toLocaleDateString(), type: 'expense' };
    updateData('expenses', [newEntry, ...expenses]);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Particulars (विवरण)</label>
        <input className="form-input" required value={formData.particular} onChange={e => setFormData({...formData, particular: e.target.value})} />
      </div>
      <div className="form-group">
        <label className="form-label">Amount (राशि)</label>
        <input type="number" className="form-input" required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
      </div>
      <div className="form-group">
        <label className="form-label">Category</label>
        <select className="form-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
          <option>Kirana</option>
          <option>Pooja</option>
          <option>Advance</option>
          <option>Decoration</option>
          <option>Prasad</option>
          <option>Mahraj</option>
          <option>Other</option>
        </select>
      </div>
      <button type="submit" className="btn-primary">Save Expense</button>
    </form>
  );
}
