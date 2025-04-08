
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
  CircleDollarSign
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
        return <Plane className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'hotel':
        return <Building className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'meals':
        return <Utensils className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'car rental':
        return <Car className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'transport':
        return <Bus className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'other':
        return <CreditCard className="h-5 w-5 text-white" strokeWidth={1.5} />;
      default:
        return <CircleDollarSign className="h-5 w-5 text-white" strokeWidth={1.5} />;
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
      
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-[240px] aspect-square flex items-center justify-center mb-8 mx-auto">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
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
            </ResponsiveContainer>
          </ChartContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold"
            >
              {formattedTotal}
            </motion.div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 w-full">
          {categoryData.map((category, index) => (
            <motion.div 
              key={index} 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
            >
              <div 
                className="flex items-center justify-center w-10 h-10 rounded-full shadow-md"
                style={{ 
                  background: `linear-gradient(135deg, ${category.color}, ${getPastelColor(category.color)})`,
                  boxShadow: `0 4px 12px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.02)`
                }}
              >
                {getCategoryIcon(category.name)}
              </div>
              <div className="flex flex-col text-sm">
                <span className="font-medium">{category.name}</span>
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
