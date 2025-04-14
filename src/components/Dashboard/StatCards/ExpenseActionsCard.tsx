
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  ChevronDown, 
  Receipt, 
  ArrowUp, 
  FilePlus,
  Upload,
  FileEdit
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateExpenseDialog from '@/components/Expenses/CreateExpenseDialog';

interface ExpenseActionsCardProps {
  draftCount: number;
  draftTrend: number;
}

const ExpenseActionsCard: React.FC<ExpenseActionsCardProps> = ({
  draftCount,
  draftTrend
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="glass-card p-6 rounded-xl flex flex-col space-y-2 border-b-4 border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-muted-foreground uppercase">Expense Actions</h3>
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
          <FileEdit className="h-5 w-5" />
        </div>
      </div>
      
      <div className="flex flex-col space-y-3">
        <DropdownMenu>
          <div className="flex w-full">
            <Button 
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-r-none flex-grow text-sm group"
              onClick={handleOpenDialog}
            >
              <PlusCircle className="mr-1.5 h-4 w-4 group-hover:scale-110 transition-transform" />
              Create Expense
            </Button>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-l-none px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-l border-blue-200">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="w-56 bg-white border shadow-lg">
            <DropdownMenuItem onClick={handleOpenDialog} className="cursor-pointer text-sm">
              <FilePlus className="mr-2 h-4 w-4" />
              <span>Create Expense</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/receipts/upload" className="flex items-center cursor-pointer text-sm">
                <Upload className="mr-2 h-4 w-4" />
                <span>Upload Receipt to Buffer</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Receipt className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm font-medium">{draftCount} Drafts</span>
          </div>
          <div className="text-xs font-medium flex items-center text-green-600">
            <ArrowUp className="mr-1 h-3 w-3" />
            <span>+{draftTrend} vs last month</span>
          </div>
        </div>
      </div>

      <CreateExpenseDialog 
        isOpen={isDialogOpen} 
        onClose={handleCloseDialog} 
      />
    </div>
  );
};

export default ExpenseActionsCard;
