
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExpenseCard from '@/components/Expenses/ExpenseCard';
import { Separator } from '@/components/ui/separator';

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
    <div className="mb-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-medium text-gray-700">Line Items</h3>
        <Button 
          variant="default"
          size="sm" 
          onClick={handleAddLineItem}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
        >
          <PlusCircle className="h-4 w-4 mr-1.5" />
          Line Items
        </Button>
      </div>
      
      {lineItems.length > 0 ? (
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 text-xs font-medium text-gray-500">
            <div className="col-span-3">TITLE</div>
            <div className="col-span-3">ACCOUNT INFO</div>
            <div className="col-span-2">DATE</div>
            <div className="col-span-1 text-right">AMOUNT</div>
            <div className="col-span-2">RECEIPT</div>
            <div className="col-span-1"></div>
          </div>
          
          {/* Line items */}
          <div className="divide-y divide-dashed divide-gray-200">
            {lineItems.map((item) => (
              <div key={item.id} className="px-4">
                <ExpenseCard
                  item={item}
                  onEdit={() => handleEditLineItem(item.id)}
                  onDelete={() => handleDeleteLineItem(item.id)}
                />
              </div>
            ))}
          </div>
          
          {/* Total row */}
          <div className="bg-gray-50 px-4 py-3">
            <div className="flex justify-end">
              <div className="w-48">
                <div className="flex justify-between py-2 text-sm font-medium">
                  <span className="text-gray-600">TOTAL AMOUNT</span>
                  <span className="text-gray-900 font-semibold">{totalAmount} $</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
  );
};

export default LineItemsSection;
