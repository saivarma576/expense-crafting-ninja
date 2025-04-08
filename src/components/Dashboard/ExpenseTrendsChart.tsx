
import React from 'react';
import { motion } from 'framer-motion';
import AreaChartComponent from '../Charts/AreaChartComponent';
import YearSelector from './YearSelector';

interface ExpenseTrendsChartProps {
  monthlyExpenseData: Array<{
    month: string;
    amount: number;
  }>;
  selectedYear: number;
  onYearChange: (direction: 'prev' | 'next') => void;
}

const ExpenseTrendsChart: React.FC<ExpenseTrendsChartProps> = ({ 
  monthlyExpenseData, 
  selectedYear, 
  onYearChange 
}) => {  
  // Transform data to match AreaChartComponent's expected format
  const transformedData = monthlyExpenseData.map(item => ({
    name: item.month,
    value: item.amount
  }));
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-xl p-6 shadow-lg border border-primary/5"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Expense Trends</h2>
        <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} />
      </div>
      
      <AreaChartComponent
        data={transformedData}
        gradientColor="#3b82f6"
        strokeColor="#3b82f6"
        height={320}
      />
    </motion.div>
  );
};

export default ExpenseTrendsChart;
