
import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Building, Utensils, Car, FileText, Package } from 'lucide-react';
import YearSelector from './YearSelector';

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

  // We'll display only the top 6 categories to match the design
  const topCategories = [...categoryData]
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Function to get icon by category name
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
      case 'transport/taxi':
        return <Car className="h-5 w-5 text-white" strokeWidth={1.5} />;
      case 'office supplies':
        return <FileText className="h-5 w-5 text-white" strokeWidth={1.5} />;
      default:
        return <Package className="h-5 w-5 text-white" strokeWidth={1.5} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card rounded-xl p-6 shadow-lg border border-primary/5"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Expense Categories</h2>
        <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} />
      </div>
      
      <div className="flex flex-col items-center mb-8">
        <div className="text-3xl font-bold">{formattedTotal}</div>
        <div className="text-sm text-gray-500">Total</div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {topCategories.map((category, index) => (
          <motion.div 
            key={index} 
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
          >
            <div 
              className="flex items-center justify-center w-12 h-12 rounded-full"
              style={{ backgroundColor: category.color }}
            >
              {getCategoryIcon(category.name)}
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-medium text-sm">{category.name}</span>
              <span className="text-gray-500 text-sm">${category.value < 1000 
                ? category.value.toFixed(1) 
                : (category.value / 1000).toFixed(1) + 'k'}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExpenseCategoriesChart;
