
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { 
  Car, Building, Utensils, FileText, Package, 
  Fuel, Briefcase, Receipt, BookOpen, 
  Mail, ParkingCircle, Plane, Luggage, Coffee
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
  
  // Format for display in the chart center
  const thisMonth = new Date().toLocaleString('default', { month: 'long' });

  // Function to get icon by category name
  const getCategoryIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'mileage':
        return <Car className="h-3.5 w-3.5" strokeWidth={1.5} />;
      case 'dues subscriptions':
        return <BookOpen className="h-3.5 w-3.5" strokeWidth={1.5} />;
      case 'auditing serv fees':
        return <Receipt className="h-3.5 w-3.5" strokeWidth={1.5} />;
      case 'hotel/lodging':
        return <Building className="h-3.5 w-3.5" strokeWidth={1.5} />;
      case 'meals':
        return <Utensils className="h-3.5 w-3.5" strokeWidth={1.5} />;
      case 'others':
        return <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />;
      case 'professional fees':
        return <Briefcase className="h-3.5 w-3.5" strokeWidth={1.5} />;
      case 'gasoline':
        return <Fuel className="h-3.5 w-3.5" strokeWidth={1.5} />;
      case 'office supplies':
        return <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />;
      case 'business meals':
        return <Coffee className="h-3.5 w-3.5" strokeWidth={1.5} />;
      case 'postage & freight':
        return <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />;
      case 'registration fees':
        return <Receipt className="h-3.5 w-3.5" strokeWidth={1.5} />;
      case 'parking/tolls':
        return <ParkingCircle className="h-3.5 w-3.5" strokeWidth={1.5} />;
      case 'air/taxi/uber':
        return <Plane className="h-3.5 w-3.5" strokeWidth={1.5} />;
      case 'baggage fees':
        return <Luggage className="h-3.5 w-3.5" strokeWidth={1.5} />;
      case 'rental car':
        return <Car className="h-3.5 w-3.5" strokeWidth={1.5} />;
      default:
        return <Package className="h-3.5 w-3.5" strokeWidth={1.5} />;
    }
  };

  const chartConfig = categoryData.reduce((acc, category) => {
    acc[category.name] = {
      label: category.name,
      color: category.color
    };
    return acc;
  }, {} as Record<string, { label: string, color: string }>);

  // We'll display only top 8 categories in legend
  const topCategories = [...categoryData]
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  // Format the price display
  const formatPrice = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}k`;
    }
    return `$${value.toFixed(0)}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card rounded-xl p-4 shadow-lg border border-primary/5 h-[350px]"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Expense Categories</h2>
        <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} />
      </div>
      
      <div className="flex flex-col h-[calc(100%-2.5rem)] justify-between">
        <div className="relative w-full h-48 flex items-center justify-center">
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
        
        {/* Category legend - more compact and with icons */}
        <div className="grid grid-cols-4 gap-x-2 gap-y-3 text-xs px-1 w-full mt-auto">
          {topCategories.map((category, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col gap-0.5"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.03, duration: 0.2 }}
            >
              <div className="flex items-center gap-1.5">
                <div 
                  className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                  style={{ backgroundColor: category.color }}
                >
                  {getCategoryIcon(category.name)}
                </div>
                <span className="text-[10px] leading-tight font-medium">{category.name}</span>
              </div>
              <span className="text-xs font-bold pl-7.5">{formatPrice(category.value)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseCategoriesChart;
