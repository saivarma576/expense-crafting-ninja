
import React from 'react';
import { motion } from 'framer-motion';
import StatCard from './Dashboard/StatCards/StatCard';
import ExpenseActionsCard from './Dashboard/StatCards/ExpenseActionsCard';

interface TopStatsCardsProps {
  totalExpense: {
    amount: number;
    count: number;
  };
  processedExpense: {
    amount: number;
    count: number;
  };
  postedExpense: {
    amount: number;
    count: number;
  };
  currency: string;
}

const TopStatsCards: React.FC<TopStatsCardsProps> = ({
  totalExpense,
  processedExpense,
  postedExpense,
  currency
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Expense"
          icon="dollar-sign"
          amount={totalExpense.amount}
          count={totalExpense.count}
          trend={10}
          currency={currency}
        />

        <StatCard 
          title="Expense Processed"
          icon="file-text"
          amount={processedExpense.amount}
          count={processedExpense.count}
          trend={10}
          currency={currency}
        />

        <StatCard 
          title="Expense Posted"
          icon="receipt"
          amount={postedExpense.amount}
          count={postedExpense.count}
          trend={10}
          currency={currency}
        />

        <ExpenseActionsCard 
          draftCount={12}
          draftTrend={3}
        />
      </div>
    </motion.div>
  );
};

export default TopStatsCards;
