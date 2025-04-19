import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin } from 'lucide-react';
import { HotelFieldsProps } from './types';
import FieldValidationIndicator from './FieldValidationIndicator';

const HotelFields: React.FC<HotelFieldsProps> = ({ 
  values, 
  onChange,
  llmSuggestions = {}
}) => {
  return (
    <div className="mb-4 space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Hotel Details</h3>
      
      <div className="grid grid-cols-12 gap-x-4 gap-y-2">
        {/* Zip Code - 30% width */}
        <div className="col-span-4">
          <Label htmlFor="zipCode" className="text-xs font-medium text-gray-700">
            Zip Code
          </Label>
          <div className="relative">
            <Input
              id="zipCode"
              type="text"
              value={values.zipCode || ''}
              onChange={(e) => onChange('zipCode', e.target.value)}
              placeholder="Enter zip"
              className="h-8 px-2 py-1 text-sm pl-7"
              maxLength={5}
            />
            <MapPin className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Through Date - 40% width */}
        <div className="col-span-5">
          <Label htmlFor="throughDate" className="text-xs font-medium text-gray-700">
            Through Date
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

        <div className="col-span-6">
          <Label htmlFor="city" className="text-xs font-medium text-gray-700">
            City
          </Label>
          <div className="relative">
            <Input
              id="city"
              type="text"
              value={values.city || ''}
              onChange={(e) => onChange('city', e.target.value)}
              placeholder="Enter city"
              className="h-8 px-2 py-1 text-sm pl-7"
            />
            <MapPin className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <div className="col-span-6">
          <Label htmlFor="hotelRate" className="text-xs font-medium text-gray-700">
            Standard Rate
          </Label>
          <div className="relative">
            <Input
              id="hotelRate"
              type="number"
              step="0.01"
              value={values.hotelRate || ''}
              onChange={(e) => onChange('hotelRate', parseFloat(e.target.value) || 0)}
              placeholder="Standard rate"
              className="h-8 px-2 py-1 text-sm pl-7"
              disabled
            />
            <span className="absolute left-2 top-2 text-gray-400 text-sm">$</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">CONUS per diem rate</p>
        </div>
        
        <div className="col-span-12">
          <Label htmlFor="perDiemExplanation" className="text-xs font-medium text-gray-700 flex items-center">
            Explanation for Exceeding Per Diem
            {values.amount > (values.hotelRate || 0) && (
              <span className="text-amber-500 ml-1">*</span>
            )}
          </Label>
          <div className="relative">
            <Input
              id="perDiemExplanation"
              type="text"
              value={values.perDiemExplanation || ''}
              onChange={(e) => onChange('perDiemExplanation', e.target.value)}
              placeholder="Explain why the hotel cost exceeds the standard rate"
              className={`h-8 px-2 py-1 text-sm ${llmSuggestions.perDiemExplanation ? 'border-amber-300' : ''}`}
              required={values.amount > (values.hotelRate || 0)}
            />
            <FieldValidationIndicator 
              llmSuggestion={llmSuggestions.perDiemExplanation} 
            />
          </div>
          {values.amount > (values.hotelRate || 0) && !values.perDiemExplanation && (
            <p className="mt-1 text-xs text-amber-500">
              Required when hotel cost exceeds standard rate
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelFields;
