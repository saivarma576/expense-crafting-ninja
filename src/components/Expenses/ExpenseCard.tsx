
import React from 'react';
import { FileText, Edit, Trash2, X, Plus } from 'lucide-react';
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
      <div className="flex flex-col space-y-3">
        <div className="flex items-start">
          <div className="flex-1">
            {/* Title and type with emoji */}
            <div className="flex items-center mb-0.5">
              <h4 className="font-medium text-gray-900">{item.title}</h4>
              <div className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 flex items-center">
                <span className="mr-1">{item.category}</span>
                <span>{item.type}</span>
              </div>
            </div>
          </div>
          
          {/* Date on the right */}
          <div className="text-xs text-gray-500 mt-0.5 min-w-[100px] text-right">
            {item.date}
          </div>
        </div>
        
        {/* GL account and cost center */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-gray-500">{item.accountName}</p>
            <p className="text-sm text-gray-700">{item.account}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">{item.costCenterName}</p>
            <p className="text-sm text-gray-700">{item.costCenter}</p>
          </div>
        </div>
        
        {/* Bottom row with amount, receipt, and actions */}
        <div className="flex items-center justify-between mt-2">
          {/* Receipt */}
          <div className="flex items-center text-xs text-gray-500">
            {item.receiptName ? (
              <>
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                <span className="max-w-[150px] truncate">{item.receiptName}</span>
                <Button variant="ghost" size="icon" className="h-5 w-5 text-gray-400 ml-1">
                  <X className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-5 w-5 text-blue-500 ml-1">
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </>
            ) : (
              <>
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                <span>No receipt attached</span>
              </>
            )}
          </div>
          
          {/* Amount and actions */}
          <div className="flex items-center space-x-4">
            <p className="font-medium text-gray-900">${item.amount.toFixed(2)}</p>
            
            <div className="flex space-x-2">
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
      </div>
    </div>
  );
};

export default ExpenseCard;
