
// This file contains the mock data for the Reports component

export const monthlyData = [
  { name: 'Jan', value: 4200 },
  { name: 'Feb', value: 3800 },
  { name: 'Mar', value: 5100 },
  { name: 'Apr', value: 4700 },
  { name: 'May', value: 6200 },
  { name: 'Jun', value: 5800 },
  { name: 'Jul', value: 6900 },
  { name: 'Aug', value: 8100 },
  { name: 'Sep', value: 7400 },
  { name: 'Oct', value: 8700 },
  { name: 'Nov', value: 9400 },
  { name: 'Dec', value: 8900 }
];

// Organize categories by type
export const categoryGroups = [
  {
    name: "Travel",
    categories: [
      { name: 'Hotel/Lodging', value: 7200, color: '#10B981' },
      { name: 'Air/Taxi/Uber', value: 6800, color: '#F43F5E' },
      { name: 'Rental Car', value: 4800, color: '#F59E0B' },
      { name: 'Baggage Fees', value: 900, color: '#22C55E' }
    ]
  },
  {
    name: "Food",
    categories: [
      { name: 'Business Meals', value: 4200, color: '#14B8A6' },
      { name: 'Meals', value: 3800, color: '#EC4899' }
    ]
  },
  {
    name: "Transportation",
    categories: [
      { name: 'Mileage', value: 4500, color: '#6366F1' },
      { name: 'Gasoline', value: 3100, color: '#F97316' },
      { name: 'Parking/Tolls', value: 1500, color: '#0EA5E9' }
    ]
  },
  {
    name: "Office",
    categories: [
      { name: 'Office Supplies', value: 2800, color: '#3B82F6' },
      { name: 'Postage & Freight', value: 1800, color: '#EF4444' },
    ]
  },
  {
    name: "Professional Services",
    categories: [
      { name: 'Professional Fees', value: 6500, color: '#3B82F6' },
      { name: 'Auditing Serv Fees', value: 5800, color: '#8B5CF6' },
      { name: 'Registration Fees', value: 2400, color: '#8B5CF6' },
      { name: 'Dues Subscriptions', value: 3200, color: '#8B5CF6' }
    ]
  },
  {
    name: "Other",
    categories: [
      { name: 'Others', value: 2100, color: '#6B7280' }
    ]
  }
];

// Flatten categories for charts that need a flat structure
export const categoryData = categoryGroups.flatMap(group => group.categories);

export const deptData = [
  { name: 'Sales', value: 12500 },
  { name: 'Marketing', value: 8700 },
  { name: 'Engineering', value: 6200 },
  { name: 'HR', value: 2800 },
  { name: 'Operations', value: 5100 }
];

export const recentReports = [
  { id: 'rep-001', name: 'Q3 Expense Summary', type: 'quarterly' as const, date: '2023-10-01' },
  { id: 'rep-002', name: 'Marketing Department Expenses', type: 'department' as const, date: '2023-10-15' },
  { id: 'rep-003', name: 'Travel Expenses YTD', type: 'category' as const, date: '2023-11-01' },
  { id: 'rep-004', name: 'Yearly Forecast', type: 'forecast' as const, date: '2023-11-10' }
];
