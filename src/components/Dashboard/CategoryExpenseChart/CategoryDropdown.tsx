
import React, { useState } from 'react';
import { ChevronDown, Filter, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CategoryExpense } from '../CategoryExpenseTrend';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryDropdownProps {
  categories: CategoryExpense[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categories,
  selectedCategories,
  onCategoryToggle
}) => {
  const [filterType, setFilterType] = useState<'all' | 'custom' | 'top'>('top');
  
  const handlePresetSelection = (preset: 'all' | 'custom' | 'top') => {
    setFilterType(preset);
    
    // If "All" is selected, select all categories
    if (preset === 'all') {
      categories.forEach(cat => {
        if (!selectedCategories.includes(cat.name)) {
          onCategoryToggle(cat.name);
        }
      });
    }
    
    // If "Top 10" is selected, select only the top 10 categories
    if (preset === 'top') {
      // First deselect all
      [...selectedCategories].forEach(cat => {
        if (selectedCategories.includes(cat)) {
          onCategoryToggle(cat);
        }
      });
      
      // Then select top 10
      categories.slice(0, 10).forEach(cat => {
        if (!selectedCategories.includes(cat.name)) {
          onCategoryToggle(cat.name);
        }
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5">
        <Select 
          value={filterType} 
          onValueChange={(value) => handlePresetSelection(value as any)}
        >
          <SelectTrigger className="h-8 w-32 text-xs">
            <SelectValue placeholder="Filter type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top">Top 10</SelectItem>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="custom">Custom Selection</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="text-sm text-muted-foreground">
          {selectedCategories.length} Category Selected
        </div>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 opacity-50" />
            <span className="sr-only sm:not-sr-only text-xs">Filter</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-50 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[240px] bg-white max-h-[300px] overflow-y-auto">
          <DropdownMenuLabel>Filter Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {categories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category.name}
              checked={selectedCategories.includes(category.name)}
              onCheckedChange={() => onCategoryToggle(category.name)}
              className="flex items-center gap-2"
            >
              <div 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm truncate">{category.name}</span>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CategoryDropdown;
