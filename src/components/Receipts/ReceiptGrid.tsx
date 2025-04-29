
import React from 'react';
import { Inbox } from 'lucide-react';
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
  }[];
  onViewReceipt: (receiptId: string) => void;
  onDownloadReceipt: (receiptId: string) => void;
  onOpenDraft: (draftId: string) => void;
  onClearFilters?: () => void;
}

const ReceiptGrid: React.FC<ReceiptGridProps> = ({
  receipts,
  onViewReceipt,
  onDownloadReceipt,
  onOpenDraft,
  onClearFilters
}) => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {receipts.map((receipt) => (
        <ReceiptCard
          key={receipt.id}
          receipt={receipt}
          onViewReceipt={onViewReceipt}
          onDownloadReceipt={onDownloadReceipt}
          onOpenDraft={onOpenDraft}
        />
      ))}
    </div>
  );
};

export default ReceiptGrid;
