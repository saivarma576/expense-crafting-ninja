
import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell,
  ResponsiveContainer
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
  CircleDollarSign,
  BookOpen,
  FileText,
  ShoppingBag,
  Package,
  Ticket,
  ParkingCircle,
  GasPump,
  UtilityPole
} from 'lucide-react';
import { motion } from 'framer-motion';

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
  const formattedTotal = `$${(totalValue / 1000).toFixed(1)}k`;

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
      case 'air/taxi/uber':
        return <Plane className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'hotel':
      case 'hotel/lodging':
        return <Building className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'meals':
        return <Utensils className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'car rental':
      case 'rental car':
        return <Car className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'transport':
        return <Bus className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'dues subscriptions':
        return <BookOpen className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'auditing serv fees':
      case 'professional fees':
        return <FileText className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'office supplies':
        return <ShoppingBag className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'business meals':
        return <Utensils className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'postage & freight':
        return <Package className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'registration fees':
        return <Ticket className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'parking/tolls':
        return <ParkingCircle className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'gasoline':
        return <GasPump className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'baggage fees':
        return <Package className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'mileage':
        return <Car className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'other':
      case 'others':
        return <CreditCard className="h-5 w-5 text-white" strokeWidth={1.5} />;
      default:
        return <CircleDollarSign className="h-5 w-5 text-white" strokeWidth={1.5} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card rounded-xl p-6 shadow-lg border border-primary/5"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Expense Categories</h2>
        <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} />
      </div>
      
      <div className="flex flex-col">
        <div className="relative w-full max-w-[240px] aspect-square mx-auto mb-6">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius="65%"
                  outerRadius="90%"
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                  nameKey="name"
                  startAngle={90}
                  endAngle={-270}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={4} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold"
            >
              {formattedTotal}
            </motion.div>
            <div className="text-sm text-gray-500">This month total expenses</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 w-full">
          {categoryData.map((category, index) => (
            <motion.div 
              key={index} 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <div className="flex flex-col text-sm">
                <span className="font-medium truncate">{category.name}</span>
                <span className="text-gray-500">${category.formattedValue}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseCategoriesChart;
