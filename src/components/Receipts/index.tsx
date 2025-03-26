
import React, { useState } from 'react';
import { Search, Upload, Inbox, CheckCircle2, Clock } from 'lucide-react';

interface ReceiptItem {
  id: string;
  name: string;
  date: string;
  category: string;
  status: 'processed' | 'pending' | 'error';
  amount?: number;
  source: string;
  thumbnailUrl: string;
}

const Receipts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  
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
      thumbnailUrl: 'https://placehold.co/600x400?text=Hotel+Receipt'
    },
    {
      id: 'rec-002',
      name: 'Delta Airlines',
      date: '2023-10-12',
      category: 'airfare',
      status: 'processed',
      amount: 542.33,
      source: 'email',
      thumbnailUrl: 'https://placehold.co/600x400?text=Airfare+Receipt'
    },
    {
      id: 'rec-003',
      name: 'Uber Ride',
      date: '2023-10-15',
      category: 'transport',
      status: 'processed',
      amount: 28.45,
      source: 'email',
      thumbnailUrl: 'https://placehold.co/600x400?text=Uber+Receipt'
    },
    {
      id: 'rec-004',
      name: 'Office Depot',
      date: '2023-10-25',
      category: 'other',
      status: 'pending',
      source: 'upload',
      thumbnailUrl: 'https://placehold.co/600x400?text=Office+Supplies'
    },
    {
      id: 'rec-005',
      name: 'Restaurant Receipt',
      date: '2023-11-03',
      category: 'meals',
      status: 'error',
      source: 'email',
      thumbnailUrl: 'https://placehold.co/600x400?text=Restaurant+Receipt'
    },
    {
      id: 'rec-006',
      name: 'Enterprise Car Rental',
      date: '2023-11-02',
      category: 'rental',
      status: 'pending',
      source: 'email',
      thumbnailUrl: 'https://placehold.co/600x400?text=Car+Rental'
    }
  ];
  
  // Filter receipts
  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !selectedFilter || receipt.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'processed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'error':
        return (
          <svg className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9V13M12 17H12.01M3.5 21H20.5C21.3284 21 22 20.3284 22 19.5V4.5C22 3.67157 21.3284 3 20.5 3H3.5C2.67157 3 2 3.67157 2 4.5V19.5C2 20.3284 2.67157 21 3.5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
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
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Receipts</h1>
        <button className="inline-flex items-center py-2.5 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
          <Upload className="h-5 w-5 mr-2" />
          Upload Receipt
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search receipts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={() => setSelectedFilter(null)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              selectedFilter === null 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setSelectedFilter('processed')}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              selectedFilter === 'processed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Processed
          </button>
          <button 
            onClick={() => setSelectedFilter('pending')}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              selectedFilter === 'pending' 
                ? 'bg-amber-100 text-amber-800' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Processing
          </button>
          <button 
            onClick={() => setSelectedFilter('error')}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              selectedFilter === 'error' 
                ? 'bg-red-100 text-red-800' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Error
          </button>
        </div>
      </div>
      
      {filteredReceipts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReceipts.map((receipt) => (
            <div 
              key={receipt.id}
              className="glass-card rounded-xl overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:translate-y-[-2px]"
            >
              <div className="aspect-video relative bg-muted">
                <img 
                  src={receipt.thumbnailUrl} 
                  alt={receipt.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <div className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center ${
                    receipt.status === 'processed' 
                      ? 'bg-green-100 text-green-800' 
                      : receipt.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {getStatusIcon(receipt.status)}
                    <span className="ml-1.5">{getStatusText(receipt.status)}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-1">{receipt.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {new Date(receipt.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
                <div className="flex justify-between items-center">
                  <div className="bg-muted rounded-full px-2.5 py-1 text-xs font-medium capitalize">
                    {receipt.category}
                  </div>
                  {receipt.amount && (
                    <span className="font-semibold">${receipt.amount.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-muted rounded-lg">
          <Inbox className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-1">No receipts found</h3>
          <p className="text-muted-foreground mb-6">No receipts match your current search or filter criteria</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedFilter(null);
            }}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Receipts;
