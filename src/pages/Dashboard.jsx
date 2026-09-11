import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, ArrowUp, ArrowDown, ChevronRight, Sun, Users, Download, Upload, IndianRupee, BarChart2, Folder, FolderOpen, FileText, Zap } from 'lucide-react';
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

  return (
    <div className="dashboard-page">


      {/* Premium Balance Card */}
      <div className="premium-balance-container">
        <div className="pb-main-card">
          <div className="pb-center">
            <div className="pb-top-row">
              <div className="pb-icon-wrapper"><Wallet size={20} className="text-purple-600" /></div>
              <div className="pb-label">कुल शेष राशि</div>
            </div>
            <div className="pb-amount-wrapper">
              <div className="pb-amount">{formatINR(balance)}</div>
            </div>
          </div>
          
          <div className="pb-side-cards">
            <div className="pb-side-card income-card">
              <div className="pb-side-top-row">
                <div className="pb-side-icon green-icon"><ArrowUp size={14} strokeWidth={3}/></div>
                <div className="pb-side-label">आज (Income)</div>
              </div>
              <div className="pb-side-amount-wrapper">
                <div className="pb-side-amount green">{formatINR(totalJama)}</div>
              </div>
            </div>
            <div className="pb-side-card expense-card">
              <div className="pb-side-top-row">
                <div className="pb-side-icon red-icon"><ArrowDown size={14} strokeWidth={3}/></div>
                <div className="pb-side-label">व्यय (Expense)</div>
              </div>
              <div className="pb-side-amount-wrapper">
                <div className="pb-side-amount red">{formatINR(totalExpense)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="section-container">
        <div className="section-header">
          <div className="section-title"><Zap size={18} className="text-primary" /> त्वरित कार्य</div>
          <button className="view-all-btn">सभी देखें <ChevronRight size={14}/></button>
        </div>
        <div className="quick-action-grid">
          <div className="action-item" onClick={() => navigate('/income')}>
            <div className="action-icon-bg bg-purple"><Download size={24} className="text-purple-600" /></div>
            <span>जमा</span>
          </div>
          <div className="action-item" onClick={() => navigate('/expense')}>
            <div className="action-icon-bg bg-blue"><Upload size={24} className="text-blue-600" /></div>
            <span>खर्च</span>
          </div>
          <div className="action-item" onClick={() => navigate('/income')}>
            <div className="action-icon-bg bg-green"><IndianRupee size={24} className="text-green-600" /></div>
            <span>चंदा / योगदान</span>
          </div>
          <div className="action-item" onClick={() => navigate('/members')}>
            <div className="action-icon-bg bg-orange"><Users size={24} className="text-orange-600" /></div>
            <span>सदस्य</span>
          </div>
          <div className="action-item" onClick={() => navigate('/reports')}>
            <div className="action-icon-bg bg-indigo"><BarChart2 size={24} className="text-indigo-600" /></div>
            <span>रिपोर्ट</span>
          </div>
        </div>
      </div>

      {/* Reports & Sheets */}
      <div className="section-container">
        <div className="section-header">
          <div className="section-title"><FolderOpen size={18} className="text-primary" /> रिपोर्ट्स & शीट्स</div>
          <button className="view-all-btn" onClick={() => navigate('/reports')}>सभी देखें <ChevronRight size={14}/></button>
        </div>
        <div className="reports-grid">
          <div className="report-card blue-border">
            <div className="report-card-top">
              <div className="r-icon blue-bg"><Folder size={18} className="text-blue-600" /></div>
              <ChevronRight size={16} className="text-muted" />
            </div>
            <div className="r-title">सदस्य सूची</div>
            <div className="r-subtitle">Google Sheets</div>
          </div>
          <div className="report-card green-border">
            <div className="report-card-top">
              <div className="r-icon green-bg"><Folder size={18} className="text-green-600" /></div>
              <ChevronRight size={16} className="text-muted" />
            </div>
            <div className="r-title">चंदा / योगदान</div>
            <div className="r-subtitle">Google Sheets</div>
          </div>
          <div className="report-card orange-border">
            <div className="report-card-top">
              <div className="r-icon orange-bg"><Folder size={18} className="text-orange-600" /></div>
              <ChevronRight size={16} className="text-muted" />
            </div>
            <div className="r-title">खर्च विवरण</div>
            <div className="r-subtitle">Google Sheets</div>
          </div>
          <div className="report-card purple-border">
            <div className="report-card-top">
              <div className="r-icon purple-bg"><Folder size={18} className="text-purple-600" /></div>
              <ChevronRight size={16} className="text-muted" />
            </div>
            <div className="r-title">मासिक संग्रह</div>
            <div className="r-subtitle">Google Sheets</div>
          </div>
        </div>
      </div>


    </div>
  );
}
