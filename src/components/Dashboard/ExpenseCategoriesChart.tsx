
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import PieChartWithTotal from '../Charts/PieChartWithTotal';
import YearSelector from './YearSelector';
import { formatCurrency, getCategoryIcon } from '../Charts/chartUtils';

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
  const pieData = useMemo(() => (
    categoryGroups.map(group => ({
      name: group.name,
      value: group.categories.reduce((sum, cat) => sum + cat.value, 0),
      color: group.categories[0]?.color || '#ccc'
    }))
  ), [categoryGroups]);

  // Get top expenses for display
  const topExpenses = useMemo(() => (
    [...categoryData]
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
  ), [categoryData]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card rounded-xl p-6 shadow-lg border border-primary/5 h-[400px]"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Expense Categories</h2>
          <p className="text-sm text-muted-foreground">Top 5 categories by spend</p>
        </div>
        <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} />
      </div>
      
      <div className="h-[calc(100%-70px)] grid grid-cols-12 gap-2">
        <div className="col-span-8">
          <PieChartWithTotal 
            data={pieData}
            className="h-full flex items-center justify-center"
          />
        </div>
        
        <div className="col-span-4 flex flex-col justify-center">
          <h3 className="text-sm font-medium mb-2 text-muted-foreground">Top Expenses</h3>
          <div className="space-y-2">
            {topExpenses.map((expense, index) => (
              <div key={index} className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-muted/50 transition-colors">
                <div className="flex items-center">
                  {getCategoryIcon(expense.name)}
                  <span className="truncate max-w-[100px]">{expense.name}</span>
                </div>
                <span className="font-medium">{formatCurrency(expense.value, true)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseCategoriesChart;
