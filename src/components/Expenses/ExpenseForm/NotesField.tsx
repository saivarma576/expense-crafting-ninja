
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from 'lucide-react';
import { FieldGroupProps } from './types';
import FieldValidationIndicator from './FieldValidationIndicator';
import { cn } from '@/lib/utils';
import TruncatedText from '@/components/ui/truncated-text';

interface NotesFieldProps extends FieldGroupProps {
  activeField?: string | null;
  helperText?: string;
}

const NotesField: React.FC<NotesFieldProps> = ({ 
  values, 
  onChange,
  llmSuggestions = {},
  activeField,
  helperText
}) => {
  const isHighlighted = activeField === 'notes';
  const defaultHelperText = "Comments section should be used for documenting any differences between receipts and amounts requested.";
  
  return (
    <div className="mb-6">
      <Label htmlFor="notes" className={cn(
        "text-xs font-medium text-gray-700",
        isHighlighted && "text-amber-700 font-semibold"
      )}>
        Additional Notes
        {isHighlighted && (
          <span className="ml-2 text-amber-500 text-xs">
            <AlertCircle className="h-3.5 w-3.5 inline mr-1" />
            Attention needed
          </span>
        )}
      </Label>
      <div className="relative">
        <Textarea
          id="notes"
          value={values.notes || ''}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="Additional information or context for this expense..."
          className={cn(
            "min-h-[100px] text-sm",
            llmSuggestions.notes ? 'border-amber-300' : '',
            isHighlighted ? 'ring-2 ring-amber-400 animate-pulse' : ''
          )}
        />
        <FieldValidationIndicator
          llmSuggestion={llmSuggestions.notes}
          className="top-2 -translate-y-0"
          highlightField={isHighlighted}
        />
      </div>
      {(helperText || defaultHelperText) && (
        <TruncatedText
          text={helperText || defaultHelperText}
          maxLength={100}
          className="text-xs text-gray-500 mt-1"
        />
      )}
    </div>
  );
};

export default NotesField;
