
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

export const categoryData = [
  { name: 'Hotel/Lodging', value: 9850, color: '#3b82f6' },
  { name: 'Meals', value: 7600, color: '#8b5cf6' },
  { name: 'Air/Taxi/Uber', value: 6200, color: '#ec4899' },
  { name: 'Rental Car', value: 4700, color: '#f97316' },
  { name: 'Mileage', value: 3800, color: '#10b981' },
  { name: 'Office Supplies', value: 3200, color: '#06b6d4' },
  { name: 'Business Meals', value: 2800, color: '#eab308' },
  { name: 'Gasoline', value: 2400, color: '#ef4444' },
  { name: 'Parking/Tolls', value: 1900, color: '#a855f7' },
  { name: 'Registration Fees', value: 1600, color: '#14b8a6' },
  { name: 'Professional Fees', value: 1400, color: '#f43f5e' },
  { name: 'Baggage Fees', value: 1100, color: '#0ea5e9' }
];

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
