
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { formatTooltipValue } from './chartUtils';

interface BarChartData {
  name: string;
  value: number;
}

interface BarChartComponentProps {
  data: BarChartData[];
  barColor?: string;
  height?: number;
  barSize?: number;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ 
  data, 
  barColor = '#3b82f6',
  height = 300,
  barSize = 24
}) => {
  return (
    <div style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          barSize={barSize}
        >
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
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: 'none'
            }}
            formatter={(value) => [`$${value}`, 'Amount']}
          />
          <Bar 
            dataKey="value" 
            fill={barColor} 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
