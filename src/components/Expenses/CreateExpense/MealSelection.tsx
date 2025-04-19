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
  const [sameForAllDays, setSameForAllDays] = useState(true);
  const [dailyMeals, setDailyMeals] = useState<Record<string, Meal[]>>({});
  
  const watchMealsProvided = watch('mealsProvided');
  const watchMeals = watch('meals') || [];
  const watchFromDate = watch('fromDate');
  const watchToDate = watch('toDate');

  const handleMealChange = useCallback((meal: Meal) => {
    setValue('meals', 
      watchMeals.includes(meal)
        ? watchMeals.filter((m) => m !== meal)
        : [...watchMeals, meal], 
      { shouldValidate: true }
    );
  }, [watchMeals, setValue]);

  const handleDailyMealChange = useCallback((date: string, meal: Meal) => {
    setDailyMeals(prev => {
      const currentMeals = prev[date] || [...watchMeals];
      const updatedMeals = currentMeals.includes(meal)
        ? currentMeals.filter(m => m !== meal)
        : [...currentMeals, meal];
      
      return {
        ...prev,
        [date]: updatedMeals
      };
    });
  }, [watchMeals]);

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

      {watchMealsProvided === 'yes' && (
        <div className="space-y-4 pt-2 animate-fade-in">
          <div className="space-y-2">
            <FormLabel>Step 1: Quick Selection</FormLabel>
            <div className="flex items-center gap-2 mb-4">
              <Checkbox
                id="sameForAllDays"
                checked={sameForAllDays}
                onCheckedChange={(checked) => setSameForAllDays(checked as boolean)}
              />
              <label htmlFor="sameForAllDays" className="text-sm">
                Meals were same for all days
              </label>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { meal: 'breakfast', emoji: '🍳', label: 'Breakfast' },
                { meal: 'lunch', emoji: '🥗', label: 'Lunch' },
                { meal: 'dinner', emoji: '🍽️', label: 'Dinner' }
              ].map(({ meal, emoji, label }) => (
                <div 
                  key={meal}
                  className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                    watchMeals.includes(meal as Meal) ? 'bg-primary/10 border-primary' : ''
                  }`}
                  onClick={() => handleMealChange(meal as Meal)}
                >
                  <Checkbox 
                    id={`meal-${meal}`}
                    checked={watchMeals.includes(meal as Meal)}
                    onCheckedChange={() => handleMealChange(meal as Meal)}
                  />
                  <div className="flex items-center">
                    <span className="mr-1.5">{emoji}</span>
                    <span className="text-sm">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!sameForAllDays && watchFromDate && watchToDate && (
            <div className="mt-6">
              <FormLabel>Step 2: Advanced Selection</FormLabel>
              <DailyMealGrid
                startDate={watchFromDate}
                endDate={watchToDate}
                selectedMeals={watchMeals}
                dailyMeals={dailyMeals}
                onDailyMealChange={handleDailyMealChange}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MealSelection;
