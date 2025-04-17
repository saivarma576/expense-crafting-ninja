
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, DollarSign, Store, FileText } from 'lucide-react';
import { FieldGroupProps } from './types';
import FieldValidationIndicator from './FieldValidationIndicator';

interface CommonFieldsProps extends FieldGroupProps {
  type: string;
  isAmountDisabled?: boolean;
  fieldErrors?: Record<string, string | null>;
}

const CommonFields: React.FC<CommonFieldsProps> = ({ 
  type, 
  values, 
  onChange, 
  isAmountDisabled = false,
  fieldErrors = {},
  llmSuggestions = {}
}) => {
  return (
    <div className="mb-4 space-y-4">
      <h3 className="text-sm font-medium text-gray-700">{type === 'mileage' ? 'Mileage Information' : 'Expense Information'}</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <Label htmlFor="date" className="text-xs font-medium text-gray-700 flex items-center">
            Date <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Input
              id="date"
              type="date"
              value={values.date || ''}
              onChange={(e) => onChange('date', e.target.value)}
              className={`h-8 px-2 py-1 text-sm pl-7 ${fieldErrors.date ? 'border-red-500 pr-8' : llmSuggestions.date ? 'border-amber-300 pr-8' : ''}`}
              required
            />
            <Calendar className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
            <FieldValidationIndicator 
              programmaticError={fieldErrors.date} 
              llmSuggestion={llmSuggestions.date} 
            />
          </div>
          {fieldErrors.date && (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.date}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="amount" className="text-xs font-medium text-gray-700 flex items-center">
            Amount <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={values.amount || ''}
              onChange={(e) => onChange('amount', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className={`h-8 px-2 py-1 text-sm pl-7 ${fieldErrors.amount ? 'border-red-500 pr-8' : llmSuggestions.amount ? 'border-amber-300 pr-8' : ''}`}
              disabled={isAmountDisabled}
              required
            />
            <span className="absolute left-2 top-2 text-gray-400 text-sm">$</span>
            <FieldValidationIndicator 
              programmaticError={fieldErrors.amount} 
              llmSuggestion={llmSuggestions.amount} 
            />
          </div>
          {fieldErrors.amount && (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.amount}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="merchantName" className="text-xs font-medium text-gray-700 flex items-center">
            Merchant Name <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Input
              id="merchantName"
              value={values.merchantName || ''}
              onChange={(e) => onChange('merchantName', e.target.value)}
              placeholder="E.g., Office Depot"
              className={`h-8 px-2 py-1 text-sm pl-7 ${fieldErrors.merchantName ? 'border-red-500 pr-8' : llmSuggestions.merchantName ? 'border-amber-300 pr-8' : ''}`}
              required
            />
            <Store className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
            <FieldValidationIndicator 
              programmaticError={fieldErrors.merchantName} 
              llmSuggestion={llmSuggestions.merchantName} 
            />
          </div>
          {fieldErrors.merchantName && (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.merchantName}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="description" className="text-xs font-medium text-gray-700 flex items-center">
            Description <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Input
              id="description"
              value={values.description || ''}
              onChange={(e) => onChange('description', e.target.value)}
              placeholder="Brief description"
              className={`h-8 px-2 py-1 text-sm pl-7 ${llmSuggestions.description ? 'border-amber-300 pr-8' : ''}`}
              required
            />
            <FileText className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
            <FieldValidationIndicator 
              llmSuggestion={llmSuggestions.description} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonFields;
