
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createChartConfig } from '@/components/Charts/chartUtils';
import { expenseCategories, getCategoryColorMap } from './CategoryExpenseChart/utils';
import CategoryDropdown from './CategoryExpenseChart/CategoryDropdown';
import BarChartComponent from './CategoryExpenseChart/BarChartComponent';

export interface CategoryExpense {
  name: string;
  color: string;
}

export interface MonthCategoryData {
  month: string;
  totalAmount: number;
  [key: string]: number | string;
}

interface CategoryExpenseTrendProps {
  data: MonthCategoryData[];
  categories: CategoryExpense[];
  title?: string;
  currency?: string;
}

const CategoryExpenseTrend: React.FC<CategoryExpenseTrendProps> = ({ 
  data, 
  categories,
  title = "Compare Category Wise Expense Trend",
  currency = "₹"
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(expenseCategories);
  
  // Map categories to their colors
  const categoryColorMap = getCategoryColorMap();

  // Filter categories to only show the selected ones
  const filteredCategoryData = categories
    .filter(cat => selectedCategories.includes(cat.name))
    .map(cat => ({
      ...cat,
      color: categoryColorMap[cat.name] || cat.color
    }));

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const chartConfig = createChartConfig(filteredCategoryData);

  return (
    <Card className="col-span-full glass-card border border-primary/5 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <CategoryDropdown 
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
        />
      </CardHeader>
      <CardContent className="p-0">
        <BarChartComponent 
          data={data}
          categories={filteredCategoryData}
          chartConfig={chartConfig}
          currency={currency}
        />
      </CardContent>
    </Card>
  );
};

export default CategoryExpenseTrend;
