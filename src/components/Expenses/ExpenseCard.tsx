
import React from 'react';
import { FileText, Edit, Trash2, X, Paperclip } from 'lucide-react';
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
  item: ExpenseItem;
  onEdit: () => void;
  onDelete: () => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ item, onEdit, onDelete }) => {
  return (
    <div className="py-3">
      <div className="grid grid-cols-12 gap-2 items-center text-sm">
        {/* Title and type column */}
        <div className="col-span-4">
          <h4 className="font-medium text-gray-900">{item.title}</h4>
          <div className="mt-1 text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 inline-flex items-center">
            <span className="mr-1">{item.category}</span>
            <span>{item.type}</span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            <span>{item.accountName}: </span>
            <span className="font-medium">{item.account}</span>
          </div>
        </div>
        
        {/* Price column */}
        <div className="col-span-2 text-right">
          <div className="font-medium text-gray-900">${item.amount.toFixed(2)}</div>
        </div>
        
        {/* Qty column (we'll use date here) */}
        <div className="col-span-2 text-center text-xs text-gray-500">
          {item.date}
        </div>
        
        {/* Total column (same as price in this context) */}
        <div className="col-span-2 text-right font-medium text-gray-900">
          ${item.amount.toFixed(2)}
        </div>
        
        {/* Receipt/Attachment column */}
        <div className="col-span-1 flex justify-center text-xs text-gray-500">
          {item.receiptName ? (
            <div className="flex items-center text-blue-500" title={item.receiptName}>
              <Paperclip className="h-3.5 w-3.5" />
            </div>
          ) : null}
        </div>
        
        {/* Actions column */}
        <div className="col-span-1 flex justify-end space-x-1">
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
  );
};

export default ExpenseCard;
