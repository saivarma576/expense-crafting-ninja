
import React from 'react';
import { FileText, Edit, Trash2, X } from 'lucide-react';
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
    <div className="border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
      <div className="p-4">
        <div className="flex items-start">
          <div className="mr-3 flex-shrink-0">
            <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center text-lg">
              {item.category}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{item.type}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{item.date}</p>
                <p className="font-medium text-gray-900 mt-1">${item.amount.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-gray-500">{item.accountName}</p>
                <p className="text-gray-700">{item.account}</p>
              </div>
              <div>
                <p className="text-gray-500">{item.costCenterName}</p>
                <p className="text-gray-700">{item.costCenter}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <FileText className="h-3.5 w-3.5" />
            <span className="max-w-[180px] truncate">{item.receiptName || "No receipt attached"}</span>
            {item.receiptName && (
              <Button variant="ghost" size="icon" className="h-5 w-5 text-gray-400">
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="h-7 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            >
              <Edit className="h-3.5 w-3.5 mr-1" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="h-7 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
