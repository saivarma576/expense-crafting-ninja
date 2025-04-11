
import React, { useState, useEffect } from 'react';
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
  // Default to showing only top 10 categories initially for better readability
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categories.slice(0, 10).map(cat => cat.name)
  );
  
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
  
  // Calculate insights
  const [highestCategory, setHighestCategory] = useState({ name: '', amount: 0 });
  const [lowestCategory, setLowestCategory] = useState({ name: '', amount: 0 });
  
  useEffect(() => {
    // Calculate total amount for each category across all months
    const categoryTotals: Record<string, number> = {};
    
    // Initialize with 0 for all categories
    categories.forEach(cat => {
      categoryTotals[cat.name] = 0;
    });
    
    // Sum up values across all months
    data.forEach(monthData => {
      categories.forEach(cat => {
        const value = monthData[cat.name];
        if (typeof value === 'number') {
          categoryTotals[cat.name] += value;
        }
      });
    });
    
    // Find highest and lowest categories
    let highest = { name: '', amount: 0 };
    let lowest = { name: '', amount: Number.MAX_VALUE };
    
    Object.entries(categoryTotals).forEach(([name, amount]) => {
      if (amount > highest.amount) {
        highest = { name, amount };
      }
      if (amount < lowest.amount && amount > 0) {
        lowest = { name, amount };
      }
    });
    
    setHighestCategory(highest);
    setLowestCategory(lowest.amount === Number.MAX_VALUE ? { name: 'None', amount: 0 } : lowest);
  }, [data, categories]);

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
        
        {/* Insights Section */}
        <div className="px-6 py-4 border-t">
          <h3 className="text-base font-medium mb-3">Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs uppercase text-gray-500 font-medium">Highest Claimed Category</div>
              <div className="text-base font-medium mt-1">{highestCategory.name}</div>
              <div className="text-sm text-gray-600 mt-0.5">
                {currency} {highestCategory.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-500 font-medium">Lowest Claimed Category</div>
              <div className="text-base font-medium mt-1">{lowestCategory.name}</div>
              <div className="text-sm text-gray-600 mt-0.5">
                {currency} {lowestCategory.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryExpenseTrend;
