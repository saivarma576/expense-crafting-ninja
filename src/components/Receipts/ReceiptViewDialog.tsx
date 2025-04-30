
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, FileText, Store, X, Upload, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { extractDataFromReceipt } from '@/utils/ocrUtils';

interface ReceiptViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receipt: {
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
    merchantName?: string;
    extractedData?: {
      date?: string;
      amount?: number;
      category?: string;
      merchantName?: string;
    };
  };
}

const ReceiptViewDialog: React.FC<ReceiptViewDialogProps> = ({
  open,
  onOpenChange,
  receipt
}) => {
  const [extractedData, setExtractedData] = useState(receipt.extractedData || null);
  const [isExtracting, setIsExtracting] = useState(false);

  const handleExtractData = async () => {
    if (isExtracting) return;
    
    setIsExtracting(true);
    toast({
      title: "Processing Receipt",
      description: "Extracting data from your receipt...",
    });
    
    try {
      const data = await extractDataFromReceipt(receipt.thumbnailUrl);
      setExtractedData(data);
      toast({
        title: "Data Extracted",
        description: "Successfully extracted data from receipt.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Extraction Failed",
        description: "Could not extract data from receipt.",
      });
      console.error("Error extracting data:", error);
    } finally {
      setIsExtracting(false);
    }
  };

  // Format display date
  const formattedDate = extractedData?.date 
    ? new Date(extractedData.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })
    : '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 h-[85vh] flex flex-col overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl">Receipt Details</DialogTitle>
            <DialogClose className="opacity-70 transition-opacity hover:opacity-100 rounded-full">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Left side - Receipt Image */}
          <div className="w-1/2 border-r p-6 flex flex-col">
            <h3 className="text-lg font-medium mb-4">Receipt Preview</h3>
            <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
              {receipt.thumbnailUrl ? (
                <img 
                  src="/public/lovable-uploads/c25ec8b2-82fd-45df-819a-dd18648be446.png" 
                  alt="Receipt"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-center p-6">
                  <FileText className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500">No receipt image available</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Right side - Extracted Data */}
          <div className="w-1/2 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Extracted Data</h3>
              {!extractedData && (
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleExtractData}
                  disabled={isExtracting}
                  className="flex items-center gap-1"
                >
                  {isExtracting ? "Extracting..." : "Extract Data"}
                </Button>
              )}
            </div>
            
            {extractedData ? (
              <div className="space-y-6">
                {/* Merchant */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Merchant Name</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                    <Store className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900">{extractedData.merchantName || "Unknown Merchant"}</span>
                  </div>
                </div>
                
                {/* Amount */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Amount</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900">${extractedData.amount?.toFixed(2) || "0.00"}</span>
                  </div>
                </div>
                
                {/* Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900">{formattedDate || "Unknown Date"}</span>
                  </div>
                </div>
                
                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Expense Category</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900">{extractedData.category || "Uncategorized"}</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full" onClick={() => {
                    if (receipt.draftId) {
                      toast({
                        title: "Opening Draft",
                        description: "Redirecting to your expense draft."
                      });
                    } else {
                      toast({
                        title: "Creating Expense",
                        description: "Creating a new expense from receipt data."
                      });
                    }
                    onOpenChange(false);
                  }}>
                    {receipt.draftId ? "Open Expense Draft" : "Create Expense From Receipt"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center p-6 border border-dashed border-gray-300 rounded-lg">
                <AlertCircle className="h-12 w-12 mx-auto text-amber-500 mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">No Data Extracted Yet</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Click "Extract Data" to process this receipt and extract information
                </p>
                <Button 
                  variant="outline"
                  onClick={handleExtractData}
                  disabled={isExtracting}
                  className="mx-auto"
                >
                  {isExtracting ? "Processing..." : "Extract Data"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptViewDialog;
