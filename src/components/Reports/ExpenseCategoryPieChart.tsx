
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { 
  BedDouble, Plane, Briefcase, ReceiptText,
  Car, Milestone, Coffee, UtensilsCrossed,
  BookOpen, FileText, Package, ParkingCircle, 
  Fuel, Luggage
} from 'lucide-react';
import { ChartContainer, ChartTooltipContent } from '../ui/chart';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface CategoryGroup {
  name: string;
  categories: CategoryData[];
}

interface ExpenseCategoryPieChartProps {
  categoryData: CategoryData[];
  categoryGroups: CategoryGroup[];
}

const ExpenseCategoryPieChart: React.FC<ExpenseCategoryPieChartProps> = ({ 
  categoryData,
  categoryGroups 
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
      case 'dues subscriptions':
        return <BookOpen className="h-4 w-4" strokeWidth={2} />;
      case 'office supplies':
        return <FileText className="h-4 w-4" strokeWidth={2} />;
      case 'postage & freight':
        return <Package className="h-4 w-4" strokeWidth={2} />;
      case 'parking/tolls':
        return <ParkingCircle className="h-4 w-4" strokeWidth={2} />;
      case 'gasoline':
        return <Fuel className="h-4 w-4" strokeWidth={2} />;
      case 'baggage fees':
        return <Luggage className="h-4 w-4" strokeWidth={2} />;
      default:
        return <FileText className="h-4 w-4" strokeWidth={2} />;
    }
  };

  const chartConfig = categoryData.reduce((acc, category) => {
    acc[category.name] = {
      label: category.name,
      color: category.color
    };
    return acc;
  }, {} as Record<string, { label: string, color: string }>);

  // Format the price display
  const formatPrice = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}k`;
    }
    return `$${value.toFixed(0)}`;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="relative w-full h-[130px] flex items-center justify-center">
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
            <span className="text-2xl font-bold">{formattedTotal}</span>
            <span className="text-xs text-gray-500">
              Total expenses
            </span>
          </motion.div>
        </div>
      </div>
      
      {/* Category groups display */}
      <div className="grid grid-cols-3 gap-1 text-xs max-h-[195px] overflow-y-auto">
        {categoryGroups.map((group, groupIndex) => (
          <div key={`group-${groupIndex}`} className="mb-2">
            <div className="font-semibold text-xs text-gray-600 mb-1.5">{group.name}</div>
            {group.categories.map((category, catIndex) => (
              <motion.div 
                key={`cat-${groupIndex}-${catIndex}`} 
                className="flex items-center gap-1.5 mb-1"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (groupIndex * 0.03) + (catIndex * 0.01), duration: 0.2 }}
              >
                <div 
                  className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-white"
                  style={{ backgroundColor: category.color }}
                >
                  {getCategoryIcon(category.name)}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] leading-tight font-medium truncate max-w-[60px]">{category.name}</span>
                  <span className="text-[10px] font-bold">{formatPrice(category.value)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseCategoryPieChart;
