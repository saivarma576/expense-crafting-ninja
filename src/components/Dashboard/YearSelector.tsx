
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (direction: 'prev' | 'next') => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ selectedYear, onYearChange }) => {
  return (
    <div className="flex items-center gap-2">
      <button 
        className="p-1 rounded hover:bg-muted" 
        onClick={() => onYearChange('prev')}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <div className="text-sm font-medium">{selectedYear}</div>
      <button 
        className="p-1 rounded hover:bg-muted" 
        onClick={() => onYearChange('next')}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default YearSelector;
