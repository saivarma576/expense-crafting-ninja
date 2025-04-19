
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Route } from 'lucide-react';
import { MileageFieldsProps } from './types';
import FieldValidationIndicator from './FieldValidationIndicator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MileageFields: React.FC<MileageFieldsProps> = ({ 
  values, 
  onChange, 
  error,
  llmSuggestions = {}
}) => {
  return (
    <div className="mb-4 space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Mileage Details</h3>
      
      <div className="grid grid-cols-12 gap-x-4 gap-y-2">
        {/* Distance Group */}
        <div className="col-span-5">
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
              maxLength={10}
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
        
        {/* Rate Group */}
        <div className="col-span-4">
          <Label htmlFor="mileageRate" className="text-xs font-medium text-gray-700">
            Rate Per Mile
          </Label>
          <Select 
            value={values.mileageRate?.toString() || ''} 
            onValueChange={(value) => onChange('mileageRate', parseFloat(value))}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Select rate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.70">$0.70</SelectItem>
              <SelectItem value="0.65">$0.65</SelectItem>
              <SelectItem value="0.60">$0.60</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Date Group */}
        <div className="col-span-7">
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
