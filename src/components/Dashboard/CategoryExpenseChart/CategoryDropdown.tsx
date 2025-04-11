
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryExpense } from '../CategoryExpenseTrend';

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
  return (
    <div className="flex items-center gap-2">
      <div className="text-sm text-muted-foreground">
        {selectedCategories.length} Category Selected
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <ChevronDown className="h-3.5 w-3.5 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white">
          {categories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category.name}
              checked={selectedCategories.includes(category.name)}
              onCheckedChange={() => onCategoryToggle(category.name)}
            >
              {category.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CategoryDropdown;
