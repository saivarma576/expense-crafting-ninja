
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileDigit } from 'lucide-react';
import { FieldGroupProps } from './types';
import FieldValidationIndicator from './FieldValidationIndicator';

interface GlAccountFieldProps extends FieldGroupProps {
  error?: string | null;
  llmSuggestion?: string | null;
}

const GlAccountField: React.FC<GlAccountFieldProps> = ({ 
  values, 
  onChange, 
  error,
  llmSuggestion
}) => {
  return (
    <div className="mb-4">
      <Label htmlFor="glAccount" className="text-xs font-medium text-gray-700 flex items-center">
        GL Account <span className="text-red-500 ml-1">*</span>
      </Label>
      <div className="relative">
        <Input
          id="glAccount"
          value={values.glAccount || ''}
          onChange={(e) => onChange('glAccount', e.target.value)}
          placeholder="E.g., 50600140"
          className={`h-8 px-2 py-1 text-sm pl-7 ${error ? 'border-red-500 pr-8' : llmSuggestion ? 'border-amber-300 pr-8' : ''}`}
          required
        />
        <FileDigit className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
        <FieldValidationIndicator 
          programmaticError={error} 
          llmSuggestion={llmSuggestion} 
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-2 duration-200">{error}</p>
      )}
    </div>
  );
};

export default GlAccountField;
