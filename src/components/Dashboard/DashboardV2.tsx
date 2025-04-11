
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
import BottomStatusSection from './BottomStatusSection';
import WelcomeHeader from './WelcomeHeader';
import ExpenseTrendsChartV2 from './ExpenseTrendsChartV2';
import { expenseStats, categoryData, categoryGroups, monthlyExpenseData } from './mockData';

const DashboardV2: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [selectedYear, setSelectedYear] = useState(2023);

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

  // Create stats for ExpenseTrendsSection
  const stats = [
    { title: 'Total Expenses', value: '$12,450.65', subValue: '+8.2% from last month' },
    { title: 'Pending Approval', value: '$2,340.00', subValue: '4 expenses' },
    { title: 'Receipts to Process', value: '12', subValue: 'Last updated 2h ago' },
    { title: 'Reimbursed', value: '$9,120.45', subValue: '-3.6% from last month' }
  ];

  const handleYearChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedYear(prev => prev + 1);
    }
  };

  // Mock expense trends data that matches the image
  const expenseTrendsData = [
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

  // Data for the donut chart that matches categories in the image
  const expenseCategoriesData = [
    { name: 'Travel', value: 19800, color: '#10B981' },
    { name: 'Food', value: 8000, color: '#14B8A6' },
    { name: 'Transportation', value: 9100, color: '#6366F1' },
    { name: 'Office', value: 4600, color: '#3B82F6' },
    { name: 'Professional Services', value: 17900, color: '#8B5CF6' },
    { name: 'Other', value: 2100, color: '#6B7280' }
  ];

  // Calculate total for display in the donut chart
  const totalExpenseAmount = expenseCategoriesData.reduce((sum, item) => sum + item.value, 0);

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
      {/* Welcome Header with Date Range Picker */}
      <WelcomeHeader 
        userName="Anna"
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      {/* Top Stats Cards Section */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
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

      {/* Middle Section - Charts (styled to match the image) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Trends Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold">Expense Trends</h2>
              <p className="text-sm text-muted-foreground">Monthly expense activity</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <span className="text-sm font-medium">{selectedYear}</span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
          <div className="h-[300px]">
            <ExpenseTrendsChartV2 data={expenseTrendsData} />
          </div>
        </div>
        
        {/* Expense Categories Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold">Expense Categories</h2>
              <p className="text-sm text-muted-foreground">Monthly expense breakdown</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <span className="text-sm font-medium">{selectedYear}</span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-[180px] h-[180px]">
              <div className="flex items-center justify-center absolute inset-0">
                <div className="text-center">
                  <div className="text-3xl font-bold">${(totalExpenseAmount / 1000).toFixed(0)},400</div>
                  <div className="text-sm text-muted-foreground">
                    This month total<br />expense
                  </div>
                </div>
              </div>
              {/* This would be a donut chart in actual implementation */}
              <svg width="180" height="180" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="70" fill="none" stroke="#10B981" strokeWidth="20" strokeDasharray="440" strokeDashoffset="120" />
                <circle cx="90" cy="90" r="70" fill="none" stroke="#14B8A6" strokeWidth="20" strokeDasharray="440" strokeDashoffset="340" transform="rotate(72 90 90)" />
                <circle cx="90" cy="90" r="70" fill="none" stroke="#6366F1" strokeWidth="20" strokeDasharray="440" strokeDashoffset="360" transform="rotate(108 90 90)" />
                <circle cx="90" cy="90" r="70" fill="none" stroke="#3B82F6" strokeWidth="20" strokeDasharray="440" strokeDashoffset="385" transform="rotate(180 90 90)" />
                <circle cx="90" cy="90" r="70" fill="none" stroke="#8B5CF6" strokeWidth="20" strokeDasharray="440" strokeDashoffset="340" transform="rotate(216 90 90)" />
                <circle cx="90" cy="90" r="70" fill="none" stroke="#6B7280" strokeWidth="20" strokeDasharray="440" strokeDashoffset="420" transform="rotate(310 90 90)" />
                <circle cx="90" cy="90" r="54" fill="white" />
              </svg>
            </div>
            
            {/* Category Legend */}
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              {expenseCategoriesData.map((category, index) => (
                <div 
                  key={index}
                  className="flex items-center px-3 py-1.5 rounded-full"
                  style={{ 
                    backgroundColor: `${category.color}15`,
                    border: `1px solid ${category.color}30`
                  }}
                >
                  <div 
                    className="w-2.5 h-2.5 rounded-full mr-2" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
