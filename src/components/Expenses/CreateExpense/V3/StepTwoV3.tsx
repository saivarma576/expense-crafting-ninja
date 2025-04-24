import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormValues, TravelPurpose } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepTwoV3Props {
  onBack: () => void;
  onNext: () => void;
}

const travelPurposes = [
  { value: 'conference' as TravelPurpose, label: 'Conference' },
  { value: 'training' as TravelPurpose, label: 'Training' },
  { value: 'client' as TravelPurpose, label: 'Client Meeting' },
  { value: 'internal' as TravelPurpose, label: 'Internal Meeting' },
  { value: 'other' as TravelPurpose, label: 'Other' }
];

const StepTwoV3: React.FC<StepTwoV3Props> = ({ onBack, onNext }) => {
  const { register, setValue, watch, formState: { errors } } = useFormContext<FormValues>();
  
  const isSameDayTravel = watch('isSameDayTravel');
  const fromDate = watch('fromDate');
  const toDate = watch('toDate');
  const travelPurpose = watch('travelPurpose');
  
  const handleTravelPurposeChange = (value: string) => {
    setValue('travelPurpose', value as TravelPurpose);
  };
  
  const handleFromDateChange = (date: Date | undefined) => {
    setValue('fromDate', date);
    if (isSameDayTravel && date) {
      setValue('toDate', date);
    }
  };
  
  const handleToDateChange = (date: Date | undefined) => {
    setValue('toDate', date);
  };
  
  const handleSameDayToggle = (checked: boolean) => {
    setValue('isSameDayTravel', checked);
    if (checked && fromDate) {
      setValue('toDate', fromDate);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="travelPurpose">Travel Purpose</Label>
          <Select
            onValueChange={handleTravelPurposeChange}
            defaultValue={travelPurpose}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select purpose" />
            </SelectTrigger>
            <SelectContent>
              {travelPurposes.map(purpose => (
                <SelectItem key={purpose.value} value={purpose.value}>{purpose.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="travelComments">Comments (Optional)</Label>
          <Textarea 
            id="travelComments"
            placeholder="Add any additional details about your travel"
            className="resize-none h-20"
            {...register('travelComments')}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="sameDayTravel" 
            checked={isSameDayTravel}
            onCheckedChange={handleSameDayToggle}
          />
          <label
            htmlFor="sameDayTravel"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Same-day travel
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fromDate">From Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !fromDate && "text-muted-foreground"
                  )}
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {fromDate ? format(fromDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={handleFromDateChange}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label htmlFor="toDate">To Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !toDate && "text-muted-foreground"
                  )}
                  disabled={isSameDayTravel}
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {toDate ? format(toDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={handleToDateChange}
                  disabled={(date) => {
                    return fromDate ? date < fromDate : false;
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="departureTime">Departure Time</Label>
            <Input 
              id="departureTime" 
              type="time" 
              {...register('departureTime')}
            />
          </div>
          
          <div>
            <Label htmlFor="returnTime">Return Time</Label>
            <Input 
              id="returnTime" 
              type="time"
              disabled={isSameDayTravel === false} 
              {...register('returnTime')}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input 
              id="zipCode" 
              {...register('zipCode')} 
              placeholder="Enter zip code"
            />
          </div>
          
          <div>
            <Label htmlFor="city">City</Label>
            <Input 
              id="city" 
              {...register('city')} 
              placeholder="City will auto-fill"
              readOnly={false} // In a real app, this would be true when auto-filled
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          type="button" 
          onClick={onNext}
          disabled={!travelPurpose || !fromDate || !toDate}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepTwoV3;
