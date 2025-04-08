
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { 
  BedDouble, Plane, Briefcase, ReceiptText, 
  Car, Milestone, Coffee, UtensilsCrossed
} from 'lucide-react';
import YearSelector from './YearSelector';
import { ChartContainer, ChartTooltipContent } from '../ui/chart';

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
  // Calculate total for center text
  const totalValue = categoryData.reduce((sum, item) => sum + item.value, 0);
  const formattedTotal = `$${(totalValue / 1000).toFixed(1)}k`;
  
  // Function to get icon by category name
  const getCategoryIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'hotel/lodging':
        return <BedDouble className="h-4 w-4" strokeWidth={2} />;
      case 'air/taxi/uber':
        return <Plane className="h-4 w-4" strokeWidth={2} />;
      case 'professional fees':
        return <Briefcase className="h-4 w-4" strokeWidth={2} />;
      case 'auditing serv fees':
        return <ReceiptText className="h-4 w-4" strokeWidth={2} />;
      case 'rental car':
        return <Car className="h-4 w-4" strokeWidth={2} />;
      case 'mileage':
        return <Milestone className="h-4 w-4" strokeWidth={2} />;
      case 'business meals':
        return <Coffee className="h-4 w-4" strokeWidth={2} />;
      case 'meals':
        return <UtensilsCrossed className="h-4 w-4" strokeWidth={2} />;
      default:
        return <Briefcase className="h-4 w-4" strokeWidth={2} />;
    }
  };

  const chartConfig = categoryData.reduce((acc, category) => {
    acc[category.name] = {
      label: category.name,
      color: category.color
    };
    return acc;
  }, {} as Record<string, { label: string, color: string }>);

  // We'll display only top 8 categories in a 2x4 grid
  const topCategories = [...categoryData]
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card rounded-xl p-4 shadow-lg border border-primary/5 h-[340px]"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Expense Categories</h2>
        <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} />
      </div>
      
      <div className="flex flex-col h-[calc(100%-2rem)]">
        <div className="relative w-full h-48 flex items-center justify-center mb-3">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <span className="text-3xl font-bold">${(totalValue / 1000).toFixed(1)}k</span>
              <span className="text-xs text-gray-500 mt-1">
                This month total<br/>expense
              </span>
            </motion.div>
          </div>
        </div>
        
        {/* Category legend - 2x4 grid layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs w-full mt-auto">
          {topCategories.map((category, index) => (
            <motion.div 
              key={index} 
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.03, duration: 0.2 }}
            >
              <div 
                className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 text-white"
                style={{ backgroundColor: category.color }}
              >
                {getCategoryIcon(category.name)}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] leading-tight font-medium truncate max-w-[80px]">{category.name}</span>
                <span className="text-xs font-bold">{category.formattedValue}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseCategoriesChart;
