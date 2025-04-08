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
  { name: 'Mileage', value: 4500, color: '#3498db' },
  { name: 'Dues Subscriptions', value: 3200, color: '#9b59b6' },
  { name: 'Auditing Serv Fees', value: 5800, color: '#e74c3c' },
  { name: 'Hotel/Lodging', value: 7200, color: '#2ecc71' },
  { name: 'Meals', value: 3800, color: '#f39c12' },
  { name: 'Others', value: 2100, color: '#7f8c8d' },
  { name: 'Professional Fees', value: 6500, color: '#1abc9c' },
  { name: 'Gasoline', value: 3100, color: '#e67e22' },
  { name: 'Office Supplies', value: 2800, color: '#34495e' },
  { name: 'Business Meals', value: 4200, color: '#16a085' },
  { name: 'Postage & Freight', value: 1800, color: '#d35400' },
  { name: 'Registration Fees', value: 2400, color: '#8e44ad' },
  { name: 'Parking/Tolls', value: 1500, color: '#2980b9' },
  { name: 'Air/Taxi/Uber', value: 6800, color: '#c0392b' },
  { name: 'Baggage Fees', value: 900, color: '#27ae60' },
  { name: 'Rental Car', value: 4800, color: '#f1c40f' }
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
