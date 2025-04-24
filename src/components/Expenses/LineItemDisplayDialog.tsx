
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LineItemDisplayDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item?: {
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
  };
}

const LineItemDisplayDialog: React.FC<LineItemDisplayDialogProps> = ({
  isOpen,
  onClose,
  item
}) => {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            {item.category} {item.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Type</label>
              <p className="mt-1 text-sm text-gray-900">{item.type}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Date</label>
              <p className="mt-1 text-sm text-gray-900">{item.date}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Amount</label>
              <p className="mt-1 text-sm text-gray-900">${item.amount.toFixed(2)}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">GL Account</label>
              <p className="mt-1 text-sm text-gray-900">{item.account}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Cost Center</label>
              <p className="mt-1 text-sm text-gray-900">{item.costCenter}</p>
            </div>
            
            {item.receiptName && (
              <div>
                <label className="text-sm font-medium text-gray-500">Receipt</label>
                <p className="mt-1 text-sm text-gray-900">{item.receiptName}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LineItemDisplayDialog;
