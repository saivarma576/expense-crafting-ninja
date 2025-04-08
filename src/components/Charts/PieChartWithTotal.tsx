
import React from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Legend
} from 'recharts';
import { ChartContainer } from "@/components/ui/chart";
import { createChartConfig, formatCurrency, renderLegendText } from './chartUtils';

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
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={1}
              dataKey="value"
            >
              {data.map((entry, index) => (
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
              formatter={renderLegendText}
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
  );
};

export default PieChartWithTotal;
