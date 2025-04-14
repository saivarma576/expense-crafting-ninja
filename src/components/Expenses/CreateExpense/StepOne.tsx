
import React from 'react';
import { Briefcase, CheckCircle2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from './types';
import BusinessTravelSection from './BusinessTravelSection';
import ProgressIndicator from './ProgressIndicator';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface StepOneProps {
  onNext: () => void;
  onCancel: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ onNext, onCancel }) => {
  const { control, watch } = useFormContext<FormValues>();
  const watchIsBusinessTravel = watch('isBusinessTravel');

  return (
    <>
      <ProgressIndicator step={1} />
      <div className="mt-4 space-y-4">
        <FormField
          control={control}
          name="isBusinessTravel"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Is this a business travel expense?
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
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal text-base cursor-pointer flex-1">No</FormLabel>
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {watchIsBusinessTravel === 'yes' && <BusinessTravelSection />}
      </div>
      <div className="mt-6 flex justify-between">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          type="button" 
          onClick={onNext}
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default StepOne;
