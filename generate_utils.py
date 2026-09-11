import os

src_dir = r"c:\Users\lr690\OneDrive\Desktop\new app\src"

utils = {
    "utils/storage.js": """
export const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving data', e);
  }
};

export const getData = (key, defaultValue = []) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Error getting data', e);
    return defaultValue;
  }
};

export const updateData = (key, newData) => {
  saveData(key, newData);
};

export const deleteData = (key) => {
  localStorage.removeItem(key);
};

export const clearData = () => {
  localStorage.clear();
};
""",
    "utils/calculations.js": """
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
""",
    "utils/formatters.js": """
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
""",
    "services/googleSheets.js": """
// Ready for Google Apps Script integration
const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export const fetchGoogleSheetData = async (sheetName) => {
  console.log(`Fetching from Google Sheets: ${sheetName}... (Not implemented)`);
  return [];
};

export const sendToGoogleSheet = async (sheetName, data) => {
  console.log(`Sending to Google Sheets: ${sheetName}... (Not implemented)`);
  return true;
};

export const syncMembers = async (members) => sendToGoogleSheet('Members', members);
export const syncIncome = async (income) => sendToGoogleSheet('Income', income);
export const syncChanda = async (chanda) => sendToGoogleSheet('Chanda', chanda);
export const syncExpenses = async (expenses) => sendToGoogleSheet('Expenses', expenses);
export const syncCredits = async (credits) => sendToGoogleSheet('Credits', credits);
"""
}

for name, content in utils.items():
    with open(os.path.join(src_dir, name), "w", encoding="utf-8") as f:
        f.write(content)

print("Utils and Services generated successfully!")
