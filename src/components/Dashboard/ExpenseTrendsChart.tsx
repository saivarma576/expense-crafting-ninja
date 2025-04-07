
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
  return (
    <div className="glass-card rounded-xl p-6">
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
              tickFormatter={(value) => `$${value}`}
              domain={[0, 'dataMax + 500']}
              tickCount={5}
            />
            <Tooltip 
              content={
                <ChartTooltipContent 
                  labelClassName="font-medium text-foreground" 
                  formatter={(value) => [`$${value}`, 'Amount']}
                />
              }
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#3b82f6" 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorExpense)" 
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default ExpenseTrendsChart;
