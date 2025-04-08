
import React from 'react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface DepartmentData {
  name: string;
  value: number;
}

interface DepartmentExpenseChartProps {
  deptData: DepartmentData[];
}

const DepartmentExpenseChart: React.FC<DepartmentExpenseChartProps> = ({ deptData }) => {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="mb-4">
        <h2 className="text-lg font-medium">Expenses by Department</h2>
        <p className="text-sm text-muted-foreground">Department breakdown</p>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={deptData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            barSize={24}
          >
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
            <Bar 
              dataKey="value" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]} 
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DepartmentExpenseChart;
