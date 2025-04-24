import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from './types';
import { Button } from '@/components/ui/button';
import DateRangeSelection from './DateRangeSelection';
import TravelPurposeSelector from './TravelPurposeSelector';
import MealSelection from './MealSelection';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { STANDARD_RATES } from '@/components/Expenses/ExpenseFieldUtils';

// Define meal rates constants to use since they're not in STANDARD_RATES
const MEAL_RATES = {
  BREAKFAST: 18,
  LUNCH: 20,
  DINNER: 31
};

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
    setValue,
    register
  } = useFormContext<FormValues>();

  // Define state for city since it's not coming from the form
  const [city, setCity] = useState<string>('');
  const [zipCodes, setZipCodes] = useState<Set<string>>(new Set());
  const [showMultipleZipWarning, setShowMultipleZipWarning] = useState(false);

  const watchTravelPurpose = watch('travelPurpose');
  const watchFromDate = watch('fromDate');
  const watchToDate = watch('toDate');
  const watchMealsProvided = watch('mealsProvided');
  const watchMeals = watch('meals');
  const watchZipCode = watch('zipCode');
  const watchDepartureTime = watch('departureTime');
  const watchReturnTime = watch('returnTime');
  const watchIsSameDayTravel = watch('isSameDayTravel');

  // Simulate zip code to city lookup
  useEffect(() => {
    if (watchZipCode && watchZipCode.length === 5) {
      // This would be an API call in a real application
      setTimeout(() => {
        // Mock city lookup based on zip code
        const zipMapping: Record<string, string> = {
          '90210': 'Beverly Hills',
          '10001': 'New York',
          '60601': 'Chicago',
          '20500': 'Washington DC',
          '94102': 'San Francisco'
        };
        
        const foundCity = zipMapping[watchZipCode] || 'Unknown City';
        setCity(foundCity);
        setValue('city', foundCity);
        
        // Check for multiple ZIP codes
        const newZipCodes = new Set(zipCodes);
        newZipCodes.add(watchZipCode);
        setZipCodes(newZipCodes);
        
        if (newZipCodes.size > 1) {
          setShowMultipleZipWarning(true);
        }
      }, 500);
    } else {
      setCity('');
      setValue('city', '');
    }
  }, [watchZipCode, setValue, zipCodes]);

  // Handle same-day travel changes
  useEffect(() => {
    if (watchIsSameDayTravel && watchFromDate) {
      setValue('toDate', watchFromDate);
    }
  }, [watchIsSameDayTravel, watchFromDate, setValue]);

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

        {/* Same-day travel checkbox */}
        <div className="flex items-center space-x-2 py-2">
          <Checkbox
            id="isSameDayTravel"
            checked={watchIsSameDayTravel}
            onCheckedChange={(checked) => {
              setValue('isSameDayTravel', checked as boolean);
              if (checked && watchFromDate) {
                setValue('toDate', watchFromDate);
              }
            }}
          />
          <Label htmlFor="isSameDayTravel">Is it same-day travel?</Label>
        </div>

        {/* Date Range & Time Grid */}
        <div>
          <DateRangeSelection disabled={watchIsSameDayTravel} />
          <div className="grid grid-cols-2 gap-4">
            {/* From Date + Departure Time */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="departureTime" className="text-xs font-medium text-gray-700 mt-2">
                Departure Time
              </Label>
              <Input
                type="time"
                id="departureTime"
                {...register('departureTime')}
                className="h-8 px-2 py-1 text-sm"
              />
            </div>
            {/* To Date + Return Time */}
            <div className="flex flex-col gap-1 mt-0">
              <Label htmlFor="returnTime" className="text-xs font-medium text-gray-700">
                Return Time
              </Label>
              <Input
                type="time"
                id="returnTime"
                {...register('returnTime')}
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
                {...register('zipCode')}
                placeholder="Enter zip code"
                className="h-8 px-2 py-1 text-sm"
                maxLength={5}
              />
              {watchZipCode && watchZipCode.length === 5 && (
                <div className="text-xs text-blue-600 mt-1">
                  {city ? (
                    <>Location: <span className="font-semibold">{city}</span></>
                  ) : (
                    <>Looking up city...</>
                  )}
                </div>
              )}
              {showMultipleZipWarning && (
                <div className="text-xs text-amber-600 mt-1 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Multiple ZIP codes detected – per diem will need manual calculation
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
              <span>Breakfast: <span className="font-medium text-green-700">${MEAL_RATES.BREAKFAST.toFixed(2)}</span></span>
              <span>Lunch: <span className="font-medium text-green-700">${MEAL_RATES.LUNCH.toFixed(2)}</span></span>
              <span>Dinner: <span className="font-medium text-green-700">${MEAL_RATES.DINNER.toFixed(2)}</span></span>
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
