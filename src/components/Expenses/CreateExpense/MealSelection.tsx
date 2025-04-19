
import React, { useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormValues, Meal } from './types';
import DailyMealGrid from './DailyMealGrid';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

const MealSelection: React.FC = () => {
  const { control, watch, setValue } = useFormContext<FormValues>();
  const [sameForAllDays, setSameForAllDays] = useState(false);
  const [dailyMeals, setDailyMeals] = useState<Record<string, Meal[]>>({});
  
  const watchMealsProvided = watch('mealsProvided');
  const watchMeals = watch('meals') || [];
  const watchFromDate = watch('fromDate');
  const watchToDate = watch('toDate');

  const handleDailyMealChange = useCallback((date: string, meal: Meal) => {
    setDailyMeals(prev => {
      const currentMeals = prev[date] || [];
      const updatedMeals = currentMeals.includes(meal)
        ? currentMeals.filter(m => m !== meal)
        : [...currentMeals, meal];
      
      return {
        ...prev,
        [date]: updatedMeals
      };
    });
  }, []);

  const handleSameForAllDaysChange = useCallback((checked: boolean) => {
    setSameForAllDays(checked);
    if (checked) {
      // When checked, apply all meals to all dates
      const allMeals: Meal[] = ['breakfast', 'lunch', 'dinner'];
      const newDailyMeals: Record<string, Meal[]> = {};
      const start = new Date(watchFromDate);
      const end = new Date(watchToDate);
      
      for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        newDailyMeals[date.toISOString().split('T')[0]] = [...allMeals];
      }
      setDailyMeals(newDailyMeals);
    }
  }, [watchFromDate, watchToDate]);

  return (
    <>
      <FormField
        control={control}
        name="mealsProvided"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Were meals provided during the trip?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex space-x-4"
              >
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value="yes" />
                  </FormControl>
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value="no" />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {watchMealsProvided === 'yes' && watchFromDate && watchToDate && (
        <div className="space-y-4 pt-2 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Checkbox
              id="sameForAllDays"
              checked={sameForAllDays}
              onCheckedChange={(checked) => handleSameForAllDaysChange(checked as boolean)}
            />
            <label htmlFor="sameForAllDays" className="text-sm">
              Meals were same for all days
            </label>
          </div>

          <DailyMealGrid
            startDate={watchFromDate}
            endDate={watchToDate}
            selectedMeals={watchMeals}
            dailyMeals={dailyMeals}
            onDailyMealChange={handleDailyMealChange}
          />
        </div>
      )}
    </>
  );
};

export default MealSelection;
