import React from 'react';
import { Bell, Settings, MapPin, Menu } from 'lucide-react';

export default function Header() {
  return (
    <div className="header">
      {/* Background Watermark */}
      <div className="header-watermark">
        <img src="https://i.imgur.com/kHXYhP2.png" alt="watermark" />
      </div>
      
      <div className="header-top">
        <button aria-label="Menu" className="menu-btn"><Menu size={24} color="white" /></button>
        <div className="header-title-top">|| श्री गणेशाय नमः ||</div>
        <div className="header-actions">
          <button aria-label="Notifications"><Bell size={20} color="white" /></button>
          <button aria-label="Settings"><Settings size={20} color="white" /></button>
        </div>
      </div>
      
      <div className="header-content">
        <div className="header-logo">
          <img src="https://i.imgur.com/kHXYhP2.png" alt="Ganesha" onError={(e) => { e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="50" fill="%23fbbf24"/><text x="50" y="55" font-size="30" text-anchor="middle" fill="white" font-family="sans-serif">ॐ</text></svg>'; }} />
        </div>
        <div className="header-info">
          <h1 className="header-title">श्री बजरंग युवा गणेश उत्सव समिति</h1>
          <p className="header-subtitle"><MapPin size={12} /> ग्राम पोस्ट नगरगांव, धसीवा, रायपुर, पिनकोड 493351</p>
        </div>
      </div>
    </div>
  );
}
