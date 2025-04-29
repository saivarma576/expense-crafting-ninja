import { subMonths, isWithinInterval, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, startOfYear } from 'date-fns';

// Updated to match both MonthlyExpenseData interface in ModernMonthlyExpenseChart and in MonthlySummaryTab
export const monthlyExpenseData = [
  { name: 'Jan', expenses: 15000, month: 'Jan', totalExpenses: 15000, reports: 24, avgAmount: 625 },
  { name: 'Feb', expenses: 18000, month: 'Feb', totalExpenses: 18000, reports: 28, avgAmount: 643 },
  { name: 'Mar', expenses: 22000, month: 'Mar', totalExpenses: 22000, reports: 32, avgAmount: 688 },
  { name: 'Apr', expenses: 25000, month: 'Apr', totalExpenses: 25000, reports: 36, avgAmount: 694 },
  { name: 'May', expenses: 21000, month: 'May', totalExpenses: 21000, reports: 30, avgAmount: 700 },
  { name: 'Jun', expenses: 23000, month: 'Jun', totalExpenses: 23000, reports: 33, avgAmount: 697 },
  { name: 'Jul', expenses: 26000, month: 'Jul', totalExpenses: 26000, reports: 38, avgAmount: 684 },
  { name: 'Aug', expenses: 24000, month: 'Aug', totalExpenses: 24000, reports: 35, avgAmount: 686 },
  { name: 'Sep', expenses: 29000, month: 'Sep', totalExpenses: 29000, reports: 42, avgAmount: 690 },
  { name: 'Oct', expenses: 27000, month: 'Oct', totalExpenses: 27000, reports: 39, avgAmount: 692 },
  { name: 'Nov', expenses: 30000, month: 'Nov', totalExpenses: 30000, reports: 43, avgAmount: 698 },
  { name: 'Dec', expenses: 32000, month: 'Dec', totalExpenses: 32000, reports: 45, avgAmount: 711 },
];

// Mock data for expense type distribution - Updated to match ExpenseTypeData interface
export const expenseTypeData = [
  { name: 'Travel', value: 28000, percentage: 35, avgClaim: 718, color: '#4f46e5' },
  { name: 'Office Supplies', value: 12000, percentage: 15, avgClaim: 632, color: '#3b82f6' },
  { name: 'Meals', value: 18000, percentage: 22.5, avgClaim: 545, color: '#10b981' },
  { name: 'Accommodation', value: 16000, percentage: 20, avgClaim: 842, color: '#f59e0b' },
  { name: 'Other', value: 6000, percentage: 7.5, avgClaim: 500, color: '#6b7280' },
];

// Mock data for compliance insights - Updated to match ComplianceInsight interface with additional fields
export const complianceInsightsData = [
  { id: '1', name: 'Missing Receipts', category: 'Missing Receipts', count: 24, trend: 5, risk: 'high', impact: 12500, status: 'Non-Compliant', description: 'Expense reports submitted without required receipt documentation.' },
  { id: '2', name: 'Over Threshold', category: 'Over Threshold', count: 18, trend: -2, risk: 'medium', impact: 8700, status: 'Non-Compliant', description: 'Expenses that exceed the allowed threshold for their respective categories.' },
  { id: '3', name: 'Late Submission', category: 'Late Submission', count: 12, trend: -10, risk: 'low', impact: 5200, status: 'Warning', description: 'Expense reports submitted after the deadline.' },
  { id: '4', name: 'Duplicate Claims', category: 'Duplicate Claims', count: 5, trend: -15, risk: 'high', impact: 3800, status: 'Non-Compliant', description: 'Multiple expense claims for the same purchase or service.' },
  { id: '5', name: 'Incorrect Category', category: 'Incorrect Category', count: 9, trend: 0, risk: 'medium', impact: 2700, status: 'Warning', description: 'Expenses filed under the wrong expense category.' },
  { id: '6', name: 'Approved', category: 'Approved', count: 136, trend: 8, risk: 'low', impact: 0, status: 'Compliant', description: 'Expenses that comply with all company policies.' },
];

