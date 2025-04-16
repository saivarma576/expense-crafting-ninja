
import React from 'react';
import { AlertCircle, Zap, ChevronRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/lib/utils';

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
        <Popover>
          <PopoverTrigger asChild>
            <button className="group flex items-center justify-center h-5 w-5 rounded-full bg-red-100 text-red-500 animate-in fade-in zoom-in duration-300">
              <AlertCircle className="h-3.5 w-3.5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 mr-2" side="right">
            <div className="bg-red-50 p-3 rounded-md border border-red-200">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-700">Validation Error</p>
                  <p className="text-sm text-red-600">{programmaticError}</p>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
      
      {hasSuggestion && (
        <Popover>
          <PopoverTrigger asChild>
            <button className="group flex items-center justify-center h-5 w-5 rounded-full bg-amber-100 text-amber-500 animate-in fade-in zoom-in duration-300">
              <Zap className="h-3.5 w-3.5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 mr-2" side="right">
            <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
              <div className="flex items-start gap-2">
                <Zap className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-700">AI Suggestion</p>
                  <p className="text-sm text-amber-600">{llmSuggestion}</p>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default FieldValidationIndicator;
