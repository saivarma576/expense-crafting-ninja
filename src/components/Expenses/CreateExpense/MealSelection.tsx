
import React from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues, Meal } from './types';

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
  const watchMealsProvided = watch('mealsProvided');
  const watchMeals = watch('meals');

  const handleMealChange = (meal: Meal) => {
    const currentMeals = watchMeals || [];
    const updatedMeals = currentMeals.includes(meal)
      ? currentMeals.filter((m) => m !== meal)
      : [...currentMeals, meal];
    
    setValue('meals', updatedMeals);
  };

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

      {/* Meal selection checkboxes */}
      {watchMealsProvided === 'yes' && (
        <div className="space-y-3 pt-2 animate-fade-in">
          <FormLabel>Select which meals were provided:</FormLabel>
          <div className="grid grid-cols-3 gap-3">
            <div 
              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${watchMeals?.includes('breakfast') ? 'bg-primary/10 border-primary' : ''}`}
              onClick={() => handleMealChange('breakfast')}
            >
              <Checkbox 
                checked={watchMeals?.includes('breakfast')} 
                onCheckedChange={() => handleMealChange('breakfast')}
              />
              <span className="text-sm">🥐 Breakfast</span>
            </div>
            <div 
              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${watchMeals?.includes('lunch') ? 'bg-primary/10 border-primary' : ''}`}
              onClick={() => handleMealChange('lunch')}
            >
              <Checkbox 
                checked={watchMeals?.includes('lunch')} 
                onCheckedChange={() => handleMealChange('lunch')}
              />
              <span className="text-sm">🍱 Lunch</span>
            </div>
            <div 
              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${watchMeals?.includes('dinner') ? 'bg-primary/10 border-primary' : ''}`}
              onClick={() => handleMealChange('dinner')}
            >
              <Checkbox 
                checked={watchMeals?.includes('dinner')} 
                onCheckedChange={() => handleMealChange('dinner')}
              />
              <span className="text-sm">🍽️ Dinner</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MealSelection;
