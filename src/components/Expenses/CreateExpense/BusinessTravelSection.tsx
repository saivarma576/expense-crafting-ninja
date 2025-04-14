
import React from 'react';
import { 
  CalendarIcon, 
  Map, 
  Utensils, 
  Coffee,
  Pizza,
  Wine
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { Meal, FormValues, TravelPurpose } from './types';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

const BusinessTravelSection: React.FC = () => {
  const { control, watch } = useFormContext<FormValues>();
  const watchMealsProvided = watch('mealsProvided');

  return (
    <div className="space-y-4 mt-6 p-6 bg-primary/5 rounded-lg border border-primary/10 animate-fade-in">
      <div className="grid grid-cols-2 gap-6">
        <FormField
          control={control}
          name="fromDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="flex items-center gap-2 mb-2">
                <CalendarIcon className="h-4 w-4 text-primary" />
                From Date
              </FormLabel>
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
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
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
              <FormLabel className="flex items-center gap-2 mb-2">
                <CalendarIcon className="h-4 w-4 text-primary" />
                To Date
              </FormLabel>
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
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
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
      </div>

      <FormField
        control={control}
        name="travelPurpose"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 mb-2">
              <Map className="h-4 w-4 text-primary" />
              Purpose of Travel
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select the purpose of travel" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white">
                <SelectItem value="conferences">Conferences</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="mealsProvided"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="flex items-center gap-2 mb-2">
              <Utensils className="h-4 w-4 text-primary" />
              Were meals provided?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <FormControl>
                    <RadioGroupItem value="yes" />
                  </FormControl>
                  <FormLabel className="font-normal text-base cursor-pointer flex-1">Yes</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <FormControl>
                    <RadioGroupItem value="no" />
                  </FormControl>
                  <FormLabel className="font-normal text-base cursor-pointer flex-1">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {watchMealsProvided === 'yes' && <MealSelectionComponent />}
    </div>
  );
};

const MealSelectionComponent: React.FC = () => {
  const { control } = useFormContext<FormValues>();
  
  return (
    <FormField
      control={control}
      name="meals"
      render={() => (
        <FormItem className="animate-fade-in">
          <div className="mb-4">
            <FormLabel className="flex items-center gap-2">
              <Utensils className="h-4 w-4 text-primary" />
              Select meals that were provided:
            </FormLabel>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <FormField
              control={control}
              name="meals"
              render={({ field }) => {
                return (
                  <FormItem
                    className="flex flex-col items-center space-y-3 space-x-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes("breakfast" as Meal)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, "breakfast" as Meal])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== "breakfast"
                                )
                              )
                        }}
                      />
                    </FormControl>
                    <Coffee className="h-8 w-8 text-primary/80 my-2" />
                    <FormLabel className="font-normal capitalize cursor-pointer">
                      Breakfast
                    </FormLabel>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={control}
              name="meals"
              render={({ field }) => {
                return (
                  <FormItem
                    className="flex flex-col items-center space-y-3 space-x-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes("lunch" as Meal)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, "lunch" as Meal])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== "lunch"
                                )
                              )
                        }}
                      />
                    </FormControl>
                    <Pizza className="h-8 w-8 text-primary/80 my-2" />
                    <FormLabel className="font-normal capitalize cursor-pointer">
                      Lunch
                    </FormLabel>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={control}
              name="meals"
              render={({ field }) => {
                return (
                  <FormItem
                    className="flex flex-col items-center space-y-3 space-x-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes("dinner" as Meal)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, "dinner" as Meal])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== "dinner"
                                )
                              )
                        }}
                      />
                    </FormControl>
                    <Wine className="h-8 w-8 text-primary/80 my-2" />
                    <FormLabel className="font-normal capitalize cursor-pointer">
                      Dinner
                    </FormLabel>
                  </FormItem>
                )
              }}
            />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BusinessTravelSection;
