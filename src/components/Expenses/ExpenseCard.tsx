
import React from 'react';
import { Edit, Trash2, Paperclip, AlertTriangle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useValidation } from '@/contexts/ValidationContext';

interface ExpenseItem {
  id: string;
  title: string;
  type: string;
  category: string;
  date: string;
  amount: number;
  account: string;
  accountName: string;
  costCenter: string;
  costCenterName: string;
  receiptName?: string;
}

interface ExpenseCardProps {
  item: ExpenseItem;
  onEdit: () => void;
  onDelete: () => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ item, onEdit, onDelete }) => {
  const { policyViolations } = useValidation();
  
  // Find any policy violations related to this item
  const itemViolations = policyViolations.filter(violation => 
    violation.lineNumber.toString() === item.id || 
    violation.id.includes(item.id)
  );

  return (
    <div className="py-3">
      <div className="grid grid-cols-12 gap-2 items-center text-xs">
        {/* Title and type column */}
        <div className="col-span-5">
          <h4 className="font-medium text-gray-900">{item.title}</h4>
          <div className="mt-1 text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 inline-flex items-center">
            <span className="mr-1">{item.category}</span>
            <span>{item.type}</span>
          </div>
        </div>
        
        {/* Account column (GL/CC) */}
        <div className="col-span-4 text-xs text-gray-500">
          <div>
            <span>{item.accountName}: </span>
            <span className="font-medium">{item.account}</span>
          </div>
          <div className="mt-1">
            <span>{item.costCenterName}: </span>
            <span className="font-medium">{item.costCenter}</span>
          </div>
        </div>
        
        {/* Date column */}
        <div className="col-span-1 text-xs text-gray-500">
          {item.date}
        </div>
        
        {/* Amount column */}
        <div className="col-span-1 text-right font-medium text-gray-900">
          ${item.amount.toFixed(2)}
        </div>
        
        {/* Actions column */}
        <div className="col-span-1 flex justify-end space-x-1">
          {item.receiptName && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-blue-500 hover:bg-blue-50 hover:text-blue-600 rounded-full"
              title={item.receiptName}
            >
              <Paperclip className="h-3.5 w-3.5" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="h-7 w-7 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-full"
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="h-7 w-7 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-full"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      {/* Policy violation warnings - display below the item details */}
      {itemViolations.length > 0 && (
        <div className="mt-2 grid grid-cols-12">
          <div className="col-span-12">
            {itemViolations.map((violation, index) => (
              <TooltipProvider key={`${violation.id}-${index}`}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={cn(
                      "py-2 px-3 text-xs rounded-md flex items-start gap-2 mb-1",
                      violation.violationType === 'error' 
                        ? "bg-red-50 text-red-700 border border-red-100" 
                        : "bg-amber-50 text-amber-700 border border-amber-100"
                    )}>
                      {violation.violationType === 'error' ? (
                        <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      )}
                      <span>{violation.message}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{violation.category}: {violation.message}</p>
                    {violation.violationType === 'warning' && (
                      <p className="text-xs mt-1">Click to edit and resolve this warning</p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseCard;
