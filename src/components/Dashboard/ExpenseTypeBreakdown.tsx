
import React from 'react';

interface ExpenseTypeItem {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface ExpenseTypeBreakdownProps {
  expenseTypes: ExpenseTypeItem[];
}

const ExpenseTypeBreakdown: React.FC<ExpenseTypeBreakdownProps> = ({ expenseTypes }) => {
  return (
    <div className="space-y-4">
      {expenseTypes.map((item, index) => (
        <div key={index} className="flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">{item.label}</span>
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
