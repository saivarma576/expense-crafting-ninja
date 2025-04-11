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

  // Updated monthly expense data to match the image exactly
  const monthlyExpenseData = [
    { month: 'Apr 2024', totalAmount: 9150, 'Relocation Reimbursement': 100, 'Standard Category': 200, 'Expense - Other': 1800, 'Travel - Intercity-Personal Vehicle': 500, 'Travel - International': 400, 'Per-Diem - Domestic': 300, 'Per-Diem - International': 150, 'Expense - Internet': 400, 'Expense - Mobile': 300, 'Expense-Medical': 250, 'Travel-Intercity-Cab/Bus/Auto': 500, 'Travel-Intercity-Cab/Bus/Flight': 650, 'Health and Wellness': 200, 'Lodging & Accommodation': 900, 'Meals & Entertainment': 700, 'Miscellaneous Business Expenses': 400, 'Office Supplies & Equipment': 300, 'Professional Development': 350, 'Cash': 150, 'Remote Work Setup': 100, 'IT & Software': 250, 'Travel & Transportation': 200, 'Travel (Personal Vehicle)': 50 },
    { month: 'May 2024', totalAmount: 44440, 'Relocation Reimbursement': 600, 'Standard Category': 800, 'Expense - Other': 10000, 'Travel - Intercity-Personal Vehicle': 2500, 'Travel - International': 8000, 'Per-Diem - Domestic': 1200, 'Per-Diem - International': 2000, 'Expense - Internet': 900, 'Expense - Mobile': 800, 'Expense-Medical': 700, 'Travel-Intercity-Cab/Bus/Auto': 1200, 'Travel-Intercity-Cab/Bus/Flight': 3000, 'Health and Wellness': 500, 'Lodging & Accommodation': 3500, 'Meals & Entertainment': 2500, 'Miscellaneous Business Expenses': 1400, 'Office Supplies & Equipment': 1200, 'Professional Development': 1000, 'Cash': 700, 'Remote Work Setup': 600, 'IT & Software': 800, 'Travel & Transportation': 900, 'Travel (Personal Vehicle)': 640 },
    { month: 'Jun 2024', totalAmount: 14870, 'Relocation Reimbursement': 200, 'Standard Category': 300, 'Expense - Other': 2500, 'Travel - Intercity-Personal Vehicle': 1200, 'Travel - International': 1500, 'Per-Diem - Domestic': 450, 'Per-Diem - International': 600, 'Expense - Internet': 500, 'Expense - Mobile': 400, 'Expense-Medical': 350, 'Travel-Intercity-Cab/Bus/Auto': 700, 'Travel-Intercity-Cab/Bus/Flight': 900, 'Health and Wellness': 300, 'Lodging & Accommodation': 1100, 'Meals & Entertainment': 900, 'Miscellaneous Business Expenses': 600, 'Office Supplies & Equipment': 500, 'Professional Development': 400, 'Cash': 300, 'Remote Work Setup': 250, 'IT & Software': 370, 'Travel & Transportation': 400, 'Travel (Personal Vehicle)': 150 },
    { month: 'Jul 2024', totalAmount: 26550, 'Relocation Reimbursement': 400, 'Standard Category': 500, 'Expense - Other': 5500, 'Travel - Intercity-Personal Vehicle': 1800, 'Travel - International': 3000, 'Per-Diem - Domestic': 700, 'Per-Diem - International': 1000, 'Expense - Internet': 700, 'Expense - Mobile': 600, 'Expense-Medical': 550, 'Travel-Intercity-Cab/Bus/Auto': 1000, 'Travel-Intercity-Cab/Bus/Flight': 1500, 'Health and Wellness': 400, 'Lodging & Accommodation': 2000, 'Meals & Entertainment': 1600, 'Miscellaneous Business Expenses': 900, 'Office Supplies & Equipment': 800, 'Professional Development': 700, 'Cash': 500, 'Remote Work Setup': 450, 'IT & Software': 600, 'Travel & Transportation': 650, 'Travel (Personal Vehicle)': 300 },
    { month: 'Aug 2024', totalAmount: 34010, 'Relocation Reimbursement': 500, 'Standard Category': 700, 'Expense - Other': 7000, 'Travel - Intercity-Personal Vehicle': 2300, 'Travel - International': 5000, 'Per-Diem - Domestic': 900, 'Per-Diem - International': 1300, 'Expense - Internet': 800, 'Expense - Mobile': 700, 'Expense-Medical': 650, 'Travel-Intercity-Cab/Bus/Auto': 1200, 'Travel-Intercity-Cab/Bus/Flight': 2000, 'Health and Wellness': 450, 'Lodging & Accommodation': 2500, 'Meals & Entertainment': 2000, 'Miscellaneous Business Expenses': 1100, 'Office Supplies & Equipment': 1000, 'Professional Development': 900, 'Cash': 600, 'Remote Work Setup': 550, 'IT & Software': 710, 'Travel & Transportation': 750, 'Travel (Personal Vehicle)': 400 },
    { month: 'Sep 2024', totalAmount: 17610, 'Relocation Reimbursement': 250, 'Standard Category': 350, 'Expense - Other': 3500, 'Travel - Intercity-Personal Vehicle': 1500, 'Travel - International': 2000, 'Per-Diem - Domestic': 550, 'Per-Diem - International': 750, 'Expense - Internet': 600, 'Expense - Mobile': 500, 'Expense-Medical': 450, 'Travel-Intercity-Cab/Bus/Auto': 800, 'Travel-Intercity-Cab/Bus/Flight': 1100, 'Health and Wellness': 350, 'Lodging & Accommodation': 1300, 'Meals & Entertainment': 1100, 'Miscellaneous Business Expenses': 700, 'Office Supplies & Equipment': 600, 'Professional Development': 500, 'Cash': 350, 'Remote Work Setup': 300, 'IT & Software': 410, 'Travel & Transportation': 450, 'Travel (Personal Vehicle)': 200 },
    { month: 'Oct 2024', totalAmount: 26470, 'Relocation Reimbursement': 400, 'Standard Category': 600, 'Expense - Other': 5500, 'Travel - Intercity-Personal Vehicle': 1900, 'Travel - International': 3500, 'Per-Diem - Domestic': 750, 'Per-Diem - International': 1100, 'Expense - Internet': 700, 'Expense - Mobile': 600, 'Expense-Medical': 550, 'Travel-Intercity-Cab/Bus/Auto': 1000, 'Travel-Intercity-Cab/Bus/Flight': 1600, 'Health and Wellness': 400, 'Lodging & Accommodation': 2100, 'Meals & Entertainment': 1700, 'Miscellaneous Business Expenses': 950, 'Office Supplies & Equipment': 850, 'Professional Development': 750, 'Cash': 500, 'Remote Work Setup': 450, 'IT & Software': 620, 'Travel & Transportation': 650, 'Travel (Personal Vehicle)': 300 },
    { month: 'Nov 2024', totalAmount: 36830, 'Relocation Reimbursement': 550, 'Standard Category': 750, 'Expense - Other': 7500, 'Travel - Intercity-Personal Vehicle': 2500, 'Travel - International': 6000, 'Per-Diem - Domestic': 950, 'Per-Diem - International': 1500, 'Expense - Internet': 850, 'Expense - Mobile': 750, 'Expense-Medical': 700, 'Travel-Intercity-Cab/Bus/Auto': 1300, 'Travel-Intercity-Cab/Bus/Flight': 2200, 'Health and Wellness': 480, 'Lodging & Accommodation': 2700, 'Meals & Entertainment': 2200, 'Miscellaneous Business Expenses': 1200, 'Office Supplies & Equipment': 1100, 'Professional Development': 950, 'Cash': 650, 'Remote Work Setup': 600, 'IT & Software': 780, 'Travel & Transportation': 820, 'Travel (Personal Vehicle)': 450 },
    { month: 'Dec 2024', totalAmount: 15960, 'Relocation Reimbursement': 220, 'Standard Category': 320, 'Expense - Other': 3200, 'Travel - Intercity-Personal Vehicle': 1400, 'Travel - International': 1800, 'Per-Diem - Domestic': 500, 'Per-Diem - International': 700, 'Expense - Internet': 550, 'Expense - Mobile': 450, 'Expense-Medical': 400, 'Travel-Intercity-Cab/Bus/Auto': 750, 'Travel-Intercity-Cab/Bus/Flight': 1000, 'Health and Wellness': 320, 'Lodging & Accommodation': 1200, 'Meals & Entertainment': 1000, 'Miscellaneous Business Expenses': 650, 'Office Supplies & Equipment': 550, 'Professional Development': 450, 'Cash': 320, 'Remote Work Setup': 280, 'IT & Software': 380, 'Travel & Transportation': 420, 'Travel (Personal Vehicle)': 180 },
    { month: 'Jan 2025', totalAmount: 22710, 'Relocation Reimbursement': 350, 'Standard Category': 500, 'Expense - Other': 4500, 'Travel - Intercity-Personal Vehicle': 1700, 'Travel - International': 3000, 'Per-Diem - Domestic': 650, 'Per-Diem - International': 950, 'Expense - Internet': 650, 'Expense - Mobile': 550, 'Expense-Medical': 500, 'Travel-Intercity-Cab/Bus/Auto': 900, 'Travel-Intercity-Cab/Bus/Flight': 1400, 'Health and Wellness': 370, 'Lodging & Accommodation': 1800, 'Meals & Entertainment': 1500, 'Miscellaneous Business Expenses': 850, 'Office Supplies & Equipment': 750, 'Professional Development': 650, 'Cash': 450, 'Remote Work Setup': 400, 'IT & Software': 540, 'Travel & Transportation': 580, 'Travel (Personal Vehicle)': 270 },
    { month: 'Feb 2025', totalAmount: 27250, 'Relocation Reimbursement': 420, 'Standard Category': 600, 'Expense - Other': 5400, 'Travel - Intercity-Personal Vehicle': 2000, 'Travel - International': 4000, 'Per-Diem - Domestic': 750, 'Per-Diem - International': 1200, 'Expense - Internet': 750, 'Expense - Mobile': 650, 'Expense-Medical': 600, 'Travel-Intercity-Cab/Bus/Auto': 1100, 'Travel-Intercity-Cab/Bus/Flight': 1800, 'Health and Wellness': 430, 'Lodging & Accommodation': 2200, 'Meals & Entertainment': 1800, 'Miscellaneous Business Expenses': 1000, 'Office Supplies & Equipment': 900, 'Professional Development': 800, 'Cash': 550, 'Remote Work Setup': 500, 'IT & Software': 650, 'Travel & Transportation': 700, 'Travel (Personal Vehicle)': 350 },
    { month: 'Mar 2025', totalAmount: 18850, 'Relocation Reimbursement': 280, 'Standard Category': 400, 'Expense - Other': 3800, 'Travel - Intercity-Personal Vehicle': 1600, 'Travel - International': 2400, 'Per-Diem - Domestic': 600, 'Per-Diem - International': 850, 'Expense - Internet': 600, 'Expense - Mobile': 500, 'Expense-Medical': 450, 'Travel-Intercity-Cab/Bus/Auto': 850, 'Travel-Intercity-Cab/Bus/Flight': 1200, 'Health and Wellness': 350, 'Lodging & Accommodation': 1500, 'Meals & Entertainment': 1200, 'Miscellaneous Business Expenses': 750, 'Office Supplies & Equipment': 650, 'Professional Development': 550, 'Cash': 380, 'Remote Work Setup': 330, 'IT & Software': 450, 'Travel & Transportation': 500, 'Travel (Personal Vehicle)': 260 },
    { month: 'Apr 2025', totalAmount: 13500, 'Relocation Reimbursement': 200, 'Standard Category': 300, 'Expense - Other': 2700, 'Travel - Intercity-Personal Vehicle': 1200, 'Travel - International': 1600, 'Per-Diem - Domestic': 400, 'Per-Diem - International': 600, 'Expense - Internet': 450, 'Expense - Mobile': 380, 'Expense-Medical': 330, 'Travel-Intercity-Cab/Bus/Auto': 600, 'Travel-Intercity-Cab/Bus/Flight': 800, 'Health and Wellness': 250, 'Lodging & Accommodation': 1100, 'Meals & Entertainment': 900, 'Miscellaneous Business Expenses': 550, 'Office Supplies & Equipment': 480, 'Professional Development': 400, 'Cash': 280, 'Remote Work Setup': 250, 'IT & Software': 330, 'Travel & Transportation': 380, 'Travel (Personal Vehicle)': 220 },
  ];

  // Updated expense categories matching the image
  const expenseCategoryList = [
    { name: 'Relocation Reimbursement', color: '#4F46E5' },
    { name: 'Standard Category', color: '#10B981' },
    { name: 'Expense - Other', color: '#F43F5E' },
    { name: 'Travel - Intercity-Personal Vehicle', color: '#F59E0B' },
    { name: 'Travel - International', color: '#8B5CF6' },
    { name: 'Per-Diem - Domestic', color: '#06B6D4' },
    { name: 'Per-Diem - International', color: '#3B82F6' },
    { name: 'Expense - Internet', color: '#EC4899' },
    { name: 'Expense - Mobile', color: '#84CC16' },
    { name: 'Expense-Medical', color: '#EF4444' },
    { name: 'Travel-Intercity-Cab/Bus/Auto', color: '#F97316' },
    { name: 'Travel-Intercity-Cab/Bus/Flight', color: '#8B5CF6' },
    { name: 'Health and Wellness', color: '#14B8A6' },
    { name: 'Lodging & Accommodation', color: '#6366F1' },
    { name: 'Meals & Entertainment', color: '#D946EF' },
    { name: 'Miscellaneous Business Expenses', color: '#0EA5E9' },
    { name: 'Office Supplies & Equipment', color: '#22C55E' },
    { name: 'Professional Development', color: '#A855F7' },
    { name: 'Cash', color: '#F59E0B' },
    { name: 'Remote Work Setup', color: '#64748B' },
    { name: 'IT & Software', color: '#EC4899' },
    { name: 'Travel & Transportation', color: '#0284C7' },
    { name: 'Travel (Personal Vehicle)', color: '#9333EA' }
  ];

  useEffect(() => {
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
          currency="₹"
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
                  <div className="text-3xl font-bold">₹{(totalExpenseAmount / 1000).toFixed(0)},400</div>
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

      {/* Category Expense Trend Chart - Updated to match the image */}
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
          currency="₹"
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
