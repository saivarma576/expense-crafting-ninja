
import React from 'react';

interface ExpenseTypeData {
  name: string;
  value: number;
  color: string;
}

interface ExpenseTypeBreakdownProps {
  data: ExpenseTypeData[];
}

const ExpenseTypeBreakdown: React.FC<ExpenseTypeBreakdownProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">{item.name}</span>
            <span className="text-sm font-medium">{item.value}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="h-full rounded-full" 
              style={{ 
                width: `${Math.min(100, (item.value / 100) * 100)}%`,
                backgroundColor: item.color 
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseTypeBreakdown;
