
import { subMonths, isWithinInterval, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, startOfYear } from 'date-fns';

// Mock data for monthly expenses
export const monthlyExpenseData = [
  { month: 'Jan', expenses: 15000 },
  { month: 'Feb', expenses: 18000 },
  { month: 'Mar', expenses: 22000 },
  { month: 'Apr', expenses: 25000 },
  { month: 'May', expenses: 21000 },
  { month: 'Jun', expenses: 23000 },
  { month: 'Jul', expenses: 26000 },
  { month: 'Aug', expenses: 24000 },
  { month: 'Sep', expenses: 29000 },
  { month: 'Oct', expenses: 27000 },
  { month: 'Nov', expenses: 30000 },
  { month: 'Dec', expenses: 32000 },
];

// Mock data for expense type distribution
export const expenseTypeData = [
  { type: 'Travel', amount: 28000, percentage: 35 },
  { type: 'Office Supplies', amount: 12000, percentage: 15 },
  { type: 'Meals', amount: 18000, percentage: 22.5 },
  { type: 'Accommodation', amount: 16000, percentage: 20 },
  { type: 'Other', amount: 6000, percentage: 7.5 },
];

// Mock data for compliance insights
export const complianceInsightsData = [
  { category: 'Missing Receipts', count: 24, status: 'Non-Compliant' },
  { category: 'Over Threshold', count: 18, status: 'Non-Compliant' },
  { category: 'Late Submission', count: 12, status: 'Warning' },
  { category: 'Duplicate Claims', count: 5, status: 'Non-Compliant' },
  { category: 'Incorrect Category', count: 9, status: 'Warning' },
  { category: 'Approved', count: 136, status: 'Compliant' },
];

// Mock data for department spending
export const departmentData = [
  { department: 'Sales', amount: 32000, count: 45, avgAmount: 711 },
  { department: 'Marketing', amount: 28000, count: 38, avgAmount: 737 },
  { department: 'Engineering', amount: 24000, count: 30, avgAmount: 800 },
  { department: 'Finance', amount: 15000, count: 22, avgAmount: 682 },
  { department: 'HR', amount: 9000, count: 15, avgAmount: 600 },
  { department: 'Operations', amount: 12000, count: 20, avgAmount: 600 },
];

// Mock data for department chart
export const departmentChartData = [
  { month: 'Jan', Sales: 3200, Marketing: 2800, Engineering: 2400, Finance: 1500, HR: 900 },
  { month: 'Feb', Sales: 3800, Marketing: 3100, Engineering: 2600, Finance: 1700, HR: 950 },
  { month: 'Mar', Sales: 4200, Marketing: 3500, Engineering: 2900, Finance: 1900, HR: 1050 },
  { month: 'Apr', Sales: 3900, Marketing: 3300, Engineering: 2700, Finance: 1800, HR: 1000 },
  { month: 'May', Sales: 4500, Marketing: 3800, Engineering: 3100, Finance: 2100, HR: 1150 },
  { month: 'Jun', Sales: 4100, Marketing: 3600, Engineering: 2800, Finance: 2000, HR: 1100 },
];

// Mock data for all expenses
export const allExpensesData = [
  { id: 'EXP001', employee: 'John Smith', date: '2025-04-05', type: 'Travel', amount: 1200, status: 'Approved' },
  { id: 'EXP002', employee: 'Sarah Johnson', date: '2025-04-08', type: 'Office Supplies', amount: 450, status: 'Approved' },
  { id: 'EXP003', employee: 'Michael Brown', date: '2025-04-10', type: 'Meals', amount: 85, status: 'Pending' },
  { id: 'EXP004', employee: 'Emily Davis', date: '2025-04-12', type: 'Accommodation', amount: 650, status: 'Approved' },
  { id: 'EXP005', employee: 'Robert Wilson', date: '2025-04-15', type: 'Travel', amount: 980, status: 'Rejected' },
  { id: 'EXP006', employee: 'Jennifer Lee', date: '2025-04-18', type: 'Meals', amount: 120, status: 'Pending' },
  { id: 'EXP007', employee: 'David Miller', date: '2025-03-20', type: 'Office Supplies', amount: 320, status: 'Approved' },
  { id: 'EXP008', employee: 'Lisa Anderson', date: '2025-03-22', type: 'Travel', amount: 1500, status: 'Approved' },
  { id: 'EXP009', employee: 'James Taylor', date: '2025-03-25', type: 'Accommodation', amount: 750, status: 'Pending' },
  { id: 'EXP010', employee: 'Patricia Moore', date: '2025-03-28', type: 'Meals', amount: 95, status: 'Rejected' },
  { id: 'EXP011', employee: 'Thomas Jackson', date: '2025-02-02', type: 'Travel', amount: 1100, status: 'Approved' },
  { id: 'EXP012', employee: 'Barbara White', date: '2025-02-05', type: 'Office Supplies', amount: 280, status: 'Approved' },
  { id: 'EXP013', employee: 'Charles Harris', date: '2025-02-08', type: 'Meals', amount: 110, status: 'Pending' },
  { id: 'EXP014', employee: 'Susan Martin', date: '2025-02-12', type: 'Accommodation', amount: 680, status: 'Approved' },
  { id: 'EXP015', employee: 'Joseph Thompson', date: '2025-02-15', type: 'Travel', amount: 950, status: 'Rejected' },
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

  // For this example, we're simulating filtered data for other components
  // In a real app, you would filter each dataset based on the date range
  
  // Create month-filtered data for charts
  const getMonthIndex = (monthStr: string) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.indexOf(monthStr);
  };

  // Filter monthly data
  const filteredMonthlyData = monthlyExpenseData.filter(item => {
    const itemDate = new Date(now.getFullYear(), getMonthIndex(item.month), 1);
    return isWithinInterval(itemDate, { start: filterStartDate, end: filterEndDate });
  });

  // For other data, we'll simulate filtering by reducing amounts proportionally
  // In a real app, you would properly filter each dataset based on dates
  const filterRatio = filteredExpenses.length / allExpensesData.length;
  
  const filteredExpenseTypeData = expenseTypeData.map(item => ({
    ...item,
    amount: Math.round(item.amount * filterRatio)
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
