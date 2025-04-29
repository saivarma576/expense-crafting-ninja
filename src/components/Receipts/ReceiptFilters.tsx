
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
        
        <ToggleGroup type="single" value={selectedFilter || ""} onValueChange={(value) => onFilterChange(value || null)}>
          <ToggleGroupItem value="" className="rounded-full text-sm border-gray-300">
            All
          </ToggleGroupItem>
          <ToggleGroupItem value="processed" className="rounded-full text-sm border-gray-300 data-[state=on]:bg-green-50 data-[state=on]:text-green-700">
            Processed
          </ToggleGroupItem>
          <ToggleGroupItem value="pending" className="rounded-full text-sm border-gray-300 data-[state=on]:bg-amber-50 data-[state=on]:text-amber-700">
            Processing
          </ToggleGroupItem>
          <ToggleGroupItem value="error" className="rounded-full text-sm border-gray-300 data-[state=on]:bg-red-50 data-[state=on]:text-red-700">
            Error
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default ReceiptFilters;
