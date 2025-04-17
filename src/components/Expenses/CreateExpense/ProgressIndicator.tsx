
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  step: number;
  totalSteps?: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  step, 
  totalSteps = 2 
}) => {
  return (
    <div className="flex flex-col items-center space-y-2 mb-6 w-full">
      <div className="flex w-full items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div 
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                step === i + 1 
                  ? "bg-primary text-white shadow-md animate-pulse-subtle" 
                  : step > i + 1 
                    ? "bg-primary/80 text-white" 
                    : "bg-gray-100 text-gray-400 border border-gray-200"
              )}
            >
              {step > i + 1 ? (
                <Check className="h-5 w-5 animate-scale-in" />
              ) : (
                <span className="text-sm font-medium">{i + 1}</span>
              )}
            </div>
            <span className={cn(
              "text-xs mt-2 font-medium",
              step === i + 1 ? "text-primary" : "text-gray-500"
            )}>
              {i === 0 ? "Basic Info" : "Details"}
            </span>
          </div>
        ))}
      </div>
      
      <div className="w-full flex items-center justify-center mt-2 px-4">
        <div className="h-1 bg-gray-100 rounded-full w-full relative">
          <div 
            className="absolute h-1 bg-primary rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${(step - 1) * (100 / (totalSteps - 1))}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
