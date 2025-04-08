
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { 
  Plane, Building, Utensils, Car, FileText, Package, 
  Fuel, Briefcase, Receipt, BookOpen, 
  MailQuestion, ParkingSquare, Luggage
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card rounded-xl p-4 shadow-lg border border-primary/5 h-[350px]"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Expense Categories</h2>
        <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} />
      </div>
      
      <div className="flex flex-col h-[calc(100%-3rem)] justify-center items-center">
        <div className="relative w-56 h-56 flex items-center justify-center">
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
        
        {/* Category legend */}
        <div className="mt-4 grid grid-cols-4 gap-2 text-xs w-full px-4">
          {categoryData.slice(0, 8).map((category, index) => (
            <motion.div 
              key={index} 
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.03, duration: 0.2 }}
            >
              <div 
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: category.color }}
              />
              <span className="truncate text-xs">{category.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseCategoriesChart;
