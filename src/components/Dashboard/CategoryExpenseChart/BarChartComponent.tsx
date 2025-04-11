
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { formatYAxis } from './utils';
import ChartTooltip from './ChartTooltip';
import { CategoryExpense, MonthCategoryData } from '../CategoryExpenseTrend';

interface BarChartComponentProps {
  data: MonthCategoryData[];
  categories: CategoryExpense[];
  chartConfig: any;
  currency: string;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ 
  data, 
  categories, 
  chartConfig,
  currency
}) => {
  return (
    <div className="h-[450px]">
      <ChartContainer 
        config={chartConfig}
        className="h-full w-full p-4"
      >
        <BarChart
          data={data}
          margin={{
            top: 40,
            right: 30,
            left: 20,
            bottom: 100,
          }}
          barGap={1}
          barSize={8}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#E4E4E7' }}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={formatYAxis}
            axisLine={{ stroke: '#E4E4E7' }}
            tickLine={false}
            tick={{ fontSize: 12 }}
            label={{ 
              value: `Expense Amount (${currency})`, 
              angle: -90, 
              position: 'left',
              style: { textAnchor: 'middle', fontSize: 12, fill: '#6B7280' },
              offset: 0
            }}
            domain={[0, 'dataMax + 5000']}
          />
          <Tooltip 
            content={<ChartTooltip currency={currency} active={false} payload={[]} label="" />}
            cursor={{ fill: 'rgba(224, 224, 224, 0.2)' }}
          />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ 
              fontSize: '10px', 
              paddingTop: '20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '6px',
              width: '100%',
            }}
          />
          {categories.map((category) => (
            <Bar 
              key={category.name}
              dataKey={category.name}
              stackId="stack"
              fill={category.color}
              radius={[2, 2, 0, 0]}
            >
              <LabelList 
                dataKey={category.name} 
                position="top" 
                formatter={(value: number) => {
                  if (!value || value <= 0) return '';
                  return value > 10000 ? `${(value/1000).toFixed(0)}K` : value;
                }}
                style={{ fontSize: 10, fill: '#666', fontWeight: 'bold' }}
                offset={5}
              />
            </Bar>
          ))}
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default BarChartComponent;
