
import React from 'react';
import StatCard from '../ui/StatCard';
import { DollarSign, Clock, Receipt, ArrowDownRight } from 'lucide-react';

interface ExpenseStatsProps {
  expenseStats: Array<{
    title: string;
    value: string;
    description?: string;
    icon?: string;
    trend?: number;
  }>;
}

const ExpenseStats: React.FC<ExpenseStatsProps> = ({ expenseStats }) => {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'dollar':
        return <DollarSign className="h-5 w-5" />;
      case 'clock':
        return <Clock className="h-5 w-5" />;
      case 'receipt':
        return <Receipt className="h-5 w-5" />;
      case 'arrow-down-right':
        return <ArrowDownRight className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {expenseStats.map((stat, index) => (
        <StatCard
          key={`stat-${index}`}
          title={stat.title}
          value={stat.value}
          description={stat.title === 'Total Expenses' && stat.trend ? 
            `${stat.trend > 0 ? '+' : ''}${stat.trend}% from last month` : 
            stat.description}
          icon={getIcon(stat.icon)}
          trend={stat.trend}
        />
      ))}
    </div>
  );
};

export default ExpenseStats;
