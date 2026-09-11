
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
