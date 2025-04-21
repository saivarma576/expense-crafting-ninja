
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
  const watchMealsProvided = watch('mealsProvided');
  const watchMeals = watch('meals');
  const watchZipCode = watch('zipCode') || '';
  const watchCity = watch('city') || '';
  const watchDepartureTime = watch('departureTime') || '';
  const watchReturnTime = watch('returnTime') || '';

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    onSubmit();
  };

  // Continue button disabled logic
  const isContinueDisabled = !watchTravelPurpose || !watchFromDate || !watchToDate || 
    (watchMealsProvided === 'yes' && (!watchMeals || watchMeals.length === 0)) ||
    (watchMealsProvided !== 'yes' && watchMealsProvided !== 'no');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-5">
        {/* Travel Purpose Selector Component */}
        <TravelPurposeSelector />

        {/* Date Range & Time Grid */}
        <div>
          <div className="grid grid-cols-2 gap-4">
            {/* From Date + Departure Time */}
            <div className="flex flex-col gap-1">
              <DateRangeSelection />
              <Label htmlFor="departureTime" className="text-xs font-medium text-gray-700 mt-2">
                Departure Time
              </Label>
              <Input
                type="time"
                id="departureTime"
                value={watchDepartureTime}
                onChange={e => setValue('departureTime', e.target.value)}
                className="h-8 px-2 py-1 text-sm"
              />
            </div>
            {/* To Date + Return Time */}
            <div className="flex flex-col gap-1 mt-0 pt-[34px]">
              {/* Empty label for spacing to align with Departure Time in left col */}
              <Label htmlFor="returnTime" className="text-xs font-medium text-gray-700">
                Return Time
              </Label>
              <Input
                type="time"
                id="returnTime"
                value={watchReturnTime}
                onChange={e => setValue('returnTime', e.target.value)}
                className="h-8 px-2 py-1 text-sm"
              />
            </div>
          </div>
          {/* Zip Code and City */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zipCode" className="text-xs font-medium text-gray-700">Location Zip Code</Label>
              <Input
                id="zipCode"
                value={watchZipCode}
                onChange={e => setValue('zipCode', e.target.value)}
                placeholder="Enter zip code"
                className="h-8 px-2 py-1 text-sm"
                maxLength={5}
              />
              {watchZipCode.length === 5 && (
                <div className="text-xs text-blue-600 mt-1">
                  {watchCity ? (
                    <>Location: <span className="font-semibold">{watchCity}</span></>
                  ) : (
                    <>Looking up city...</>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Meal Selection & GSA Rates Info */}
        <div>
          <MealSelection />
          {/* GSA Meals Rates Info */}
          <div className="mt-2 pb-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs text-gray-600 bg-blue-50 border border-blue-100 rounded p-2">
              <span className="font-semibold">GSA Meal Rates:</span>
              <span>Breakfast: <span className="font-medium text-green-700">${STANDARD_RATES.BREAKFAST.toFixed(2)}</span></span>
              <span>Lunch: <span className="font-medium text-green-700">${STANDARD_RATES.LUNCH.toFixed(2)}</span></span>
              <span>Dinner: <span className="font-medium text-green-700">${STANDARD_RATES.DINNER.toFixed(2)}</span></span>
              <span>Daily Total: <span className="font-semibold text-blue-800">${STANDARD_RATES.MEALS_RATE.toFixed(2)}</span></span>
            </div>
          </div>
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
    </div>
  );
};

export default StepTwo;
