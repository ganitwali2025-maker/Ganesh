
export const formatINR = (amount) => {
  if (isNaN(amount)) return "₹0";
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  if (typeof dateStr === 'string' && dateStr.includes('T')) {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-GB');
    }
  }
  return dateStr;
};
