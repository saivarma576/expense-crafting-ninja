
import React from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Legend
} from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

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
  
  // Create top-level category data for the pie chart
  const pieData = categoryGroups.map(group => ({
    name: group.name,
    value: group.categories.reduce((sum, cat) => sum + cat.value, 0),
    color: group.categories[0]?.color || '#ccc'
  }));

  // Define chart config for the ChartContainer
  const chartConfig = pieData.reduce((config, item) => {
    return {
      ...config,
      [item.name]: {
        color: item.color
      }
    };
  }, {});

  // Custom legend formatter
  const renderColorfulLegendText = (value: string) => {
    return <span className="text-xs font-medium">{value}</span>;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="relative flex-1 flex items-center justify-center">
        {/* Center Total Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <span className="text-3xl font-bold">{formattedTotal}</span>
            <span className="text-sm text-muted-foreground">This month total</span>
            <span className="text-xs text-muted-foreground">expense</span>
          </motion.div>
        </div>
        
        {/* Pie Chart */}
        <ChartContainer className="w-full h-full max-h-[240px]" config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={1}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                formatter={renderColorfulLegendText}
                wrapperStyle={{
                  paddingTop: 20,
                  fontSize: 12,
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default ExpenseCategoryPieChart;
