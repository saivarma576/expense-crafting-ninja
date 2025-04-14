
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, DollarSign, MapPin } from 'lucide-react';
import { FieldGroupProps } from './types';

const MealsFields: React.FC<FieldGroupProps> = ({ values, onChange }) => {
  const needsPerDiemExplanation = values.amount !== values.mealsRate;

  return (
    <div className="mb-4 space-y-2">
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
              className="h-8 px-2 py-1 text-sm"
              required
            />
            <MapPin className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
          </div>
        </div>
        
        <div>
          <Label htmlFor="city" className="text-xs font-medium text-gray-700">
            City (Auto-filled)
          </Label>
          <Input
            id="city"
            value={values.city || ''}
            readOnly
            className="h-8 px-2 py-1 text-sm bg-gray-50"
          />
        </div>

        <div>
          <Label htmlFor="mealsRate" className="text-xs font-medium text-gray-700">
            Meals Rate (Default)
          </Label>
          <div className="relative">
            <Input
              id="mealsRate"
              type="number"
              value={values.mealsRate || 0}
              onChange={(e) => onChange('mealsRate', parseFloat(e.target.value) || 0)}
              className="h-8 pl-6 pr-2 py-1 text-sm bg-gray-50"
            />
            <DollarSign className="w-4 h-4 absolute left-2 top-2 text-gray-400" />
          </div>
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
              className="h-8 px-2 py-1 text-sm"
              required
            />
            <Clock className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
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
              className="h-8 px-2 py-1 text-sm"
            />
            <Clock className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
          </div>
        </div>
      </div>
      
      {needsPerDiemExplanation && (
        <div>
          <Label htmlFor="perDiemExplanation" className="text-xs font-medium text-gray-700 flex items-center">
            Per Diem Explanation <span className="text-red-500 ml-1">*</span>
          </Label>
          <Textarea
            id="perDiemExplanation"
            value={values.perDiemExplanation || ''}
            onChange={(e) => onChange('perDiemExplanation', e.target.value)}
            placeholder="Explain why the amount differs from the standard rate"
            className="resize-none h-20 text-sm"
            required
          />
        </div>
      )}
    </div>
  );
};

export default MealsFields;
