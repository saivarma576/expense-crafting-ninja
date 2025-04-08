
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, Hotel, UtensilsCrossed, Car, FileText
} from 'lucide-react';

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
  // Calculate total for center display
  const totalValue = categoryData.reduce((sum, item) => sum + item.value, 0);
  const formattedTotal = `$${(totalValue / 1000).toFixed(1)}k`;
  
  // Simplified categories for the new design
  const simplifiedCategories = [
    { 
      name: 'Airfare', 
      value: categoryGroups.find(g => g.name === 'Travel')?.categories.find(c => c.name === 'Air/Taxi/Uber')?.value || 0,
      formattedValue: `$${((categoryGroups.find(g => g.name === 'Travel')?.categories.find(c => c.name === 'Air/Taxi/Uber')?.value || 0) / 1000).toFixed(1)}k`,
      color: '#3CC8F0', 
      icon: <Plane strokeWidth={1.5} />
    },
    { 
      name: 'Hotel', 
      value: categoryGroups.find(g => g.name === 'Travel')?.categories.find(c => c.name === 'Hotel/Lodging')?.value || 0,
      formattedValue: `$${((categoryGroups.find(g => g.name === 'Travel')?.categories.find(c => c.name === 'Hotel/Lodging')?.value || 0) / 1000).toFixed(1)}k`,
      color: '#B980F0', 
      icon: <Hotel strokeWidth={1.5} />
    },
    { 
      name: 'Meals', 
      value: (categoryGroups.find(g => g.name === 'Food')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0),
      formattedValue: `$${((categoryGroups.find(g => g.name === 'Food')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0) / 1000).toFixed(1)}k`,
      color: '#FF7E7E', 
      icon: <UtensilsCrossed strokeWidth={1.5} />
    },
    { 
      name: 'Transport', 
      value: (categoryGroups.find(g => g.name === 'Transportation')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0),
      formattedValue: `$${((categoryGroups.find(g => g.name === 'Transportation')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0) / 1000).toFixed(1)}k`,
      color: '#4CD97B', 
      icon: <Car strokeWidth={1.5} />
    },
    { 
      name: 'Car Rental', 
      value: categoryGroups.find(g => g.name === 'Travel')?.categories.find(c => c.name === 'Rental Car')?.value || 0,
      formattedValue: `$${((categoryGroups.find(g => g.name === 'Travel')?.categories.find(c => c.name === 'Rental Car')?.value || 0) / 1000).toFixed(1)}k`,
      color: '#FFA45C', 
      icon: <Car strokeWidth={1.5} />
    },
    { 
      name: 'Other', 
      value: (
        (categoryGroups.find(g => g.name === 'Office')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0) +
        (categoryGroups.find(g => g.name === 'Professional Services')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0) +
        (categoryGroups.find(g => g.name === 'Other')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0)
      ),
      formattedValue: `$${(((categoryGroups.find(g => g.name === 'Office')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0) +
        (categoryGroups.find(g => g.name === 'Professional Services')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0) +
        (categoryGroups.find(g => g.name === 'Other')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0)) / 1000).toFixed(1)}k`,
      color: '#A9A9A9', 
      icon: <FileText strokeWidth={1.5} />
    },
  ];

  return (
    <div className="h-full">
      <div className="flex flex-col h-full">
        {/* Total display */}
        <div className="flex justify-center items-center mb-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <span className="text-3xl font-bold">{formattedTotal}</span>
            <span className="text-sm text-muted-foreground">Total</span>
          </motion.div>
        </div>
        
        {/* Categories */}
        <div className="grid grid-cols-3 gap-4">
          {simplifiedCategories.map((category, index) => (
            <motion.div 
              key={`cat-${index}`} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1), duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white mb-2"
                style={{ backgroundColor: category.color }}
              >
                {category.icon}
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">{category.name}</div>
                <div className="text-sm font-bold">{category.formattedValue}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseCategoryPieChart;
