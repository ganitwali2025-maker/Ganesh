
export const formatINR = (amount) => {
  if (isNaN(amount)) return "₹0";
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateStr) => {
  // Format to friendly DD MMM YYYY if needed
  if(!dateStr) return "";
  return dateStr;
};
