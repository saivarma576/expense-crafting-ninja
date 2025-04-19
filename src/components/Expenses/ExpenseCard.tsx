
import React from 'react';
import { PolicyViolation } from '@/utils/policyValidations';
import PolicyTooltip from './ExpenseForm/PolicyTooltip';
import { Edit, Paperclip, Tag, CalendarDays, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ExpenseCardProps {
  item: {
    id: string;
    title: string;
    type: string;
    category: string;
    date: string;
    amount: number;
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
      <div className="flex items-center space-x-4 w-full pr-8">
        {/* Merchant */}
        <div className="w-3/12 flex items-center gap-2 min-w-[200px]">
          <span className="text-[15px] font-medium text-gray-900">{item.title}</span>
        </div>
        
        {/* Type */}
        <div className="w-3/12 flex items-center gap-2 min-w-[150px]">
          <Tag className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{item.type}</span>
        </div>
        
        {/* Date */}
        <div className="w-2/12 flex items-center gap-2 min-w-[120px]">
          <CalendarDays className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{item.date}</span>
        </div>
        
        {/* Amount */}
        <div className="w-2/12 flex items-center gap-2 justify-end min-w-[100px]">
          <DollarSign className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-900">${item.amount.toFixed(2)}</span>
        </div>
        
        {/* Actions */}
        <div className="w-2/12 flex items-center justify-end gap-2 min-w-[120px]">
          {/* Receipt Icon */}
          {item.receiptName && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full"
              title={item.receiptName}
            >
              <Paperclip className="h-3.5 w-3.5" />
              <span className="sr-only">View Receipt</span>
            </Button>
          )}
          
          {/* Edit Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="h-7 w-7 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full"
          >
            <Edit className="h-3.5 w-3.5" />
            <span className="sr-only">Edit</span>
          </Button>
          
          {/* Policy Violations Tooltip */}
          <div className="relative flex items-center">
            {hasViolations ? (
              <PolicyTooltip
                violations={item.policyViolations || []}
                onAddComment={onAddViolationComment ? 
                  (violationId: string, comment: string) => onAddViolationComment(violationId, comment) : 
                  undefined}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
