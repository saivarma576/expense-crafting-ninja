
import React, { useState } from 'react';
import ExpenseStats from './ExpenseStats';
import ExpenseTrendsChart from './ExpenseTrendsChart';
import ExpenseCategoriesChart from './ExpenseCategoriesChart';
import RecentExpensesTable from './RecentExpensesTable';
import { expenseStats, recentExpenses, categoryData, monthlyExpenseData } from './mockData';

const Dashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2023);

  const handleYearChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedYear(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your expense overview.
        </p>
      </div>
      
      <ExpenseStats expenseStats={expenseStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseTrendsChart 
          monthlyExpenseData={monthlyExpenseData}
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
        />
        <ExpenseCategoriesChart 
          categoryData={categoryData}
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
        />
      </div>

      <RecentExpensesTable recentExpenses={recentExpenses} />
    </div>
  );
};

export default Dashboard;
