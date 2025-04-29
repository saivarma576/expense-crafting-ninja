
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReceiptFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedFilter: string | null;
  onFilterChange: (value: string | null) => void;
}

const ReceiptFilters: React.FC<ReceiptFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedFilter,
  onFilterChange
}) => {
  return (
    <div className="px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search receipts..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 w-full h-10 rounded-full border border-gray-300 bg-white px-3 py-2 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-full">
          <Button
            type="button"
            onClick={() => onFilterChange(null)}
            className={cn(
              "rounded-full text-sm h-8 px-3", 
              !selectedFilter ? "bg-white text-gray-900 shadow-sm" : "bg-transparent text-gray-500 hover:text-gray-900"
            )}
          >
            All
          </Button>
          <Button
            type="button"
            onClick={() => onFilterChange("processed")}
            className={cn(
              "rounded-full text-sm h-8 px-3", 
              selectedFilter === "processed" ? "bg-green-50 text-green-700 shadow-sm" : "bg-transparent text-gray-500 hover:text-gray-900"
            )}
          >
            Processed
          </Button>
          <Button
            type="button"
            onClick={() => onFilterChange("pending")}
            className={cn(
              "rounded-full text-sm h-8 px-3", 
              selectedFilter === "pending" ? "bg-amber-50 text-amber-700 shadow-sm" : "bg-transparent text-gray-500 hover:text-gray-900"
            )}
          >
            Processing
          </Button>
          <Button
            type="button"
            onClick={() => onFilterChange("error")}
            className={cn(
              "rounded-full text-sm h-8 px-3", 
              selectedFilter === "error" ? "bg-red-50 text-red-700 shadow-sm" : "bg-transparent text-gray-500 hover:text-gray-900"
            )}
          >
            Error
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptFilters;
