
import React from 'react';
import { Calendar, Hash, DollarSign } from 'lucide-react';
import EditableField from './EditableField';

interface ExpenseDetailsProps {
  expenseNo: string;
  expenseDate: string;
  totalAmount: string;
}

const ExpenseDetails: React.FC<ExpenseDetailsProps> = ({
  expenseNo,
  expenseDate,
  totalAmount
}) => {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm self-start">
      <div className="flex items-center text-gray-500">
        <Hash className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
        Expense #
      </div>
      <EditableField 
        value={expenseNo}
        onChange={() => {}}
      />
      
      <div className="flex items-center text-gray-500">
        <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
        Date Range
      </div>
      <EditableField 
        value={expenseDate}
        onChange={() => {}}
      />
      
      <div className="flex items-center text-gray-500">
        <DollarSign className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
        Amount
      </div>
      <EditableField 
        value={totalAmount}
        onChange={() => {}}
        prefix="$"
      />
    </div>
  );
};

export default ExpenseDetails;
