
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { formatTooltipValue, formatYAxisTick } from './chartUtils';

interface AreaChartData {
  name: string;
  value: number;
}

interface AreaChartComponentProps {
  data: AreaChartData[];
  gradientColor?: string;
  strokeColor?: string;
  dataKey?: string;
  height?: number;
}

const AreaChartComponent: React.FC<AreaChartComponentProps> = ({ 
  data, 
  gradientColor = '#3b82f6',
  strokeColor = '#3b82f6',
  dataKey = 'value',
  height = 300
}) => {
  const chartConfig = {
    [dataKey]: {
      label: "Expenses", 
      color: strokeColor
    }
  };
  
  const gradientId = `color${dataKey}`;
  
  return (
    <div style={{ height: `${height}px` }}>
      <ChartContainer config={chartConfig}>
        <AreaChart 
          data={data} 
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={gradientColor} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={gradientColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis 
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
            tickLine={false}
            tickFormatter={formatYAxisTick}
            domain={[0, 'dataMax + 500']}
          />
          <Tooltip
            content={
              <ChartTooltipContent 
                labelClassName="font-medium text-foreground" 
                formatter={formatTooltipValue}
              />
            }
            cursor={{ strokeDasharray: '3 3', stroke: '#9ca3af', strokeWidth: 1 }}
          />
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={strokeColor} 
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#${gradientId})`} 
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default AreaChartComponent;
