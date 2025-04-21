import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from './types';
import { Button } from '@/components/ui/button';
import DateRangeSelection from './DateRangeSelection';
import TravelPurposeSelector from './TravelPurposeSelector';
import MealSelection from './MealSelection';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { STANDARD_RATES } from '@/components/Expenses/ExpenseFieldUtils';
interface StepTwoProps {
  onBack: () => void;
  onSubmit: () => void;
}
const StepTwo: React.FC<StepTwoProps> = ({
  onBack,
  onSubmit
}) => {
  const {
    watch,
    setValue
  } = useFormContext<FormValues>();
  const watchTravelPurpose = watch('travelPurpose');
  const watchFromDate = watch('fromDate');
  const watchToDate = watch('toDate');
  const watchDepartureTime = watch('departureTime') || '';
  const watchReturnTime = watch('returnTime') || '';
  const watchMealsProvided = watch('mealsProvided');
  const watchMeals = watch('meals');
  const watchZipCode = watch('zipCode') || '';
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    onSubmit();
  };

  // Determine if continue button should be disabled
  const isContinueDisabled = !watchTravelPurpose || !watchFromDate || !watchToDate || watchMealsProvided === 'yes' && (!watchMeals || watchMeals.length === 0) || watchMealsProvided !== 'yes' && watchMealsProvided !== 'no';
  return <div className="space-y-6 animate-fade-in">
      <div className="space-y-5">
        {/* Travel Purpose Selector Component */}
        <TravelPurposeSelector />

        {/* Date Range Selection Component */}
        <div>
          <DateRangeSelection />
          {/* Insert Departure/Return Time Fields below dates */}
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <Label htmlFor="departureTime" className="text-xs font-medium text-gray-700">
                Departure Time
              </Label>
              <Input type="time" id="departureTime" value={watchDepartureTime} onChange={e => setValue('departureTime', e.target.value)} className="h-8 px-2 py-1 text-sm" />
            </div>
            <div>
              <Label htmlFor="returnTime" className="text-xs font-medium text-gray-700">
                Return Time
              </Label>
              <Input type="time" id="returnTime" value={watchReturnTime} onChange={e => setValue('returnTime', e.target.value)} className="h-8 px-2 py-1 text-sm" />
            </div>
          </div>
          {/* Add Zip Code field below time fields */}
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zipCode" className="text-xs font-medium text-gray-700">Location Zip Code</Label>
              <Input id="zipCode" value={watchZipCode} onChange={e => setValue('zipCode', e.target.value)} placeholder="Enter zip code" className="h-8 px-2 py-1 text-sm" />
            </div>
          </div>
        </div>
        {/* Meal Selection Component */}
        <div>
          <MealSelection />
          {/* GSA Meals Rates Info */}
          
        </div>
      </div>
      <div className="flex justify-between pt-2">
        <Button type="button" variant="outline" onClick={onBack} size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button type="submit" onClick={handleSubmit} size="sm" disabled={isContinueDisabled}>
          Continue
        </Button>
      </div>
    </div>;
};
export default StepTwo;