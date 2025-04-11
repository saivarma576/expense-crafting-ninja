
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ExpenseStatusChart from './ExpenseStatusChart';
import OverdueExpenses from './OverdueExpenses';

interface StatusChartItem {
  name: string;
  value: number;
  color: string;
}

interface PendingExpense {
  id: string;
  employee: string;
  expenseNumber: string;
  daysOutstanding: number;
  amount: number;
  status: string;
}

interface BottomStatusSectionProps {
  expenseStatusData: StatusChartItem[];
  pendingReviewExpenses: PendingExpense[];
}

const BottomStatusSection: React.FC<BottomStatusSectionProps> = ({
  expenseStatusData,
  pendingReviewExpenses
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Expense Status chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="glass-card rounded-xl p-6 shadow-lg border border-primary/5"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Expense Status</h2>
          <button className="flex items-center gap-1 px-3 py-1 border border-input rounded-md text-xs">
            Report <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <ExpenseStatusChart data={expenseStatusData} />
      </motion.div>

      {/* Overdue Expenses */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="glass-card rounded-xl p-6 shadow-lg border border-primary/5"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Pending Review Expenses</h2>
          <button className="flex items-center gap-1 text-xs text-orange-500">
            Review All <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <OverdueExpenses data={pendingReviewExpenses} />
      </motion.div>
    </div>
  );
};

export default BottomStatusSection;
