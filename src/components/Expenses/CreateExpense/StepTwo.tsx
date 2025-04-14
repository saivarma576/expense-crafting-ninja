
import React from 'react';
import { Calendar as CalendarIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { FormValues } from './types';
import { cn } from '@/lib/utils';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface StepTwoProps {
  onBack: () => void;
  onNext: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ onBack, onNext }) => {
  const { control, watch } = useFormContext<FormValues>();
  const fromDate = watch('fromDate');
  const toDate = watch('toDate');

  const isNextDisabled = !fromDate || !toDate;

  return (
    <div className="space-y-6 animate-fade-in pb-4">
      <div className="space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <span className="text-2xl">📅</span> Trip Duration
        </h2>
        
        <div className="grid gap-6 pt-2">
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
                          "w-full pl-3 text-left font-normal h-14 rounded-xl",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select start date</span>
                        )}
                        <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
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
                          "w-full pl-3 text-left font-normal h-14 rounded-xl",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select end date</span>
                        )}
                        <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => 
                        date < new Date() || 
                        (fromDate ? date < fromDate : false)
                      }
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
          type="button" 
          onClick={onNext}
          className="group rounded-full px-6"
          disabled={isNextDisabled}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
