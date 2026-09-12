
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyx40JW4eUQ2rnZyBIQhImNWUype_IYsy8nfLo8xfQx4V400Qnf1-GVmmV_wuyhaQr3cg/exec';

export const fetchGoogleSheetData = async (sheetName) => {
  console.log(`Fetching from Google Sheets: ${sheetName}... (Not implemented yet)`);
  return [];
};

export const sendToGoogleSheet = async (data) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(data),
    });
    
    // In no-cors mode, the response is opaque and we cannot read .json() or .ok
    // If it reaches here without throwing a network error, the request was sent.
    return { status: 'success' };
  } catch (error) {
    console.error(`Error sending to Google Sheets:`, error);
    return { status: 'error', message: 'Network error or unable to reach the server.' };
  }
};

// We will use sendToGoogleSheet directly in IncomePage

