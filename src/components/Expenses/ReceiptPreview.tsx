
import React from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReceiptPreviewProps {
  receiptUrl: string;
  receiptName: string;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  dragActive: boolean;
}

const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({
  receiptUrl,
  receiptName,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  dragActive
}) => {
  return (
    <div className="w-full bg-gray-50 flex flex-col border-l border-gray-200 h-full">
      <h3 className="text-xs font-medium text-gray-700 p-3 border-b border-gray-200">Receipt Preview</h3>
      
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
              className="max-w-full max-h-[90%] object-contain rounded-md shadow-sm" 
            />
            <div className="mt-2 text-xs text-gray-500">
              {receiptName}
            </div>
          </div>
        ) : (
          <div 
            className={cn(
              "flex flex-col items-center justify-center bg-white rounded-md border border-dashed p-8 w-full h-full transition-colors",
              dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
            )}
          >
            <Upload className="h-12 w-12 text-gray-300 mb-3" />
            <p className="text-gray-500 text-center mb-1">Drop your receipt here</p>
            <p className="text-gray-400 text-xs text-center">
              Drag and drop or click 'Upload' to add a receipt
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptPreview;
