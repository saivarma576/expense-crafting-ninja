
import React, { useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Route, Calculator, FileText, MapPin } from 'lucide-react';
import { MileageFieldsProps } from './types';
import FieldValidationIndicator from './FieldValidationIndicator';
import { format } from 'date-fns';
import { Separator } from "@/components/ui/separator";

const MileageFields: React.FC<MileageFieldsProps> = ({ 
  values, 
  onChange, 
  error,
  llmSuggestions = {}
}) => {
  // Auto-calculate amount when miles change
  useEffect(() => {
    if (values.miles && values.mileageRate) {
      const calculatedAmount = parseFloat((values.miles * values.mileageRate).toFixed(2));
      onChange('amount', calculatedAmount);
    }
  }, [values.miles, values.mileageRate, onChange]);

  // Set default return date to today if empty
  useEffect(() => {
    if (!values.throughDate) {
      onChange('throughDate', format(new Date(), 'yyyy-MM-dd'));
    }
  }, [values.throughDate, onChange]);

  return (
    <div className="space-y-6">
      {/* Mileage Entry Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Route className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700">Mileage Entry</h3>
        </div>
        <Separator className="my-2" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <Label htmlFor="date" className="text-xs font-medium text-gray-700">
              Date <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                value={values.date || ''}
                onChange={(e) => onChange('date', e.target.value)}
                className="h-8 px-2 py-1 text-sm pl-7"
                required
              />
              <Calendar className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
            </div>
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

          <div>
            <Label htmlFor="miles" className="text-xs font-medium text-gray-700">
              Miles <span className="text-red-500">*</span>
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
              <Calculator className="w-4 h-4 absolute right-2 top-2 text-gray-400" aria-label="Amount auto-calculated" />
            </div>
            <p className="mt-1 text-xs text-gray-500">Standard mileage rate</p>
          </div>

          <div>
            <Label htmlFor="amount" className="text-xs font-medium text-gray-700">
              Total Amount
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={values.amount || ''}
                className="h-8 px-2 py-1 text-sm pl-7 bg-gray-50"
                disabled
              />
              <span className="absolute left-2 top-2 text-gray-400 text-sm">$</span>
              <Calculator className="w-4 h-4 absolute right-2 top-2 text-gray-400" aria-label="Auto-calculated amount" />
            </div>
            <p className="mt-1 text-xs text-gray-500">Auto-calculated from miles × rate</p>
          </div>
        </div>
      </div>

      {/* Trip Details Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700">Trip Details</h3>
        </div>
        <Separator className="my-2" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <Label htmlFor="merchantName" className="text-xs font-medium text-gray-700">
              Merchant/Location <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="merchantName"
                value={values.merchantName || ''}
                onChange={(e) => onChange('merchantName', e.target.value)}
                placeholder="E.g., Client Office"
                className="h-8 px-2 py-1 text-sm pl-7"
                required
              />
              <MapPin className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-xs font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="description"
                value={values.description || ''}
                onChange={(e) => onChange('description', e.target.value)}
                placeholder="E.g., Client meeting travel"
                className="h-8 px-2 py-1 text-sm pl-7"
                required
              />
              <FileText className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MileageFields;
