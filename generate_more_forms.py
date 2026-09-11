import os

src_dir = r"c:\Users\lr690\OneDrive\Desktop\new app\src"

forms = {
    "components/forms/MemberForm.jsx": """
import React, { useState } from 'react';
import { updateData, getData } from '../../utils/storage';

export default function MemberForm({ onSave }) {
  const [formData, setFormData] = useState({ name: '', phone: '', designation: '', age: '', joinDate: '', status: 'Active' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const members = getData('members');
    const newEntry = { ...formData, sn: members.length + 1 };
    updateData('members', [newEntry, ...members]);
    if (onSave) onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Name (नाम)</label>
        <input className="form-input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
      </div>
      <div className="form-group">
        <label className="form-label">Phone (फ़ोन)</label>
        <input className="form-input" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
      </div>
      <div className="form-group">
        <label className="form-label">Designation (पद)</label>
        <input className="form-input" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} />
      </div>
      <button type="submit" className="btn-primary">Save Member</button>
    </form>
  );
}
""",
    "components/forms/IncomeForm.jsx": """
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
""",
    "components/forms/ChandaForm.jsx": """
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
"""
}

for name, content in forms.items():
    os.makedirs(os.path.dirname(os.path.join(src_dir, name)), exist_ok=True)
    with open(os.path.join(src_dir, name), "w", encoding="utf-8") as f:
        f.write(content)

print("Additional forms generated.")
