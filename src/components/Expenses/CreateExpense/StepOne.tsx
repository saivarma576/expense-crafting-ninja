
import React from 'react';
import { X, ArrowRight, Plane, Briefcase } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface StepOneProps {
  onNext: () => void;
  onCancel: () => void;
  onProceedToExpense: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ onNext, onCancel, onProceedToExpense }) => {
  const { control, watch, setValue } = useFormContext<FormValues>();
  const watchIsBusinessTravel = watch('isBusinessTravel');

  const handleToggleChange = (value: string) => {
    if (value) setValue('isBusinessTravel', value);
    
    // If the user selects "no", proceed directly to expense creation
    if (value === 'no') {
      onProceedToExpense();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <FormField
          control={control}
          name="isBusinessTravel"
          render={({ field }) => (
            <FormItem className="space-y-5">
              <FormLabel className="text-base font-medium">
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
                    className="flex-1 h-16 data-[state=on]:bg-primary/10 data-[state=on]:border-primary border-2 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Plane className="h-5 w-5" />
                    <span className="font-medium">Yes</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="no" 
                    className="flex-1 h-16 data-[state=on]:bg-primary/10 data-[state=on]:border-primary border-2 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Briefcase className="h-5 w-5" />
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
      
      <div className="flex justify-between pt-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          size="sm"
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button 
          type="button" 
          onClick={onNext}
          size="sm"
          disabled={watchIsBusinessTravel !== 'yes'}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default StepOne;
