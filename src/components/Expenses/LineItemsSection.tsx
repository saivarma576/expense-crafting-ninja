import React, { useState } from 'react';
import { PolicyViolation } from '@/utils/policyValidations';
import { PlusCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExpenseCard from '@/components/Expenses/ExpenseCard';
import LineItemDisplayDialog from './LineItemDisplayDialog';
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
  const [selectedItem, setSelectedItem] = useState<ExpenseLineItem | undefined>();
  const [showDisplayDialog, setShowDisplayDialog] = useState(false);

  const handleViewItem = (item: ExpenseLineItem) => {
    setSelectedItem(item);
    setShowDisplayDialog(true);
  };

  const handleAddComment = (itemId: string, violationId: string, comment: string) => {
    if (onAddViolationComment) {
      onAddViolationComment(itemId, violationId, comment);
      toast.success('Comment added successfully');
    }
  };

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
        <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm w-full bg-white">
          {/* Header row */}
          <div className="flex items-center px-6 py-3 bg-gray-50/80 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="w-3/12">Expense</div>
            <div className="w-3/12">Type</div>
            <div className="w-2/12">Date</div>
            <div className="w-2/12 text-right">Amount</div>
            <div className="w-2/12 text-right">Actions</div>
          </div>
          
          {/* Line items */}
          <div className="divide-y divide-gray-100 divide-dotted">
            {processedLineItems.map((item) => (
              <div key={item.id} className="relative py-3 px-6 hover:bg-gray-50/50 transition-all duration-200">
                <div className="flex items-center w-full">
                  <div className="w-3/12">
                    <span className="text-[15px] font-medium text-gray-900">{item.title}</span>
                  </div>
                  
                  <div className="w-3/12">
                    <span className="text-sm text-gray-600">{item.type}</span>
                  </div>
                  
                  <div className="w-2/12">
                    <span className="text-sm text-gray-600">{item.date}</span>
                  </div>
                  
                  <div className="w-2/12 text-right">
                    <span className="text-sm font-medium text-gray-900">${item.amount.toFixed(2)}</span>
                  </div>
                  
                  <div className="w-2/12 flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewItem(item)}
                      className="h-7 w-7 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span className="sr-only">View Details</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditLineItem(item.id)}
                      className="h-7 w-7 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Total row */}
          <div className="bg-gray-50/80 px-6 py-3 border-t border-gray-100">
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

      <LineItemDisplayDialog
        isOpen={showDisplayDialog}
        onClose={() => setShowDisplayDialog(false)}
        item={selectedItem}
      />
    </div>
  );
};

export default LineItemsSection;
