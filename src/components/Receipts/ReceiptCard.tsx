
import React from 'react';
import { 
  Eye, Download, FileText, Clock, CheckCircle2, Ban, ExternalLink,
  Airplay, Car, Coffee, Building2, Briefcase
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
    merchantName?: string;
    extractedData?: {
      date?: string;
      amount?: number;
      category?: string;
      merchantName?: string;
    };
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
  // Get category icon component
  const getCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'airfare':
        return <Airplay className="h-8 w-8 text-blue-500" />; // Changed from Airplane to Airplay
      case 'hotel':
        return <Building2 className="h-8 w-8 text-purple-500" />;
      case 'meals':
        return <Coffee className="h-8 w-8 text-red-500" />;
      case 'transport':
        return <Car className="h-8 w-8 text-green-500" />;
      case 'rental':
        return <Car className="h-8 w-8 text-amber-500" />;
      default:
        return <Briefcase className="h-8 w-8 text-gray-500" />;
    }
  };

  // Get status badge component
  const StatusBadge = () => {
    switch(receipt.status) {
      case 'processed':
        return (
          <Badge variant="success" className="absolute top-2 right-2 flex items-center gap-1 shadow-sm text-xs">
            <CheckCircle2 className="h-3 w-3" />
            <span>Processed</span>
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="warning" className="absolute top-2 right-2 flex items-center gap-1 shadow-sm text-xs">
            <Clock className="h-3 w-3 animate-pulse" />
            <span>Processing</span>
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="destructive" className="absolute top-2 right-2 flex items-center gap-1 shadow-sm text-xs">
            <Ban className="h-3 w-3" />
            <span>Error</span>
          </Badge>
        );
      default:
        return null;
    }
  };

  // Format display date
  const formattedDate = new Date(receipt.date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });

  // Get merchant name from either direct prop or extracted data
  const merchantName = receipt.merchantName || receipt.name;

  // Determine if we should use a custom thumbnail or the provided URL
  const hasCustomThumbnail = !receipt.thumbnailUrl.includes('placehold.co');

  return (
    <div className="overflow-hidden rounded-lg border border-gray-100 hover:border-gray-300 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
      <div className="relative aspect-[4/3] bg-gray-50">
        {hasCustomThumbnail ? (
          <img 
            src={receipt.thumbnailUrl} 
            alt={merchantName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            {getCategoryIcon(receipt.category)}
          </div>
        )}
        
        {/* Status Badge */}
        <StatusBadge />
        
        {/* Receipt Type Pill */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 border border-gray-100 shadow-sm">
          {receipt.type === 'pdf' ? 'PDF' : 'Image'}
        </div>

        {/* Category Tag */}
        <div className="absolute bottom-2 right-2">
          <Badge variant="outline" className="capitalize bg-white/80 backdrop-blur-sm text-gray-700 border shadow-sm text-xs font-medium">
            {receipt.category}
          </Badge>
        </div>
      </div>
      
      <div className="p-2.5 space-y-1.5">
        {/* Title and Date */}
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <TruncatedText 
              text={merchantName}
              className="font-medium text-sm text-gray-900"
              maxLength={20}
            />
            <p className="text-xs text-gray-500 mt-0.5">
              {formattedDate}
            </p>
          </div>
          
          {/* Amount if available */}
          {(receipt.amount || (receipt.extractedData && receipt.extractedData.amount)) && (
            <span className="font-bold text-sm text-gray-900 ml-2">
              ${(receipt.amount || receipt.extractedData?.amount || 0).toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-1.5 border-t border-gray-100">
          <TooltipProvider>
            <div className="flex space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => onViewReceipt(receipt.id)}
                  >
                    <Eye className="h-3.5 w-3.5" />
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
                    className="h-7 w-7 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => onDownloadReceipt(receipt.id)}
                  >
                    <Download className="h-3.5 w-3.5" />
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
                    className="h-6 bg-gradient-to-b from-blue-50 to-blue-100 border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-100 text-xs rounded-full shadow-sm flex items-center gap-1"
                    onClick={() => onOpenDraft(receipt.draftId!)}
                  >
                    <ExternalLink className="h-3 w-3 mr-0.5" />
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
