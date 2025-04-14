
import React from 'react';
import { Briefcase, X, ArrowRight } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from './types';
import BusinessTravelSection from './BusinessTravelSection';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface StepOneProps {
  onNext: () => void;
  onCancel: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ onNext, onCancel }) => {
  const { control, watch, setValue } = useFormContext<FormValues>();
  const watchIsBusinessTravel = watch('isBusinessTravel');

  const handleToggleChange = (value: string) => {
    if (value) setValue('isBusinessTravel', value);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-4">
      <div className="space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <span className="text-2xl">🧭</span> Business Travel Confirmation
        </h2>
        
        <FormField
          control={control}
          name="isBusinessTravel"
          render={({ field }) => (
            <FormItem className="space-y-5">
              <FormLabel className="text-lg">
                Is this a business travel expense?
              </FormLabel>
              <FormControl>
                <ToggleGroup 
                  type="single" 
                  onValueChange={handleToggleChange}
                  value={field.value}
                  className="flex w-full gap-4"
                >
                  <ToggleGroupItem 
                    value="yes" 
                    className="flex-1 h-20 data-[state=on]:bg-primary/10 data-[state=on]:border-primary border-2 rounded-xl transition-all flex flex-col items-center justify-center gap-2"
                  >
                    <span className="text-2xl">✈️</span>
                    <span className="font-medium">Yes</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="no" 
                    className="flex-1 h-20 data-[state=on]:bg-primary/10 data-[state=on]:border-primary border-2 rounded-xl transition-all flex flex-col items-center justify-center gap-2"
                  >
                    <span className="text-2xl">💼</span>
                    <span className="font-medium">No</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {watchIsBusinessTravel === 'yes' && (
          <div className="pt-4 animate-fade-in">
            <BusinessTravelSection />
          </div>
        )}
      </div>
      
      <div className="flex justify-between pt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="rounded-full px-4"
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button 
          type="button" 
          onClick={onNext}
          className="group rounded-full px-6"
          disabled={!watchIsBusinessTravel}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default StepOne;
