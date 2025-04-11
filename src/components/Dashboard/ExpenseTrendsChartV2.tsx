
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';

interface ExpenseTrendData {
  month: string;
  expenses: number;
  amount: number;
}

interface ExpenseTrendsChartV2Props {
  data: ExpenseTrendData[];
  height?: number;
}

const ExpenseTrendsChartV2: React.FC<ExpenseTrendsChartV2Props> = ({ data, height = 300 }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 border border-border p-2 rounded shadow-md text-xs">
          <p className="font-semibold">{label}</p>
          <p className="text-primary">Expenses: {payload[0].value}</p>
          <p className="text-orange-500">Amount: ${payload[1].value.toLocaleString()}</p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div style={{ width: '100%', height: height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis 
            yAxisId="left"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            domain={[0, 'auto']}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            domain={[0, 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            yAxisId="left"
            dataKey="expenses" 
            fill="rgba(104, 124, 254, 0.9)" 
            radius={[4, 4, 0, 0]} 
            barSize={30} 
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="amount" 
            stroke="#ff7f5d" 
            strokeWidth={2}
            dot={{ fill: '#ff7f5d', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="flex justify-center items-center gap-6 mt-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgba(104, 124, 254, 0.9)' }}></div>
          <span>Expenses</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff7f5d' }}></div>
          <span>Amount</span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTrendsChartV2;
