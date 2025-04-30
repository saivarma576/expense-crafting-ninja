
import React from 'react';
import { Inbox, Plus, Archive } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ReceiptCard from './ReceiptCard';

interface ReceiptGridProps {
  receipts: {
    id: string;
    name: string;
    date: string;
    category: string;
    status: 'processed' | 'pending' | 'error';
    amount?: number;
    source: 'email' | 'upload' | 'capture';
    thumbnailUrl: string;
    type: 'pdf' | 'image';
    draftId?: string;
    expenseId?: string;
  }[];
  onViewReceipt: (receiptId: string) => void;
  onDownloadReceipt: (receiptId: string) => void;
  onOpenDraft: (draftId: string) => void;
  onViewExpense?: (expenseId: string) => void;
  onArchive?: (receiptId: string) => void;
  onCreateExpense?: (receiptIds: string[]) => void;
  onClearFilters?: () => void;
}

const ReceiptGrid: React.FC<ReceiptGridProps> = ({
  receipts,
  onViewReceipt,
  onDownloadReceipt,
  onOpenDraft,
  onViewExpense,
  onArchive,
  onCreateExpense,
  onClearFilters
}) => {
  const [selectedReceipts, setSelectedReceipts] = React.useState<string[]>([]);
  const [selectionMode, setSelectionMode] = React.useState<boolean>(false);
  
  // Toggle selection mode
  const toggleSelectionMode = () => {
    if (selectionMode) {
      // If turning off selection mode, clear selected receipts
      setSelectedReceipts([]);
    }
    setSelectionMode(!selectionMode);
  };
  
  // Toggle receipt selection
  const toggleReceiptSelection = (receiptId: string) => {
    setSelectedReceipts(prevSelected => {
      if (prevSelected.includes(receiptId)) {
        return prevSelected.filter(id => id !== receiptId);
      } else {
        return [...prevSelected, receiptId];
      }
    });
  };
  
  // Handle archive for selected receipts
  const handleArchiveSelected = () => {
    if (onArchive && selectedReceipts.length > 0) {
      selectedReceipts.forEach(id => onArchive(id));
      setSelectedReceipts([]);
    }
  };
  
  // Handle create expense from selected receipts
  const handleCreateExpense = () => {
    if (onCreateExpense && selectedReceipts.length > 0) {
      onCreateExpense(selectedReceipts);
    }
  };

  if (receipts.length === 0) {
    return (
      <div className="text-center py-16">
        <Inbox className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-1">No receipts found</h3>
        <p className="text-gray-500 mb-6">No receipts match your current search or filter criteria</p>
        <Button 
          variant="outline"
          className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Selection controls */}
      {receipts.length > 0 && (
        <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-y border-gray-200">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSelectionMode}
              className={selectionMode ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
            >
              {selectionMode ? "Cancel Selection" : "Select Multiple"}
            </Button>
            
            {selectionMode && selectedReceipts.length > 0 && (
              <span className="text-sm text-gray-600">
                {selectedReceipts.length} selected
              </span>
            )}
          </div>
          
          {selectionMode && selectedReceipts.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleArchiveSelected}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Archive className="h-4 w-4 mr-1" />
                Archive
              </Button>
              
              <Button
                size="sm"
                onClick={handleCreateExpense}
              >
                <Plus className="h-4 w-4 mr-1" />
                Create Expense
              </Button>
            </div>
          )}
        </div>
      )}
      
      {/* Receipts grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 p-3">
        {receipts.map((receipt) => (
          <ReceiptCard
            key={receipt.id}
            receipt={receipt}
            onViewReceipt={onViewReceipt}
            onDownloadReceipt={onDownloadReceipt}
            onOpenDraft={onOpenDraft}
            onViewExpense={onViewExpense}
            onArchive={selectionMode ? undefined : onArchive}
            isSelected={selectedReceipts.includes(receipt.id)}
            onToggleSelect={selectionMode ? toggleReceiptSelection : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default ReceiptGrid;
