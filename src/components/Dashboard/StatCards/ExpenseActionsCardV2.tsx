
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateExpenseV2 from '@/components/Expenses/CreateExpense/CreateExpenseV2';

const ExpenseActionsCardV2 = () => {
  const [showCreateExpense, setShowCreateExpense] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <Button onClick={() => setShowCreateExpense(true)} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          New Expense Report
        </Button>
      </div>

      <CreateExpenseV2
        isOpen={showCreateExpense}
        onClose={() => setShowCreateExpense(false)}
      />
    </>
  );
};

export default ExpenseActionsCardV2;
