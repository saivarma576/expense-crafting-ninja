
import React, { useState } from 'react';
import { 
  Search, Upload, Inbox, CheckCircle2, Clock, Eye, Download, 
  FileText, Mail, MailOpen, Archive, Ban 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

interface ReceiptItem {
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
}

const Receipts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('email');
  
  // Mock data
  const receipts: ReceiptItem[] = [
    {
      id: 'rec-001',
      name: 'Hilton Hotel NYC',
      date: '2023-10-14',
      category: 'hotel',
      status: 'processed',
      amount: 345.87,
      source: 'email',
      thumbnailUrl: 'https://placehold.co/600x400?text=Hotel+Receipt',
      type: 'pdf',
      draftId: 'draft-001'
    },
    {
      id: 'rec-002',
      name: 'Delta Airlines',
      date: '2023-10-12',
      category: 'airfare',
      status: 'processed',
      amount: 542.33,
      source: 'email',
      thumbnailUrl: 'https://placehold.co/600x400?text=Airfare+Receipt',
      type: 'image'
    },
    {
      id: 'rec-003',
      name: 'Uber Ride',
      date: '2023-10-15',
      category: 'transport',
      status: 'processed',
      amount: 28.45,
      source: 'email',
      thumbnailUrl: 'https://placehold.co/600x400?text=Uber+Receipt',
      type: 'image',
      draftId: 'draft-002'
    },
    {
      id: 'rec-004',
      name: 'Office Depot',
      date: '2023-10-25',
      category: 'other',
      status: 'pending',
      source: 'upload',
      thumbnailUrl: 'https://placehold.co/600x400?text=Office+Supplies',
      type: 'pdf'
    },
    {
      id: 'rec-005',
      name: 'Restaurant Receipt',
      date: '2023-11-03',
      category: 'meals',
      status: 'error',
      source: 'capture',
      thumbnailUrl: 'https://placehold.co/600x400?text=Restaurant+Receipt',
      type: 'image'
    },
    {
      id: 'rec-006',
      name: 'Enterprise Car Rental',
      date: '2023-11-02',
      category: 'rental',
      status: 'pending',
      source: 'email',
      thumbnailUrl: 'https://placehold.co/600x400?text=Car+Rental',
      type: 'pdf'
    }
  ];
  
  // Filter receipts by tab and search/filter
  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !selectedFilter || receipt.status === selectedFilter;
    const matchesTab = (
      (activeTab === 'email' && receipt.source === 'email') ||
      (activeTab === 'captured' && receipt.source === 'capture') ||
      (activeTab === 'uploaded' && receipt.source === 'upload') ||
      (activeTab === 'all')
    );
    
    return matchesSearch && matchesFilter && matchesTab;
  });
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'processed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <Ban className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: string) => {
    switch(status) {
      case 'processed':
        return 'Processed';
      case 'pending':
        return 'Processing';
      case 'error':
        return 'Error';
      default:
        return status;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'pdf' ? <FileText className="h-5 w-5" /> : <Eye className="h-5 w-5" />;
  };

  const handleUploadReceipt = () => {
    // In a real app, this would trigger a file upload dialog
    toast.success("Receipt upload initiated");
  };

  const handleViewReceipt = (receiptId: string) => {
    toast.info(`Viewing receipt ${receiptId}`);
  };

  const handleDownloadReceipt = (receiptId: string) => {
    toast.success(`Downloading receipt ${receiptId}`);
  };

  const handleOpenDraft = (draftId: string) => {
    toast.info(`Opening draft expense ${draftId}`);
    // In a real app, this would navigate to the draft expense page
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Receipts</h1>
        <Button 
          className="bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
          onClick={handleUploadReceipt}
        >
          <Upload className="h-5 w-5 mr-2" />
          Upload Receipt
        </Button>
      </div>
      
      <Card className="border-gray-200 shadow-sm overflow-hidden">
        <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-gray-200">
            <div className="px-4 py-3">
              <TabsList className="bg-gray-100/80 p-1 grid grid-cols-4 gap-2">
                <TabsTrigger value="email" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>Email</span>
                </TabsTrigger>
                <TabsTrigger value="captured" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <MailOpen className="h-4 w-4 mr-2" />
                  <span>Captured</span>
                </TabsTrigger>
                <TabsTrigger value="uploaded" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Upload className="h-4 w-4 mr-2" />
                  <span>Uploaded</span>
                </TabsTrigger>
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Archive className="h-4 w-4 mr-2" />
                  <span>All</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-200">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search receipts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedFilter(null)}
                  className={`px-3 py-1.5 h-auto border-gray-300 ${
                    selectedFilter === null 
                      ? 'bg-gray-100 text-gray-800 border-gray-300' 
                      : 'bg-white text-gray-700'
                  }`}
                >
                  All
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedFilter('processed')}
                  className={`px-3 py-1.5 h-auto border-gray-300 ${
                    selectedFilter === 'processed' 
                      ? 'bg-green-50 text-green-800 border-green-200' 
                      : 'bg-white text-gray-700'
                  }`}
                >
                  Processed
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedFilter('pending')}
                  className={`px-3 py-1.5 h-auto border-gray-300 ${
                    selectedFilter === 'pending' 
                      ? 'bg-amber-50 text-amber-800 border-amber-200' 
                      : 'bg-white text-gray-700'
                  }`}
                >
                  Processing
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedFilter('error')}
                  className={`px-3 py-1.5 h-auto border-gray-300 ${
                    selectedFilter === 'error' 
                      ? 'bg-red-50 text-red-800 border-red-200' 
                      : 'bg-white text-gray-700'
                  }`}
                >
                  Error
                </Button>
              </div>
            </div>
          </div>

          <TabsContent value="email" className="m-0">
            <ReceiptGrid 
              receipts={filteredReceipts} 
              getStatusIcon={getStatusIcon}
              getStatusText={getStatusText}
              getTypeIcon={getTypeIcon}
              onViewReceipt={handleViewReceipt}
              onDownloadReceipt={handleDownloadReceipt}
              onOpenDraft={handleOpenDraft}
            />
          </TabsContent>
          <TabsContent value="captured" className="m-0">
            <ReceiptGrid 
              receipts={filteredReceipts}
              getStatusIcon={getStatusIcon}
              getStatusText={getStatusText}
              getTypeIcon={getTypeIcon}
              onViewReceipt={handleViewReceipt}
              onDownloadReceipt={handleDownloadReceipt}
              onOpenDraft={handleOpenDraft}
            />
          </TabsContent>
          <TabsContent value="uploaded" className="m-0">
            <ReceiptGrid 
              receipts={filteredReceipts}
              getStatusIcon={getStatusIcon}
              getStatusText={getStatusText}
              getTypeIcon={getTypeIcon}
              onViewReceipt={handleViewReceipt}
              onDownloadReceipt={handleDownloadReceipt}
              onOpenDraft={handleOpenDraft}
            />
          </TabsContent>
          <TabsContent value="all" className="m-0">
            <ReceiptGrid 
              receipts={filteredReceipts}
              getStatusIcon={getStatusIcon}
              getStatusText={getStatusText}
              getTypeIcon={getTypeIcon}
              onViewReceipt={handleViewReceipt}
              onDownloadReceipt={handleDownloadReceipt}
              onOpenDraft={handleOpenDraft}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

