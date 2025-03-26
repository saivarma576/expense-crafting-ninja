
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExpenseCard from '@/components/Expenses/ExpenseCard';

interface ExpenseLineItem {
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

interface LineItemsSectionProps {
  lineItems: ExpenseLineItem[];
  handleAddLineItem: () => void;
  handleEditLineItem: (id: string) => void;
  handleDeleteLineItem: (id: string) => void;
  totalAmount: string;
}

const LineItemsSection: React.FC<LineItemsSectionProps> = ({
  lineItems,
  handleAddLineItem,
  handleEditLineItem,
  handleDeleteLineItem,
  totalAmount
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-medium text-gray-800">Line Items</h3>
        <Button 
          variant="default"
          size="sm" 
          onClick={handleAddLineItem}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <PlusCircle className="h-4 w-4 mr-1.5" />
          Add Line Item
        </Button>
      </div>
      
      <div className="space-y-4">
        {lineItems.map((item) => (
          <ExpenseCard
            key={item.id}
            item={item}
            onEdit={() => handleEditLineItem(item.id)}
            onDelete={() => handleDeleteLineItem(item.id)}
          />
        ))}
        
        {lineItems.length === 0 && (
          <div className="border rounded-lg p-8 text-center bg-gray-50">
            <div className="text-gray-500 mb-3">No expense items added yet</div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddLineItem}
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <PlusCircle className="h-4 w-4 mr-2" /> 
              Add First Item
            </Button>
          </div>
        )}
      </div>
      
      {lineItems.length > 0 && (
        <div className="flex justify-end mt-6">
          <div className="w-48">
            <div className="flex justify-between py-2 text-sm font-medium">
              <span>TOTAL AMOUNT</span>
              <span>${totalAmount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LineItemsSection;
