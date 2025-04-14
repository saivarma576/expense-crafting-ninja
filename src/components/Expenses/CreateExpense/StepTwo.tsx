
import React from 'react';
import { ArrowLeft, CalendarIcon, Mic, Handshake, FileText, UtensilsCrossed } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface StepTwoProps {
  onBack: () => void;
  onSubmit: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ onBack, onSubmit }) => {
  const { control, watch, setValue } = useFormContext<FormValues>();
  const watchMealsProvided = watch('mealsProvided');
  const watchMeals = watch('meals');
  const watchTravelPurpose = watch('travelPurpose');
  const watchFromDate = watch('fromDate');
  const watchToDate = watch('toDate');

  const handleMealChange = (meal: Meal) => {
    const currentMeals = watchMeals || [];
    const updatedMeals = currentMeals.includes(meal)
      ? currentMeals.filter((m) => m !== meal)
      : [...currentMeals, meal];
    
    setValue('meals', updatedMeals);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-5">
        {/* Date Range Selection */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="fromDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>From Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="toDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>To Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={!watchFromDate || (date => date < watchFromDate)}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Purpose of Travel dropdown */}
        <FormField
          control={control}
          name="travelPurpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose of Travel</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="conferences" className="flex items-center">
                    <div className="flex items-center">
                      <Mic className="h-4 w-4 mr-2 text-primary" />
                      <span>Conferences</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="meeting">
                    <div className="flex items-center">
                      <Handshake className="h-4 w-4 mr-2 text-primary" />
                      <span>Meetings</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="others">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      <span>Others</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Meals provided section */}
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
          onClick={onSubmit}
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
