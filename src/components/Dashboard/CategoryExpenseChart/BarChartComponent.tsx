import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Cell } from 'recharts';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ChartContainer } from '@/components/ui/chart';
import { formatYAxis } from './utils';
import ChartTooltip from './ChartTooltip';
import { CategoryExpense, MonthCategoryData } from '../CategoryExpenseTrend';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const [showAllLegends, setShowAllLegends] = useState(false);
  const [legendPage, setLegendPage] = useState(0);
  
  const legendsPerPage = 10;
  const totalPages = Math.ceil(categories.length / legendsPerPage);
  
  const currentLegends = showAllLegends 
    ? categories 
    : categories.slice(legendPage * legendsPerPage, (legendPage + 1) * legendsPerPage);
  
  const handleNextPage = () => {
    setLegendPage((prev) => (prev + 1) % totalPages);
  };
  
  const handlePrevPage = () => {
    setLegendPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="h-[450px]">
      <ChartContainer 
        config={chartConfig}
        className="h-full w-full p-4"
      >
        <BarChart
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 100,
          }}
          barGap={1}
          barSize={16}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#E4E4E7' }}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={(value) => formatYAxis(value)}
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
          
          {currentLegends.map((category) => (
            <Bar 
              key={category.name}
              dataKey={category.name}
              stackId="stack"
              fill={category.color}
              radius={[2, 2, 0, 0]}
            />
          ))}
        </BarChart>
      </ChartContainer>
      
      <div className="mt-2 px-4">
        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4 text-gray-500" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-2">
                <p className="text-xs text-gray-600">
                  This chart shows category-wise expense trends over time. Use the pagination controls to view all categories.
                </p>
              </HoverCardContent>
            </HoverCard>
            <span className="text-sm text-gray-500 ml-1">
              Showing {legendPage * legendsPerPage + 1}-{Math.min((legendPage + 1) * legendsPerPage, categories.length)} of {categories.length} categories
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowAllLegends(!showAllLegends)}
              className="text-xs h-8"
            >
              {showAllLegends ? "Show Less" : "Show All"}
            </Button>
            
            {!showAllLegends && (
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handlePrevPage}
                  className="h-8 w-8"
                  disabled={totalPages <= 1}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <span className="text-xs mx-1">{legendPage + 1}/{totalPages}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleNextPage}
                  className="h-8 w-8"
                  disabled={totalPages <= 1}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3 pb-2">
          {currentLegends.map((category, index) => (
            <div 
              key={`legend-${index}`} 
              className="flex items-center px-2 py-1 rounded-full text-xs"
              style={{ 
                backgroundColor: `${category.color}15`,
                border: `1px solid ${category.color}30`
              }}
            >
              <div 
                className="w-2 h-2 rounded-full mr-1.5" 
                style={{ backgroundColor: category.color }}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="truncate max-w-[120px]">{category.name}</span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="z-50 bg-white">
                    <p className="text-xs">{category.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarChartComponent;
