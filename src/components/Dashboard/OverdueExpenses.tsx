
import React from 'react';

interface PendingExpense {
  id: string;
  employee: string;
  expenseNumber: string;
  daysOutstanding: number;
  amount: number;
  status: string;
}

interface OverdueExpensesProps {
  data: PendingExpense[];
}

const OverdueExpenses: React.FC<OverdueExpensesProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/30">
            <th className="text-left font-medium text-muted-foreground py-3">Employee</th>
            <th className="text-left font-medium text-muted-foreground py-3">Expense Number</th>
            <th className="text-left font-medium text-muted-foreground py-3">Days Outstanding</th>
            <th className="text-left font-medium text-muted-foreground py-3">Amount</th>
            <th className="text-left font-medium text-muted-foreground py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((expense, index) => (
            <tr key={index} className="border-b border-border/30 last:border-none hover:bg-muted/10">
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                    {expense.id}
                  </div>
                  <span>{expense.employee}</span>
                </div>
              </td>
              <td className="py-3">{expense.expenseNumber}</td>
              <td className="py-3">{expense.daysOutstanding} Days</td>
              <td className="py-3">${expense.amount.toLocaleString()}</td>
              <td className="py-3">
                <div className="px-3 py-1 text-xs font-medium rounded-full text-green-700 bg-green-100 inline-block">
                  {expense.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OverdueExpenses;
