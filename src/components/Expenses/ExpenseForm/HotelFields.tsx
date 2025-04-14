
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, DollarSign, MapPin } from 'lucide-react';
import { FieldGroupProps } from './types';

const HotelFields: React.FC<FieldGroupProps> = ({ values, onChange }) => {
  const needsPerDiemExplanation = values.amount !== values.hotelRate;

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
          <Label htmlFor="hotelRate" className="text-xs font-medium text-gray-700">
            Hotel Rate (Default)
          </Label>
          <div className="relative">
            <Input
              id="hotelRate"
              type="number"
              value={values.hotelRate || 0}
              onChange={(e) => onChange('hotelRate', parseFloat(e.target.value) || 0)}
              className="h-8 pl-6 pr-2 py-1 text-sm bg-gray-50"
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

export default HotelFields;
