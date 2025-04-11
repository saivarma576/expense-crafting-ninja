
import React from 'react';
import { motion } from 'framer-motion';
import ExpenseTrendsSection from '../ExpenseTrendsSection';
import CategoryExpenseTrend from '../CategoryExpenseTrend';
import { CategoryExpense, MonthCategoryData } from '../CategoryExpenseTrend';

interface TrendsSectionProps {
  monthlyTrends: {
    month: string;
    expenses: number;
    amount: number;
  }[];
  monthlyExpenseData: MonthCategoryData[];
  expenseCategoryList: CategoryExpense[];
  stats: {
    title: string;
    value: string;
    subValue: string;
  }[];
}

const TrendsSection: React.FC<TrendsSectionProps> = ({
  monthlyTrends,
  monthlyExpenseData,
  expenseCategoryList,
  stats
}) => {
  return (
    <>
      {/* Expense Trends Section */}
      <ExpenseTrendsSection 
        monthlyTrends={monthlyTrends}
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
    </>
  );
};

export default TrendsSection;
