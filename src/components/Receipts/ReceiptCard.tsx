
import React from 'react';
import { 
  Eye, Download, FileText, Clock, CheckCircle2, Ban
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import TruncatedText from "@/components/ui/truncated-text";

interface ReceiptCardProps {
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
  };
  onViewReceipt: (receiptId: string) => void;
  onDownloadReceipt: (receiptId: string) => void;
  onOpenDraft: (draftId: string) => void;
}

const ReceiptCard: React.FC<ReceiptCardProps> = ({
  receipt,
  onViewReceipt,
  onDownloadReceipt,
  onOpenDraft
}) => {
  // Get status badge component
  const StatusBadge = () => {
    switch(receipt.status) {
      case 'processed':
        return (
          <Badge variant="success" className="absolute top-3 right-3 flex items-center gap-1 shadow-sm text-xs">
            <CheckCircle2 className="h-3 w-3" />
            <span>Processed</span>
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="warning" className="absolute top-3 right-3 flex items-center gap-1 shadow-sm text-xs">
            <Clock className="h-3 w-3 animate-pulse" />
            <span>Processing</span>
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="destructive" className="absolute top-3 right-3 flex items-center gap-1 shadow-sm text-xs">
            <Ban className="h-3 w-3" />
            <span>Error</span>
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 hover:border-gray-300 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
      <div className="relative aspect-[3/2] bg-gray-50">
        <img 
          src={receipt.thumbnailUrl} 
          alt={receipt.name}
          className="w-full h-full object-cover"
        />
        
        {/* Status Badge */}
        <StatusBadge />
        
        {/* Receipt Type Pill */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 border border-gray-100 shadow-sm">
          {receipt.type === 'pdf' ? 'PDF' : 'Image'}
        </div>

        {/* Category Tag */}
        <div className="absolute bottom-3 right-3">
          <Badge variant="outline" className="capitalize bg-white/80 backdrop-blur-sm text-gray-700 border shadow-sm text-xs font-medium">
            {receipt.category}
          </Badge>
        </div>
      </div>
      
      <div className="p-3 space-y-2">
        {/* Title and Date */}
        <div className="flex justify-between items-start">
          <div>
            <TruncatedText 
              text={receipt.name}
              className="font-medium text-base text-gray-900"
              maxLength={24}
            />
            <p className="text-xs text-gray-500 mt-0.5">
              {new Date(receipt.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
          
          {/* Amount if available */}
          {receipt.amount && (
            <span className="font-semibold text-base text-gray-900">${receipt.amount.toFixed(2)}</span>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <TooltipProvider>
            <div className="flex space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => onViewReceipt(receipt.id)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View Receipt</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs">View Receipt</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => onDownloadReceipt(receipt.id)}
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download Receipt</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs">Download Receipt</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            {receipt.draftId && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 bg-gradient-to-b from-blue-50 to-blue-100 border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-100 text-xs rounded-full shadow-sm"
                    onClick={() => onOpenDraft(receipt.draftId!)}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Open Draft
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs">Open draft expense for editing</p>
                </TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ReceiptCard;
