
import React from 'react';
import { Edit, Trash2, Paperclip } from 'lucide-react';
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
    </div>
  );
};

export default ExpenseCard;
