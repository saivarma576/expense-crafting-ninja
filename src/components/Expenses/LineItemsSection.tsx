
import React from 'react';
import { PolicyViolation } from '@/utils/policyValidations';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExpenseCard from '@/components/Expenses/ExpenseCard';
import { PolicyComment } from '@/utils/policyValidations';
import { toast } from 'sonner';

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
  policyViolations?: PolicyViolation[];
}

interface LineItemsSectionProps {
  lineItems: ExpenseLineItem[];
  handleAddLineItem: () => void;
  handleEditLineItem: (id: string) => void;
  handleDeleteLineItem: (id: string) => void;
  totalAmount: string;
  onAddViolationComment?: (itemId: string, violationId: string, comment: string) => void;
}

const LineItemsSection: React.FC<LineItemsSectionProps> = ({
  lineItems,
  handleAddLineItem,
  handleEditLineItem,
  handleDeleteLineItem,
  totalAmount,
  onAddViolationComment
}) => {
  const handleAddComment = (itemId: string, violationId: string, comment: string) => {
    if (onAddViolationComment) {
      onAddViolationComment(itemId, violationId, comment);
      toast.success('Comment added successfully');
    }
  };

  // Process line items to ensure City Cab (id: '3') has no policy violations
  const processedLineItems = lineItems.map(item => {
    if (item.id === '3') {
      return {
        ...item,
        policyViolations: []
      };
    }
    return item;
  });

  return (
    <div className="mb-8 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium text-[15px] text-gray-900">Line Items</h3>
        <Button 
          variant="default"
          size="sm" 
          onClick={handleAddLineItem}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-sm transition-all duration-200"
        >
          <PlusCircle className="h-4 w-4 mr-1.5" />
          Line Items
        </Button>
      </div>
      
      {processedLineItems.length > 0 ? (
        <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm w-full bg-white divide-y divide-gray-50">
          {/* Header row */}
          <div className="flex items-center px-6 py-3 bg-gray-50/50 text-xs font-medium text-gray-500">
            <div className="w-5/12 flex items-center space-x-2">EXPENSE</div>
            <div className="w-2/12">TYPE</div>
            <div className="w-2/12">DATE</div>
            <div className="w-2/12 text-right">AMOUNT</div>
            <div className="w-1/12"></div>
          </div>
          
          {/* Line items */}
          <div>
            {processedLineItems.map((item) => (
              <div key={item.id}>
                <ExpenseCard
                  item={item}
                  onEdit={() => handleEditLineItem(item.id)}
                  onDelete={() => handleDeleteLineItem(item.id)}
                  onAddViolationComment={
                    onAddViolationComment 
                      ? (violationId: string, comment: string) => 
                          handleAddComment(item.id, violationId, comment)
                      : undefined
                  }
                />
              </div>
            ))}
          </div>
          
          {/* Total row */}
          <div className="bg-gray-50/50 px-6 py-3">
            <div className="flex justify-end">
              <div className="w-36">
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-gray-600">TOTAL</span>
                  <span className="text-sm font-semibold text-gray-900">${totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border rounded-2xl p-6 text-center bg-gray-50 w-full">
          <div className="text-gray-500 mb-3">No expense items added yet</div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddLineItem}
            className="border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors duration-200"
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
