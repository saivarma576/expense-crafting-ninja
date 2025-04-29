
import React from 'react';
import { motion } from 'framer-motion';

interface ExpenseTypeData {
  name: string;
  value: number;
  percentage: number;
  avgClaim: number;
  color: string;
}

interface ModernExpenseTypeListProps {
  expenseTypeData: ExpenseTypeData[];
}

const ModernExpenseTypeList: React.FC<ModernExpenseTypeListProps> = ({ expenseTypeData }) => {
  // Sort by value (highest to lowest)
  const sortedData = [...expenseTypeData].sort((a, b) => b.value - a.value);
  
  return (
    <div className="space-y-4">
      {sortedData.map((item, index) => (
        <motion.div 
          key={item.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
            <span className="font-medium">{item.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{item.percentage}%</span>
            <span className="font-medium">${item.value.toLocaleString()}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ModernExpenseTypeList;
