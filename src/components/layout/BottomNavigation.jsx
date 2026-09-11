
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
