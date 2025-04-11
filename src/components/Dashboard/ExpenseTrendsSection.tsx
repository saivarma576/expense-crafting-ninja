
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ExpenseTrendsChartV2 from './ExpenseTrendsChartV2';
import ExpenseTypeBreakdown from './ExpenseTypeBreakdown';

interface ExpenseTrendItem {
  month: string;
  expenses: number;
  amount: number;
}

interface ExpenseTypeItem {
  name: string;
  value: number;
  color: string;
}

interface ExpenseTrendsSectionProps {
  monthlyTrends: ExpenseTrendItem[];
  expenseTypes: ExpenseTypeItem[];
  stats: {
    totalExpenses: number;
    travelExpenses: number;
    mealExpenses: number;
    suppliesExpenses: number;
  };
}

const ExpenseTrendsSection: React.FC<ExpenseTrendsSectionProps> = ({
  monthlyTrends,
  expenseTypes,
  stats
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('ALL');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Expense Trends Chart - 2/3 width */}
      <div className="lg:col-span-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-xl p-6 shadow-lg border border-primary/5"
        >
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Expense Trends</h2>
              <div className="flex items-center gap-1 text-xs">
                <button 
                  className={`px-3 py-1 rounded-md ${selectedPeriod === 'ALL' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/50'}`}
                  onClick={() => setSelectedPeriod('ALL')}
                >
                  ALL
                </button>
                <button 
                  className={`px-3 py-1 rounded-md ${selectedPeriod === '1M' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/50'}`}
                  onClick={() => setSelectedPeriod('1M')}
                >
                  1M
                </button>
                <button 
                  className={`px-3 py-1 rounded-md ${selectedPeriod === '6M' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/50'}`}
                  onClick={() => setSelectedPeriod('6M')}
                >
                  6M
                </button>
                <button 
                  className={`px-3 py-1 rounded-md ${selectedPeriod === '1Y' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/50'}`}
                  onClick={() => setSelectedPeriod('1Y')}
                >
                  1Y
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold">{stats.totalExpenses.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">Total Expenses</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold">{stats.travelExpenses.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">Travel Expenses</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold">{stats.mealExpenses.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">Meal Expenses</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold">{stats.suppliesExpenses.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">Office Supplies</span>
              </div>
            </div>

            <ExpenseTrendsChartV2 data={monthlyTrends} height={300} />
          </div>
        </motion.div>
      </div>

      {/* Expense Types Breakdown - 1/3 width */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card rounded-xl p-6 shadow-lg border border-primary/5"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Expenses Across Types</h2>
          <button className="text-xs text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <ExpenseTypeBreakdown data={expenseTypes} />
      </motion.div>
    </div>
  );
};

export default ExpenseTrendsSection;
