
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ProgressIndicatorV3Props {
  step: number;
}

const ProgressIndicatorV3: React.FC<ProgressIndicatorV3Props> = ({ step }) => {
  const steps = [
    { icon: '🧳', label: 'Business Travel' },
    { icon: '📝', label: 'Travel Details' },
    { icon: '🍽️', label: 'Meal Selection' }
  ];

  return (
    <div className="flex h-full">
      <div className="flex flex-col space-y-8 pr-6 relative">
        <div className="absolute left-[18px] top-[30px] bottom-[30px] w-0.5 bg-gray-100">
          <div 
            className="w-0.5 bg-primary transition-all duration-500 ease-in-out"
            style={{ height: `${(step - 1) / (steps.length - 1) * 100}%` }}
          />
        </div>
        
        {steps.map((stepItem, i) => (
          <div key={i} className="flex items-center space-x-3">
            <div 
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                step === i + 1 
                  ? "bg-primary text-white shadow-md animate-pulse-subtle" 
                  : step > i + 1 
                    ? "bg-primary/80 text-white" 
                    : "bg-gray-50 text-gray-400 border border-gray-200"
              )}
            >
              {step > i + 1 ? (
                <Check className="h-5 w-5 animate-scale-in" />
              ) : (
                <span className="text-lg">{stepItem.icon}</span>
              )}
            </div>
            <span className={cn(
              "text-sm font-medium whitespace-nowrap",
              step === i + 1 ? "text-primary" : "text-gray-500"
            )}>
              {stepItem.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicatorV3;
