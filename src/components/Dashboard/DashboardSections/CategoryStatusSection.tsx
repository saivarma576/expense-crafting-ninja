
import React from 'react';
import { motion } from 'framer-motion';
import ExpenseStatusChart from '../ExpenseStatusChart';
import RecentExpensesTable from '../RecentExpensesTable';
import { dashboardData } from '../dashboardV2Data';

interface CategoryStatusSectionProps {
  recentExpenses: {
    id: string;
    title: string;
    date: string;
    amount: number;
    status: string;
    expenseTypes: string[];
    description: string;
  }[];
}

const CategoryStatusSection: React.FC<CategoryStatusSectionProps> = ({ 
  recentExpenses
}) => {
  return (
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
  );
};

export default CategoryStatusSection;
