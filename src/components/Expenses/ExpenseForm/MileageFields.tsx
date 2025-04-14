
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Route } from 'lucide-react';
import { MileageFieldsProps } from './types';
import FieldValidationIndicator from './FieldValidationIndicator';

const MileageFields: React.FC<MileageFieldsProps> = ({ 
  values, 
  onChange, 
  error,
  llmSuggestions = {}
}) => {
  return (
    <div className="mb-4 space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Mileage Details</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <Label htmlFor="miles" className="text-xs font-medium text-gray-700 flex items-center">
            Miles <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Input
              id="miles"
              type="number"
              value={values.miles || ''}
              onChange={(e) => onChange('miles', parseFloat(e.target.value) || 0)}
              placeholder="Enter miles"
              className={`h-8 px-2 py-1 text-sm pl-7 ${error ? 'border-red-500 pr-8' : llmSuggestions.miles ? 'border-amber-300 pr-8' : ''}`}
              required
            />
            <Route className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
            <FieldValidationIndicator 
              programmaticError={error} 
              llmSuggestion={llmSuggestions.miles} 
            />
          </div>
          {error && (
            <p className="mt-1 text-xs text-red-500">{error}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="mileageRate" className="text-xs font-medium text-gray-700">
            Rate Per Mile
          </Label>
          <div className="relative">
            <Input
              id="mileageRate"
              type="number"
              step="0.01"
              value={values.mileageRate || ''}
              onChange={(e) => onChange('mileageRate', parseFloat(e.target.value) || 0)}
              placeholder="Rate per mile"
              className="h-8 px-2 py-1 text-sm pl-7"
              disabled
            />
            <span className="absolute left-2 top-2 text-gray-400 text-sm">$</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">Standard mileage rate</p>
        </div>
        
        <div>
          <Label htmlFor="throughDate" className="text-xs font-medium text-gray-700">
            Return Date
          </Label>
          <div className="relative">
            <Input
              id="throughDate"
              type="date"
              value={values.throughDate || ''}
              onChange={(e) => onChange('throughDate', e.target.value)}
              className="h-8 px-2 py-1 text-sm pl-7"
            />
            <Calendar className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MileageFields;
