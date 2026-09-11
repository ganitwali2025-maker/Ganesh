import os

src_dir = r"c:\Users\lr690\OneDrive\Desktop\new app\src"

components = {
    "components/layout/Header.jsx": """
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
""",
    "components/layout/Sidebar.jsx": """
import React from 'react';

export default function Sidebar() {
  return null; // Hidden on mobile, can be expanded for desktop later
}
""",
    "components/layout/BottomNavigation.jsx": """
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, ArrowDownLeft, ArrowUpRight, FolderOpen } from 'lucide-react';

export default function BottomNavigation() {
  const navItems = [
    { to: "/dashboard", label: "होम", icon: Home },
    { to: "/income", label: "जमा", icon: ArrowDownLeft },
    { to: "/expense", label: "खर्च", icon: ArrowUpRight },
    { to: "/members", label: "सदस्य", icon: Users },
    { to: "/reports", label: "रिपोर्ट", icon: FolderOpen }
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => (
        <NavLink 
          key={item.to} 
          to={item.to} 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          {({ isActive }) => (
            <>
              <div className="nav-icon"><item.icon size={22} strokeWidth={isActive ? 2.5 : 2} /></div>
              <span className="nav-label">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}
""",
    "components/ui/ActionCard.jsx": """
import React from 'react';

export default function ActionCard({ icon: Icon, colorClass, label, onClick }) {
  return (
    <button className="action-card" onClick={onClick}>
      <div className={`action-icon-wrap ${colorClass}`}>
        <Icon size={24} />
      </div>
      <span className="action-label">{label}</span>
    </button>
  );
}
""",
    "components/ui/TransactionItem.jsx": """
import React from 'react';
import { formatINR } from '../../utils/formatters';

export default function TransactionItem({ item }) {
  const isReceived = item.type === 'income' || item.type === 'chanda';
  const isPending = item.status === 'Pending';
  
  let colorClass = isReceived ? 'green' : 'red';
  if (isPending) colorClass = 'orange';

  return (
    <div className="txn-item">
      <div className={`txn-icon ${colorClass}`}>
        {item.type.charAt(0).toUpperCase()}
      </div>
      <div className="txn-info">
        <div className="txn-title">{item.name || item.particular}</div>
        <div className="txn-subtitle">{item.date} &bull; {item.paymentMode}</div>
      </div>
      <div className="txn-amount-col">
        <div className={`txn-amount ${colorClass}`}>{formatINR(item.amount)}</div>
        <div className={`txn-badge ${colorClass}`}>{item.status}</div>
      </div>
    </div>
  );
}
"""
}

for name, content in components.items():
    with open(os.path.join(src_dir, name), "w", encoding="utf-8") as f:
        f.write(content)

print("Components generated successfully!")
