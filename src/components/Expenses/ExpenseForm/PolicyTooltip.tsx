
import React from 'react';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PolicyViolation } from '@/utils/policyValidations';

interface PolicyTooltipProps {
  violations: PolicyViolation[];
  className?: string;
}

const PolicyTooltip: React.FC<PolicyTooltipProps> = ({ violations, className }) => {
  if (violations.length === 0) return null;

  const hasErrors = violations.some(v => v.severity === 'error');

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip defaultOpen={true}>
        <TooltipTrigger asChild>
          <button className={`${className} flex items-center`}>
            {hasErrors ? (
              <AlertCircle className="h-4 w-4 text-red-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent className="w-64 p-0 z-50">
          <div className="p-2 space-y-2 bg-white border rounded-md shadow-lg">
            {violations.map((violation) => (
              <div 
                key={violation.id} 
                className={`text-xs ${
                  violation.severity === 'error' 
                    ? 'text-red-600'
                    : 'text-amber-600'
                }`}
              >
                <p className="font-medium">{violation.field}</p>
                <p>{violation.message}</p>
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PolicyTooltip;
