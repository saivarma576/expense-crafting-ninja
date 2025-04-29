
import React from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, TooltipProps
} from 'recharts';

interface ExpenseTypeData {
  name: string;
  value: number;
  percentage: number;
  avgClaim: number;
  color: string;
}

interface ModernExpenseTypeChartProps {
  expenseTypeData: ExpenseTypeData[];
}

// Custom tooltip with apple-inspired design
const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ExpenseTypeData;
    
    return (
      <div className="bg-white/90 backdrop-blur-md px-4 py-3 shadow-lg border border-gray-100 rounded-lg">
        <p className="font-medium text-sm">{data.name}</p>
        <p className="text-base font-semibold mt-1">${data.value.toLocaleString()}</p>
        <p className="text-xs text-gray-500 mt-1">{data.percentage}% of total expenses</p>
      </div>
    );
  }
  return null;
};

// Custom legend
const CustomLegend = ({ payload }: any) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2 pt-4 mt-4 border-t border-gray-100">
      {payload.map((entry: any, index: number) => (
        <div key={`legend-${index}`} className="flex items-center">
          <motion.div 
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.2 }}
          />
          <span className="text-sm font-medium text-gray-700">{entry.value}</span>
          <span className="text-xs text-gray-500 ml-2">
            ({(entry.payload.percentage)}%)
          </span>
        </div>
      ))}
    </div>
  );
};

const ModernExpenseTypeChart: React.FC<ModernExpenseTypeChartProps> = ({ expenseTypeData }) => {
  // Sort data by value (largest to smallest)
  const sortedData = [...expenseTypeData].sort((a, b) => b.value - a.value);
  
  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={sortedData}
            cx="50%"
            cy="45%"
            innerRadius={80}
            outerRadius={110}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            stroke="none"
            animationBegin={0}
            animationDuration={1000}
          >
            {sortedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                stroke="white"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            content={<CustomLegend />}
            iconSize={10}
            layout="horizontal" 
            verticalAlign="bottom" 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModernExpenseTypeChart;
