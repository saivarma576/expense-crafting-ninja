
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
    mismatches.push('merchant name');
  }
  
  if (ocrData.amount && userData.amount && 
      Math.abs(ocrData.amount - userData.amount) > 0.01) {
    mismatches.push('amount');
  }
  
  if (ocrData.date && userData.date && ocrData.date !== userData.date) {
    mismatches.push('date');
  }
  
  return mismatches.length > 0 ? mismatches : null;
};
