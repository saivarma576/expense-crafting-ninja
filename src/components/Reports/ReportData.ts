
// Monthly expense summary data
export const monthlyExpenseData = [
  { month: 'January 2025', totalExpenses: 120000, reports: 45, avgAmount: 2667 },
  { month: 'February 2025', totalExpenses: 98500, reports: 38, avgAmount: 2592 },
  { month: 'March 2025', totalExpenses: 134250, reports: 50, avgAmount: 2685 },
  { month: 'April 2025', totalExpenses: 115750, reports: 43, avgAmount: 2692 },
  { month: 'May 2025', totalExpenses: 142000, reports: 52, avgAmount: 2731 },
  { month: 'June 2025', totalExpenses: 128500, reports: 48, avgAmount: 2677 }
];

// Expense type analysis data
export const expenseTypeData = [
  { name: 'Lodging', value: 45000, percentage: 33.5, avgClaim: 3750, color: '#4f46e5' },
  { name: 'Travel (Air/Uber)', value: 28000, percentage: 20.8, avgClaim: 1867, color: '#8b5cf6' },
  { name: 'Meals', value: 18000, percentage: 13.4, avgClaim: 900, color: '#3b82f6' },
  { name: 'Others', value: 43000, percentage: 32.3, avgClaim: 2389, color: '#06b6d4' },
];

// New compliance insights data (replacement for policy violations)
export const complianceInsightsData = [
  { category: 'Missing Receipts', count: 12, trend: -2, risk: 'medium', impact: 8500 },
  { category: 'Exceeded Limits', count: 8, trend: 3, risk: 'high', impact: 12400 },
  { category: 'Late Submissions', count: 14, trend: -5, risk: 'low', impact: 5200 },
  { category: 'Duplicate Claims', count: 3, trend: 0, risk: 'high', impact: 6800 },
];

// Department data
export const departmentData = [
  { 
    department: 'Finance', 
    totalExpense: 62000, 
    topExpenseType: 'Lodging', 
    violations: 3,
    expenses: {
      lodging: 28000,
      travel: 15000,
      meals: 8000,
      others: 11000
    }
  },
  { 
    department: 'Sales', 
    totalExpense: 85500, 
    topExpenseType: 'Travel', 
    violations: 2,
    expenses: {
      lodging: 25000,
      travel: 35500,
      meals: 15000,
      others: 10000
    }
  },
  { 
    department: 'Marketing', 
    totalExpense: 48000, 
    topExpenseType: 'Meals', 
    violations: 1,
    expenses: {
      lodging: 12000,
      travel: 10000,
      meals: 18000,
      others: 8000
    }
  },
  { 
    department: 'IT', 
    totalExpense: 67300, 
    topExpenseType: 'Office Supplies', 
    violations: 0,
    expenses: {
      lodging: 18000,
      travel: 14000,
      meals: 5300,
      others: 30000
    }
  },
];

// Department chart data
export const departmentChartData = [
  {
    name: 'Finance',
    Lodging: 28000,
    Travel: 15000,
    Meals: 8000,
    Others: 11000,
  },
  {
    name: 'Sales',
    Lodging: 25000,
    Travel: 35500,
    Meals: 15000,
    Others: 10000,
  },
  {
    name: 'Marketing',
    Lodging: 12000,
    Travel: 10000,
    Meals: 18000,
    Others: 8000,
  },
  {
    name: 'IT',
    Lodging: 18000,
    Travel: 14000,
    Meals: 5300,
    Others: 30000,
  },
];

// All expenses data for the list view
export const allExpensesData = [
  { id: 'EXP-2546', employee: 'Rajesh Kumar', date: '15-Jun-25', type: 'Lodging', amount: 9500, status: 'Approved' },
  { id: 'EXP-2545', employee: 'Meena Sharma', date: '14-Jun-25', type: 'Travel', amount: 12400, status: 'Pending' },
  { id: 'EXP-2544', employee: 'Ajay Singh', date: '12-Jun-25', type: 'Meals', amount: 1850, status: 'Approved' },
  { id: 'EXP-2543', employee: 'Priya Patel', date: '10-Jun-25', type: 'Equipment', amount: 24500, status: 'Rejected' },
  { id: 'EXP-2542', employee: 'Vikram Mehta', date: '08-Jun-25', type: 'Office Supplies', amount: 3200, status: 'Approved' },
  { id: 'EXP-2541', employee: 'Neha Gupta', date: '06-Jun-25', type: 'Travel', amount: 18700, status: 'Pending' },
  { id: 'EXP-2540', employee: 'Sanjay Verma', date: '05-Jun-25', type: 'Lodging', amount: 8900, status: 'Approved' },
  { id: 'EXP-2539', employee: 'Anita Desai', date: '03-Jun-25', type: 'Meals', amount: 2100, status: 'Approved' },
  { id: 'EXP-2538', employee: 'Rahul Joshi', date: '01-Jun-25', type: 'Travel', amount: 21300, status: 'Pending' },
  { id: 'EXP-2537', employee: 'Deepak Sharma', date: '30-May-25', type: 'Equipment', amount: 35000, status: 'Approved' },
];

// Summary statistics
export const summaryStats = {
  totalExpenses: 352500,
  totalReports: 143,
  approvedReports: 117,
  averageExpenseAmount: 2466
};
