
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { CurrencyProvider, useCurrency } from './context/CurrencyContext';
import { DateRangeProvider, useDateRange } from './context/DateRangeContext';
import TopStatsCards from './TopStatsCards';
import WelcomeHeader from './WelcomeHeader';
import TrendsSection from './DashboardSections/TrendsSection';
import CategoryStatusSection from './DashboardSections/CategoryStatusSection';
import DashboardLoading from './DashboardLoading';
import { 
  recentExpensesData,
  statsData,
  expenseTrendsData,
  monthlyExpenseData,
  expenseCategoryList
} from './data/mockExpenseData';

// Inner component to use context hooks
const DashboardContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currency } = useCurrency();
  const { startDate, endDate, setStartDate, setEndDate } = useDateRange();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success("Dashboard loaded successfully");
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DashboardLoading />;
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

      {/* Expense Trends Section */}
      <TrendsSection 
        monthlyTrends={expenseTrendsData}
        monthlyExpenseData={monthlyExpenseData}
        expenseCategoryList={expenseCategoryList}
        stats={statsData}
      />

      {/* Recent Expenses and Expense Status Section */}
      <CategoryStatusSection recentExpenses={recentExpensesData} />
    </div>
  );
};

// Main component with context providers
const DashboardV2: React.FC = () => {
  return (
    <CurrencyProvider>
      <DateRangeProvider>
        <DashboardContent />
      </DateRangeProvider>
    </CurrencyProvider>
  );
};

export default DashboardV2;
