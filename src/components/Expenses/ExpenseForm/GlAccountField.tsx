
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileDigit, AlertCircle, AlertTriangle } from 'lucide-react';
import { FieldGroupProps } from './types';
import FieldValidationIndicator from './FieldValidationIndicator';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface GlAccountFieldProps extends FieldGroupProps {
  error?: string | null;
  llmSuggestion?: string | null;
  activeField?: string | null;
}

const GlAccountField: React.FC<GlAccountFieldProps> = ({ 
  values, 
  onChange, 
  error,
  llmSuggestion,
  activeField
}) => {
  const isHighlighted = activeField === 'glAccount';

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <Label 
          htmlFor="glAccount" 
          className={cn(
            "text-xs font-medium text-gray-700",
            isHighlighted && "text-amber-700 font-semibold"
          )}
        >
          GL Account <span className="text-red-500 ml-1">*</span>
        </Label>
        
        {(isHighlighted || llmSuggestion || error) && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center text-xs">
                  {error ? (
                    <span className="text-red-500 flex items-center">
                      <AlertCircle className="h-3.5 w-3.5 mr-1" />
                      Error
                    </span>
                  ) : (
                    <span className="text-amber-500 flex items-center">
                      <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                      Warning
                    </span>
                  )}
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-sm max-w-xs">
                  {error || llmSuggestion || "This field requires your attention"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="relative">
        <Input
          id="glAccount"
          value={values.glAccount || ''}
          onChange={(e) => onChange('glAccount', e.target.value)}
          placeholder="E.g., 50600140"
          className={cn(
            "h-8 px-2 py-1 text-sm pl-7",
            error ? 'border-red-500 pr-8' : 
            llmSuggestion ? 'border-amber-300 pr-8' : '',
            isHighlighted ? 'ring-2 ring-amber-400 animate-pulse' : ''
          )}
          required
        />
        <FileDigit className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
        <FieldValidationIndicator 
          programmaticError={error} 
          llmSuggestion={llmSuggestion}
          highlightField={isHighlighted}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-2 duration-200">{error}</p>
      )}
    </div>
  );
};

export default GlAccountField;
