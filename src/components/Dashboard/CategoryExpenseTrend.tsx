
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { createChartConfig } from '@/components/Charts/chartUtils';

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
  currency?: string;
}

const formatYAxis = (value: number): string => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
};

// Updated category names to match the image
const expenseCategories = [
  'Relocation Reimbursement',
  'Standard Category',
  'Expense - Other',
  'Travel - Intercity-Personal Vehicle',
  'Travel - International',
  'Per-Diem - Domestic',
  'Per-Diem - International',
  'Expense - Internet',
  'Expense - Mobile',
  'Expense-Medical',
  'Travel-Intercity-Cab/Bus/Auto',
  'Travel-Intercity-Cab/Bus/Flight',
  'Health and Wellness',
  'Lodging & Accommodation',
  'Meals & Entertainment',
  'Miscellaneous Business Expenses',
  'Office Supplies & Equipment',
  'Professional Development',
  'Cash',
  'Remote Work Setup',
  'IT & Software',
  'Travel & Transportation',
  'Travel (Personal Vehicle)'
];

// More vibrant colors for better visibility
const categoryColors = [
  '#6366F1', // Indigo
  '#10B981', // Emerald
  '#F43F5E', // Rose
  '#F59E0B', // Amber
  '#8B5CF6', // Violet
  '#14B8A6', // Teal
  '#3B82F6', // Blue
  '#EC4899', // Pink
  '#8D8D8D', // Gray
  '#F97316', // Orange
  '#84CC16', // Lime
  '#06B6D4', // Cyan
  '#EF4444', // Red
  '#22C55E', // Green
  '#A855F7', // Purple
  '#0EA5E9', // Sky
  '#6B7280', // Gray
  '#D946EF', // Fuchsia
  '#FBBF24', // Yellow
  '#0284C7', // Dark Blue
  '#9333EA', // Purple
  '#71717A', // Zinc
  '#2DD4BF'  // Light Teal
];

const CategoryExpenseTrend: React.FC<CategoryExpenseTrendProps> = ({ 
  data, 
  categories,
  title = "Compare Category Wise Expense Trend",
  currency = "₹"
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(expenseCategories);
  
  // Map categories to their colors
  const categoryColorMap = expenseCategories.reduce((map, category, index) => {
    map[category] = categoryColors[index % categoryColors.length];
    return map;
  }, {} as Record<string, string>);

  // Filter categories to only show the selected ones
  const filteredCategoryData = categories
    .filter(cat => selectedCategories.includes(cat.name))
    .map(cat => ({
      ...cat,
      color: categoryColorMap[cat.name] || cat.color
    }));

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const chartConfig = createChartConfig(filteredCategoryData);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 p-3 rounded shadow-md">
          <p className="font-semibold text-sm">{label}</p>
          <div className="mt-2 space-y-1">
            {payload.map((entry: any, index: number) => (
              entry.value > 0 ? (
                <div key={`tooltip-${index}`} className="flex items-center">
                  <div 
                    className="w-3 h-3 mr-2 rounded-sm" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs">{entry.name}: {currency}{entry.value.toLocaleString()}</span>
                </div>
              ) : null
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-full glass-card border border-primary/5 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            {selectedCategories.length} Category Selected
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 border-dashed">
                <ChevronDown className="h-3.5 w-3.5 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category.name}
                  checked={selectedCategories.includes(category.name)}
                  onCheckedChange={() => handleCategoryToggle(category.name)}
                >
                  {category.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-0">
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
                content={<CustomTooltip />}
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
              {filteredCategoryData.map((category) => (
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
      </CardContent>
    </Card>
  );
};

export default CategoryExpenseTrend;
