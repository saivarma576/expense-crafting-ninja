
import React from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Legend
} from 'recharts';
import { ChartContainer } from "@/components/ui/chart";
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
  // Calculate total for center display
  const totalValue = categoryData.reduce((sum, item) => sum + item.value, 0);
  const formattedTotal = `$${(totalValue / 1000).toFixed(1)}k`;
  
  // Create top-level category data for the pie chart
  const pieData = categoryGroups.map(group => ({
    name: group.name,
    value: group.categories.reduce((sum, cat) => sum + cat.value, 0),
    color: group.categories[0]?.color || '#ccc'
  }));
  
  // Custom legend formatter
  const renderColorfulLegendText = (value: string) => {
    return <span className="text-xs font-medium">{value}</span>;
  };

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
        <div className="relative flex-1 flex items-center justify-center">
          {/* Center Total Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <span className="text-3xl font-bold">{formattedTotal}</span>
              <span className="text-sm text-muted-foreground">This month total</span>
              <span className="text-xs text-muted-foreground">expense</span>
            </motion.div>
          </div>
          
          {/* Pie Chart */}
          <ChartContainer className="w-full h-full max-h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={1}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  formatter={renderColorfulLegendText}
                  wrapperStyle={{
                    paddingTop: 20,
                    fontSize: 12,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseCategoriesChart;
