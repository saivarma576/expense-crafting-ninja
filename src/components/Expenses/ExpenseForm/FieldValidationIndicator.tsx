
import React from 'react';
import { AlertCircle, AlertTriangle, Zap, ChevronRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FieldValidationIndicatorProps {
  programmaticError?: string | null;
  llmSuggestion?: string | null;
  className?: string;
  highlightField?: boolean;
}

const FieldValidationIndicator: React.FC<FieldValidationIndicatorProps> = ({
  programmaticError,
  llmSuggestion,
  className,
  highlightField = false
}) => {
  if (!programmaticError && !llmSuggestion) return null;
  
  const hasError = !!programmaticError;
  const hasSuggestion = !!llmSuggestion;
  
  return (
    <div className={cn(
      "absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1", 
      className,
      highlightField && "animate-bounce"
    )}>
      {hasError && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="group flex items-center justify-center h-5 w-5 rounded-full bg-red-100 text-red-500 animate-in fade-in zoom-in duration-300">
                <AlertCircle className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-red-50 border-red-200">
              <div className="flex items-start gap-2 max-w-xs">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-700">Validation Error</p>
                  <p className="text-sm text-red-600">{programmaticError}</p>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {hasSuggestion && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="group flex items-center justify-center h-5 w-5 rounded-full bg-amber-100 text-amber-500 animate-in fade-in zoom-in duration-300">
                <AlertTriangle className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-amber-50 border-amber-200">
              <div className="flex items-start gap-2 max-w-xs">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-700">Policy Warning</p>
                  <p className="text-sm text-amber-600">{llmSuggestion}</p>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default FieldValidationIndicator;
