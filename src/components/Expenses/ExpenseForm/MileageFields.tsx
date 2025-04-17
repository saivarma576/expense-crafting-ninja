
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Calculator } from 'lucide-react';
import { MileageFieldsProps } from './types';
import FieldValidationIndicator from './FieldValidationIndicator';
import { STANDARD_RATES } from '../ExpenseFieldUtils';
import { cn } from '@/lib/utils';

const MileageFields: React.FC<MileageFieldsProps> = ({ 
  values, 
  onChange, 
  error,
  llmSuggestions = {}
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Mileage Information
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
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
                  className={cn(
                    "h-10 px-3 py-2 text-sm",
                    error ? 'border-red-500 pr-8' : llmSuggestions.miles ? 'border-amber-300 pr-8' : ''
                  )}
                  required
                />
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
                <div className="absolute left-0 top-0 flex items-center h-full pl-3">
                  <span className="text-gray-500">$</span>
                </div>
                <Input
                  id="mileageRate"
                  type="number"
                  step="0.01"
                  value={values.mileageRate || STANDARD_RATES.MILEAGE_RATE}
                  onChange={(e) => onChange('mileageRate', parseFloat(e.target.value) || STANDARD_RATES.MILEAGE_RATE)}
                  className="h-10 px-3 py-2 text-sm pl-9"
                />
                <Calculator className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
              </div>
              <p className="mt-1 text-xs text-gray-500">Standard mileage rate</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Mileage Details
          </h3>
          
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
                className="h-10 px-3 py-2 text-sm pl-9"
              />
              <Calendar className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MileageFields;
