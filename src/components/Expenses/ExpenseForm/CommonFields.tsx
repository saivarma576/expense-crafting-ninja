
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, DollarSign, BriefcaseBusiness, FileText, User } from 'lucide-react';
import { FieldGroupProps } from './types';
import FieldValidationIndicator from './FieldValidationIndicator';

interface CommonFieldsProps extends FieldGroupProps {
  type: string;
  isAmountDisabled?: boolean;
  fieldErrors: Record<string, string | null>;
  llmSuggestions?: Record<string, string | null>;
}

const CommonFields: React.FC<CommonFieldsProps> = ({ 
  type, 
  values, 
  onChange, 
  isAmountDisabled = false,
  fieldErrors,
  llmSuggestions = {}
}) => {
  return (
    <div className="mb-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {/* Amount Field */}
        <div>
          <Label 
            htmlFor="amount" 
            className="text-xs font-medium text-gray-700 flex items-center"
          >
            Amount <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              value={values.amount || ''}
              onChange={(e) => onChange('amount', parseFloat(e.target.value) || 0)}
              className={`h-8 px-2 py-1 text-sm pl-7 ${fieldErrors.amount ? 'border-red-500 pr-8' : llmSuggestions.amount ? 'border-amber-300 pr-8' : ''}`}
              placeholder="0.00"
              disabled={isAmountDisabled}
              required
            />
            <DollarSign className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
            <FieldValidationIndicator
              programmaticError={fieldErrors.amount}
              llmSuggestion={llmSuggestions.amount}
            />
          </div>
          {fieldErrors.amount && (
            <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-2 duration-200">{fieldErrors.amount}</p>
          )}
        </div>

        {/* Date Field */}
        <div>
          <Label 
            htmlFor="date" 
            className="text-xs font-medium text-gray-700 flex items-center"
          >
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
            <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-2 duration-200">{fieldErrors.date}</p>
          )}
        </div>
      </div>

      {/* Merchant Name */}
      <div>
        <Label 
          htmlFor="merchantName" 
          className="text-xs font-medium text-gray-700 flex items-center"
        >
          Merchant Name <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="relative">
          <Input
            id="merchantName"
            value={values.merchantName || ''}
            onChange={(e) => onChange('merchantName', e.target.value)}
            className={`h-8 px-2 py-1 text-sm pl-7 ${fieldErrors.merchantName ? 'border-red-500 pr-8' : llmSuggestions.merchantName ? 'border-amber-300 pr-8' : ''}`}
            placeholder="Where was the expense incurred?"
            required
          />
          <User className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
          <FieldValidationIndicator
            programmaticError={fieldErrors.merchantName}
            llmSuggestion={llmSuggestions.merchantName}
          />
        </div>
        {fieldErrors.merchantName && (
          <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-2 duration-200">{fieldErrors.merchantName}</p>
        )}
      </div>
      
      {/* Description */}
      <div>
        <Label 
          htmlFor="description" 
          className="text-xs font-medium text-gray-700 flex items-center"
        >
          Description <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="relative">
          <Input
            id="description"
            value={values.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            className="h-8 px-2 py-1 text-sm pl-7"
            placeholder="What was the expense for?"
            required
          />
          <FileText className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
        </div>
      </div>
      
      {/* Cost Center */}
      <div>
        <Label 
          htmlFor="costCenter" 
          className="text-xs font-medium text-gray-700 flex items-center"
        >
          Cost Center <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="relative">
          <Input
            id="costCenter"
            value={values.costCenter || ''}
            onChange={(e) => onChange('costCenter', e.target.value)}
            className="h-8 px-2 py-1 text-sm pl-7"
            placeholder="E.g., 10000 - Marketing"
            required
          />
          <BriefcaseBusiness className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
        </div>
      </div>
      
      {/* WBS Element */}
      <div>
        <Label 
          htmlFor="wbs" 
          className="text-xs font-medium text-gray-700 flex items-center"
        >
          WBS Element <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="relative">
          <Input
            id="wbs"
            value={values.wbs || ''}
            onChange={(e) => onChange('wbs', e.target.value)}
            className="h-8 px-2 py-1 text-sm pl-7"
            placeholder="E.g., A-1234.5678"
            required
          />
          <FileText className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default CommonFields;
