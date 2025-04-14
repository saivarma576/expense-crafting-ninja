
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, MapPin } from 'lucide-react';
import { FieldGroupProps } from './types';
import { STANDARD_RATES } from '../ExpenseFieldUtils';

const MealsFields: React.FC<FieldGroupProps> = ({ values, onChange }) => {
  return (
    <div className="mb-4 space-y-3">
      <div className="grid grid-cols-2 gap-x-3 gap-y-2">
        <div>
          <Label htmlFor="zipCode" className="text-xs font-medium text-gray-700 flex items-center">
            Zip Code <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Input
              id="zipCode"
              value={values.zipCode || ''}
              onChange={(e) => onChange('zipCode', e.target.value)}
              placeholder="Enter zip code"
              className="h-8 px-2 py-1 text-sm pl-7"
              required
            />
            <MapPin className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <div>
          <Label htmlFor="city" className="text-xs font-medium text-gray-700">
            City
          </Label>
          <Input
            id="city"
            value={values.city || ''}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="City will appear here"
            className="h-8 px-2 py-1 text-sm"
            readOnly
          />
        </div>
        
        <div>
          <Label htmlFor="departureTime" className="text-xs font-medium text-gray-700 flex items-center">
            Departure Time <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Input
              id="departureTime"
              type="time"
              value={values.departureTime || ''}
              onChange={(e) => onChange('departureTime', e.target.value)}
              className="h-8 px-2 py-1 text-sm pl-7"
              required
            />
            <Clock className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <div>
          <Label htmlFor="returnTime" className="text-xs font-medium text-gray-700 flex items-center">
            Return Time <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Input
              id="returnTime"
              type="time"
              value={values.returnTime || ''}
              onChange={(e) => onChange('returnTime', e.target.value)}
              className="h-8 px-2 py-1 text-sm pl-7"
              required
            />
            <Clock className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label htmlFor="mealsRate" className="text-xs font-medium text-gray-700">
            Standard Rate
          </Label>
          <span className="text-xs text-gray-500">${STANDARD_RATES.MEALS_RATE.toFixed(2)}/day</span>
        </div>
        <Select
          value={values.mealsRate?.toString() || STANDARD_RATES.MEALS_RATE.toString()}
          onValueChange={(value) => onChange('mealsRate', parseFloat(value))}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="Select rate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={STANDARD_RATES.MEALS_RATE.toString()}>Standard Rate (${STANDARD_RATES.MEALS_RATE.toFixed(2)})</SelectItem>
            <SelectItem value={(STANDARD_RATES.MEALS_RATE * 1.5).toString()}>High Cost Area (${(STANDARD_RATES.MEALS_RATE * 1.5).toFixed(2)})</SelectItem>
            <SelectItem value={(STANDARD_RATES.MEALS_RATE * 0.75).toString()}>Reduced Rate (${(STANDARD_RATES.MEALS_RATE * 0.75).toFixed(2)})</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {values.amount !== values.mealsRate && (
        <div>
          <Label htmlFor="perDiemExplanation" className="text-xs font-medium text-gray-700 flex items-center">
            Explanation <span className="text-red-500 ml-1">*</span>
          </Label>
          <Textarea
            id="perDiemExplanation"
            value={values.perDiemExplanation || ''}
            onChange={(e) => onChange('perDiemExplanation', e.target.value)}
            placeholder="Please explain why you're not using the standard rate"
            className="resize-none h-16 text-sm"
            required
          />
        </div>
      )}
    </div>
  );
};

export default MealsFields;
