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
    // Construct exhaustive key-value mapping to match ANY Google Sheet column header format
    const comprehensivePayload = {
      // 1. Raw / CamelCase
      date: data.date || '',
      months: data.months || '',
      memberName: data.memberName || '',
      designation: data.designation || '',
      jamaCategory: data.jamaCategory || '',
      paymentMode: data.paymentMode || '',
      amount: data.amount || 0,
      paidAmount: data.paidAmount || 0,
      creditAmount: data.creditAmount || 0,
      remark: data.remark || '',

      // 2. English Column Titles
      "Date": data.date || '',
      "Month": data.months || '',
      "Months": data.months || '',
      "Name": data.memberName || '',
      "Member Name": data.memberName || '',
      "Designation": data.designation || '',
      "Category": data.jamaCategory || '',
      "Jama Category": data.jamaCategory || '',
      "Payment Mode": data.paymentMode || '',
      "Total Amount": data.amount || 0,
      "Paid Amount": data.paidAmount || 0,
      "Credit Amount": data.creditAmount || 0,
      "Remark": data.remark || '',

      // 3. Hindi Column Titles
      "दिनांक": data.date || '',
      "महीना": data.months || '',
      "सदस्य का नाम": data.memberName || '',
      "नाम": data.memberName || '',
      "पद": data.designation || '',
      "जमा श्रेणी": data.jamaCategory || '',
      "श्रेणी": data.jamaCategory || '',
      "भुगतान का प्रकार": data.paymentMode,
      "कुल राशि": data.amount || 0,
      "जमा राशि": data.paidAmount || 0,
      "उधारी राशि": data.creditAmount || 0,
      "टिप्पणी": data.remark || ''
    };

    // Send using URLSearchParams for form-based Apps Script or json body text
    const formBody = new URLSearchParams();
    Object.keys(comprehensivePayload).forEach(key => {
      formBody.append(key, comprehensivePayload[key]);
    });

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody.toString(),
    });

    return { status: 'success' };
  } catch (error) {
    console.error(`Error sending to Google Sheets:`, error);
    return { status: 'error', message: 'गूगल शीट से संपर्क करने में त्रुटि हुई।' };
  }
};
