
// Mock data for expense stats
export const expenseStats = [
  { title: 'Total Expenses', value: '$12,450.65', trend: 8.2, icon: 'dollar' },
  { title: 'Pending Approval', value: '$2,340.00', description: '4 expenses', icon: 'clock' },
  { title: 'Receipts to Process', value: '12', description: 'Last updated 2h ago', icon: 'receipt' },
  { title: 'Reimbursed', value: '$9,120.45', trend: -3.6, icon: 'arrow-down-right' }
];

// Mock data for recent expenses
export const recentExpenses = [
  {
    id: 'exp-001',
    title: 'NYC Client Visit',
    date: 'Oct 12-15, 2023',
    amount: 1245.89,
    status: 'approved',
    expenseTypes: ['airfare', 'hotel', 'meals', 'transport'],
    description: 'Client meetings with ABC Corp. in New York.'
  },
  {
    id: 'exp-002',
    title: 'Office Supplies',
    date: 'Oct 25, 2023',
    amount: 89.99,
    status: 'submitted',
    expenseTypes: ['other'],
    description: 'Quarterly office supplies and equipment.'
  },
  {
    id: 'exp-003',
    title: 'Chicago Conference',
    date: 'Nov 2-4, 2023',
    amount: 1876.50,
    status: 'draft',
    expenseTypes: ['airfare', 'hotel', 'meals'],
    description: 'Annual industry conference.'
  }
];

// Category data with colors and values
export const categoryData = [
  { name: 'Airfare', value: 3450.65, color: '#0EA5E9', formattedValue: '3.4k' },
  { name: 'Hotel', value: 2890.15, color: '#8B5CF6', formattedValue: '2.9k' },
  { name: 'Meals', value: 1245.82, color: '#ea384c', formattedValue: '1.2k' },
  { name: 'Transport', value: 562.18, color: '#10b981', formattedValue: '0.5k' },
  { name: 'Car Rental', value: 876.25, color: '#F97316', formattedValue: '0.8k' },
  { name: 'Other', value: 425.75, color: '#94a3b8', formattedValue: '0.4k' }
];

// Monthly expense trend data
export const monthlyExpenseData = [
  { month: 'Jan', amount: 4000 },
  { month: 'Feb', amount: 3500 },
  { month: 'Mar', amount: 5000 },
  { month: 'Apr', amount: 4500 },
  { month: 'May', amount: 6000 },
  { month: 'Jun', amount: 5500 },
  { month: 'Jul', amount: 7500 },
  { month: 'Aug', amount: 7000 },
  { month: 'Sep', amount: 7500 },
  { month: 'Oct', amount: 9000 },
  { month: 'Nov', amount: 9500 },
  { month: 'Dec', amount: 9000 },
];
