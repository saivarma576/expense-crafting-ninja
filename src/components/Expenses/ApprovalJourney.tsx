
import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApprovalJourneyProps {
  steps: Array<{
    completed: boolean;
    current: boolean;
    label: string;
  }>;
}

export const ApprovalJourney: React.FC<ApprovalJourneyProps> = ({ steps }) => {
  return (
    <div className="flex items-center w-full justify-between mb-6 mt-2">
      {steps.map((step, index) => (
        <React.Fragment key={`journey-step-${index}`}>
          <div className="flex flex-col items-center">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all",
              step.current && !step.completed ? "bg-primary/10 ring-2 ring-primary" : "",
              step.completed ? "bg-primary/20" : "bg-gray-100"
            )}>
              {step.completed ? (
                <CheckCircle2 className="h-6 w-6 text-primary" />
              ) : (
                <Circle className={cn(
                  "h-6 w-6",
                  step.current ? "text-primary" : "text-gray-400"
                )} />
              )}
            </div>
            <span className={cn(
              "text-xs font-medium mt-2 text-center",
              step.current ? "text-primary" : "text-gray-500"
            )}>
              {step.label}
            </span>
          </div>
          
          {index < steps.length - 1 && (
            <div className={cn(
              "flex-1 h-0.5 mx-2",
              index < steps.findIndex(s => s.current) ? "bg-primary" : "bg-gray-200"
            )}>
              <ArrowRight className={cn(
                "h-4 w-4 relative top-[-7px] left-[calc(50%-8px)]",
                index < steps.findIndex(s => s.current) ? "text-primary" : "text-gray-300"
              )} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
