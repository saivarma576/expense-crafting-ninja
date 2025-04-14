
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, Building } from 'lucide-react';
import { FieldGroupProps } from './types';
import FieldValidationIndicator from './FieldValidationIndicator';

const MealsFields: React.FC<FieldGroupProps> = ({ 
  values, 
  onChange,
  llmSuggestions = {}
}) => {
  return (
    <div className="mb-4 space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Meal Details</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <Label htmlFor="zipCode" className="text-xs font-medium text-gray-700">
            Location Zip Code
          </Label>
          <div className="relative">
            <Input
              id="zipCode"
              value={values.zipCode || ''}
              onChange={(e) => onChange('zipCode', e.target.value)}
              placeholder="Enter zip code"
              className={`h-8 px-2 py-1 text-sm pl-7 ${llmSuggestions.zipCode ? 'border-amber-300 pr-8' : ''}`}
            />
            <MapPin className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
            <FieldValidationIndicator
              llmSuggestion={llmSuggestions.zipCode}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="city" className="text-xs font-medium text-gray-700">
            City
          </Label>
          <div className="relative">
            <Input
              id="city"
              value={values.city || ''}
              onChange={(e) => onChange('city', e.target.value)}
              placeholder="City"
              className="h-8 px-2 py-1 text-sm pl-7"
              readOnly
            />
            <Building className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <div>
          <Label htmlFor="departureTime" className="text-xs font-medium text-gray-700">
            Departure Time
          </Label>
          <div className="relative">
            <Input
              id="departureTime"
              type="time"
              value={values.departureTime || ''}
              onChange={(e) => onChange('departureTime', e.target.value)}
              className={`h-8 px-2 py-1 text-sm pl-7 ${llmSuggestions.departureTime ? 'border-amber-300 pr-8' : ''}`}
            />
            <Clock className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
            <FieldValidationIndicator
              llmSuggestion={llmSuggestions.departureTime}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="returnTime" className="text-xs font-medium text-gray-700">
            Return Time
          </Label>
          <div className="relative">
            <Input
              id="returnTime"
              type="time"
              value={values.returnTime || ''}
              onChange={(e) => onChange('returnTime', e.target.value)}
              className={`h-8 px-2 py-1 text-sm pl-7 ${llmSuggestions.returnTime ? 'border-amber-300 pr-8' : ''}`}
            />
            <Clock className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
            <FieldValidationIndicator
              llmSuggestion={llmSuggestions.returnTime}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="mealsRate" className="text-xs font-medium text-gray-700">
            Standard Meal Rate
          </Label>
          <div className="relative">
            <Input
              id="mealsRate"
              type="number"
              step="0.01"
              value={values.mealsRate || ''}
              onChange={(e) => onChange('mealsRate', parseFloat(e.target.value) || 0)}
              placeholder="Daily rate"
              className="h-8 px-2 py-1 text-sm pl-7"
              disabled
            />
            <span className="absolute left-2 top-2 text-gray-400 text-sm">$</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">Per diem rate for this location</p>
        </div>
      </div>
      
      {values.amount > (values.mealsRate || 0) && (
        <div>
          <Label htmlFor="perDiemExplanation" className="text-xs font-medium text-gray-700">
            Explanation for Exceeding Per Diem
          </Label>
          <div className="relative">
            <Textarea
              id="perDiemExplanation"
              value={values.perDiemExplanation || ''}
              onChange={(e) => onChange('perDiemExplanation', e.target.value)}
              placeholder="Please explain why this expense exceeds the per diem rate"
              className={`min-h-[80px] text-sm ${llmSuggestions.perDiemExplanation ? 'border-amber-300' : ''}`}
            />
            <FieldValidationIndicator
              llmSuggestion={llmSuggestions.perDiemExplanation}
              className="top-2 -translate-y-0"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MealsFields;
