
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
