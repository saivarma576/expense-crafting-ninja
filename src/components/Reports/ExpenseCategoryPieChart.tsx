
import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface ExpenseCategoryPieChartProps {
  categoryData: CategoryData[];
}

const ExpenseCategoryPieChart: React.FC<ExpenseCategoryPieChartProps> = ({ categoryData }) => {
  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: 'none'
            }}
            formatter={(value) => [`$${value}`, 'Amount']}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseCategoryPieChart;
