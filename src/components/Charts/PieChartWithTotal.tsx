
import React from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip
} from 'recharts';
import { ChartContainer } from "@/components/ui/chart";
import { createChartConfig, formatCurrency, renderLegendText, getCategoryIcon } from './chartUtils';

interface PieChartDataPoint {
  name: string;
  value: number;
  color: string;
}

interface PieChartWithTotalProps {
  data: PieChartDataPoint[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const PieChartWithTotal: React.FC<PieChartWithTotalProps> = ({ 
  data, 
  title = 'Total',
  subtitle = 'expense',
  className = 'h-[300px]'
}) => {
  // Calculate total for center display
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const formattedTotal = formatCurrency(totalValue, true);
  
  // Create chart configuration
  const chartConfig = createChartConfig(data);
  
  // Custom renderer for the legend that includes icons and formatted amounts
  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <div className="flex flex-wrap justify-center gap-3 pt-3 text-xs">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 mr-1.5 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <div className="flex items-center">
              {getCategoryIcon(entry.value)}
              <span className="font-medium mr-1">{entry.value}</span>
              <span className="text-muted-foreground">
                ({formatCurrency(entry.payload.value, true)})
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Sort data by value for better visualization (largest to smallest)
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
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
          <span className="text-xs text-muted-foreground">{subtitle}</span>
        </motion.div>
      </div>
      
      {/* Pie Chart */}
      <ChartContainer className="w-full h-full max-h-[240px]" config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sortedData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={1}
              dataKey="value"
            >
              {sortedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="none"
                />
              ))}
            </Pie>
            <Legend 
              content={renderCustomLegend}
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default PieChartWithTotal;
