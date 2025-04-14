
import React from 'react';

interface ProgressIndicatorProps {
  step: number;
  totalSteps?: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  step, 
  totalSteps = 2 
}) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-4">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div 
          key={i} 
          className={`h-2 rounded-full transition-all duration-300 ${
            step === i + 1 
              ? "w-8 bg-primary" 
              : step > i + 1 
                ? "w-8 bg-primary/60" 
                : "w-2 bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
