
import React, { useState } from 'react';
import { 
  Plane, Hotel, UtensilsCrossed, Car, Truck, FileQuestion, 
  Calendar, DollarSign, FileText, ArrowRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpenseLineItemProps {
  onSave: (lineItem: ExpenseLineItemType) => void;
  onCancel: () => void;
  editingItem?: ExpenseLineItemType;
}

export type ExpenseType = 'airfare' | 'hotel' | 'meals' | 'rental' | 'transport' | 'other';

export interface ExpenseLineItemType {
  id: string;
  type: ExpenseType;
  amount: number;
  date: string;
  description: string;
  receiptUrl?: string;
}

const expenseTypes = [
  { value: 'airfare', label: 'Airfare', icon: <Plane className="h-5 w-5" /> },
  { value: 'hotel', label: 'Hotel', icon: <Hotel className="h-5 w-5" /> },
  { value: 'meals', label: 'Meals', icon: <UtensilsCrossed className="h-5 w-5" /> },
  { value: 'rental', label: 'Car Rental', icon: <Car className="h-5 w-5" /> },
  { value: 'transport', label: 'Taxi/Ride', icon: <Truck className="h-5 w-5" /> },
  { value: 'other', label: 'Other', icon: <FileQuestion className="h-5 w-5" /> }
];

const ExpenseLineItem: React.FC<ExpenseLineItemProps> = ({ 
  onSave, 
  onCancel,
  editingItem
}) => {
  const [type, setType] = useState<ExpenseType>(editingItem?.type || 'other');
  const [amount, setAmount] = useState(editingItem?.amount || 0);
  const [date, setDate] = useState(editingItem?.date || new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState(editingItem?.description || '');
  
  const handleSave = () => {
    onSave({
      id: editingItem?.id || `item-${Date.now()}`,
      type,
      amount,
      date,
      description,
      receiptUrl: editingItem?.receiptUrl
    });
  };

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Expense Type</label>
        <div className="grid grid-cols-3 gap-2">
          {expenseTypes.map((expType) => (
            <button
              key={expType.value}
              type="button"
              onClick={() => setType(expType.value as ExpenseType)}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200",
                type === expType.value 
                  ? "border-blue-500 bg-blue-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className={cn(
                "p-2 rounded-full mb-2",
                type === expType.value ? `text-blue-500` : "text-gray-500"
              )}>
                {expType.icon}
              </div>
              <span className="text-sm font-medium">{expType.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="amount" className="text-sm font-medium text-gray-700">Amount</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <DollarSign className="h-4 w-4" />
          </div>
          <input
            id="amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="pl-9 w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="date" className="text-sm font-medium text-gray-700">Date</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Calendar className="h-4 w-4" />
          </div>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="pl-9 w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
        <div className="relative">
          <div className="absolute left-3 top-3 text-gray-500">
            <FileText className="h-4 w-4" />
          </div>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="pl-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
            placeholder="Enter description"
          />
        </div>
      </div>

      <div className="flex items-center pt-4 space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="flex-1 px-4 py-2.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center justify-center"
        >
          <span>Save</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ExpenseLineItem;