interface ReceiptGridProps {
  receipts: ReceiptItem[];
  getStatusIcon: (status: string) => JSX.Element | null;
  getStatusText: (status: string) => string;
  getTypeIcon: (type: string) => JSX.Element;
  onViewReceipt: (receiptId: string) => void;
  onDownloadReceipt: (receiptId: string) => void;
  onOpenDraft: (draftId: string) => void;
}

const ReceiptGrid: React.FC<ReceiptGridProps> = ({
  receipts,
  getStatusIcon,
  getStatusText,
  getTypeIcon,
  onViewReceipt,
  onDownloadReceipt,
  onOpenDraft
}) => {
  if (receipts.length === 0) {
    return (
      <div className="text-center py-16 border-t border-gray-100">
        <Inbox className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-1">No receipts found</h3>
        <p className="text-gray-500 mb-6">No receipts match your current search or filter criteria</p>
        <Button 
          variant="outline"
          className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 bg-gray-50">
      {receipts.map((receipt) => (
        <Card 
          key={receipt.id}
          className="overflow-hidden border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 bg-white"
        >
          <div className="aspect-video relative bg-gray-100">
            <img 
              src={receipt.thumbnailUrl} 
              alt={receipt.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <div className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center shadow-sm ${
                receipt.status === 'processed' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : receipt.status === 'pending'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {getStatusIcon(receipt.status)}
                <span className="ml-1.5">{getStatusText(receipt.status)}</span>
              </div>
            </div>
            
            {/* Source badge */}
            <div className="absolute top-3 left-3">
              <div className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/90 text-gray-700 shadow-sm border border-gray-200 backdrop-blur-sm">
                {receipt.source === 'email' ? (
                  <Mail className="h-3.5 w-3.5" />
                ) : receipt.source === 'capture' ? (
                  <MailOpen className="h-3.5 w-3.5" />
                ) : (
                  <Upload className="h-3.5 w-3.5" />
                )}
              </div>
            </div>
            
            {/* Type badge */}
            <div className="absolute bottom-3 left-3">
              <div className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/90 text-gray-700 shadow-sm border border-gray-200 backdrop-blur-sm">
                {receipt.type === 'pdf' ? 'PDF' : 'Image'}
              </div>
            </div>
          </div>
          
          <CardContent className="p-4">
            <h3 className="font-medium text-lg text-gray-900 mb-1">{receipt.name}</h3>
            <p className="text-sm text-gray-500 mb-3">
              {new Date(receipt.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
            
            <div className="flex justify-between items-center mb-4">
              <div className="bg-gray-100 rounded-full px-2.5 py-1 text-xs font-medium text-gray-700 capitalize">
                {receipt.category}
              </div>
              {receipt.amount && (
                <span className="font-semibold text-gray-900">${receipt.amount.toFixed(2)}</span>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <TooltipProvider>
                <div className="flex space-x-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                        onClick={() => onViewReceipt(receipt.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">View Receipt</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                        onClick={() => onDownloadReceipt(receipt.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
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
                        className="h-8 border-blue-200 bg-blue-50/50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 text-xs"
                        onClick={() => onOpenDraft(receipt.draftId!)}
                      >
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        Open Draft
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Open draft expense for editing</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Receipts;
