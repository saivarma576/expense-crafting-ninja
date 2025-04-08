
import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'framer-motion';

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

  return (
    <div className="flex flex-col">
      <div className="relative h-[220px] mx-auto w-full max-w-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={4} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: 'none'
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold"
          >
            {formattedTotal}
          </motion.div>
          <div className="text-xs text-gray-500">This month total</div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-4">
        {categoryData.map((category, index) => (
          <div key={index} className="flex items-center text-xs">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: category.color }}
            />
            <span className="truncate">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseCategoryPieChart;
