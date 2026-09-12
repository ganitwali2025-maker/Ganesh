import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Briefcase, FileText, IndianRupee, CreditCard, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { sendToGoogleSheet } from '../services/googleSheets';

export default function IncomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' }); // type: 'success' | 'error'

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    months: '',
    memberName: '',
    designation: '',
    jamaCategory: 'Monthly Jama',
    paymentMode: 'Cash',
    amount: '',
    paidAmount: '',
    creditAmount: '',
    remark: ''
  });

  // Auto-calculate credit amount when amount or paid amount changes
  useEffect(() => {
    const amt = parseFloat(formData.amount) || 0;
    const paid = parseFloat(formData.paidAmount) || 0;
    const credit = amt - paid;
    setFormData(prev => ({ ...prev, creditAmount: credit >= 0 ? credit : 0 }));
  }, [formData.amount, formData.paidAmount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    // Format data to match Google Sheets expectations if needed
    const dataToSubmit = {
      ...formData,
      // Google Sheets often expects DD/MM/YYYY or MM/DD/YYYY depending on locale
      // This sends ISO YYYY-MM-DD which is usually universally understood
    };

    const response = await sendToGoogleSheet(dataToSubmit);

    if (response && response.status === 'success') {
      setStatus({ type: 'success', message: 'Data saved successfully!' });
      // Reset form but keep date as today
      setFormData({
        date: new Date().toISOString().split('T')[0],
        months: '',
        memberName: '',
        designation: '',
        jamaCategory: 'Monthly Jama',
        paymentMode: 'Cash',
        amount: '',
        paidAmount: '',
        creditAmount: '',
        remark: ''
      });
      
      // Clear status after 3 seconds
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    } else {
      setStatus({ type: 'error', message: response?.message || 'Failed to save data. Please try again.' });
    }
    
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">जमा / चंदा (Income)</h2>
        <p className="page-subtitle">Add new collection details</p>
      </div>

      {status.message && (
        <div className={`status-alert ${status.type}`}>
          {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{status.message}</span>
        </div>
      )}

      <div className="form-card">
        <form onSubmit={handleSubmit} className="entry-form">
          
          <div className="form-group">
            <label><Calendar size={16} /> Date (दिनांक)</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label><Calendar size={16} /> Months (महीना)</label>
            <select name="months" value={formData.months} onChange={handleChange} required>
              <option value="">Select Month</option>
              <option value="January">January (जनवरी)</option>
              <option value="February">February (फरवरी)</option>
              <option value="March">March (मार्च)</option>
              <option value="April">April (अप्रैल)</option>
              <option value="May">May (मई)</option>
              <option value="June">June (जून)</option>
              <option value="July">July (जुलाई)</option>
              <option value="August">August (अगस्त)</option>
              <option value="September">September (सितंबर)</option>
              <option value="October">October (अक्टूबर)</option>
              <option value="November">November (नवंबर)</option>
              <option value="December">December (दिसंबर)</option>
            </select>
          </div>

          <div className="form-group">
            <label><User size={16} /> Member Name (सदस्य का नाम)</label>
            <input type="text" name="memberName" value={formData.memberName} onChange={handleChange} placeholder="Enter name" required />
          </div>

          <div className="form-group">
            <label><Briefcase size={16} /> Designation (पद)</label>
            <select name="designation" value={formData.designation} onChange={handleChange}>
              <option value="">Select Designation</option>
              <option value="President (अध्यक्ष)">President (अध्यक्ष)</option>
              <option value="Vice President (उपाध्यक्ष)">Vice President (उपाध्यक्ष)</option>
              <option value="Secretary (सचिव)">Secretary (सचिव)</option>
              <option value="Treasurer (कोषाध्यक्ष)">Treasurer (कोषाध्यक्ष)</option>
              <option value="Member (सदस्य)">Member (सदस्य)</option>
              <option value="Other (अन्य)">Other (अन्य)</option>
            </select>
          </div>

          <div className="form-group">
            <label><FileText size={16} /> Jama Category (जमा श्रेणी)</label>
            <select name="jamaCategory" value={formData.jamaCategory} onChange={handleChange} required>
              <option value="Monthly Jama">Monthly Jama (मासिक जमा)</option>
              <option value="Yogdan">Yogdan (योगदान)</option>
              <option value="Chanda">Chanda (चंदा)</option>
            </select>
          </div>

          <div className="form-group">
            <label><CreditCard size={16} /> Payment Mode (भुगतान का प्रकार)</label>
            <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} required>
              <option value="Cash">Cash (नकद)</option>
              <option value="Online/UPI">Online/UPI (ऑनलाइन)</option>
              <option value="Bank Transfer">Bank Transfer (बैंक ट्रांसफर)</option>
            </select>
          </div>

          <div className="form-group">
            <label><IndianRupee size={16} /> Total Amount (कुल राशि)</label>
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="0.00" required />
          </div>

          <div className="form-group">
            <label><IndianRupee size={16} /> Paid Amount (जमा राशि)</label>
            <input type="number" name="paidAmount" value={formData.paidAmount} onChange={handleChange} placeholder="0.00" required />
          </div>

          <div className="form-group">
            <label><IndianRupee size={16} /> Credit Amount (उधारी राशि)</label>
            <input type="number" name="creditAmount" value={formData.creditAmount} onChange={handleChange} placeholder="0.00" readOnly className="readonly-input" />
          </div>

          <div className="form-group full-width">
            <label><FileText size={16} /> Remark (टिप्पणी)</label>
            <textarea name="remark" value={formData.remark} onChange={handleChange} placeholder="Enter any details..." rows="3"></textarea>
          </div>

          <div className="form-actions full-width">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                <><Save size={18} /> Save Record</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
