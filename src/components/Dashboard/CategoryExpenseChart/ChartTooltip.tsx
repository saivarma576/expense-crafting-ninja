
import React from 'react';

interface ChartTooltipProps {
  active: boolean;
  payload: any[];
  label: string;
  currency: string;
}

const ChartTooltip: React.FC<ChartTooltipProps> = ({ active, payload, label, currency }) => {
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

export default ChartTooltip;
