
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
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  // Format title to Title Case
  const formattedTitle = "Recent Expenses";

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">{formattedTitle}</h2>
        <button 
          onClick={() => navigate('/expenses')}
          className="flex items-center text-sm text-primary font-medium hover:text-primary/80 transition-colors"
        >
          View all <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>
      
      <div className="overflow-hidden rounded-lg border border-muted/30">
        <Table>
          <TableHeader className="bg-muted/20">
            <TableRow>
              <TableHead>Expense</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentExpenses.map((expense, index) => (
              <motion.tr 
                key={expense.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                className="cursor-pointer hover:bg-muted/20 transition-colors"
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
                    "px-2.5 py-1 text-xs font-medium rounded-full capitalize inline-block",
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
                <TableCell className="text-right font-medium">${expense.amount.toFixed(2)}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default RecentExpensesTable;
