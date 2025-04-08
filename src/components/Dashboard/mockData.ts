
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

// Category data with colors and values - making it more modern and vibrant
export const categoryData = [
  { name: 'Mileage', value: 4500, color: '#6366F1', formattedValue: '$4.5k' },
  { name: 'Dues Subscriptions', value: 3200, color: '#8B5CF6', formattedValue: '$3.2k' },
  { name: 'Auditing Serv Fees', value: 5800, color: '#EC4899', formattedValue: '$5.8k' },
  { name: 'Hotel/Lodging', value: 7200, color: '#10B981', formattedValue: '$7.2k' },
  { name: 'Meals', value: 3800, color: '#F59E0B', formattedValue: '$3.8k' },
  { name: 'Others', value: 2100, color: '#6B7280', formattedValue: '$2.1k' },
  { name: 'Professional Fees', value: 6500, color: '#059669', formattedValue: '$6.5k' },
  { name: 'Gasoline', value: 3100, color: '#F97316', formattedValue: '$3.1k' },
  { name: 'Office Supplies', value: 2800, color: '#3B82F6', formattedValue: '$2.8k' },
  { name: 'Business Meals', value: 4200, color: '#14B8A6', formattedValue: '$4.2k' },
  { name: 'Postage & Freight', value: 1800, color: '#EF4444', formattedValue: '$1.8k' },
  { name: 'Registration Fees', value: 2400, color: '#8B5CF6', formattedValue: '$2.4k' },
  { name: 'Parking/Tolls', value: 1500, color: '#0EA5E9', formattedValue: '$1.5k' },
  { name: 'Air/Taxi/Uber', value: 6800, color: '#F43F5E', formattedValue: '$6.8k' },
  { name: 'Baggage Fees', value: 900, color: '#22C55E', formattedValue: '$900' },
  { name: 'Rental Car', value: 4800, color: '#FBBF24', formattedValue: '$4.8k' }
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
