
import React, { useCallback, useState } from 'react';
import { Upload, FileImage, AlertCircle, Loader, CheckCircle2, MaximizeIcon, MinimizeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { extractDataFromReceipt, detectDataMismatch } from '@/utils/ocrUtils';
import { Button } from '@/components/ui/button';

interface ReceiptPreviewProps {
  receiptUrl: string;
  receiptName: string;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  dragActive: boolean;
  onReceiptChange: (name: string, url: string) => void;
  onOcrDataExtracted?: (data: any) => void;
  currentValues?: Record<string, any>;
}

const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({
  receiptUrl,
  receiptName,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  dragActive,
  onReceiptChange,
  onOcrDataExtracted,
  currentValues
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrComplete, setOcrComplete] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        // Generate a placeholder receipt URL
        const newReceiptUrl = `receipt-${Date.now()}`;
        onReceiptChange(file.name, newReceiptUrl);
        
        // Process with OCR if callback provided
        if (onOcrDataExtracted) {
          setIsProcessing(true);
          try {
            const extractedData = await extractDataFromReceipt(newReceiptUrl);
            
            // Check for mismatches if we have current values
            if (currentValues) {
              const mismatches = detectDataMismatch(extractedData, currentValues);
              if (mismatches) {
                toast.warning(`Data mismatch detected in ${mismatches.join(', ')}. Please verify.`, {
                  duration: 5000
                });
              }
            }
            
            onOcrDataExtracted(extractedData);
            setOcrComplete(true);
            toast.success('Receipt data extracted successfully');
          } catch (error) {
            toast.error('Failed to extract data from receipt');
            console.error(error);
          } finally {
            setIsProcessing(false);
          }
        } else {
          toast.success(`Receipt uploaded: ${file.name}`);
        }
      } else {
        toast.error('Please upload an image or PDF file');
      }
    }
  }, [onReceiptChange, onOcrDataExtracted, currentValues]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={cn(
      "bg-gray-50 flex flex-col border border-gray-200 rounded-md h-full transition-all duration-300",
      expanded ? "w-full" : "w-full"
    )}>
      <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-700">Receipt Preview</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0" 
          onClick={toggleExpanded}
        >
          {expanded ? <MinimizeIcon className="h-4 w-4" /> : <MaximizeIcon className="h-4 w-4" />}
        </Button>
      </div>
      
      <div 
        className="flex-1 p-4 flex flex-col items-center justify-center"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {receiptUrl ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <img 
              src={`/public/lovable-uploads/fc953625-155a-4230-9515-5801b4d67e6f.png`} 
              alt="Receipt" 
              className="max-w-full max-h-[300px] object-contain rounded-md shadow-sm" 
            />
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">
                {receiptName}
              </span>
              {isProcessing && (
                <div className="flex items-center text-blue-500">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-xs ml-1">Processing...</span>
                </div>
              )}
              {ocrComplete && !isProcessing && (
                <div className="flex items-center text-green-500">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs ml-1">Data extracted</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div 
            className={cn(
              "flex flex-col items-center justify-center bg-white rounded-md border border-dashed p-6 w-full h-full transition-colors",
              dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
            )}
          >
            <FileImage className="h-12 w-12 text-gray-300 mb-3" />
            <p className="text-gray-700 text-center font-medium mb-2">Upload Receipt</p>
            <p className="text-gray-500 text-sm text-center mb-4">
              Drag and drop your receipt image or PDF here
            </p>
            
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleFileInput}
              />
              <div className="px-4 py-2 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Browse Files</span>
              </div>
            </label>
            
            <div className="mt-4 flex items-center text-amber-600 text-xs">
              <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
              <span>Supported formats: JPEG, PNG, PDF</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptPreview;
