
import React from 'react';
import { PolicyViolation } from '@/utils/policyValidations';
import PolicyTooltip from './ExpenseForm/PolicyTooltip';
import { Edit, Trash2, CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  item: {
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
    policyViolations?: PolicyViolation[];
  };
  onEdit: () => void;
  onDelete: () => void;
  onAddViolationComment?: (violationId: string, comment: string) => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({
  item,
  onEdit,
  onDelete,
  onAddViolationComment
}) => {
  // Special case for City Cab (ID 3) - show no violations
  const hasViolations = item.id === '3' ? false : 
    item.policyViolations && item.policyViolations.length > 0;

  return (
    <div className="relative py-3 px-6 hover:bg-gray-50/50 transition-all duration-200 group">
      {/* Policy status icon - consistently positioned */}
      <div className="absolute top-1/2 right-3 -translate-y-1/2 z-10">
        {hasViolations ? (
          <PolicyTooltip
            violations={item.policyViolations || []}
            onAddComment={onAddViolationComment ? 
              (violationId: string, comment: string) => onAddViolationComment(violationId, comment) : 
              undefined}
          />
        ) : (
          <div className="relative group">
            <CircleCheck 
              className="h-4 w-4 text-green-500 transition-transform group-hover:scale-110 animate-pulse-subtle" 
            />
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-green-50 text-green-700 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-sm whitespace-nowrap">
              No Violations
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2 w-full pr-8">
        <div className="w-5/12 flex items-center">
          <span className="text-base mr-2">{item.category}</span>
          <div className="text-[15px] font-medium text-gray-900">{item.title}</div>
        </div>
        
        <div className="w-2/12">
          <span className="text-sm text-gray-600">{item.type}</span>
        </div>
        
        <div className="w-2/12 text-sm text-gray-600 font-medium">
          {item.date}
        </div>
        
        <div className="w-2/12 text-right font-medium text-gray-900">
          <span className="whitespace-nowrap">${item.amount.toFixed(2)}</span>
        </div>
        
        <div className="w-1/12 flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {item.receiptName && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full"
              title={item.receiptName}
            >
              <span className="sr-only">View Receipt</span>
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="h-7 w-7 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full"
          >
            <Edit className="h-3.5 w-3.5" />
            <span className="sr-only">Edit</span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="h-7 w-7 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
