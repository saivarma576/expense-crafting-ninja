
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from './types';
import { Button } from '@/components/ui/button';
import DateRangeSelection from './DateRangeSelection';
import TravelPurposeSelector from './TravelPurposeSelector';
import MealSelection from './MealSelection';

interface StepTwoProps {
  onBack: () => void;
  onSubmit: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ onBack, onSubmit }) => {
  const { watch } = useFormContext<FormValues>();
  const watchTravelPurpose = watch('travelPurpose');
  const watchFromDate = watch('fromDate');
  const watchToDate = watch('toDate');
  const watchMealsProvided = watch('mealsProvided');
  const watchMeals = watch('meals');

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-5">
        {/* Travel Purpose Selector Component */}
        <TravelPurposeSelector />

        {/* Date Range Selection Component */}
        <DateRangeSelection />

        {/* Meal Selection Component */}
        <MealSelection />
      </div>
      
      <div className="flex justify-between pt-2">
        <Button 
          type="button" 
          variant="outline"
          onClick={onBack}
          size="sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          type="submit" 
          onClick={handleSubmit}
          size="sm"
          disabled={
            !watchTravelPurpose || 
            !watchFromDate || 
            !watchToDate || 
            (watchMealsProvided === 'yes' && (!watchMeals || watchMeals.length === 0))
          }
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
