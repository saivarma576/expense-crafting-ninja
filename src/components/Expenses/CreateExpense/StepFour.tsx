
import React from 'react';
import { ArrowLeft, FileCheck, Check } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues, Meal } from './types';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface StepFourProps {
  onBack: () => void;
  onSubmit: () => void;
}

const MEAL_OPTIONS: { value: Meal; label: string; icon: string }[] = [
  { value: 'breakfast', label: 'Breakfast', icon: '🥐' },
  { value: 'lunch', label: 'Lunch', icon: '🍛' },
  { value: 'dinner', label: 'Dinner', icon: '🍽️' },
];

const StepFour: React.FC<StepFourProps> = ({ onBack, onSubmit }) => {
  const { control, watch, setValue } = useFormContext<FormValues>();
  const mealsProvided = watch('mealsProvided');
  const meals = watch('meals') || [];
  const expenseTitle = watch('expenseTitle');

  const handleMealToggle = (meal: Meal) => {
    const currentMeals = [...meals];
    const index = currentMeals.indexOf(meal);
    
    if (index > -1) {
      currentMeals.splice(index, 1);
    } else {
      currentMeals.push(meal);
    }
    
    setValue('meals', currentMeals);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-4">
      <div className="space-y-8">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <span className="text-2xl">🍽️</span> Meals Information
        </h2>
        
        <FormField
          control={control}
          name="mealsProvided"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base">Were meals provided during the trip?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {mealsProvided === 'yes' && (
          <FormField
            control={control}
            name="meals"
            render={() => (
              <FormItem className="space-y-4">
                <FormLabel className="text-base">Which meals were provided?</FormLabel>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {MEAL_OPTIONS.map((meal) => {
                    const isSelected = meals.includes(meal.value);
                    
                    return (
                      <Card 
                        key={meal.value}
                        className={`p-3 cursor-pointer transition-colors border-2 hover:bg-primary/5 ${isSelected ? 'border-primary bg-primary/10' : ''}`}
                        onClick={() => handleMealToggle(meal.value)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-xl">{meal.icon}</div>
                          <div className="flex-1 font-medium">{meal.label}</div>
                          {isSelected && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </FormItem>
            )}
          />
        )}

        <FormField
          control={control}
          name="expenseTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Expense Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter a descriptive title for this expense" 
                  {...field} 
                  className="transition-all focus-within:shadow-md h-12 rounded-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="flex justify-between pt-6">
        <Button 
          type="button" 
          variant="outline"
          onClick={onBack}
          className="group rounded-full px-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Button>
        <Button 
          type="submit"
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700 group rounded-full px-6"
          disabled={!expenseTitle}
        >
          <FileCheck className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          Create Expense
        </Button>
      </div>
    </div>
  );
};

export default StepFour;
