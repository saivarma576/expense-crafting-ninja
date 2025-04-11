
import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  FileText,
  Users,
  Wallet,
  Clock,
  Receipt,
  ArrowDownRight
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import StatCard from '../ui/StatCard';

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
  // Sample trend percentages
  const receivedTrend = 16.24;
  const processedTrend = -3.57;
  const postedTrend = 29.08;
  const balanceTrend = -3.6;

  // Create stats for the StatCard components
  const expenseStats = [
    { 
      title: 'TOTAL EARNINGS', 
      value: `$${(totalExpense.amount / 1000).toFixed(2)}K`, 
      description: 'View net earnings',
      descriptionLink: '#',
      icon: <DollarSign className="h-5 w-5" />,
      trend: receivedTrend 
    },
    { 
      title: 'ORDERS', 
      value: processedExpense.count.toLocaleString(), 
      description: 'View all orders',
      descriptionLink: '#',
      icon: <FileText className="h-5 w-5" />, 
      trend: processedTrend 
    },
    { 
      title: 'CUSTOMERS', 
      value: `${(postedExpense.count * 1.5).toFixed(2)}M`, 
      description: 'See details',
      descriptionLink: '#',
      icon: <Users className="h-5 w-5" />, 
      trend: postedTrend 
    },
    { 
      title: 'MY BALANCE', 
      value: `$${(totalExpense.amount * 0.3 / 1000).toFixed(2)}K`, 
      description: 'Withdraw money',
      descriptionLink: '#',
      icon: <Wallet className="h-5 w-5" />, 
      trend: 0.00 
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {expenseStats.map((stat, index) => (
          <motion.div
            key={`stat-${index}`}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="glass-card p-6 rounded-xl flex flex-col space-y-2 border-b-4 border-primary/10 shadow-lg"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
                {stat.icon}
              </div>
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-semibold">{stat.value}</div>
                {stat.description && (
                  <a href={stat.descriptionLink} className="text-sm text-blue-500 hover:underline">
                    {stat.description}
                  </a>
                )}
              </div>
              
              {typeof stat.trend !== 'undefined' && stat.trend !== 0 && (
                <div className={cn(
                  "text-sm font-medium flex items-center p-1.5 rounded-full",
                  stat.trend > 0 ? "bg-green-50 text-green-600" : 
                  stat.trend < 0 ? "bg-red-50 text-red-600" : 
                  "bg-gray-50 text-muted-foreground"
                )}>
                  {stat.trend > 0 ? '+' : ''}{stat.trend}%
                </div>
              )}
              
              {stat.trend === 0 && (
                <div className="text-sm font-medium text-gray-500">
                  +{stat.trend.toFixed(2)}%
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopStatsCards;
