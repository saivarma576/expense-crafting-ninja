
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ListFilter } from 'lucide-react';

interface MonthData {
  name: string;
  value: number;
}

interface ExpenseTrendChartProps {
  monthlyData: MonthData[];
}

const ExpenseTrendChart: React.FC<ExpenseTrendChartProps> = ({ monthlyData }) => {
  return (
    <div className="lg:col-span-2 glass-card rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-medium">Expense Trend</h2>
          <p className="text-sm text-muted-foreground">Monthly expense distribution</p>
        </div>
        <button className="p-2 rounded-md hover:bg-muted transition-colors">
          <ListFilter className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: 'none'
              }}
              formatter={(value) => [`$${value}`, 'Amount']}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={2}
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseTrendChart;
