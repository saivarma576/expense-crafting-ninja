
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { 
  Plane, Building, Utensils, Car, FileText, Package, 
  Fuel, Briefcase, Receipt, CreditCard, BookOpen, 
  PartyPopper, DollarSign, MailQuestion, ParkingSquare, Luggage
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
      case 'airfare':
      case 'air/taxi/uber':
        return <Plane className="h-4 w-4 text-white" strokeWidth={1.5} />;
      case 'hotel':
      case 'hotel/lodging':
        return <Building className="h-4 w-4 text-white" strokeWidth={1.5} />;
      case 'meals':
      case 'business meals':
        return <Utensils className="h-4 w-4 text-white" strokeWidth={1.5} />;
      case 'car rental':
      case 'rental car':
        return <Car className="h-4 w-4 text-white" strokeWidth={1.5} />;
      case 'transport':
      case 'transport/taxi':
      case 'parking/tolls':
        return <ParkingSquare className="h-4 w-4 text-white" strokeWidth={1.5} />;
      case 'office supplies':
        return <FileText className="h-4 w-4 text-white" strokeWidth={1.5} />;
      case 'gasoline':
        return <Fuel className="h-4 w-4 text-white" strokeWidth={1.5} />;
      case 'professional fees':
      case 'auditing serv fees':
        return <Briefcase className="h-4 w-4 text-white" strokeWidth={1.5} />;
      case 'registration fees':
        return <Receipt className="h-4 w-4 text-white" strokeWidth={1.5} />;
      case 'dues subscriptions':
        return <BookOpen className="h-4 w-4 text-white" strokeWidth={1.5} />;
      case 'postage & freight':
        return <MailQuestion className="h-4 w-4 text-white" strokeWidth={1.5} />;
      case 'baggage fees':
        return <Luggage className="h-4 w-4 text-white" strokeWidth={1.5} />;
      case 'mileage':
        return <Car className="h-4 w-4 text-white" strokeWidth={1.5} />;
      default:
        return <Package className="h-4 w-4 text-white" strokeWidth={1.5} />;
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
    <div className="flex flex-col h-full">
      <div className="flex flex-col">
        <ChartContainer config={chartConfig} className="mb-2 h-32">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={55}
              dataKey="value"
              stroke="none"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
        
        <div className="flex flex-col items-center mb-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold"
          >
            {formattedTotal}
          </motion.div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-xs overflow-y-auto max-h-40">
        {categoryData.map((category, index) => (
          <motion.div 
            key={index} 
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.03, duration: 0.2 }}
          >
            <div 
              className="flex items-center justify-center w-8 h-8 rounded-full"
              style={{ backgroundColor: category.color }}
            >
              {getCategoryIcon(category.name)}
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-medium text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-16">{category.name}</span>
              <span className="text-gray-500 text-xs">${category.value < 1000 
                ? category.value.toFixed(0) 
                : (category.value / 1000).toFixed(1) + 'k'}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseCategoryPieChart;
