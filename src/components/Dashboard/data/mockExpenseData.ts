
// Mock data for recent expenses
export const recentExpensesData = [
  {
    id: '1001',
    title: 'Flight to New York',
    date: '2025-04-01',
    amount: 1250.00,
    status: 'approved',
    expenseTypes: ['Travel'],
    description: 'Business trip to client meeting'
  },
  {
    id: '1002',
    title: 'Hotel Stay',
    date: '2025-04-02',
    amount: 890.75,
    status: 'submitted',
    expenseTypes: ['Accommodation'],
    description: '3 nights at Grand Hotel'
  },
  {
    id: '1003',
    title: 'Team Dinner',
    date: '2025-04-05',
    amount: 345.50,
    status: 'approved',
    expenseTypes: ['Meals'],
    description: 'Client dinner meeting'
  },
  {
    id: '1004',
    title: 'Office Supplies',
    date: '2025-04-08',
    amount: 125.30,
    status: 'draft',
    expenseTypes: ['Supplies'],
    description: 'Monthly stationery purchase'
  },
  {
    id: '1005',
    title: 'Conference Registration',
    date: '2025-04-10',
    amount: 799.00,
    status: 'rejected',
    expenseTypes: ['Professional Development'],
    description: 'Annual industry conference'
  }
];

// Stats for ExpenseTrendsSection
export const statsData = [
  { title: 'Total Expenses', value: '$12,450.65', subValue: '+8.2% from last month' },
  { title: 'Pending Approval', value: '$2,340.00', subValue: '4 expenses' },
  { title: 'Receipts to Process', value: '12', subValue: 'Last updated 2h ago' },
  { title: 'Reimbursed', value: '$9,120.45', subValue: '-3.6% from last month' }
];

// Mock expense trends data
export const expenseTrendsData = [
  { month: 'Jan', expenses: 10, amount: 4000 },
  { month: 'Feb', expenses: 15, amount: 3500 },
  { month: 'Mar', expenses: 20, amount: 4900 },
  { month: 'Apr', expenses: 25, amount: 6700 },
  { month: 'May', expenses: 20, amount: 5500 },
  { month: 'Jun', expenses: 25, amount: 6500 },
  { month: 'Jul', expenses: 30, amount: 7800 },
  { month: 'Aug', expenses: 28, amount: 7500 },
  { month: 'Sep', expenses: 32, amount: 8200 },
  { month: 'Oct', expenses: 35, amount: 9500 },
  { month: 'Nov', expenses: 38, amount: 9700 },
  { month: 'Dec', expenses: 37, amount: 9400 },
];

// Updated monthly expense data
export const monthlyExpenseData = [
  { month: 'Apr 2024', totalAmount: 9150, 'Mileage': 500, 'Dues Subscriptions': 300, 'Auditing Serv Fees': 400, 'Hotel/Lodging': 900, 'Meals': 700, 'Others': 400, 'Professional Fees': 350, 'Gasoline': 300, 'Office Supplies': 300, 'Business Meals': 700, 'Postage & Freight': 150, 'Registration Fees': 350, 'Parking/Tolls': 200, 'Air/Taxi/Uber': 650, 'Baggage Fees': 100, 'Rental Car': 550 },
  { month: 'May 2024', totalAmount: 44440, 'Mileage': 2500, 'Dues Subscriptions': 1200, 'Auditing Serv Fees': 8000, 'Hotel/Lodging': 3500, 'Meals': 2500, 'Others': 1400, 'Professional Fees': 1000, 'Gasoline': 800, 'Office Supplies': 1200, 'Business Meals': 2500, 'Postage & Freight': 700, 'Registration Fees': 1000, 'Parking/Tolls': 900, 'Air/Taxi/Uber': 3000, 'Baggage Fees': 600, 'Rental Car': 2500 },
  { month: 'Jun 2024', totalAmount: 14870, 'Mileage': 1200, 'Dues Subscriptions': 450, 'Auditing Serv Fees': 1500, 'Hotel/Lodging': 1100, 'Meals': 900, 'Others': 600, 'Professional Fees': 400, 'Gasoline': 400, 'Office Supplies': 500, 'Business Meals': 900, 'Postage & Freight': 300, 'Registration Fees': 400, 'Parking/Tolls': 400, 'Air/Taxi/Uber': 900, 'Baggage Fees': 250, 'Rental Car': 700 },
  { month: 'Jul 2024', totalAmount: 26550, 'Mileage': 1800, 'Dues Subscriptions': 700, 'Auditing Serv Fees': 3000, 'Hotel/Lodging': 2000, 'Meals': 1600, 'Others': 900, 'Professional Fees': 700, 'Gasoline': 600, 'Office Supplies': 800, 'Business Meals': 1600, 'Postage & Freight': 500, 'Registration Fees': 700, 'Parking/Tolls': 650, 'Air/Taxi/Uber': 1500, 'Baggage Fees': 450, 'Rental Car': 1000 },
  { month: 'Aug 2024', totalAmount: 34010, 'Mileage': 2300, 'Dues Subscriptions': 900, 'Auditing Serv Fees': 5000, 'Hotel/Lodging': 2500, 'Meals': 2000, 'Others': 1100, 'Professional Fees': 900, 'Gasoline': 700, 'Office Supplies': 1000, 'Business Meals': 2000, 'Postage & Freight': 600, 'Registration Fees': 900, 'Parking/Tolls': 750, 'Air/Taxi/Uber': 2000, 'Baggage Fees': 550, 'Rental Car': 1200 },
  { month: 'Sep 2024', totalAmount: 17610, 'Mileage': 1500, 'Dues Subscriptions': 550, 'Auditing Serv Fees': 2000, 'Hotel/Lodging': 1300, 'Meals': 1100, 'Others': 700, 'Professional Fees': 500, 'Gasoline': 500, 'Office Supplies': 600, 'Business Meals': 1100, 'Postage & Freight': 350, 'Registration Fees': 500, 'Parking/Tolls': 450, 'Air/Taxi/Uber': 1100, 'Baggage Fees': 300, 'Rental Car': 800 }
];

// Updated expense categories
export const expenseCategoryList = [
  { name: 'Mileage', color: '#4F46E5' },
  { name: 'Dues Subscriptions', color: '#10B981' },
  { name: 'Auditing Serv Fees', color: '#F43F5E' },
  { name: 'Hotel/Lodging', color: '#F59E0B' },
  { name: 'Meals', color: '#8B5CF6' },
  { name: 'Others', color: '#6B7280' },
  { name: 'Professional Fees', color: '#3B82F6' },
  { name: 'Gasoline', color: '#EC4899' },
  { name: 'Office Supplies', color: '#14B8A6' },
  { name: 'Business Meals', color: '#EF4444' },
  { name: 'Postage & Freight', color: '#F97316' },
  { name: 'Registration Fees', color: '#8B5CF6' },
  { name: 'Parking/Tolls', color: '#64748B' },
  { name: 'Air/Taxi/Uber', color: '#0EA5E9' },
  { name: 'Baggage Fees', color: '#22C55E' },
  { name: 'Rental Car', color: '#A855F7' }
];
