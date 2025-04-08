
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import PieChartWithTotal from '../Charts/PieChartWithTotal';
import YearSelector from './YearSelector';
import { formatCurrency } from '../Charts/chartUtils';

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

  // Calculate total expenses
  const totalExpenses = useMemo(() => (
    pieData.reduce((sum, item) => sum + item.value, 0)
  ), [pieData]);

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
          <p className="text-sm text-muted-foreground">Monthly expense breakdown</p>
        </div>
        <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} />
      </div>
      
      <div className="h-[calc(100%-70px)] flex items-center justify-center">
        <div className="w-full flex flex-col items-center">
          <PieChartWithTotal 
            data={pieData}
            title="This month total"
            subtitle="expense"
            totalValue={totalExpenses}
            showLegend={false} // Hide the default legend from the PieChart
            className="h-[240px]"
          />
          
          {/* Custom Legend - Styled with boxy effect to match the reference image */}
          <div className="w-full flex flex-wrap justify-center gap-x-3 gap-y-3 mt-4">
            {pieData.map((category, index) => (
              <div 
                key={index}
                className="flex items-center rounded-full px-3 py-1.5"
                style={{ 
                  backgroundColor: `${category.color}15`,
                  border: `1px solid ${category.color}30`
                }}
              >
                <div 
                  className="w-2.5 h-2.5 rounded-full mr-2" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseCategoriesChart;
