
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroupProps } from './types';
import FieldValidationIndicator from './FieldValidationIndicator';

const NotesField: React.FC<FieldGroupProps> = ({ 
  values, 
  onChange,
  llmSuggestions = {}
}) => {
  return (
    <div className="mb-6">
      <Label htmlFor="notes" className="text-xs font-medium text-gray-700">
        Additional Notes
      </Label>
      <div className="relative">
        <Textarea
          id="notes"
          value={values.notes || ''}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="Additional information or context for this expense..."
          className={`min-h-[100px] text-sm ${llmSuggestions.notes ? 'border-amber-300' : ''}`}
        />
        <FieldValidationIndicator
          llmSuggestion={llmSuggestions.notes}
          className="top-2 -translate-y-0"
        />
      </div>
    </div>
  );
};

export default NotesField;
