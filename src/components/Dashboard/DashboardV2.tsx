
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import CategoryExpenseTrend from './CategoryExpenseTrend';
import CategoryExpenseInsights from './CategoryExpenseInsights';
import { expenseCategories, monthlyExpenseTrendData, categoryInsights } from './categoryExpenseData';
import { categoryInsightsData } from './categoryInsightsData';
import { dashboardData } from './dashboardV2Data';
import RecentExpensesTable from './RecentExpensesTable';
import TopStatsCards from './TopStatsCards';
import CategoryInsights from './CategoryInsights';
import ExpenseTrendsSection from './ExpenseTrendsSection';
import BottomStatusSection from './BottomStatusSection';

const DashboardV2: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState('USD');

  // Sample data for Recent Expenses Table
  const recentExpenses = [
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

  // Updated expense types with correct property names for the interface
  const expenseTypesFormatted = dashboardData.expenseTypes.map(type => ({
    id: type.id,
    label: type.label,
    value: type.value,
    color: type.color
  }));

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success("Dashboard loaded successfully");
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

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
    <div className="space-y-6 animate-fade-in">
      {/* Top Stats Cards Section */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl shadow-sm mb-6">
        <TopStatsCards 
          totalExpense={{
            amount: 115484,
            count: 245
          }}
          processedExpense={{
            amount: 78450,
            count: 168
          }}
          postedExpense={{
            amount: 52340,
            count: 98
          }}
          currency={currency}
        />
      </div>

      {/* Middle Section - Charts */}
      <ExpenseTrendsSection 
        monthlyTrends={dashboardData.monthlyTrends}
        expenseTypes={expenseTypesFormatted}
        stats={dashboardData.stats}
      />

      {/* Recent Expenses Table Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <RecentExpensesTable recentExpenses={recentExpenses} />
      </motion.div>

      {/* Bottom Row - Status and Overdue */}
      <BottomStatusSection 
        expenseStatusData={dashboardData.expenseStatusData}
        pendingReviewExpenses={dashboardData.pendingReviewExpenses}
      />

      {/* Category Expense Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <CategoryExpenseTrend 
          data={monthlyExpenseTrendData} 
          categories={expenseCategories}
          title="Compare Category Wise Expense Trend"
          currency={currency}
        />
      </motion.div>
      
      {/* Category Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <CategoryInsights 
          highestCategory={categoryInsights.highestCategory}
          highestAmount={categoryInsights.highestAmount}
          lowestCategory={categoryInsights.lowestCategory}
          lowestAmount={categoryInsights.lowestAmount}
          currency={currency}
        />
      </motion.div>
      
      {/* Category Expense Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <CategoryExpenseInsights 
          topCategories={categoryInsightsData.topCategories}
          fastestGrowing={categoryInsightsData.fastestGrowing}
          currency={currency}
        />
      </motion.div>
    </div>
  );
};

export default DashboardV2;
