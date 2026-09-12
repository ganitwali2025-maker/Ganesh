const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyx40JW4eUQ2rnZyBIQhImNWUype_IYsy8nfLo8xfQx4V400Qnf1-GVmmV_wuyhaQr3cg/exec';

export const fetchGoogleSheetData = async (sheetName) => {
  try {
    const url = `${SCRIPT_URL}?sheet=${encodeURIComponent(sheetName || '')}`;
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch (error) {
    console.error('Error fetching Google Sheet data:', error);
  }
  return [];
};

export const sendToGoogleSheet = async (data) => {
  try {
    // Both Title Case and camelCase to match any Apps Script parser
    const payload = {
      // Title Case keys expected by Google Apps Script
      "Date": data.date || '',
      "Month": data.months || data.month || '',
      "Months": data.months || data.month || '',
      "Member Name": data.memberName || data.name || '',
      "Name": data.memberName || data.name || '',
      "Designation": data.designation || '',
      "Jama Category": data.jamaCategory || data.category || '',
      "Category": data.jamaCategory || data.category || '',
      "Payment Mode": data.paymentMode || '',
      "Total Amount": parseFloat(data.amount) || 0,
      "Paid Amount": parseFloat(data.paidAmount) || 0,
      "Credit Amount": parseFloat(data.creditAmount) || 0,
      "Remark": data.remark || '',

      // camelCase keys
      date: data.date || '',
      months: data.months || data.month || '',
      memberName: data.memberName || data.name || '',
      designation: data.designation || '',
      jamaCategory: data.jamaCategory || data.category || '',
      paymentMode: data.paymentMode || '',
      amount: parseFloat(data.amount) || 0,
      paidAmount: parseFloat(data.paidAmount) || 0,
      creditAmount: parseFloat(data.creditAmount) || 0,
      remark: data.remark || '',

      // Hindi keys
      "दिनांक": data.date || '',
      "महीना": data.months || data.month || '',
      "सदस्य का नाम": data.memberName || data.name || '',
      "पद": data.designation || '',
      "जमा श्रेणी": data.jamaCategory || data.category || '',
      "भुगतान का प्रकार": data.paymentMode || '',
      "कुल राशि": parseFloat(data.amount) || 0,
      "जमा राशि": parseFloat(data.paidAmount) || 0,
      "उधारी राशि": parseFloat(data.creditAmount) || 0,
      "टिप्पणी": data.remark || ''
    };

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(payload),
    });

    // In no-cors mode, reaching here means HTTP request was successfully dispatched to Apps Script
    return { status: 'success' };
  } catch (error) {
    console.error(`Error sending to Google Sheets:`, error);
    return { status: 'error', message: 'गूगल शीट से संपर्क करने में त्रुटि हुई।' };
  }
};