// Mock data for department spending - Updated to match DepartmentData interface
export const departmentData = [
  { 
    department: 'Sales', 
    totalExpense: 32000, 
    topExpenseType: 'Travel', 
    violations: 6,
    expenses: { lodging: 12000, travel: 9500, meals: 6800, others: 3700 }
  },
  { 
    department: 'Marketing', 
    totalExpense: 28000, 
    topExpenseType: 'Meals', 
    violations: 4,
    expenses: { lodging: 9000, travel: 7500, meals: 8200, others: 3300 }
  },
  { 
    department: 'Engineering', 
    totalExpense: 24000, 
    topExpenseType: 'Travel', 
    violations: 2,
    expenses: { lodging: 8500, travel: 9800, meals: 3200, others: 2500 }
  },
  { 
    department: 'Finance', 
    totalExpense: 15000, 
    topExpenseType: 'Office Supplies', 
    violations: 1,
    expenses: { lodging: 4200, travel: 3800, meals: 2500, others: 4500 }
  },
  { 
    department: 'HR', 
    totalExpense: 9000, 
    topExpenseType: 'Training', 
    violations: 0,
    expenses: { lodging: 2200, travel: 1800, meals: 1500, others: 3500 }
  },
  { 
    department: 'Operations', 
    totalExpense: 12000, 
    topExpenseType: 'Travel', 
    violations: 3,
    expenses: { lodging: 3800, travel: 4500, meals: 2200, others: 1500 }
  },
];

// Mock data for department chart - Updated to match DepartmentChartData interface
export const departmentChartData = [
  { name: 'Jan', Lodging: 8200, Travel: 7500, Meals: 5800, Others: 3500 },
  { name: 'Feb', Lodging: 9000, Travel: 8300, Meals: 6200, Others: 3800 },
  { name: 'Mar', Lodging: 9800, Travel: 9100, Meals: 6800, Others: 4300 },
  { name: 'Apr', Lodging: 9200, Travel: 8500, Meals: 6500, Others: 4100 },
  { name: 'May', Lodging: 10500, Travel: 9800, Meals: 7200, Others: 4700 },
  { name: 'Jun', Lodging: 9800, Travel: 9200, Meals: 6700, Others: 4400 },
];

// Mock data for all expenses
export const allExpensesData = [
  { id: 'EXP001', expenseNumber: 'EXPN-2025-001', employee: 'John Smith', date: '2025-04-05', type: 'Travel', amount: 1200, status: 'Approved' },
  { id: 'EXP002', expenseNumber: 'EXPN-2025-002', employee: 'Sarah Johnson', date: '2025-04-08', type: 'Office Supplies', amount: 450, status: 'Approved' },
  { id: 'EXP003', expenseNumber: 'EXPN-2025-003', employee: 'Michael Brown', date: '2025-04-10', type: 'Meals', amount: 85, status: 'Pending' },
  { id: 'EXP004', expenseNumber: 'EXPN-2025-004', employee: 'Emily Davis', date: '2025-04-12', type: 'Accommodation', amount: 650, status: 'Approved' },
  { id: 'EXP005', expenseNumber: 'EXPN-2025-005', employee: 'Robert Wilson', date: '2025-04-15', type: 'Travel', amount: 980, status: 'Rejected' },
  { id: 'EXP006', expenseNumber: 'EXPN-2025-006', employee: 'Jennifer Lee', date: '2025-04-18', type: 'Meals', amount: 120, status: 'Pending' },
  { id: 'EXP007', expenseNumber: 'EXPN-2025-007', employee: 'David Miller', date: '2025-03-20', type: 'Office Supplies', amount: 320, status: 'Approved' },
  { id: 'EXP008', expenseNumber: 'EXPN-2025-008', employee: 'Lisa Anderson', date: '2025-03-22', type: 'Travel', amount: 1500, status: 'Approved' },
  { id: 'EXP009', expenseNumber: 'EXPN-2025-009', employee: 'James Taylor', date: '2025-03-25', type: 'Accommodation', amount: 750, status: 'Pending' },
  { id: 'EXP010', expenseNumber: 'EXPN-2025-010', employee: 'Patricia Moore', date: '2025-03-28', type: 'Meals', amount: 95, status: 'Rejected' },
  { id: 'EXP011', expenseNumber: 'EXPN-2025-011', employee: 'Thomas Jackson', date: '2025-02-02', type: 'Travel', amount: 1100, status: 'Approved' },
  { id: 'EXP012', expenseNumber: 'EXPN-2025-012', employee: 'Barbara White', date: '2025-02-05', type: 'Office Supplies', amount: 280, status: 'Approved' },
  { id: 'EXP013', expenseNumber: 'EXPN-2025-013', employee: 'Charles Harris', date: '2025-02-08', type: 'Meals', amount: 110, status: 'Pending' },
  { id: 'EXP014', expenseNumber: 'EXPN-2025-014', employee: 'Susan Martin', date: '2025-02-12', type: 'Accommodation', amount: 680, status: 'Approved' },
  { id: 'EXP015', expenseNumber: 'EXPN-2025-015', employee: 'Joseph Thompson', date: '2025-02-15', type: 'Travel', amount: 950, status: 'Rejected' },
];

