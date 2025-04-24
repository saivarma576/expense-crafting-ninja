
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { eachDayOfInterval } from 'date-fns';
import { toast } from 'sonner';

interface StepThreeV3Props {
  onBack: () => void;
  onSubmit: () => void;
}

const mealRates = {
  breakfast: 18,
  lunch: 20,
  dinner: 31
};

const StepThreeV3: React.FC<StepThreeV3Props> = ({ onBack, onSubmit }) => {
  const { setValue, watch } = useFormContext<FormValues>();
  const [allMealsProvided, setAllMealsProvided] = useState(false);
  
  const mealsProvided = watch('mealsProvided');
  const fromDate = watch('fromDate');
  const toDate = watch('toDate');
  const isSameDayTravel = watch('isSameDayTravel');

  // Skip this step if it's same-day travel
  if (isSameDayTravel) {
    onSubmit();
    return null;
  }

  // Get all days between fromDate and toDate
  const getDaysArray = () => {
    if (!fromDate || !toDate) return [];
    return eachDayOfInterval({
      start: fromDate,
      end: toDate
    });
  };

  const days = getDaysArray();

  const handleMealsProvidedChange = (value: string) => {
    setValue('mealsProvided', value);
    if (value === 'no') {
      setValue('meals', []);
      setAllMealsProvided(false);
    }
  };

  const handleAllMealsProvided = (checked: boolean) => {
    setAllMealsProvided(checked);
    if (checked) {
      const allMeals = days.map(day => ({
        date: format(day, 'yyyy-MM-dd'),
        breakfast: true,
        lunch: true,
        dinner: true
      }));
      setValue('meals', allMeals);
    } else {
      setValue('meals', []);
    }
  };

  const handleMealToggle = (date: Date, meal: 'breakfast' | 'lunch' | 'dinner', checked: boolean) => {
    const meals = watch('meals') || [];
    const dateStr = format(date, 'yyyy-MM-dd');
    
    const existingDayIndex = meals.findIndex(m => m.date === dateStr);
    
    if (existingDayIndex >= 0) {
      const updatedMeals = [...meals];
      updatedMeals[existingDayIndex] = {
        ...updatedMeals[existingDayIndex],
        [meal]: checked
      };
      setValue('meals', updatedMeals);
    } else {
      const newDayMeals = {
        date: dateStr,
        breakfast: meal === 'breakfast' ? checked : false,
        lunch: meal === 'lunch' ? checked : false,
        dinner: meal === 'dinner' ? checked : false
      };
      setValue('meals', [...meals, newDayMeals]);
    }
  };

  const getMealStatusForDay = (date: Date, meal: 'breakfast' | 'lunch' | 'dinner'): boolean => {
    const meals = watch('meals') || [];
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayMeal = meals.find(m => m.date === dateStr);
    return dayMeal ? !!dayMeal[meal] : false;
  };

  const calculateTotal = () => {
    let total = 0;
    const meals = watch('meals') || [];
    
    meals.forEach(day => {
      if (day.breakfast) total += mealRates.breakfast;
      if (day.lunch) total += mealRates.lunch;
      if (day.dinner) total += mealRates.dinner;
    });
    
    return total;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Were meals provided during your travel?</h3>
        <RadioGroup 
          value={mealsProvided}
          onValueChange={handleMealsProvidedChange}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="meals-yes" />
            <Label htmlFor="meals-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="meals-no" />
            <Label htmlFor="meals-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {mealsProvided === 'yes' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="all-meals" 
              checked={allMealsProvided}
              onCheckedChange={handleAllMealsProvided}
            />
            <label
              htmlFor="all-meals"
              className="font-medium text-sm"
            >
              All meals were provided
            </label>
          </div>

          {!allMealsProvided && (
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-center">Breakfast ($18)</th>
                    <th className="py-3 px-4 text-center">Lunch ($20)</th>
                    <th className="py-3 px-4 text-center">Dinner ($31)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {days.map((day, i) => (
                    <tr key={i} className="bg-white">
                      <td className="py-3 px-4">{format(day, 'MMM d, yyyy')}</td>
                      <td className="py-3 px-4 text-center">
                        <Checkbox 
                          checked={getMealStatusForDay(day, 'breakfast')}
                          onCheckedChange={(checked) => handleMealToggle(day, 'breakfast', !!checked)} 
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Checkbox 
                          checked={getMealStatusForDay(day, 'lunch')}
                          onCheckedChange={(checked) => handleMealToggle(day, 'lunch', !!checked)} 
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Checkbox 
                          checked={getMealStatusForDay(day, 'dinner')}
                          onCheckedChange={(checked) => handleMealToggle(day, 'dinner', !!checked)} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium text-gray-900 mb-2">GSA Rates Summary</h4>
            <div className="flex justify-between text-sm">
              <div>
                <p>Breakfast: $18</p>
                <p>Lunch: $20</p>
                <p>Dinner: $31</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Total: ${calculateTotal().toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          type="button" 
          onClick={() => {
            if (mealsProvided === 'yes' && watch('meals')?.length === 0 && !allMealsProvided) {
              toast.warning("Please select which meals were provided");
            } else {
              onSubmit();
            }
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default StepThreeV3;
