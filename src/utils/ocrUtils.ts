
// Simulate OCR extraction from receipt
export const extractDataFromReceipt = async (receiptUrl: string) => {
  // In a real app, this would call an OCR API
  // For demo purposes, we're simulating OCR data extraction
  console.log('Extracting data from receipt:', receiptUrl);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mock data as if extracted from receipt
  return {
    merchantName: 'Sample Merchant',
    amount: 142.50,
    date: new Date().toISOString().split('T')[0],
    type: 'meals' as const,
    receiptExtracted: true
  };
};

// Check if user data differs from OCR data
export const detectDataMismatch = (ocrData: any, userData: any) => {
  const mismatches = [];
  
  if (ocrData.merchantName && userData.merchantName && 
      ocrData.merchantName !== userData.merchantName) {
    mismatches.push({
      field: 'merchantName', 
      ocrValue: ocrData.merchantName, 
      userValue: userData.merchantName,
      message: `Receipt shows merchant "${ocrData.merchantName}" but you entered "${userData.merchantName}"`
    });
  }
  
  if (ocrData.amount && userData.amount && 
      Math.abs(ocrData.amount - userData.amount) > 0.01) {
    mismatches.push({
      field: 'amount', 
      ocrValue: ocrData.amount, 
      userValue: userData.amount,
      message: `Receipt shows amount $${ocrData.amount.toFixed(2)} but you entered $${userData.amount.toFixed(2)}`
    });
  }
  
  if (ocrData.date && userData.date && ocrData.date !== userData.date) {
    mismatches.push({
      field: 'date', 
      ocrValue: ocrData.date, 
      userValue: userData.date,
      message: `Receipt shows date ${ocrData.date} but you entered ${userData.date}`
    });
  }
  
  if (ocrData.type && userData.type && ocrData.type !== userData.type) {
    mismatches.push({
      field: 'type', 
      ocrValue: ocrData.type, 
      userValue: userData.type,
      message: `Receipt suggests expense type "${ocrData.type}" but you selected "${userData.type}"`
    });
  }
  
  return mismatches.length > 0 ? mismatches : null;
};
