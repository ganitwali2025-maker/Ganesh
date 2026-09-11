
export const calculateTotalIncome = (incomeList) => {
  return incomeList.filter(i => i.status === 'Paid').reduce((sum, item) => sum + Number(item.amount || 0), 0);
};

export const calculateTotalChanda = (chandaList) => {
  return chandaList.filter(c => c.status === 'Paid').reduce((sum, item) => sum + Number(item.amount || 0), 0);
};

export const calculateTotalExpense = (expenseList) => {
  return expenseList.filter(e => e.status === 'Paid').reduce((sum, item) => sum + Number(item.amount || 0), 0);
};

export const calculateTotalCredit = (creditsList) => {
  return creditsList.filter(c => c.status === 'Pending').reduce((sum, item) => sum + Number(item.amount || 0), 0);
};

export const calculateBalance = (incomeList, chandaList, expenseList) => {
  const totalIn = calculateTotalIncome(incomeList) + calculateTotalChanda(chandaList);
  const totalOut = calculateTotalExpense(expenseList);
  return totalIn - totalOut;
};

export const calculateMonthlyTotal = (list, monthStr) => {
  // list format assumed to have a date 'DD/MM/YYYY' or 'YYYY-MM-DD'
  // Simplified for now
  return list.reduce((sum, item) => sum + Number(item.amount || 0), 0);
};
