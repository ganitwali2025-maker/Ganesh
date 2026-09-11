
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
