
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps
} from 'recharts';

interface MonthlyExpenseData {
  name: string;
  expenses: number;
}

interface ModernMonthlyExpenseChartProps {
  monthlyData: MonthlyExpenseData[];
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md px-4 py-3 shadow-lg border border-gray-100 rounded-lg">
        <p className="font-medium text-sm">{label}</p>
        <p className="text-base font-semibold mt-1">
          ${payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const ModernMonthlyExpenseChart: React.FC<ModernMonthlyExpenseChartProps> = ({ monthlyData }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={monthlyData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" vertical={false} />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12, fill: '#666' }}
          tickLine={false}
          axisLine={{ stroke: '#eee' }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#666' }}
          tickLine={false}
          axisLine={{ stroke: '#eee' }}
          tickFormatter={(value) => `$${value/1000}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="expenses" 
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
          animationDuration={1000}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ModernMonthlyExpenseChart;
