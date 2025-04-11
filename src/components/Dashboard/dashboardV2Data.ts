
// Mock data for the Dashboard V2

export const dashboardData = {
  submittedExpenses: 50000,
  inReviewExpenses: 36894,
  reimbursedExpenses: 28567,
  
  stats: {
    totalExpenses: 7585,
    travelExpenses: 22890,
    mealExpenses: 367,
    suppliesExpenses: 1892,
  },
  
  monthlyTrends: [
    { month: 'Jan', expenses: 80, amount: 38000 },
    { month: 'Feb', expenses: 120, amount: 55000 },
    { month: 'Mar', expenses: 65, amount: 42000 },
    { month: 'Apr', expenses: 130, amount: 60000 },
    { month: 'May', expenses: 75, amount: 48000 },
    { month: 'Jun', expenses: 84, amount: 53000 },
    { month: 'Jul', expenses: 45, amount: 40000 },
    { month: 'Aug', expenses: 25, amount: 30000 },
    { month: 'Sep', expenses: 95, amount: 70000 },
    { month: 'Oct', expenses: 40, amount: 45000 },
    { month: 'Nov', expenses: 90, amount: 58000 },
    { month: 'Dec', expenses: 35, amount: 62000 },
  ],
  
  expenseTypes: [
    { name: 'Travel General', value: 75, color: '#3b82f6' },
    { name: 'Meals', value: 47, color: '#8b5cf6' },
    { name: 'Accommodations', value: 82, color: '#10b981' },
    { name: 'Professional Services', value: 52, color: '#f97316' },
    { name: 'Office Supplies', value: 75, color: '#ec4899' },
    { name: 'Transportation', value: 45, color: '#f59e0b' },
    { name: 'Client Entertainment', value: 82, color: '#14b8a6' },
  ],
  
  latestExpenses: [
    { 
      id: 'E',
      vendor: 'Delta Airlines', 
      reportNumber: 'EXP-001', 
      date: 'Oct 16, 2024', 
      amount: 5800.00, 
      status: 'In Review' 
    },
    { 
      id: 'E',
      vendor: 'Hilton Hotels', 
      reportNumber: 'EXP-002', 
      date: 'Dec 13, 2024', 
      amount: 1225.40, 
      status: 'In Review' 
    },
    { 
      id: 'E',
      vendor: 'Uber for Business', 
      reportNumber: 'EXP-003', 
      date: 'Oct 16, 2024', 
      amount: 6800.00, 
      status: 'In Review' 
    },
    { 
      id: 'W',
      vendor: 'Office Depot', 
      reportNumber: 'EXP-012', 
      date: 'Dec 3, 2024', 
      amount: 5500.00, 
      status: 'In Review' 
    },
  ],
  
  latestReimbursements: [
    { 
      id: 'C',
      employee: 'Jennifer Smith', 
      paymentMethod: 'Direct Deposit', 
      referenceNumber: '2002801950', 
      date: 'Nov 17, 2023', 
      amount: 6800.00
    },
    { 
      id: 'W',
      employee: 'Michael Johnson', 
      paymentMethod: 'Direct Deposit', 
      referenceNumber: '2002801548', 
      date: 'Oct 3, 2023', 
      amount: 9900.00
    },
    { 
      id: 'P',
      employee: 'Sarah Williams', 
      paymentMethod: 'Direct Deposit', 
      referenceNumber: '2002801541', 
      date: 'Oct 3, 2023', 
      amount: 9800.00
    },
    { 
      id: 'W',
      employee: 'David Brown', 
      paymentMethod: 'Direct Deposit', 
      referenceNumber: '2002801537', 
      date: 'Oct 3, 2023', 
      amount: 8800.00
    },
  ],
  
  expenseStatusData: [
    { name: 'In Review', value: 22.3, color: '#3b82f6' },
    { name: 'Approved', value: 27.8, color: '#10b981' },
    { name: 'Rejected', value: 20.5, color: '#f43f5e' },
    { name: 'Receipts Needed', value: 8.5, color: '#0ea5e9' },
    { name: 'Cancelled', value: 12.2, color: '#f59e0b' },
    { name: 'Reimbursed', value: 8.7, color: '#8b5cf6' },
  ],
  
  pendingReviewExpenses: [
    { 
      id: 'C',
      employee: 'Jennifer Smith', 
      expenseNumber: 'TREXP90909', 
      daysOutstanding: 5, 
      amount: 1595.90, 
      status: 'In Review' 
    },
    { 
      id: 'R',
      employee: 'Michael Johnson', 
      expenseNumber: 'MKTEXP345MNB', 
      daysOutstanding: 3, 
      amount: 7595.90, 
      status: 'In Review' 
    },
    { 
      id: 'C',
      employee: 'Sarah Williams', 
      expenseNumber: 'TRVL1012024', 
      daysOutstanding: 4, 
      amount: 1495.60, 
      status: 'In Review' 
    },
    { 
      id: 'W',
      employee: 'David Brown', 
      expenseNumber: 'MEAL34567', 
      daysOutstanding: 5, 
      amount: 3900.90, 
      status: 'In Review' 
    },
    { 
      id: 'A',
      employee: 'Emily Davis', 
      expenseNumber: 'CONF-123567', 
      daysOutstanding: 2, 
      amount: 4567.90, 
      status: 'In Review' 
    },
  ]
};
