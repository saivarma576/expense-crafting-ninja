
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import CategoryExpenseTrend from './CategoryExpenseTrend';
import { expenseCategories, monthlyExpenseTrendData } from './categoryExpenseData';
import { dashboardData } from './dashboardV2Data';
import RecentExpensesTable from './RecentExpensesTable';
import TopStatsCards from './TopStatsCards';
import WelcomeHeader from './WelcomeHeader';
import ExpenseTrendsChartV2 from './ExpenseTrendsChartV2';
import { categoryData, categoryGroups, monthlyExpenseData } from './mockData';
import ExpenseTrendsSection from './ExpenseTrendsSection';
import ExpenseCategoriesChart from './ExpenseCategoriesChart';
import ExpenseStatusChart from './ExpenseStatusChart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DashboardV2: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState('$');
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

  // Updated monthly expense data for the CategoryExpenseTrend component
  const monthlyExpenseData = [
    { month: 'Apr 2024', totalAmount: 9150, 'Mileage': 500, 'Dues Subscriptions': 300, 'Auditing Serv Fees': 400, 'Hotel/Lodging': 900, 'Meals': 700, 'Others': 400, 'Professional Fees': 350, 'Gasoline': 300, 'Office Supplies': 300, 'Business Meals': 700, 'Postage & Freight': 150, 'Registration Fees': 350, 'Parking/Tolls': 200, 'Air/Taxi/Uber': 650, 'Baggage Fees': 100, 'Rental Car': 550 },
    { month: 'May 2024', totalAmount: 44440, 'Mileage': 2500, 'Dues Subscriptions': 1200, 'Auditing Serv Fees': 8000, 'Hotel/Lodging': 3500, 'Meals': 2500, 'Others': 1400, 'Professional Fees': 1000, 'Gasoline': 800, 'Office Supplies': 1200, 'Business Meals': 2500, 'Postage & Freight': 700, 'Registration Fees': 1000, 'Parking/Tolls': 900, 'Air/Taxi/Uber': 3000, 'Baggage Fees': 600, 'Rental Car': 2500 },
    { month: 'Jun 2024', totalAmount: 14870, 'Mileage': 1200, 'Dues Subscriptions': 450, 'Auditing Serv Fees': 1500, 'Hotel/Lodging': 1100, 'Meals': 900, 'Others': 600, 'Professional Fees': 400, 'Gasoline': 400, 'Office Supplies': 500, 'Business Meals': 900, 'Postage & Freight': 300, 'Registration Fees': 400, 'Parking/Tolls': 400, 'Air/Taxi/Uber': 900, 'Baggage Fees': 250, 'Rental Car': 700 },
    { month: 'Jul 2024', totalAmount: 26550, 'Mileage': 1800, 'Dues Subscriptions': 700, 'Auditing Serv Fees': 3000, 'Hotel/Lodging': 2000, 'Meals': 1600, 'Others': 900, 'Professional Fees': 700, 'Gasoline': 600, 'Office Supplies': 800, 'Business Meals': 1600, 'Postage & Freight': 500, 'Registration Fees': 700, 'Parking/Tolls': 650, 'Air/Taxi/Uber': 1500, 'Baggage Fees': 450, 'Rental Car': 1000 },
    { month: 'Aug 2024', totalAmount: 34010, 'Mileage': 2300, 'Dues Subscriptions': 900, 'Auditing Serv Fees': 5000, 'Hotel/Lodging': 2500, 'Meals': 2000, 'Others': 1100, 'Professional Fees': 900, 'Gasoline': 700, 'Office Supplies': 1000, 'Business Meals': 2000, 'Postage & Freight': 600, 'Registration Fees': 900, 'Parking/Tolls': 750, 'Air/Taxi/Uber': 2000, 'Baggage Fees': 550, 'Rental Car': 1200 },
    { month: 'Sep 2024', totalAmount: 17610, 'Mileage': 1500, 'Dues Subscriptions': 550, 'Auditing Serv Fees': 2000, 'Hotel/Lodging': 1300, 'Meals': 1100, 'Others': 700, 'Professional Fees': 500, 'Gasoline': 500, 'Office Supplies': 600, 'Business Meals': 1100, 'Postage & Freight': 350, 'Registration Fees': 500, 'Parking/Tolls': 450, 'Air/Taxi/Uber': 1100, 'Baggage Fees': 300, 'Rental Car': 800 }
  ];

  // Updated expense categories using only the specific list requested
  const expenseCategoryList = [
    { name: 'Mileage', color: '#4F46E5' },
    { name: 'Dues Subscriptions', color: '#10B981' },
    { name: 'Auditing Serv Fees', color: '#F43F5E' },
    { name: 'Hotel/Lodging', color: '#F59E0B' },
    { name: 'Meals', color: '#8B5CF6' },
    { name: 'Others', color: '#6B7280' },
    { name: 'Professional Fees', color: '#3B82F6' },
    { name: 'Gasoline', color: '#EC4899' },
    { name: 'Office Supplies', color: '#14B8A6' },
    { name: 'Business Meals', color: '#EF4444' },
    { name: 'Postage & Freight', color: '#F97316' },
    { name: 'Registration Fees', color: '#8B5CF6' },
    { name: 'Parking/Tolls', color: '#64748B' },
    { name: 'Air/Taxi/Uber', color: '#0EA5E9' },
    { name: 'Baggage Fees', color: '#22C55E' },
    { name: 'Rental Car', color: '#A855F7' }
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
          currency="$"
        />
      </div>

      {/* Expense Trends Section */}
      <ExpenseTrendsSection 
        monthlyTrends={expenseTrendsData}
        expenseTypes={[
          { id: '1', label: 'Travel', value: 35, color: '#10B981' },
          { id: '2', label: 'Food', value: 25, color: '#14B8A6' },
          { id: '3', label: 'Office', value: 15, color: '#3B82F6' },
          { id: '4', label: 'Services', value: 25, color: '#8B5CF6' }
        ]}
        stats={stats}
      />

      {/* Category Expense Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <CategoryExpenseTrend 
          data={monthlyExpenseData}
          categories={expenseCategoryList}
          title="Compare Category Wise Expense Trend"
          currency="$"
        />
      </motion.div>

      {/* Reorganized section - Recent Expenses next to Expense Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Expenses Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card rounded-xl shadow-lg border border-primary/5"
        >
          <div className="p-6">
            <RecentExpensesTable recentExpenses={recentExpenses} />
          </div>
        </motion.div>

        {/* Expense Status Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="glass-card rounded-xl p-6 shadow-lg border border-primary/5"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Expense Status</h2>
          </div>
          <ExpenseStatusChart data={dashboardData.expenseStatusData} />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardV2;
