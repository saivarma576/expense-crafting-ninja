
import React from 'react';
import StatCard from '../ui/StatCard';

interface ExpenseStatsProps {
  expenseStats: Array<{
    title: string;
    value: string;
    description?: string;
    icon?: React.ReactNode;
    trend?: number;
  }>;
}

const ExpenseStats: React.FC<ExpenseStatsProps> = ({ expenseStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {expenseStats.map((stat, index) => (
        <StatCard
          key={`stat-${index}`}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          trend={stat.trend}
        />
      ))}
    </div>
  );
};

export default ExpenseStats;
