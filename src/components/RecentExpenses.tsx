
import React from 'react';
import RecentExpensesTable from './Dashboard/RecentExpensesTable';

const mockRecentExpenses = [
  {
    id: '1',
    title: 'Conference Travel',
    date: '2025-04-01',
    amount: 1500.00,
    status: 'submitted',
    expenseTypes: ['travel'],
    description: 'Annual tech conference expenses'
  }
];

const RecentExpenses = () => {
  return <RecentExpensesTable recentExpenses={mockRecentExpenses} />;
};

export default RecentExpenses;
