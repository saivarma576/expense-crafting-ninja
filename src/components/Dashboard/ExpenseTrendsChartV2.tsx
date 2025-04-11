
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
        <div className="bg-white border border-gray-200 p-3 rounded shadow-md text-xs">
          <p className="font-semibold">{label}</p>
          <p className="text-blue-600">Amount: ${payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
  
    return null;
  };

  const formatYAxis = (value: any) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toString();
  };

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 15, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            dy={10}
          />
          <YAxis 
            tickFormatter={formatYAxis}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            domain={[0, 'dataMax + 1000']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#3b82f6" 
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorAmount)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseTrendsChartV2;
