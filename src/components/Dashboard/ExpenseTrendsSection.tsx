
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import ExpenseTrendsChartV2 from './ExpenseTrendsChartV2';
import ExpenseTypeBreakdown from './ExpenseTypeBreakdown';
import { Button } from "@/components/ui/button";

interface ExpenseTrendData {
  month: string;
  expenses: number;
  amount: number;
}

interface ExpenseTypeItem {
  id: string;
  label: string; 
  value: number;
  color: string;
}

interface ExpenseStatItem {
  title: string;
  value: string;
  subValue?: string;
}

interface ExpenseTrendsSectionProps {
  monthlyTrends: Array<{
    month: string;
    expenses: number;
    amount: number;
  }>;
  expenseTypes: Array<{
    id: string;
    label: string;
    value: number;
    color: string;
  }>;
  stats: Array<{
    title: string;
    value: string;
    subValue?: string;
  }>;
}

const ExpenseTrendsSection: React.FC<ExpenseTrendsSectionProps> = ({
  monthlyTrends,
  expenseTypes,
  stats
}) => {
  const [period, setPeriod] = useState<'all' | '1m' | '6m' | '1y'>('1y');

  const handlePeriodChange = (newPeriod: 'all' | '1m' | '6m' | '1y') => {
    setPeriod(newPeriod);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Expense Trends Chart Card */}
      <Card className="shadow-md overflow-hidden">
        <CardHeader className="pb-0 flex flex-col space-y-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-gray-800">Expense Trends</CardTitle>
            <div className="flex space-x-2">
              <Button 
                variant={period === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handlePeriodChange('all')}
                className="text-xs px-3 py-1 h-8"
              >
                ALL
              </Button>
              <Button 
                variant={period === '1m' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handlePeriodChange('1m')}
                className="text-xs px-3 py-1 h-8"
              >
                1M
              </Button>
              <Button 
                variant={period === '6m' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handlePeriodChange('6m')}
                className="text-xs px-3 py-1 h-8"
              >
                6M
              </Button>
              <Button 
                variant={period === '1y' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handlePeriodChange('1y')}
                className="text-xs px-3 py-1 h-8"
              >
                1Y
              </Button>
            </div>
          </div>
        </CardHeader>

        <div className="px-4 pt-4 bg-gray-50/50">
          <div className="grid grid-cols-4 divide-x divide-gray-200 border border-gray-200 rounded-md overflow-hidden">
            {stats.map((stat, index) => (
              <div key={`stat-${index}`} className="p-3 bg-white">
                <h5 className="font-semibold text-base text-gray-900 mb-0.5">{stat.value}</h5>
                <p className="text-xs text-gray-500 truncate">{stat.title}</p>
                {stat.subValue && (
                  <p className="text-xs text-green-600 mt-1">{stat.subValue}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <CardContent className="pt-4 pb-2">
          <ExpenseTrendsChartV2 
            data={monthlyTrends} 
            height={300}
          />
        </CardContent>
      </Card>

      {/* Expense Types Breakdown Card */}
      <Card className="shadow-md">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg font-semibold text-gray-800">Expense Type Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ExpenseTypeBreakdown expenseTypes={expenseTypes} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExpenseTrendsSection;
