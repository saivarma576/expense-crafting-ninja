
import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { format, eachDayOfInterval, isAfter, isBefore } from 'date-fns';
import { MealData, FormValues } from './types';
import DailyMealGrid from './DailyMealGrid';

const MealSelection: React.FC = () => {
  const { register, watch, setValue } = useFormContext<FormValues>();
  const mealsProvided = watch('mealsProvided');
  const fromDate = watch('fromDate');
  const toDate = watch('toDate');
  const [showMealDetails, setShowMealDetails] = useState<boolean>(false);

  useEffect(() => {
    setShowMealDetails(mealsProvided === 'yes');

    if (mealsProvided === 'yes' && fromDate && toDate) {
      // Generate dates range
      const dates = eachDayOfInterval({
        start: fromDate,
        end: toDate
      });

      // Initialize mealData array
      const mealsData: MealData[] = dates.map(date => ({
        date: format(date, 'yyyy-MM-dd'),
        breakfast: false,
        lunch: false,
        dinner: false
      }));

      setValue('meals', mealsData);
    } else {
      setValue('meals', []);
    }
  }, [mealsProvided, fromDate, toDate, setValue]);

  // Handle meal selection change
  const handleMealChange = (dateIndex: number, mealType: string, isChecked: boolean) => {
    const currentMeals = watch('meals') || [];
    
    // Make a copy of the current meals array
    const updatedMeals = [...currentMeals];
    
    // Update the specific meal type for the specific date
    if (updatedMeals[dateIndex]) {
      updatedMeals[dateIndex] = {
        ...updatedMeals[dateIndex],
        [mealType]: isChecked
      };
      
      // Update the form value
      setValue('meals', updatedMeals);
    }
  };

  if (!fromDate || !toDate) {
    return (
      <div className="space-y-4">
        <div>
          <label htmlFor="mealsProvided" className="block text-sm font-medium mb-1">
            Were any meals provided during the business trip?
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="meals-yes"
                value="yes"
                className="h-4 w-4"
                {...register('mealsProvided')}
              />
              <label htmlFor="meals-yes" className="ml-2 block text-sm">
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="meals-no"
                value="no"
                className="h-4 w-4"
                {...register('mealsProvided')}
              />
              <label htmlFor="meals-no" className="ml-2 block text-sm">
                No
              </label>
            </div>
          </div>
        </div>
        
        {mealsProvided === 'yes' && (
          <p className="text-sm text-amber-600">
            Please select travel dates to specify meal details.
          </p>
        )}
      </div>
    );
  }

  // Generate dates range
  const dates = fromDate && toDate ? eachDayOfInterval({
    start: fromDate,
    end: toDate
  }) : [];

  // Get current meals
  const currentMeals = watch('meals') || [];

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="mealsProvided" className="block text-sm font-medium mb-1">
          Were any meals provided during the business trip?
        </label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="meals-yes"
              value="yes"
              className="h-4 w-4"
              {...register('mealsProvided')}
            />
            <label htmlFor="meals-yes" className="ml-2 block text-sm">
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="meals-no"
              value="no"
              className="h-4 w-4"
              {...register('mealsProvided')}
            />
            <label htmlFor="meals-no" className="ml-2 block text-sm">
              No
            </label>
          </div>
        </div>
      </div>

      {showMealDetails && (
        <div className="border rounded-md p-4 bg-gray-50">
          <h3 className="font-medium mb-3">Meal Details</h3>
          <p className="text-sm text-gray-500 mb-4">
            Select which meals were provided on each day of your trip.
          </p>

          {dates.map((date, dateIndex) => {
            const mealData = currentMeals[dateIndex] || {
              date: format(date, 'yyyy-MM-dd'),
              breakfast: false,
              lunch: false,
              dinner: false
            };

            return (
              <DailyMealGrid
                key={dateIndex}
                date={date}
                breakfast={mealData.breakfast}
                lunch={mealData.lunch}
                dinner={mealData.dinner}
                onMealChange={(mealType, isChecked) => handleMealChange(dateIndex, mealType, isChecked)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MealSelection;
