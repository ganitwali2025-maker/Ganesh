
import React from 'react';
import { formatINR } from '../../utils/formatters';

export default function TransactionItem({ item }) {
  const isReceived = item.type === 'income' || item.type === 'chanda';
  const isPending = item.status === 'Pending';
  
  let colorClass = isReceived ? 'green' : 'red';
  if (isPending) colorClass = 'orange';

  return (
    <div className="txn-item">
      <div className={`txn-icon ${colorClass}`}>
        {item.type.charAt(0).toUpperCase()}
      </div>
      <div className="txn-info">
        <div className="txn-title">{item.name || item.particular}</div>
        <div className="txn-subtitle">{item.date} &bull; {item.paymentMode}</div>
      </div>
      <div className="txn-amount-col">
        <div className={`txn-amount ${colorClass}`}>{formatINR(item.amount)}</div>
        <div className={`txn-badge ${colorClass}`}>{item.status}</div>
      </div>
    </div>
  );
}
