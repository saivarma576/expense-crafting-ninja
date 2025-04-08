
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { 
  BedDouble, Plane, Briefcase, ReceiptText, 
  Car, Milestone, Coffee, UtensilsCrossed,
  Package, Fuel, ParkingCircle, FileText, 
  BookOpen, Luggage
} from 'lucide-react';
import YearSelector from './YearSelector';
import { ChartContainer, ChartTooltipContent } from '../ui/chart';

interface CategoryData {
  name: string;
  value: number;
  color: string;
  formattedValue: string;
}

interface CategoryGroup {
  name: string;
  categories: CategoryData[];
}

interface ExpenseCategoriesChartProps {
  categoryData: CategoryData[];
  categoryGroups: CategoryGroup[];
  selectedYear: number;
  onYearChange: (direction: 'prev' | 'next') => void;
}

const ExpenseCategoriesChart: React.FC<ExpenseCategoriesChartProps> = ({ 
  categoryData, 
  categoryGroups,
  selectedYear, 
  onYearChange 
}) => {
  // Calculate total for center text
  const totalValue = categoryData.reduce((sum, item) => sum + item.value, 0);
  
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
      case 'postage & freight':
        return <Package className="h-4 w-4" strokeWidth={2} />;
      case 'gasoline':
        return <Fuel className="h-4 w-4" strokeWidth={2} />;
      case 'parking/tolls':
        return <ParkingCircle className="h-4 w-4" strokeWidth={2} />;
      case 'office supplies':
        return <FileText className="h-4 w-4" strokeWidth={2} />;
      case 'dues subscriptions':
        return <BookOpen className="h-4 w-4" strokeWidth={2} />;
      case 'baggage fees':
        return <Luggage className="h-4 w-4" strokeWidth={2} />;
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
      
      <div className="flex h-[calc(100%-2rem)]">
        {/* Left side - PieChart */}
        <div className="w-1/3 flex items-center justify-center">
          <div className="relative w-full h-[180px] flex items-center justify-center">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
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
                <span className="text-2xl font-bold">${(totalValue / 1000).toFixed(1)}k</span>
                <span className="text-xs text-gray-500">
                  Total expenses
                </span>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Right side - Category groups display */}
        <div className="w-2/3 pl-2 overflow-y-auto pr-1 grid grid-cols-2 gap-x-4 gap-y-2">
          {categoryGroups.map((group, groupIndex) => (
            <motion.div 
              key={`group-${groupIndex}`} 
              className="mb-2"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (groupIndex * 0.05), duration: 0.3 }}
            >
              <div className="font-semibold text-sm text-primary mb-1.5 border-b pb-1">{group.name}</div>
              <div className="space-y-2">
                {group.categories.map((category, catIndex) => (
                  <motion.div 
                    key={`cat-${groupIndex}-${catIndex}`} 
                    className="flex items-center gap-1.5"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (groupIndex * 0.03) + (catIndex * 0.02), duration: 0.2 }}
                  >
                    <div 
                      className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-white"
                      style={{ backgroundColor: category.color }}
                    >
                      {getCategoryIcon(category.name)}
                    </div>
                    <div className="flex justify-between w-full items-center">
                      <span className="text-xs leading-tight font-medium truncate max-w-[90px]">{category.name}</span>
                      <span className="text-xs font-bold text-right">{category.formattedValue}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseCategoriesChart;
