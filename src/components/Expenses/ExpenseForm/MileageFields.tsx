
import React, { useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Car } from 'lucide-react';
import { FieldGroupProps } from './types';
import { STANDARD_RATES } from '../ExpenseFieldUtils';

interface MileageFieldsProps extends FieldGroupProps {
  error?: string | null;
}

const MileageFields: React.FC<MileageFieldsProps> = ({ values, onChange, error }) => {
  // Auto-calculate amount when miles or rate changes
  useEffect(() => {
    if (values.miles && values.mileageRate) {
      const calculatedAmount = parseFloat((values.miles * values.mileageRate).toFixed(2));
      onChange('amount', calculatedAmount);
    }
  }, [values.miles, values.mileageRate, onChange]);

  return (
    <div className="mb-4 space-y-3">
      <div className="grid grid-cols-2 gap-x-3 gap-y-2">
        <div>
          <Label htmlFor="miles" className="text-xs font-medium text-gray-700 flex items-center">
            Miles <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Input
              id="miles"
              type="number"
              value={values.miles || 0}
              onChange={(e) => onChange('miles', parseFloat(e.target.value) || 0)}
              placeholder="0"
              className={`h-8 pl-7 pr-2 py-1 text-sm ${error ? 'border-red-500' : ''}`}
              required
            />
            <Car className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
          </div>
          {error && (
            <p className="mt-1 text-xs text-red-500">{error}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="mileageRate" className="text-xs font-medium text-gray-700">
            Rate Per Mile
          </Label>
          <Input
            id="mileageRate"
            type="number"
            value={values.mileageRate || STANDARD_RATES.MILEAGE_RATE}
            onChange={(e) => onChange('mileageRate', parseFloat(e.target.value) || STANDARD_RATES.MILEAGE_RATE)}
            step="0.01"
            className="h-8 px-2 py-1 text-sm"
            readOnly
          />
          <div className="text-xs text-gray-500 mt-0.5">Standard rate: ${STANDARD_RATES.MILEAGE_RATE}/mile</div>
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
              className="h-8 px-2 py-1 text-sm pr-8"
              required
            />
            <Calendar className="w-4 h-4 absolute right-2 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <div className="text-sm text-right pt-6">
          <div className="text-gray-500">Calculated Amount:</div>
          <div className="font-semibold text-gray-800">
            ${values.miles && values.mileageRate 
              ? (values.miles * values.mileageRate).toFixed(2) 
              : '0.00'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MileageFields;
