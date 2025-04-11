
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface CategoryExpense {
  name: string;
  color: string;
}

export interface MonthCategoryData {
  month: string;
  totalAmount: number;
  [key: string]: number | string;
}

interface CategoryExpenseTrendProps {
  data: MonthCategoryData[];
  categories: CategoryExpense[];
  title?: string;
}

const formatYAxis = (value: number): string => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

const CategoryExpenseTrend: React.FC<CategoryExpenseTrendProps> = ({ 
  data, 
  categories,
  title = "Compare Category Wise Expense Trend"
}) => {
  return (
    <Card className="col-span-full glass-card border border-primary/5 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <div className="text-sm text-muted-foreground">
          {categories.length} Categories Selected
        </div>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 30,
            }}
            stackOffset="sign"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
                value: 'Expense Amount (INR)', 
                angle: -90, 
                position: 'left',
                style: { textAnchor: 'middle', fontSize: 12 },
                offset: 0
              }}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toLocaleString()}`, '']}
              labelFormatter={(label) => `${label}`}
              contentStyle={{ borderRadius: '8px', border: '1px solid #E4E4E7' }}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
            />
            {categories.map((category) => (
              <Bar 
                key={category.name}
                dataKey={category.name}
                stackId="stack"
                fill={category.color}
                radius={[4, 4, 0, 0]}
              >
                <LabelList dataKey={category.name} position="top" />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryExpenseTrend;
