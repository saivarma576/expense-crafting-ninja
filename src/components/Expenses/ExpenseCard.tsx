
import React from 'react';
import { FileText, Edit, Trash2, X, Plus, LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="py-4">
      <div className="grid grid-cols-12 gap-2">
        {/* Title and type column */}
        <div className="col-span-3">
          <h4 className="font-medium text-gray-900">{item.title}</h4>
          <div className="mt-2 text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600 inline-flex items-center">
            <span className="mr-1">{item.category}</span>
            <span>{item.type}</span>
          </div>
        </div>
        
        {/* Account and cost center column */}
        <div className="col-span-3">
          <div className="space-y-1">
            <div className="text-xs text-gray-500">{item.accountName}</div>
            <div className="text-sm text-gray-700">{item.account}</div>
          </div>
          <div className="space-y-1 mt-2">
            <div className="text-xs text-gray-500">{item.costCenterName}</div>
            <div className="text-sm text-gray-700">{item.costCenter}</div>
          </div>
        </div>
        
        {/* Date column */}
        <div className="col-span-2 text-xs text-gray-500">
          {item.date}
        </div>
        
        {/* Amount column */}
        <div className="col-span-1 font-medium text-gray-900 text-right">
          {item.amount.toFixed(2)} $
        </div>
        
        {/* Receipt column */}
        <div className="col-span-2 flex items-center text-xs text-gray-500">
          {item.receiptName ? (
            <div className="flex items-center">
              <LinkIcon className="h-3.5 w-3.5 mr-1.5" />
              <span className="max-w-[150px] truncate">{item.receiptName}</span>
              <Button variant="ghost" size="icon" className="h-5 w-5 text-gray-400 ml-1">
                <X className="h-3 w-3" />
              </Button>
              {item.receiptName.includes('+More') && (
                <span className="text-blue-500 ml-1">+More</span>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              <FileText className="h-3.5 w-3.5 mr-1.5" />
              <span>No receipt</span>
            </div>
          )}
        </div>
        
        {/* Actions column */}
        <div className="col-span-1 flex justify-end space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-full"
          >
            <Edit className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-full"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
