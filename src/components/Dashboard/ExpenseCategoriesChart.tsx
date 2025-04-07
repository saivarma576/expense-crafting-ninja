
import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import YearSelector from './YearSelector';

interface CategoryData {
  name: string;
  value: number;
  color: string;
  formattedValue: string;
}

interface ExpenseCategoriesChartProps {
  categoryData: CategoryData[];
  selectedYear: number;
  onYearChange: (direction: 'prev' | 'next') => void;
}

const ExpenseCategoriesChart: React.FC<ExpenseCategoriesChartProps> = ({ 
  categoryData, 
  selectedYear, 
  onYearChange 
}) => {
  // Total value calculation for the center of the chart
  const totalValue = categoryData.reduce((sum, item) => sum + item.value, 0);

  // Create chart config from category data
  const chartConfig = categoryData.reduce((config, category) => {
    config[category.name.toLowerCase()] = {
      label: category.name,
      color: category.color
    };
    return config;
  }, {} as Record<string, { label: string, color: string }>);

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Expense Categories</h2>
        <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} />
      </div>
      
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-[220px] aspect-square flex items-center justify-center mb-6 mx-auto">
          <ChartContainer config={chartConfig}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius="65%"
                outerRadius="90%"
                paddingAngle={2}
                dataKey="value"
                stroke="none"
                nameKey="name"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">
              ${(totalValue / 1000).toFixed(1)}k
            </div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 w-full">
          {categoryData.map((category, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: category.color }}
              />
              <div className="flex flex-col text-sm">
                <span className="font-medium">{category.name}</span>
                <span className="text-gray-500">${category.formattedValue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseCategoriesChart;
