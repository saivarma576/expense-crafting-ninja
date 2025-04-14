
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, DollarSign } from 'lucide-react';
import { FieldGroupProps } from './types';

const MileageFields: React.FC<FieldGroupProps> = ({ values, onChange }) => {
  return (
    <div className="mb-4 space-y-2">
      <div className="grid grid-cols-2 gap-x-3 gap-y-2">
        <div>
          <Label htmlFor="miles" className="text-xs font-medium text-gray-700 flex items-center">
            Miles <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="miles"
            type="number"
            value={values.miles || 0}
            onChange={(e) => onChange('miles', parseInt(e.target.value) || 0)}
            placeholder="Enter miles"
            className="h-8 px-2 py-1 text-sm"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="mileageRate" className="text-xs font-medium text-gray-700 flex items-center">
            Mileage Rate <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Input
              id="mileageRate"
              type="number"
              step="0.01"
              value={values.mileageRate || 0}
              onChange={(e) => onChange('mileageRate', parseFloat(e.target.value) || 0)}
              className="h-8 pl-6 pr-2 py-1 text-sm"
              required
            />
            <DollarSign className="w-4 h-4 absolute left-2 top-2 text-gray-400" />
          </div>
        </div>

        <div>
          <Label htmlFor="throughDate" className="text-xs font-medium text-gray-700 flex items-center">
            Through Date <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Input
              id="throughDate"
              type="date"
              value={values.throughDate || ''}
              onChange={(e) => onChange('throughDate', e.target.value)}
              className="h-8 px-2 py-1 text-sm"
              required
            />
            <Calendar className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MileageFields;
