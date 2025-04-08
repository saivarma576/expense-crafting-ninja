
import React, { useState, useEffect } from 'react';
import ExpenseStats from './ExpenseStats';
import ExpenseTrendsChart from './ExpenseTrendsChart';
import ExpenseCategoriesChart from './ExpenseCategoriesChart';
import RecentExpensesTable from './RecentExpensesTable';
import { expenseStats, recentExpenses, categoryData, monthlyExpenseData } from './mockData';
import { toast } from "sonner";

const Dashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2023);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success("Dashboard loaded successfully");
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleYearChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedYear(prev => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
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
