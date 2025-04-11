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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  // Create mock data for the CategoryExpenseTrend component
  const monthlyExpenseData = [
    { month: 'Apr 2024', totalAmount: 9150, 'Mileage': 2000, 'Dues Subscriptions': 1500, 'Auditing Serv Fees': 1200, 'Hotel/Lodging': 1000, 'Meals': 800, 'Others': 700, 'Professional Fees': 650, 'Gasoline': 300, 'Office Supplies': 200, 'Business Meals': 200, 'Postage & Freight': 150, 'Registration Fees': 150, 'Parking/Tolls': 100, 'Air/Taxi/Uber': 100, 'Baggage Fees': 50, 'Rental Car': 50 },
    { month: 'May 2024', totalAmount: 44440, 'Mileage': 5000, 'Dues Subscriptions': 4500, 'Auditing Serv Fees': 8000, 'Hotel/Lodging': 5000, 'Meals': 4000, 'Others': 3000, 'Professional Fees': 5500, 'Gasoline': 2000, 'Office Supplies': 1500, 'Business Meals': 1500, 'Postage & Freight': 1200, 'Registration Fees': 1200, 'Parking/Tolls': 800, 'Air/Taxi/Uber': 700, 'Baggage Fees': 290, 'Rental Car': 250 },
    { month: 'Jun 2024', totalAmount: 14870, 'Mileage': 2500, 'Dues Subscriptions': 2000, 'Auditing Serv Fees': 2000, 'Hotel/Lodging': 1500, 'Meals': 1200, 'Others': 1000, 'Professional Fees': 1200, 'Gasoline': 800, 'Office Supplies': 700, 'Business Meals': 500, 'Postage & Freight': 400, 'Registration Fees': 400, 'Parking/Tolls': 300, 'Air/Taxi/Uber': 200, 'Baggage Fees': 100, 'Rental Car': 70 },
    { month: 'Jul 2024', totalAmount: 26550, 'Mileage': 3500, 'Dues Subscriptions': 3000, 'Auditing Serv Fees': 3500, 'Hotel/Lodging': 3000, 'Meals': 2500, 'Others': 2000, 'Professional Fees': 2500, 'Gasoline': 1500, 'Office Supplies': 1200, 'Business Meals': 1000, 'Postage & Freight': 800, 'Registration Fees': 800, 'Parking/Tolls': 500, 'Air/Taxi/Uber': 400, 'Baggage Fees': 200, 'Rental Car': 150 },
    { month: 'Aug 2024', totalAmount: 34010, 'Mileage': 4000, 'Dues Subscriptions': 3500, 'Auditing Serv Fees': 5000, 'Hotel/Lodging': 4000, 'Meals': 3500, 'Others': 2500, 'Professional Fees': 3500, 'Gasoline': 1800, 'Office Supplies': 1500, 'Business Meals': 1200, 'Postage & Freight': 1000, 'Registration Fees': 1000, 'Parking/Tolls': 600, 'Air/Taxi/Uber': 500, 'Baggage Fees': 250, 'Rental Car': 160 },
    { month: 'Sep 2024', totalAmount: 17610, 'Mileage': 2700, 'Dues Subscriptions': 2200, 'Auditing Serv Fees': 2700, 'Hotel/Lodging': 2000, 'Meals': 1700, 'Others': 1400, 'Professional Fees': 1500, 'Gasoline': 900, 'Office Supplies': 750, 'Business Meals': 600, 'Postage & Freight': 500, 'Registration Fees': 500, 'Parking/Tolls': 350, 'Air/Taxi/Uber': 300, 'Baggage Fees': 150, 'Rental Car': 110 },
    { month: 'Oct 2024', totalAmount: 26470, 'Mileage': 3600, 'Dues Subscriptions': 3100, 'Auditing Serv Fees': 4000, 'Hotel/Lodging': 3100, 'Meals': 2600, 'Others': 2100, 'Professional Fees': 2400, 'Gasoline': 1400, 'Office Supplies': 1000, 'Business Meals': 900, 'Postage & Freight': 700, 'Registration Fees': 700, 'Parking/Tolls': 420, 'Air/Taxi/Uber': 350, 'Baggage Fees': 150, 'Rental Car': 150 },
    { month: 'Nov 2024', totalAmount: 36830, 'Mileage': 4800, 'Dues Subscriptions': 4300, 'Auditing Serv Fees': 6000, 'Hotel/Lodging': 4300, 'Meals': 3700, 'Others': 3000, 'Professional Fees': 3200, 'Gasoline': 1900, 'Office Supplies': 1600, 'Business Meals': 1300, 'Postage & Freight': 900, 'Registration Fees': 900, 'Parking/Tolls': 580, 'Air/Taxi/Uber': 500, 'Baggage Fees': 220, 'Rental Car': 130 },
    { month: 'Dec 2024', totalAmount: 15960, 'Mileage': 2400, 'Dues Subscriptions': 2100, 'Auditing Serv Fees': 2400, 'Hotel/Lodging': 2000, 'Meals': 1600, 'Others': 1300, 'Professional Fees': 1200, 'Gasoline': 800, 'Office Supplies': 600, 'Business Meals': 500, 'Postage & Freight': 400, 'Registration Fees': 400, 'Parking/Tolls': 250, 'Air/Taxi/Uber': 200, 'Baggage Fees': 110, 'Rental Car': 100 },
    { month: 'Jan 2025', totalAmount: 22710, 'Mileage': 3000, 'Dues Subscriptions': 2800, 'Auditing Serv Fees': 3500, 'Hotel/Lodging': 2800, 'Meals': 2200, 'Others': 1800, 'Professional Fees': 2000, 'Gasoline': 1200, 'Office Supplies': 900, 'Business Meals': 800, 'Postage & Freight': 600, 'Registration Fees': 600, 'Parking/Tolls': 350, 'Air/Taxi/Uber': 300, 'Baggage Fees': 160, 'Rental Car': 100 },
    { month: 'Feb 2025', totalAmount: 27250, 'Mileage': 3600, 'Dues Subscriptions': 3400, 'Auditing Serv Fees': 4200, 'Hotel/Lodging': 3400, 'Meals': 2700, 'Others': 2200, 'Professional Fees': 2400, 'Gasoline': 1400, 'Office Supplies': 1100, 'Business Meals': 1000, 'Postage & Freight': 700, 'Registration Fees': 700, 'Parking/Tolls': 450, 'Air/Taxi/Uber': 350, 'Baggage Fees': 200, 'Rental Car': 150 },
    { month: 'Mar 2025', totalAmount: 18850, 'Mileage': 2500, 'Dues Subscriptions': 2300, 'Auditing Serv Fees': 2900, 'Hotel/Lodging': 2300, 'Meals': 1800, 'Others': 1500, 'Professional Fees': 1600, 'Gasoline': 1000, 'Office Supplies': 700, 'Business Meals': 600, 'Postage & Freight': 500, 'Registration Fees': 500, 'Parking/Tolls': 300, 'Air/Taxi/Uber': 250, 'Baggage Fees': 100, 'Rental Car': 100 },
    { month: 'Apr 2025', totalAmount: 13500, 'Mileage': 1800, 'Dues Subscriptions': 1600, 'Auditing Serv Fees': 2100, 'Hotel/Lodging': 1600, 'Meals': 1300, 'Others': 1100, 'Professional Fees': 1100, 'Gasoline': 700, 'Office Supplies': 500, 'Business Meals': 450, 'Postage & Freight': 350, 'Registration Fees': 350, 'Parking/Tolls': 200, 'Air/Taxi/Uber': 150, 'Baggage Fees': 100, 'Rental Car': 100 },
  ];

  // Expense categories matching the image
  const expenseCategoryList = [
    { name: 'Mileage', color: '#A8C1E3' },
    { name: 'Dues Subscriptions', color: '#E5BAA0' },
    { name: 'Auditing Serv Fees', color: '#C0B8E0' },
    { name: 'Hotel/Lodging', color: '#EFBCC2' },
    { name: 'Meals', color: '#D0DCB8' },
    { name: 'Others', color: '#E0D590' },
    { name: 'Professional Fees', color: '#E0A075' },
    { name: 'Gasoline', color: '#D0CFE0' },
    { name: 'Office Supplies', color: '#A8E0C4' },
    { name: 'Business Meals', color: '#E0A8D0' },
    { name: 'Postage & Freight', color: '#B8CFCF' },
    { name: 'Registration Fees', color: '#E0BBA0' },
    { name: 'Parking/Tolls', color: '#B8C0E0' },
    { name: 'Air/Taxi/Uber', color: '#D5B8E0' },
    { name: 'Baggage Fees', color: '#A8D5E0' },
    { name: 'Rental Car', color: '#E0C998' }
  ];

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

      {/* Category Expense Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6"
      >
        <CategoryExpenseTrend 
          data={monthlyExpenseData} 
          categories={expenseCategoryList}
          title="Compare Category Wise Expense Trend"
          currency="$"
        />
      </motion.div>

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
