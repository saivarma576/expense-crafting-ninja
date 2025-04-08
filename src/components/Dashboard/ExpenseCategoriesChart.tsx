
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  Plane, Hotel, UtensilsCrossed, Car, FileText, Package,
  DollarSign, Building, ReceiptText, Briefcase, PiggyBank, FileSpreadsheet
} from 'lucide-react';
import YearSelector from './YearSelector';

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Calculate total for center display
  const totalValue = categoryData.reduce((sum, item) => sum + item.value, 0);
  const formattedTotal = `$${(totalValue / 1000).toFixed(1)}k`;
  
  // Create top-level category data for the pie chart
  const topCategoryData = categoryGroups.map(group => ({
    name: group.name,
    value: group.categories.reduce((sum, cat) => sum + cat.value, 0),
    color: group.categories[0]?.color || '#ccc'
  }));

  // Create simplified categories with icons for the grid display
  const displayCategories = [
    { 
      name: 'Airfare', 
      value: categoryGroups.find(g => g.name === 'Travel')?.categories.find(c => c.name === 'Air/Taxi/Uber')?.value || 0,
      formattedValue: `$${((categoryGroups.find(g => g.name === 'Travel')?.categories.find(c => c.name === 'Air/Taxi/Uber')?.value || 0) / 1000).toFixed(1)}k`,
      color: '#3CC8F0', 
      icon: <Plane size={18} strokeWidth={1.5} />
    },
    { 
      name: 'Hotel', 
      value: categoryGroups.find(g => g.name === 'Travel')?.categories.find(c => c.name === 'Hotel/Lodging')?.value || 0,
      formattedValue: `$${((categoryGroups.find(g => g.name === 'Travel')?.categories.find(c => c.name === 'Hotel/Lodging')?.value || 0) / 1000).toFixed(1)}k`,
      color: '#B980F0', 
      icon: <Hotel size={18} strokeWidth={1.5} />
    },
    { 
      name: 'Meals', 
      value: (categoryGroups.find(g => g.name === 'Food')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0),
      formattedValue: `$${((categoryGroups.find(g => g.name === 'Food')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0) / 1000).toFixed(1)}k`,
      color: '#FF7E7E', 
      icon: <UtensilsCrossed size={18} strokeWidth={1.5} />
    },
    { 
      name: 'Transport', 
      value: (categoryGroups.find(g => g.name === 'Transportation')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0),
      formattedValue: `$${((categoryGroups.find(g => g.name === 'Transportation')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0) / 1000).toFixed(1)}k`,
      color: '#4CD97B', 
      icon: <Car size={18} strokeWidth={1.5} />
    },
    { 
      name: 'Car Rental', 
      value: categoryGroups.find(g => g.name === 'Travel')?.categories.find(c => c.name === 'Rental Car')?.value || 0,
      formattedValue: `$${((categoryGroups.find(g => g.name === 'Travel')?.categories.find(c => c.name === 'Rental Car')?.value || 0) / 1000).toFixed(1)}k`,
      color: '#FFA45C', 
      icon: <Car size={18} strokeWidth={1.5} />
    },
    { 
      name: 'Office', 
      value: (categoryGroups.find(g => g.name === 'Office')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0),
      formattedValue: `$${((categoryGroups.find(g => g.name === 'Office')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0) / 1000).toFixed(1)}k`,
      color: '#6366F1', 
      icon: <Building size={18} strokeWidth={1.5} />
    },
    { 
      name: 'Prof. Fees', 
      value: categoryGroups.find(g => g.name === 'Professional Services')?.categories.find(c => c.name === 'Professional Fees')?.value || 0,
      formattedValue: `$${((categoryGroups.find(g => g.name === 'Professional Services')?.categories.find(c => c.name === 'Professional Fees')?.value || 0) / 1000).toFixed(1)}k`,
      color: '#8B5CF6', 
      icon: <Briefcase size={18} strokeWidth={1.5} />
    },
    { 
      name: 'Other', 
      value: (
        (categoryGroups.find(g => g.name === 'Other')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0)
      ),
      formattedValue: `$${(((categoryGroups.find(g => g.name === 'Other')?.categories.reduce((sum, cat) => sum + cat.value, 0) || 0)) / 1000).toFixed(1)}k`,
      color: '#A9A9A9', 
      icon: <FileText size={18} strokeWidth={1.5} />
    },
  ];
  
  // Custom tooltip formatter
  const tooltipFormatter = (value: any, name: any) => {
    return [`$${(value / 1000).toFixed(1)}k`, name];
  };

  // Show category details when hovering on pie chart
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card rounded-xl p-6 shadow-lg border border-primary/5 h-[400px]"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Expense Categories</h2>
        <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} />
      </div>
      
      <div className="flex flex-col h-[calc(100%-3rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          {/* Pie chart section */}
          <div className="flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
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
            
            <ChartContainer className="w-full h-full" config={{
              expenses: { theme: { light: "#3b82f6", dark: "#60a5fa" } },
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                  >
                    {topCategoryData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke="none"
                        className="hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={({ active, payload }) => active && payload && payload.length ? (
                      <div className="p-2 bg-white/90 backdrop-blur-sm border rounded-lg shadow-md">
                        <p className="font-medium">{payload[0].name}</p>
                        <p className="text-sm font-semibold">${(payload[0].value as number / 1000).toFixed(1)}k</p>
                      </div>
                    ) : null}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          {/* Categories grid */}
          <div className="grid grid-cols-2 gap-4 overflow-y-auto h-full pr-1">
            {displayCategories.map((category, index) => (
              <motion.div 
                key={`cat-${index}`} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.05), duration: 0.3 }}
                className="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-white/20"
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: category.color }}
                >
                  {category.icon}
                </div>
                <div>
                  <div className="text-sm font-medium">{category.name}</div>
                  <div className="text-sm font-bold">{category.formattedValue}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseCategoriesChart;
