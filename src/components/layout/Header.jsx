import React from 'react';
import { Bell, Settings, MapPin, Menu, ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === '/dashboard' || location.pathname === '/';
  
  if (location.pathname === '/expense-report' || location.pathname === '/income-report') {
    return null;
  }

  return (
    <div className="header">

      
      <div className="header-top">
        {isDashboard ? (
          <button aria-label="Menu" className="menu-btn"><Menu size={24} color="white" /></button>
        ) : (
          <button aria-label="Back" className="menu-btn" onClick={() => navigate(-1)}><ArrowLeft size={24} color="white" /></button>
        )}
        <div className="header-title-top">|| श्री गणेशाय नमः ||</div>
        <div className="header-actions">
          <button aria-label="Notifications"><Bell size={20} color="white" /></button>
          <button aria-label="Settings"><Settings size={20} color="white" /></button>
        </div>
      </div>
      
      <div className="header-content">
        <div className="header-logo">
          <img src="/ganesha.jpg" alt="Ganesha" />
        </div>
        <div className="header-info">
          <h1 className="header-title">श्री बजरंग युवा गणेश उत्सव समिति</h1>
          <p className="header-subtitle"><MapPin size={12} /> ग्राम पोस्ट नगरगांव, धसीवा, रायपुर, पिनकोड 493351</p>
        </div>
      </div>
    </div>
  );
}
