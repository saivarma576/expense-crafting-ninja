
import React from 'react';
import { 
  Eye, Download, FileText, Clock, CheckCircle2, Ban, ExternalLink,
  Airplay, Car, Coffee, Building2, Briefcase, FileImage, Archive
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
    expenseId?: string;
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
  onViewExpense?: (expenseId: string) => void;
  onArchive?: (receiptId: string) => void;
  isSelected?: boolean;
  onToggleSelect?: (receiptId: string) => void;
}

const ReceiptCard: React.FC<ReceiptCardProps> = ({
  receipt,
  onViewReceipt,
  onDownloadReceipt,
  onOpenDraft,
  onViewExpense,
  onArchive,
  isSelected = false,
  onToggleSelect
}) => {
  // Get category icon component
  const getCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'airfare':
        return <Airplay className="h-6 w-6 text-blue-500" />; // Changed from Airplane to Airplay
      case 'hotel':
        return <Building2 className="h-6 w-6 text-purple-500" />;
      case 'meals':
        return <Coffee className="h-6 w-6 text-red-500" />;
      case 'transport':
        return <Car className="h-6 w-6 text-green-500" />;
      case 'rental':
        return <Car className="h-6 w-6 text-amber-500" />;
      default:
        return <Briefcase className="h-6 w-6 text-gray-500" />;
    }
  };

  // Get status badge component
  const StatusBadge = () => {
    switch(receipt.status) {
      case 'processed':
        return (
          <Badge variant="custom" className="absolute top-1 right-1 flex items-center gap-1 shadow-sm text-[10px] bg-green-100 text-green-800 border-green-200">
            <CheckCircle2 className="h-2.5 w-2.5" />
            <span>Processed</span>
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="custom" className="absolute top-1 right-1 flex items-center gap-1 shadow-sm text-[10px] bg-blue-100 text-blue-800 border-blue-200">
            <Clock className="h-2.5 w-2.5 animate-pulse" />
            <span>New</span>
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="custom" className="absolute top-1 right-1 flex items-center gap-1 shadow-sm text-[10px] bg-red-100 text-red-800 border-red-200">
            <Ban className="h-2.5 w-2.5" />
            <span>Archived</span>
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
    <div className={cn(
      "overflow-hidden rounded-md border bg-white shadow-sm hover:shadow-md transition-all duration-200 flex flex-col",
      isSelected ? "border-blue-400 ring-2 ring-blue-200" : "border-gray-100 hover:border-gray-300"
    )}>
      <div className="relative aspect-[4/3] bg-gray-50">
        {/* Checkbox for selection */}
        {onToggleSelect && (
          <div className="absolute top-1 left-1 z-10">
            <Checkbox 
              checked={isSelected}
              onCheckedChange={() => onToggleSelect(receipt.id)}
              className="bg-white border-gray-300"
            />
          </div>
        )}
        
        {/* Receipt Thumbnail */}
        {hasCustomThumbnail ? (
          <img 
            src={receipt.thumbnailUrl} 
            alt={merchantName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            {receipt.type === 'pdf' ? (
              <div className="flex flex-col items-center justify-center">
                <FileText className="h-8 w-8 text-red-500" />
                <span className="text-[10px] text-gray-500 mt-1">PDF</span>
              </div>
            ) : receipt.type === 'image' ? (
              <div className="flex flex-col items-center justify-center">
                <FileImage className="h-8 w-8 text-blue-500" />
                <span className="text-[10px] text-gray-500 mt-1">Image</span>
              </div>
            ) : (
              getCategoryIcon(receipt.category)
            )}
          </div>
        )}
        
        {/* Status Badge */}
        <StatusBadge />
        
        {/* Category Tag */}
        <div className="absolute bottom-1 right-1">
          <Badge variant="outline" className="capitalize bg-white/80 backdrop-blur-sm text-gray-700 border shadow-sm text-[10px]" size="sm">
            {receipt.category}
          </Badge>
        </div>
      </div>
      
      {/* Receipt info */}
      <div className="p-2 space-y-1 flex-1">
        {/* Title and Date */}
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <TruncatedText 
              text={merchantName}
              className="font-medium text-xs text-gray-900"
              maxLength={15}
            />
            <p className="text-[10px] text-gray-500 mt-0.5">
              {formattedDate}
            </p>
          </div>
          
          {/* Amount if available */}
          {(receipt.amount || (receipt.extractedData && receipt.extractedData.amount)) ? (
            <span className="font-bold text-xs text-gray-900 ml-1">
              ${(receipt.amount || receipt.extractedData?.amount || 0).toFixed(2)}
            </span>
          ) : (
            <span className="font-medium text-xs text-gray-500 ml-1">-</span>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <TooltipProvider>
            <div className="flex space-x-0.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-0"
                    onClick={() => onViewReceipt(receipt.id)}
                  >
                    <Eye className="h-3 w-3" />
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
                    className="h-6 w-6 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-0"
                    onClick={() => onDownloadReceipt(receipt.id)}
                  >
                    <Download className="h-3 w-3" />
                    <span className="sr-only">Download Receipt</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs">Download Receipt</p>
                </TooltipContent>
              </Tooltip>
              
              {onArchive && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 p-0"
                      onClick={() => onArchive(receipt.id)}
                    >
                      <Archive className="h-3 w-3" />
                      <span className="sr-only">Archive Receipt</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="text-xs">Archive Receipt</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </TooltipProvider>
        </div>
      </div>
      
      {/* View Expense or Draft button - Full width at bottom for all cards */}
      <div className="px-2 pb-2 w-full">
        <TooltipProvider>
          {receipt.expenseId ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full h-7 bg-gradient-to-b from-green-50 to-green-100 border-green-200 text-green-600 hover:text-green-700 hover:bg-green-100 text-xs rounded shadow-sm flex items-center justify-center gap-1"
                  onClick={() => onViewExpense && onViewExpense(receipt.expenseId!)}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Expense
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">View the created expense</p>
              </TooltipContent>
            </Tooltip>
          ) : receipt.draftId ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full h-7 bg-gradient-to-b from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100 text-xs rounded shadow-sm flex items-center justify-center gap-1"
                  onClick={() => onOpenDraft(receipt.draftId!)}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View drafted expense
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">View or edit your drafted expense</p>
              </TooltipContent>
            </Tooltip>
          ) : null}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ReceiptCard;
