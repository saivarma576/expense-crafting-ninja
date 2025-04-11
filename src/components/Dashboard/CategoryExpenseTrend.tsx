
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
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

// Filter for the specific expense types requested
const filteredCategories = [
  'Mileage',
  'Dues Subscriptions',
  'Auditing Serv Fees',
  'Hotel/Lodging',
  'Meals',
  'Others',
  'Professional Fees',
  'Gasoline',
  'Office Supplies',
  'Business Meals',
  'Postage & Freight',
  'Registration Fees',
  'Parking/Tolls',
  'Air/Taxi/Uber',
  'Baggage Fees',
  'Rental Car'
];

// Significantly darker pastel colors for better visibility
const pastelColors = [
  '#A8C1E3', // Darker Soft Blue
  '#E5BAA0', // Darker Soft Peach
  '#C0B8E0', // Darker Soft Purple
  '#EFBCC2', // Darker Soft Pink
  '#D0DCB8', // Darker Soft Green
  '#E0D590', // Darker Soft Yellow
  '#E0A075', // Darker Soft Orange
  '#D0CFE0', // Darker Soft Gray
  '#A8E0C4', // Darker Soft Mint
  '#E0A8D0', // Darker Soft Magenta
  '#B8CFCF', // Darker Soft Teal
  '#E0BBA0', // Darker Soft Amber
  '#B8C0E0', // Darker Soft Indigo
  '#D5B8E0', // Darker Soft Lavender
  '#A8D5E0', // Darker Soft Cyan
  '#E0C998'  // Darker Soft Gold
];

const CategoryExpenseTrend: React.FC<CategoryExpenseTrendProps> = ({ 
  data, 
  categories,
  title = "Compare Category Wise Expense Trend",
  currency = "$"
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(filteredCategories);
  
  // Filter categories to only show the requested ones
  const filteredCategoryData = categories.filter(cat => 
    selectedCategories.includes(cat.name)
  ).map((cat, index) => ({
    ...cat,
    color: pastelColors[index % pastelColors.length] // Assign significantly darker pastel colors
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

  return (
    <Card className="col-span-full glass-card border border-primary/5 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
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
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 40, // Increased top margin to prevent label overlap
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
                value: `Expense Amount (${currency})`, 
                angle: -90, 
                position: 'left',
                style: { textAnchor: 'middle', fontSize: 12 },
                offset: 0
              }}
            />
            <Tooltip 
              formatter={(value: number) => [`${currency}${value.toLocaleString()}`, '']}
              labelFormatter={(label) => `${label}`}
              contentStyle={{ borderRadius: '8px', border: '1px solid #E4E4E7', backgroundColor: 'white' }}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ 
                fontSize: '12px', 
                paddingTop: '20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(8, 1fr)',
                gap: '8px',
                width: '100%',
              }}
            />
            {filteredCategoryData.map((category) => (
              <Bar 
                key={category.name}
                dataKey={category.name}
                stackId="stack"
                fill={category.color}
                radius={[4, 4, 0, 0]}
              >
                <LabelList 
                  dataKey={category.name} 
                  position="top" 
                  formatter={(value: number) => value > 1000 ? `${currency}${(value/1000).toFixed(1)}K` : `${currency}${value}`}
                  style={{ fontSize: 10, fontWeight: 'bold' }}
                  offset={10}
                />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryExpenseTrend;
