import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ExpenseTrendsChartV2 from './ExpenseTrendsChartV2';
import ExpenseTypeBreakdown from './ExpenseTypeBreakdown';

interface ExpenseTrendData {
  month: string;
  expenses: number;
  amount: number;
}

interface ExpenseTypeData {
  id: string;
  value: number;
  label: string;
  color: string;
}

interface ExpenseStats {
  totalExpenses: number;
  travelExpenses: number;
  mealExpenses: number;
  suppliesExpenses: number;
}

interface ExpenseTrendsSectionProps {
  monthlyTrends: ExpenseTrendData[];
  expenseTypes: ExpenseTypeData[];
  stats: ExpenseStats;
}

const ExpenseTrendsSection: React.FC<ExpenseTrendsSectionProps> = ({
  monthlyTrends,
  expenseTypes,
  stats
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | '1m' | '6m' | '1y'>('1y');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card rounded-xl shadow-lg border border-primary/5 lg:col-span-2"
      >
        <div className="flex flex-col">
          {/* Card Header with Title and Period Selector */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-base md:text-lg font-semibold">Expense Trends</h2>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setSelectedPeriod('all')}
                className={`text-xs px-3 py-1.5 rounded-md font-medium ${
                  selectedPeriod === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                ALL
              </button>
              <button 
                onClick={() => setSelectedPeriod('1m')}
                className={`text-xs px-3 py-1.5 rounded-md font-medium ${
                  selectedPeriod === '1m' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                1M
              </button>
              <button 
                onClick={() => setSelectedPeriod('6m')}
                className={`text-xs px-3 py-1.5 rounded-md font-medium ${
                  selectedPeriod === '6m' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                6M
              </button>
              <button 
                onClick={() => setSelectedPeriod('1y')}
                className={`text-xs px-3 py-1.5 rounded-md font-medium ${
                  selectedPeriod === '1y' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                1Y
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 bg-gray-50 border-b">
            <div className="p-3 border-r border-dashed text-center">
              <h5 className="text-lg md:text-xl font-bold mb-1">{stats.totalExpenses.toLocaleString()}</h5>
              <p className="text-xs md:text-sm text-muted-foreground truncate">Total Expenses</p>
            </div>
            <div className="p-3 border-r border-dashed text-center">
              <h5 className="text-lg md:text-xl font-bold mb-1">{stats.travelExpenses.toLocaleString()}</h5>
              <p className="text-xs md:text-sm text-muted-foreground truncate">Travel Expenses</p>
            </div>
            <div className="p-3 border-r border-dashed text-center">
              <h5 className="text-lg md:text-xl font-bold mb-1">{stats.mealExpenses.toLocaleString()}</h5>
              <p className="text-xs md:text-sm text-muted-foreground truncate">Meal Expenses</p>
            </div>
            <div className="p-3 text-center">
              <h5 className="text-lg md:text-xl font-bold mb-1">{stats.suppliesExpenses.toLocaleString()}</h5>
              <p className="text-xs md:text-sm text-muted-foreground truncate">Office Supplies</p>
            </div>
          </div>

          {/* Chart Area */}
          <div className="p-4">
            <ExpenseTrendsChartV2 data={monthlyTrends} height={300} />
          </div>
        </div>
      </motion.div>

      {/* Keep the expense type breakdown chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card rounded-xl p-6 shadow-lg border border-primary/5"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Expense Types</h2>
          <div className="text-xs text-gray-500">Last 30 days</div>
        </div>
        <ExpenseTypeBreakdown data={expenseTypes} />
      </motion.div>
    </div>
  );
};

export default ExpenseTrendsSection;
