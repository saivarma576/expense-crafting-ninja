import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import MainTabs from './MainTabs';
import ReceiptFilters from './ReceiptFilters';
import ReceiptGrid from './ReceiptGrid';
import UploadButton from './UploadButton';
import { Upload, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
  merchantName?: string;
  expenseId?: string;
  extractedData?: {
    date?: string;
    amount?: number;
    category?: string;
    merchantName?: string;
  };
}

const Receipts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [activeMainTab, setActiveMainTab] = useState<string>('email');
  const [activeOption, setActiveOption] = useState<string>('inbox');
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  
  // Enhanced mock data for demonstration with more test items
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
      draftId: 'draft-001',
      merchantName: 'Hilton Hotels & Resorts',
      extractedData: {
        date: '2023-10-14',
        amount: 345.87,
        category: 'hotel',
        merchantName: 'Hilton Hotels & Resorts'
      }
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
      type: 'image',
      expenseId: 'exp-001',
      extractedData: {
        date: '2023-10-12',
        amount: 542.33,
        category: 'airfare',
        merchantName: 'Delta Airlines'
      }
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
      draftId: 'draft-002',
      merchantName: 'Uber',
      extractedData: {
        date: '2023-10-15',
        amount: 28.45,
        category: 'transport',
        merchantName: 'Uber Technologies Inc.'
      }
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
    },
    {
      id: 'rec-007',
      name: 'Marriott Hotel',
      date: '2023-11-10',
      category: 'hotel',
      status: 'processed',
      amount: 289.99,
      source: 'email',
      thumbnailUrl: 'https://placehold.co/600x400?text=Marriott+Receipt',
      type: 'pdf',
      merchantName: 'Marriott International',
      extractedData: {
        date: '2023-11-10',
        amount: 289.99,
        category: 'hotel',
        merchantName: 'Marriott International'
      }
    },
    {
      id: 'rec-008',
      name: 'United Airlines',
      date: '2023-11-15',
      category: 'airfare',
      status: 'pending',
      amount: 621.50,
      source: 'email',
      thumbnailUrl: 'https://placehold.co/600x400?text=United+Receipt',
      type: 'pdf',
      merchantName: 'United Airlines Inc.',
      extractedData: {
        date: '2023-11-15',
        amount: 621.50,
        category: 'airfare',
        merchantName: 'United Airlines Inc.'
      }
    },
    {
      id: 'rec-009',
      name: 'Lyft Ride',
      date: '2023-11-18',
      category: 'transport',
      status: 'processed',
      amount: 32.75,
      source: 'email',
      thumbnailUrl: 'https://placehold.co/600x400?text=Lyft+Receipt',
      type: 'image',
      merchantName: 'Lyft, Inc.',
      extractedData: {
        date: '2023-11-18',
        amount: 32.75,
        category: 'transport',
        merchantName: 'Lyft, Inc.'
      }
    },
    {
      id: 'rec-010',
      name: 'Staples',
      date: '2023-11-20',
      category: 'other',
      status: 'error',
      amount: 45.23,
      source: 'upload',
      thumbnailUrl: 'https://placehold.co/600x400?text=Staples+Receipt',
      type: 'image'
    },
    {
      id: 'rec-011',
      name: 'Cheesecake Factory',
      date: '2023-11-22',
      category: 'meals',
      status: 'pending',
      amount: 87.45,
      source: 'email',
      thumbnailUrl: 'https://placehold.co/600x400?text=Restaurant+Receipt',
      type: 'pdf',
      draftId: 'draft-003',
      merchantName: 'The Cheesecake Factory',
      extractedData: {
        date: '2023-11-22',
        amount: 87.45,
        category: 'meals',
        merchantName: 'The Cheesecake Factory'
      }
    },
    {
      id: 'rec-012',
      name: 'Avis Car Rental',
      date: '2023-11-25',
      category: 'rental',
      status: 'processed',
      amount: 175.34,
      source: 'email',
      thumbnailUrl: 'https://placehold.co/600x400?text=Avis+Receipt',
      type: 'image',
      merchantName: 'Avis Budget Group',
      extractedData: {
        date: '2023-11-25',
        amount: 175.34,
        category: 'rental',
        merchantName: 'Avis Budget Group'
      }
    },
    {
      id: 'rec-013',
      name: 'Apple Store',
      date: '2023-11-28',
      category: 'other',
      status: 'error',
      amount: 1299.99,
      source: 'capture',
      thumbnailUrl: 'https://placehold.co/600x400?text=Apple+Receipt',
      type: 'image'
    },
    {
      id: 'rec-014',
      name: 'Southwest Airlines',
      date: '2023-12-01',
      category: 'airfare',
      status: 'processed',
      amount: 324.76,
      source: 'email',
      thumbnailUrl: 'https://placehold.co/600x400?text=Southwest+Receipt',
      type: 'pdf',
      merchantName: 'Southwest Airlines',
      extractedData: {
        date: '2023-12-01',
        amount: 324.76,
        category: 'airfare',
        merchantName: 'Southwest Airlines'
      }
    },
    {
      id: 'rec-015',
      name: 'Chipotle',
      date: '2023-12-03',
      category: 'meals',
      status: 'pending',
      amount: 23.85,
      source: 'upload',
      thumbnailUrl: 'https://placehold.co/600x400?text=Chipotle+Receipt',
      type: 'image',
      merchantName: 'Chipotle Mexican Grill',
      extractedData: {
        date: '2023-12-03',
        amount: 23.85,
        category: 'meals',
        merchantName: 'Chipotle Mexican Grill'
      }
    }
  ];

  // Filter receipts based on selected tabs, filters, and search term
  const filteredReceipts = receipts.filter(receipt => {
    // Filter by search term
    const matchesSearch = receipt.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (receipt.merchantName && receipt.merchantName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by status filter
    const matchesFilter = !selectedFilter || receipt.status === selectedFilter;
    
    // Filter by main tab (source)
    const matchesMainTab = receipt.source === activeMainTab;
      
    // Filter by option (only when main tab is 'email')
    const matchesOption = activeMainTab !== 'email' || 
      (activeOption === 'inbox' && !receipt.draftId) || 
      (activeOption === 'upload' && receipt.draftId);
    
    // Filter by date range if set
    const matchesDateRange = !dateRange.from || !dateRange.to || 
      (new Date(receipt.date) >= dateRange.from && 
       new Date(receipt.date) <= dateRange.to);
    
    return matchesSearch && matchesFilter && matchesMainTab && matchesOption && matchesDateRange;
  });
  
  // Show subtabs only for email tab
  useEffect(() => {
    if (activeMainTab !== 'email') {
      setActiveOption('inbox'); // Default sub-tab
    }
  }, [activeMainTab]);
  
  // Handle search change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };
  
  // Handle filter change
  const handleFilterChange = (value: string | null) => {
    setSelectedFilter(value);
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedFilter(null);
    setDateRange({ from: undefined, to: undefined });
  };
  
  const handleUploadReceipt = () => {
    setActiveOption('upload');
    toast.success("Receipt upload initiated");
  };

  const handleCaptureReceipt = () => {
    setActiveOption('camera');
    toast.success("Receipt capture initiated");
  };

  const handleInboxView = () => {
    setActiveOption('inbox');
  };

  const handleViewReceipt = (receiptId: string) => {
    toast.info(`Viewing receipt ${receiptId}`);
  };

  const handleDownloadReceipt = (receiptId: string) => {
    toast.success(`Downloading receipt ${receiptId}`);
  };

  const handleOpenDraft = (draftId: string) => {
    toast.info(`Opening draft expense ${draftId}`);
  };
  
  const handleViewExpense = (expenseId: string) => {
    toast.info(`Viewing expense ${expenseId}`);
  };
  
  const handleArchiveReceipt = (receiptId: string) => {
    toast.success(`Receipt ${receiptId} archived`);
  };
  
  const handleCreateExpense = (receiptIds: string[]) => {
    toast.success(`Creating expense from ${receiptIds.length} receipt(s)`);
  };
  
  // Render appropriate UI based on active option
  const renderOptionContent = () => {
    if (activeMainTab === 'email' && activeOption === 'upload') {
      return (
        <div className="px-4 py-8 flex flex-col items-center justify-center bg-gray-50 border-b border-gray-200">
          <div className="max-w-lg w-full bg-white border border-gray-200 border-dashed rounded-xl p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Receipt</h3>
            <p className="text-gray-500 text-sm mb-6">Drag and drop receipt files here, or click to select files</p>
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleUploadReceipt}
            >
              Select Files
            </Button>
          </div>
        </div>
      );
    } else if (activeMainTab === 'email' && activeOption === 'camera') {
      return (
        <div className="px-4 py-8 flex flex-col items-center justify-center bg-gray-50 border-b border-gray-200">
          <div className="max-w-lg w-full bg-white border border-gray-200 border-dashed rounded-xl p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <Camera className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Capture Receipt</h3>
            <p className="text-gray-500 text-sm mb-6">Use your device camera to take a photo of your receipt</p>
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleCaptureReceipt}
            >
              Open Camera
            </Button>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Receipts</h1>
        
        {/* Show appropriate action button based on current tab */}
        {activeMainTab === 'email' && activeOption === 'inbox' && (
          <UploadButton 
            onClick={handleUploadReceipt}
            onInboxClick={handleInboxView}
            onUploadClick={handleUploadReceipt}
            onCaptureClick={handleCaptureReceipt}
          />
        )}
        
        {activeMainTab === 'captured' && (
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
            onClick={handleCaptureReceipt}
          >
            <Camera className="h-4 w-4" />
            Capture Receipt
          </Button>
        )}
      </div>
      
      <Card className="border-gray-200 shadow-sm overflow-hidden rounded-xl">
        {/* Main Tabs */}
        <MainTabs 
          activeTab={activeMainTab} 
          onTabChange={setActiveMainTab} 
        />
        
        {/* Conditional content based on selected option */}
        {renderOptionContent()}
        
        {/* Only show receipts grid when not in upload/camera mode */}
        {!(activeMainTab === 'email' && (activeOption === 'upload' || activeOption === 'camera')) && (
          <>
            {/* Search and Filters */}
            <ReceiptFilters 
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
            
            {/* Receipt Grid */}
            <ReceiptGrid 
              receipts={filteredReceipts}
              onViewReceipt={handleViewReceipt}
              onDownloadReceipt={handleDownloadReceipt}
              onOpenDraft={handleOpenDraft}
              onViewExpense={handleViewExpense}
              onArchive={handleArchiveReceipt}
              onCreateExpense={handleCreateExpense}
              onClearFilters={handleClearFilters}
            />
          </>
        )}
      </Card>
      
      {/* Floating capture button - Only visible on mobile */}
      <div className="md:hidden">
        <UploadButton 
          onClick={activeMainTab === 'captured' ? handleCaptureReceipt : handleUploadReceipt} 
          floating={true} 
        />
      </div>
    </div>
  );
};

export default Receipts;
