
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, IndianRupee, BarChart2, Settings } from 'lucide-react';

export default function BottomNavigation() {
  const navItems = [
    { to: "/dashboard", label: "होम", icon: Home },
    { to: "/members", label: "सदस्य", icon: User },
    { to: "/transaction", label: "लेन-देन", icon: IndianRupee },
    { to: "/reports", label: "रिपोर्ट", icon: BarChart2 },
    { to: "/settings", label: "सेटिंग्स", icon: Settings }
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
