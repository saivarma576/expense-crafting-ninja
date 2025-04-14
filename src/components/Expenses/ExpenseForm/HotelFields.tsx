
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin } from 'lucide-react';
import { FieldGroupProps } from './types';
import { STANDARD_RATES } from '../ExpenseFieldUtils';

const HotelFields: React.FC<FieldGroupProps> = ({ values, onChange }) => {
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
            <Calendar className="w-4 h-4 absolute right-2 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <div>
          <Label htmlFor="hotelRate" className="text-xs font-medium text-gray-700">
            Standard Rate
          </Label>
          <Input
            id="hotelRate"
            type="number"
            value={values.hotelRate || STANDARD_RATES.HOTEL_RATE}
            onChange={(e) => onChange('hotelRate', parseFloat(e.target.value) || STANDARD_RATES.HOTEL_RATE)}
            className="h-8 px-2 py-1 text-sm"
            readOnly
          />
          <div className="text-xs text-gray-500 mt-0.5">Standard rate: ${STANDARD_RATES.HOTEL_RATE}/night</div>
        </div>
      </div>
      
      {values.amount !== values.hotelRate && (
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

export default HotelFields;
