
import React from 'react';
import { Bell, Settings, MapPin } from 'lucide-react';

export default function Header() {
  return (
    <div className="header">
      <div className="header-top">
        <div className="header-title">|| श्री गणेशाय नमः ||</div>
        <div className="header-actions">
          <button aria-label="Notifications"><Bell size={18} /></button>
          <button aria-label="Settings"><Settings size={18} /></button>
        </div>
      </div>
      <div className="header-content">
        <div className="header-logo">
          <img src="https://i.imgur.com/kHXYhP2.png" alt="Ganesha" onError={(e) => { e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="50" fill="%23fbbf24"/><text x="50" y="55" font-size="30" text-anchor="middle" fill="white" font-family="sans-serif">ॐ</text></svg>'; }} />
        </div>
        <div className="header-info">
          <h1>UJJAWAL APP</h1>
          <p><MapPin size={12} /> गणेश समिति</p>
        </div>
      </div>
    </div>
  );
}
