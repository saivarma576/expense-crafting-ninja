
import React from 'react';
import StatCard from './StatCard';

interface DashboardStatCardProps {
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

const DashboardStatCard: React.FC<DashboardStatCardProps> = ({
  totalExpense,
  processedExpense,
  postedExpense,
  currency
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <StatCard
        title="Total expenses"
        icon="dollar-sign"
        amount={totalExpense.amount}
        count={totalExpense.count}
        trend={8.4}
        currency={currency}
        className="bg-gradient-to-br from-blue-50 to-indigo-50"
      />
      <StatCard
        title="Processed expenses"
        icon="file-text"
        amount={processedExpense.amount}
        count={processedExpense.count}
        trend={5.2}
        currency={currency}
        className="bg-gradient-to-br from-green-50 to-emerald-50"
      />
      <StatCard
        title="Posted expenses"
        icon="receipt"
        amount={postedExpense.amount}
        count={postedExpense.count}
        trend={-2.1}
        currency={currency}
        className="bg-gradient-to-br from-purple-50 to-pink-50"
      />
    </div>
  );
};

export default DashboardStatCard;
