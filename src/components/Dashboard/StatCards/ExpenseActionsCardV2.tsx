
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateExpenseV2 from '@/components/Expenses/CreateExpense/CreateExpenseV2';
import CreateExpenseDialog from '@/components/Expenses/CreateExpense/CreateExpenseDialog';
import VersionSelectionDialog from '@/components/Expenses/CreateExpense/VersionSelectionDialog';

const ExpenseActionsCardV2 = () => {
  const [showVersionSelect, setShowVersionSelect] = useState(false);
  const [showCreateExpenseV1, setShowCreateExpenseV1] = useState(false);
  const [showCreateExpenseV2, setShowCreateExpenseV2] = useState(false);

  const handleNewExpense = () => {
    setShowVersionSelect(true);
  };

  const handleSelectV1 = () => {
    setShowVersionSelect(false);
    setShowCreateExpenseV1(true);
  };

  const handleSelectV2 = () => {
    setShowVersionSelect(false);
    setShowCreateExpenseV2(true);
  };

  return (
    <>
      <div className="flex gap-2">
        <Button onClick={handleNewExpense} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          New Expense Report
        </Button>
      </div>

      <VersionSelectionDialog
        isOpen={showVersionSelect}
        onClose={() => setShowVersionSelect(false)}
        onSelectV1={handleSelectV1}
        onSelectV2={handleSelectV2}
      />

      <CreateExpenseDialog
        isOpen={showCreateExpenseV1}
        onClose={() => setShowCreateExpenseV1(false)}
      />

      <CreateExpenseV2
        isOpen={showCreateExpenseV2}
        onClose={() => setShowCreateExpenseV2(false)}
      />
    </>
  );
};

export default ExpenseActionsCardV2;
