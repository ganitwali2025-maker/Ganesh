
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
import ExpenseReportPage from './pages/ExpenseReportPage';
import IncomeReportPage from './pages/IncomeReportPage';

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
            <Route path="/expense-report" element={<ExpenseReportPage />} />
            <Route path="/income-report" element={<IncomeReportPage />} />
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
