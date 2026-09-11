import os

src_dir = r"c:\Users\lr690\OneDrive\Desktop\new app\src"

pages = {
    "pages/Dashboard.jsx": """
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, ArrowUp, ArrowDown, ChevronRight, Download, Upload, FileText, Users } from 'lucide-react';
import ActionCard from '../components/ui/ActionCard';
import TransactionItem from '../components/ui/TransactionItem';
import { getData } from '../utils/storage';
import { calculateBalance, calculateTotalIncome, calculateTotalChanda, calculateTotalExpense, calculateTotalCredit } from '../utils/calculations';
import { formatINR } from '../utils/formatters';

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({ income: [], chanda: [], expenses: [], credits: [], transactions: [] });

  useEffect(() => {
    const income = getData('income');
    const chanda = getData('chanda');
    const expenses = getData('expenses');
    const credits = getData('credits');
    const transactions = getData('transactions');
    setData({ income, chanda, expenses, credits, transactions });
  }, []);

  const balance = calculateBalance(data.income, data.chanda, data.expenses);
  const totalJama = calculateTotalIncome(data.income) + calculateTotalChanda(data.chanda);
  const totalExpense = calculateTotalExpense(data.expenses);
  const pendingCredit = calculateTotalCredit(data.credits);

  return (
    <div className="dashboard-page">
      <div className="balance-card-container">
        <div className="balance-card">
          <div className="balance-top">
            <div>
              <div className="balance-label"><Wallet size={16} color="var(--primary)"/> कुल शेष राशि</div>
              <div className="balance-amount">{formatINR(balance)}</div>
            </div>
            <div className="balance-icon-wrap"><Wallet size={32} /></div>
          </div>
          
          <div className="balance-stats">
            <div className="stat-col">
              <div className="stat-icon green"><ArrowUp size={14} strokeWidth={3}/></div>
              <div>
                <div className="stat-label">कुल जमा</div>
                <div className="stat-val green">{formatINR(totalJama)}</div>
              </div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-col">
              <div className="stat-icon red"><ArrowDown size={14} strokeWidth={3}/></div>
              <div>
                <div className="stat-label">कुल निकासी</div>
                <div className="stat-val red">{formatINR(totalExpense)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <ActionCard icon={Download} colorClass="bg-green-100 text-green-700" label="जमा" onClick={() => navigate('/income')} />
        <ActionCard icon={Upload} colorClass="bg-red-100 text-red-700" label="खर्च" onClick={() => navigate('/expense')} />
        <ActionCard icon={FileText} colorClass="bg-blue-100 text-blue-700" label="चंदा" onClick={() => navigate('/income')} />
        <ActionCard icon={Users} colorClass="bg-orange-100 text-orange-700" label="सदस्य" onClick={() => navigate('/members')} />
      </div>
      
      {pendingCredit > 0 && (
        <div className="credit-card-wrap">
          <div className="credit-card">
            <div className="credit-label">उधार (बाकी)</div>
            <div className="credit-val">{formatINR(pendingCredit)}</div>
          </div>
        </div>
      )}

      <div className="recent-transactions">
        <div className="rt-header">
          <div className="rt-title">
             <div className="rt-title-icon"><FileText size={14} /></div>
             हाल के लेन-देन
          </div>
          <button className="rt-view-all" onClick={() => navigate('/transaction')}>सभी देखें <ChevronRight size={16}/></button>
        </div>
        
        <div>
          {data.transactions.length === 0 ? (
            <div className="empty-state">अभी कोई लेन-देन नहीं हुआ है।</div>
          ) : (
            data.transactions.slice(0, 5).map((txn, i) => <TransactionItem key={i} item={txn} />)
          )}
        </div>
      </div>
    </div>
  );
}
""",
    "pages/MembersPage.jsx": """
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
""",
    "pages/IncomePage.jsx": """
import React from 'react';

export default function IncomePage() {
  return (
    <div className="empty-state">
      <h3>जमा / चंदा पेज</h3>
      <p>Income details will go here.</p>
    </div>
  );
}
""",
    "pages/ExpensePage.jsx": """
import React from 'react';

export default function ExpensePage() {
  return (
    <div className="empty-state">
      <h3>खर्च पेज</h3>
      <p>Expense details will go here.</p>
    </div>
  );
}
""",
    "pages/CreditPage.jsx": """
import React from 'react';

export default function CreditPage() {
  return (
    <div className="empty-state">
      <h3>उधार / Pending पेज</h3>
      <p>Credit records will go here.</p>
    </div>
  );
}
""",
    "pages/TransactionPage.jsx": """
import React from 'react';

export default function TransactionPage() {
  return (
    <div className="empty-state">
      <h3>सभी लेन-देन</h3>
      <p>Transactions will go here.</p>
    </div>
  );
}
""",
    "pages/ReportsPage.jsx": """
import React from 'react';

export default function ReportsPage() {
  return (
    <div className="empty-state">
      <h3>रिपोर्ट पेज</h3>
      <p>Reports will go here.</p>
    </div>
  );
}
""",
    "App.jsx": """
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import BottomNavigation from './components/layout/BottomNavigation';
import Sidebar from './components/layout/Sidebar';

import Dashboard from './pages/Dashboard';
import MembersPage from './pages/MembersPage';
import IncomePage from './pages/IncomePage';
import ExpensePage from './pages/ExpensePage';
import CreditPage from './pages/CreditPage';
import TransactionPage from './pages/TransactionPage';
import ReportsPage from './pages/ReportsPage';

export default function App() {
  return (
    <div className="app-container">
      <div className="mobile-frame">
        <Header />
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/income" element={<IncomePage />} />
            <Route path="/expense" element={<ExpensePage />} />
            <Route path="/credit" element={<CreditPage />} />
            <Route path="/transaction" element={<TransactionPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
}
""",
    "../main.jsx": """
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './src/App.jsx';
import './src/styles/global.css';
import './src/styles/layout.css';
import './src/styles/dashboard.css';
import './src/styles/forms.css';
import './src/styles/cards.css';
import './src/styles/transactions.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
"""
}

for name, content in pages.items():
    with open(os.path.join(src_dir, name), "w", encoding="utf-8") as f:
        f.write(content)

print("Pages and App files generated successfully!")
