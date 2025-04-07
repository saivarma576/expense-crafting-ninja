
import React from 'react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Expense {
  id: string;
  title: string;
  date: string;
  amount: number;
  status: string;
  expenseTypes: string[];
  description: string;
}

interface RecentExpensesTableProps {
  recentExpenses: Expense[];
}

const RecentExpensesTable: React.FC<RecentExpensesTableProps> = ({ recentExpenses }) => {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Recent Expenses</h2>
        <a 
          href="/expenses" 
          className="text-sm text-primary font-medium animated-underline"
        >
          View all
        </a>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Expense</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentExpenses.map((expense) => (
            <TableRow 
              key={expense.id}
              className="cursor-pointer hover:bg-muted/30"
              onClick={() => console.log(`View expense ${expense.id}`)}
            >
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{expense.title}</span>
                  <span className="text-xs text-muted-foreground">{expense.description}</span>
                </div>
              </TableCell>
              <TableCell>{expense.date}</TableCell>
              <TableCell>
                <div className={cn(
                  "px-2 py-1 text-xs font-medium rounded-full capitalize inline-block",
                  {
                    'bg-green-100 text-green-700': expense.status === 'approved',
                    'bg-blue-100 text-blue-700': expense.status === 'submitted',
                    'bg-muted text-muted-foreground': expense.status === 'draft',
                    'bg-red-100 text-red-700': expense.status === 'rejected',
                  }
                )}>
                  {expense.status}
                </div>
              </TableCell>
              <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentExpensesTable;
