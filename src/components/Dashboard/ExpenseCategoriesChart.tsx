
import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import YearSelector from './YearSelector';
import { 
  Plane, 
  Building, 
  Utensils, 
  Car, 
  Bus, 
  CreditCard,
  CircleDollarSign
} from 'lucide-react';

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

  // Get icon based on category name
  const getCategoryIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'airfare':
        return <Plane className="h-4 w-4 text-white" strokeWidth={1.5} />;
      case 'hotel':
        return <Building className="h-4 w-4 text-white" strokeWidth={1.5} />;
      case 'meals':
        return <Utensils className="h-4 w-4 text-white" strokeWidth={1.5} />;
      case 'car rental':
        return <Car className="h-4 w-4 text-white" strokeWidth={1.5} />;
      case 'transport':
        return <Bus className="h-4 w-4 text-white" strokeWidth={1.5} />;
      case 'other':
        return <CreditCard className="h-4 w-4 text-white" strokeWidth={1.5} />;
      default:
        return <CircleDollarSign className="h-4 w-4 text-white" strokeWidth={1.5} />;
    }
  };

  // Create a soft pastel version of the category color
  const getPastelColor = (color: string) => {
    // Convert hex to RGB and make it pastel
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Pastel formula - mix with white
    const pastelFactor = 0.7;
    const pastelR = Math.floor(r * (1-pastelFactor) + 255 * pastelFactor);
    const pastelG = Math.floor(g * (1-pastelFactor) + 255 * pastelFactor);
    const pastelB = Math.floor(b * (1-pastelFactor) + 255 * pastelFactor);
    
    return `rgb(${pastelR}, ${pastelG}, ${pastelB})`;
  };

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
                className="flex items-center justify-center w-8 h-8 rounded-md shadow-sm"
                style={{ 
                  background: `linear-gradient(135deg, ${category.color}, ${getPastelColor(category.color)})`,
                  boxShadow: `0 2px 4px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.02)`
                }}
              >
                {getCategoryIcon(category.name)}
              </div>
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
