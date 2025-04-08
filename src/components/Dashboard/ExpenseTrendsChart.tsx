
import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import YearSelector from './YearSelector';
import { motion } from 'framer-motion';

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
  // Custom tooltip formatter
  const formatTooltipValue = (value: number) => {
    return [`$${value.toLocaleString()}`, 'Expense'];
  };
  
  // Helper to format Y-axis values
  const formatYAxisTick = (value: number): string => {
    if (value >= 1000) {
      return `${Math.round(value / 1000)}k`;
    }
    return value.toString();
  };
  
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
      
      <div className="h-[320px]">
        <ChartContainer 
          config={{ 
            expenses: { 
              label: "Expenses", 
              color: "#3b82f6" 
            } 
          }}
        >
          <AreaChart 
            data={monthlyExpenseData} 
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={formatYAxisTick}
              domain={[0, 'dataMax + 500']}
              tickCount={5}
            />
            <Tooltip 
              content={
                <ChartTooltipContent 
                  labelClassName="font-medium text-foreground" 
                  formatter={formatTooltipValue}
                />
              }
              cursor={{ strokeDasharray: '3 3', stroke: '#9ca3af', strokeWidth: 1 }}
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#3b82f6" 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorExpense)" 
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </motion.div>
  );
};

export default ExpenseTrendsChart;
