
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
    <div className="glass-card p-6 rounded-xl flex flex-col space-y-4 border-b-4 border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-muted-foreground uppercase">Expense Actions</h3>
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
          <FileEdit className="h-5 w-5" />
        </div>
      </div>
      
      {/* Vertical expense actions */}
      <div className="flex flex-col space-y-3">
        <Button 
          className="bg-blue-50 hover:bg-blue-100 text-blue-700 w-full py-5 text-sm flex items-center justify-center group"
          onClick={handleOpenDialog}
        >
          <PlusCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          Create New Expense
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full text-sm justify-between">
              <span className="flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                Upload Receipt
              </span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full bg-white border shadow-lg">
            <DropdownMenuItem asChild>
              <Link to="/receipts/upload" className="flex items-center cursor-pointer text-sm">
                <Upload className="mr-2 h-4 w-4" />
                <span>Upload Receipt to Buffer</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/receipts/scan" className="flex items-center cursor-pointer text-sm">
                <Receipt className="mr-2 h-4 w-4" />
                <span>Scan Receipt</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="mt-2 flex items-center justify-between p-3 bg-gray-50 rounded-md">
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
