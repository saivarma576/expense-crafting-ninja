
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChartTooltipProps {
  active: boolean;
  payload: any[];
  label: string;
  currency: string;
}

const ChartTooltip: React.FC<ChartTooltipProps> = ({ active, payload, label, currency }) => {
  if (active && payload && payload.length) {
    // Sort the entries by value in descending order for better readability
    const sortedPayload = [...payload].filter(entry => entry.value > 0).sort((a, b) => b.value - a.value);
    
    // Calculate total for the month
    const totalAmount = sortedPayload.reduce((sum, entry) => sum + entry.value, 0);
    
    return (
      <div className="bg-white border border-gray-200 p-4 rounded-md shadow-lg max-h-[400px] overflow-y-auto">
        <div className="flex items-center justify-between border-b pb-2 mb-2">
          <p className="font-semibold">{label}</p>
          <p className="font-bold text-gray-800">{currency}{totalAmount.toLocaleString()}</p>
        </div>
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {sortedPayload.map((entry: any, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center justify-between">
              <div className="flex items-center max-w-[70%]">
                <div 
                  className="min-w-3 h-3 mr-2 rounded-sm" 
                  style={{ backgroundColor: entry.color }}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-xs truncate">{entry.name}</span>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-white z-50">
                      <p className="text-xs">{entry.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-xs font-medium ml-2">{currency}{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default ChartTooltip;
