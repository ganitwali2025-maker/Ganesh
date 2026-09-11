
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
