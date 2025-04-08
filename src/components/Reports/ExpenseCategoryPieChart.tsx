
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { 
  Car, Building, Utensils, FileText, Package, 
  Fuel, Briefcase, Receipt, BookOpen, 
  Mail, ParkingCircle, Plane, Luggage, Coffee
} from 'lucide-react';
import { ChartContainer, ChartTooltipContent } from '../ui/chart';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface ExpenseCategoryPieChartProps {
  categoryData: CategoryData[];
}

const ExpenseCategoryPieChart: React.FC<ExpenseCategoryPieChartProps> = ({ categoryData }) => {
  // Calculate total for center text
  const totalValue = categoryData.reduce((sum, item) => sum + item.value, 0);
  const formattedTotal = `$${(totalValue / 1000).toFixed(1)}k`;

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
  
  // Sort categories by value for better visual organization
  const sortedCategories = [...categoryData].sort((a, b) => b.value - a.value);
  const topCategories = sortedCategories.slice(0, 12);

  return (
    <div className="flex flex-col h-full">
      <div className="relative w-full h-56 flex items-center justify-center">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
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
            <span className="text-2xl font-bold">{formattedTotal}</span>
            <span className="text-xs text-gray-500 mt-1">
              This month total<br/>expense
            </span>
          </motion.div>
        </div>
      </div>
      
      {/* Category legend - improved with icons */}
      <div className="mt-4 grid grid-cols-3 gap-x-2 gap-y-2.5 text-xs px-2 overflow-y-auto max-h-40">
        {topCategories.map((category, index) => (
          <motion.div 
            key={index} 
            className="flex items-center gap-1.5"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.03, duration: 0.2 }}
          >
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: category.color }}
            >
              {getCategoryIcon(category.name)}
            </div>
            <span className="truncate text-[10px] leading-tight">{category.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseCategoryPieChart;