// Summary stats for the cards
export const summaryStats = {
  totalExpenses: 120000,
  totalReports: 204,
  approvedReports: 167,
  averageExpenseAmount: 588,
};

// Function to filter data based on time filter and date range
export const getFilteredData = (
  timeFilter: string,
  startDate?: Date,
  endDate?: Date
) => {
  const now = new Date();
  let filterStartDate: Date;
  let filterEndDate: Date = now;

  // Determine date range based on timeFilter
  if (timeFilter === 'custom' && startDate && endDate) {
    filterStartDate = startDate;
    filterEndDate = endDate;
  } else if (timeFilter === 'previous') {
    filterStartDate = startOfQuarter(subMonths(now, 3));
    filterEndDate = endOfQuarter(subMonths(now, 3));
  } else if (timeFilter === 'ytd') {
    filterStartDate = startOfYear(now);
  } else {
    // Default to current quarter
    filterStartDate = startOfQuarter(now);
    filterEndDate = endOfQuarter(now);
  }

  // Filter expenses by date
  const filteredExpenses = allExpensesData.filter(expense => {
    const expenseDate = new Date(expense.date);
    return isWithinInterval(expenseDate, { start: filterStartDate, end: filterEndDate });
  });

  // Calculate summary stats based on filtered expenses
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const approvedExpenses = filteredExpenses.filter(expense => expense.status === 'Approved');
  
  const filteredSummaryStats = {
    totalExpenses,
    totalReports: filteredExpenses.length,
    approvedReports: approvedExpenses.length,
    averageExpenseAmount: filteredExpenses.length > 0 ? Math.round(totalExpenses / filteredExpenses.length) : 0,
  };

  // Create month-filtered data for charts
  const getMonthIndex = (monthStr: string) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.indexOf(monthStr);
  };

  // When filtering monthly data, ensure we preserve the name and expenses properties
  const filteredMonthlyData = monthlyExpenseData.filter(item => {
    const itemDate = new Date(now.getFullYear(), getMonthIndex(item.month), 1);
    return isWithinInterval(itemDate, { start: filterStartDate, end: filterEndDate });
  });

  // For other data, we'll simulate filtering by reducing amounts proportionally
  // In a real app, you would properly filter each dataset based on dates
  const filterRatio = filteredExpenses.length / allExpensesData.length;
  
  const filteredExpenseTypeData = expenseTypeData.map(item => ({
    ...item,
    value: Math.round(item.value * filterRatio)
  }));

  return {
    monthlyExpenseData: filteredMonthlyData,
    expenseTypeData: filteredExpenseTypeData,
    complianceInsightsData,  // For demo, keeping original data
    departmentData,          // For demo, keeping original data
    departmentChartData,     // For demo, keeping original data
    allExpensesData: filteredExpenses,
    summaryStats: filteredSummaryStats
  };
};
