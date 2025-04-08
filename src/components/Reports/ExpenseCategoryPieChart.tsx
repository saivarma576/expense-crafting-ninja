
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '../ui/chart';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface ExpenseCategoryPieChartProps {
  categoryData: CategoryData[];
}

const ExpenseCategoryPieChart: React.FC<ExpenseCategoryPieChartProps> = ({ categoryData }) => {
  // Calculate total for center text
  const totalValue = categoryData.reduce((sum, item) => sum + item.value, 0);
  const formattedTotal = `$${(totalValue / 1000).toFixed(1)}k`;

  const chartConfig = categoryData.reduce((acc, category) => {
    acc[category.name] = {
      label: category.name,
      color: category.color
    };
    return acc;
  }, {} as Record<string, { label: string, color: string }>);

  return (
    <div className="flex flex-col h-full">
      <div className="relative w-full h-56 flex items-center justify-center">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
              dataKey="value"
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <span className="text-2xl font-bold">{formattedTotal}</span>
            <span className="text-xs text-gray-500 mt-1">
              This month total<br/>expense
            </span>
          </motion.div>
        </div>
      </div>
      
      {/* Category legend */}
      <div className="mt-6 grid grid-cols-3 gap-2 text-xs px-2 overflow-y-auto max-h-40">
        {categoryData.map((category, index) => (
          <motion.div 
            key={index} 
            className="flex items-center gap-1.5"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.03, duration: 0.2 }}
          >
            <div 
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: category.color }}
            />
            <span className="truncate text-xs">{category.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseCategoryPieChart;
