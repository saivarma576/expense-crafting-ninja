
import React from 'react';
import { motion } from 'framer-motion';
import PieChartWithTotal from '../Charts/PieChartWithTotal';
import YearSelector from './YearSelector';

interface CategoryData {
  name: string;
  value: number;
  color: string;
  formattedValue: string;
}

interface CategoryGroup {
  name: string;
  categories: CategoryData[];
}

interface ExpenseCategoriesChartProps {
  categoryData: CategoryData[];
  categoryGroups: CategoryGroup[];
  selectedYear: number;
  onYearChange: (direction: 'prev' | 'next') => void;
}

const ExpenseCategoriesChart: React.FC<ExpenseCategoriesChartProps> = ({ 
  categoryData, 
  categoryGroups,
  selectedYear, 
  onYearChange 
}) => {
  // Create top-level category data for the pie chart
  const pieData = categoryGroups.map(group => ({
    name: group.name,
    value: group.categories.reduce((sum, cat) => sum + cat.value, 0),
    color: group.categories[0]?.color || '#ccc'
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card rounded-xl p-6 shadow-lg border border-primary/5 h-[400px]"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Expense Categories</h2>
        <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} />
      </div>
      
      <div className="h-[calc(100%-40px)] flex flex-col">
        <PieChartWithTotal 
          data={pieData}
          className="flex-1 flex items-center justify-center"
        />
      </div>
    </motion.div>
  );
};

export default ExpenseCategoriesChart;
