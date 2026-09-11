
import React, { useState, useEffect } from 'react';
import { getData, updateData } from '../utils/storage';

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  
  useEffect(() => {
    setMembers(getData('members'));
  }, []);

  return (
    <div>
      <div className="page-header">
        <div className="page-title">सदस्य सूची <span>({members.length})</span></div>
        <button className="btn-primary" style={{width: 'auto', padding: '0.5rem 1rem'}}>नया सदस्य</button>
      </div>
      {members.length === 0 ? (
        <div className="empty-state">अभी कोई सदस्य नहीं है।</div>
      ) : (
        members.map((m, i) => (
          <div key={i} className="member-card">
            <div className="member-avatar">{m.name.charAt(0)}</div>
            <div className="member-info">
              <div className="member-name">{m.name}</div>
              <div className="member-sub">{m.phone} &bull; {m.designation}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
