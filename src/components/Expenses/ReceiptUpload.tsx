
import React, { useState } from 'react';
import { Paperclip, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReceiptUploadProps {
  receiptName: string;
  receiptUrl: string;
  onReceiptChange: (name: string, url: string) => void;
}

const ReceiptUpload: React.FC<ReceiptUploadProps> = ({
  receiptName,
  receiptUrl,
  onReceiptChange
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onReceiptChange(file.name, `receipt-${Date.now()}`);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      onReceiptChange(file.name, `receipt-${Date.now()}`);
    }
  };

  return (
    <div className="mb-3">
      <label className="text-xs font-medium text-gray-700 block mb-1">Receipt</label>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <div className="relative flex items-center">
            <div className="absolute left-2 text-gray-500">
              <Paperclip className="h-3.5 w-3.5" />
            </div>
            <input
              type="text"
              className="pl-7 w-full h-8 rounded-md border border-gray-300 bg-transparent px-2 py-1 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="No receipt attached"
              value={receiptName || ''}
              readOnly
            />
            {receiptName && (
              <button
                type="button"
                onClick={() => onReceiptChange('', '')}
                className="absolute right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
        
        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
          />
          <div className="px-2 py-1 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
            <Upload className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Upload</span>
          </div>
        </label>
      </div>
      
      {/* Drag and drop functionality handled in ReceiptPreview */}
    </div>
  );
};

export default ReceiptUpload;
