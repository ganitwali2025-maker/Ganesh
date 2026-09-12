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
                <div className="pb-side-icon green-icon"><ArrowUp size={14} strokeWidth={2}/></div>
                <div className="pb-side-label">आज (Income)</div>
              </div>
              <div className="pb-side-amount-wrapper">
                <div className="pb-side-amount green">{formatINR(totalJama)}</div>
              </div>
            </div>
            <div className="pb-side-card expense-card">
              <div className="pb-side-top-row">
                <div className="pb-side-icon red-icon"><ArrowDown size={14} strokeWidth={2}/></div>
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
          <div className="section-title-wrapper">
            <div className="section-title-icon bg-purple-light"><Zap size={20} color="#6D28D9" /></div>
            <div>
              <div className="section-title text-xl">त्वरित कार्य</div>
              <div className="section-subtitle">जल्दी से जरूरी काम करें</div>
            </div>
          </div>
          <button className="view-all-btn btn-pill">सभी देखें <ChevronRight size={16}/></button>
        </div>
        <div className="quick-action-grid">
          <div className="action-item" onClick={() => navigate('/income')}>
            <div className="action-icon-bg bg-purple-soft"><Download size={26} color="#6D28D9" strokeWidth={1.8} /></div>
            <span>जमा</span>
          </div>
          <div className="action-item" onClick={() => navigate('/expense')}>
            <div className="action-icon-bg bg-blue-soft"><Upload size={26} color="#0284C7" strokeWidth={1.8} /></div>
            <span>खर्च</span>
          </div>
          <div className="action-item" onClick={() => navigate('/income')}>
            <div className="action-icon-bg bg-green-soft"><IndianRupee size={26} color="#16A34A" strokeWidth={1.8} /></div>
            <span>चंदा / योगदान</span>
          </div>
          <div className="action-item" onClick={() => navigate('/members')}>
            <div className="action-icon-bg bg-orange-soft"><Users size={26} color="#EA580C" strokeWidth={1.8} /></div>
            <span>सदस्य</span>
          </div>
          <div className="action-item" onClick={() => navigate('/reports')}>
            <div className="action-icon-bg bg-indigo-soft"><BarChart2 size={26} color="#4F46E5" strokeWidth={1.8} /></div>
            <span>रिपोर्ट</span>
          </div>
        </div>
      </div>

      {/* Reports & Files */}
      <div className="section-container">
        <div className="section-header">
          <div className="section-title-wrapper">
            <div className="section-title-icon bg-blue-light"><Folder size={20} color="#0284C7" /></div>
            <div>
              <div className="section-title text-xl">रिपोर्ट्स & फाइलें</div>
              <div className="section-subtitle">समिति की सभी जरूरी फाइलें और रिपोर्ट्स</div>
            </div>
          </div>
          <button className="view-all-btn btn-pill" onClick={() => navigate('/reports')}>सभी देखें <ChevronRight size={16}/></button>
        </div>
        <div className="reports-grid">
          <div className="report-card theme-blue">
            <div className="report-card-top">
              <div className="r-icon"><Folder size={22} className="r-icon-svg" /></div>
              <div className="r-arrow"><ChevronRight size={16} className="r-arrow-svg" /></div>
            </div>
            <div className="report-card-content">
              <div className="r-title">सदस्य सूची</div>
              <div className="r-subtitle">
                <FileText size={12} color="#0284C7" /> समिति दस्तावेज
              </div>
            </div>
          </div>
          <div className="report-card theme-green">
            <div className="report-card-top">
              <div className="r-icon"><Folder size={22} className="r-icon-svg" /></div>
              <div className="r-arrow"><ChevronRight size={16} className="r-arrow-svg" /></div>
            </div>
            <div className="report-card-content">
              <div className="r-title">चंदा / योगदान</div>
              <div className="r-subtitle">
                <FileText size={12} color="#16A34A" /> समिति दस्तावेज
              </div>
            </div>
          </div>
          <div className="report-card theme-orange">
            <div className="report-card-top">
              <div className="r-icon"><Folder size={22} className="r-icon-svg" /></div>
              <div className="r-arrow"><ChevronRight size={16} className="r-arrow-svg" /></div>
            </div>
            <div className="report-card-content">
              <div className="r-title">खर्च विवरण</div>
              <div className="r-subtitle">
                <FileText size={12} color="#9A3412" /> समिति दस्तावेज
              </div>
            </div>
          </div>
          <div className="report-card theme-purple">
            <div className="report-card-top">
              <div className="r-icon"><Folder size={22} className="r-icon-svg" /></div>
              <div className="r-arrow"><ChevronRight size={16} className="r-arrow-svg" /></div>
            </div>
            <div className="report-card-content">
              <div className="r-title">मासिक संग्रह</div>
              <div className="r-subtitle">
                <FileText size={12} color="#6D28D9" /> समिति दस्तावेज
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
