import React from 'react';
import { PolicyViolation } from '@/utils/policyValidations';
import PolicyTooltip from './ExpenseForm/PolicyTooltip';
import { Edit, Trash2, Paperclip, CircleCheck } from 'lucide-react';
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
  const hasViolations = item.policyViolations && item.policyViolations.length > 0;

  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {hasViolations ? (
            <PolicyTooltip
              violations={item.policyViolations || []}
              onAddComment={onAddViolationComment ? 
                (violationId: string, comment: string) => onAddViolationComment(violationId, comment) : 
                undefined}
            />
          ) : (
            <div className="absolute top-2 right-2 relative group">
              <CircleCheck 
                className="h-5 w-5 text-green-600 transition-transform group-hover:scale-110 animate-pulse" 
              />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-green-50 text-green-700 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                No Violations
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-12 gap-2 items-center text-xs">
            <div className="col-span-5">
              <h4 className="font-medium text-gray-900">{item.title}</h4>
              <div className="mt-1 text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 inline-flex items-center">
                <span className="mr-1">{item.category}</span>
                <span>{item.type}</span>
              </div>
            </div>
            
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
            
            <div className="col-span-1 text-xs text-gray-500">
              {item.date}
            </div>
            
            <div className="col-span-1 text-right font-medium text-gray-900">
              ${item.amount.toFixed(2)}
            </div>
            
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
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
