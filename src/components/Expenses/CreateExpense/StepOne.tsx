
import React from 'react';
import { Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
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

interface StepOneProps {
  onNext: () => void;
  onCancel: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ onNext, onCancel }) => {
  const { control, watch } = useFormContext<FormValues>();
  const watchIsBusinessTravel = watch('isBusinessTravel');

  return (
    <div className="space-y-6 animate-fade-in">
      <ProgressIndicator step={1} />
      
      <div className="flex flex-col space-y-6">
        <FormField
          control={control}
          name="isBusinessTravel"
          render={({ field }) => (
            <FormItem className="space-y-5">
              <FormLabel className="text-lg flex items-center gap-2 mb-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Is this a business travel expense?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3"
                >
                  <FormItem className="flex flex-col space-y-0 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal text-base cursor-pointer flex-1">Yes</FormLabel>
                      </div>
                      <CheckCircle2 className={`h-5 w-5 ${field.value === 'yes' ? 'text-primary' : 'text-muted-foreground/30'}`} />
                    </div>
                    {field.value === 'yes' && (
                      <div className="mt-2 pl-7 text-sm text-gray-500">
                        Select this if your expense is related to business travel
                      </div>
                    )}
                  </FormItem>
                  
                  <FormItem className="flex flex-col space-y-0 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal text-base cursor-pointer flex-1">No</FormLabel>
                      </div>
                      <CheckCircle2 className={`h-5 w-5 ${field.value === 'no' ? 'text-primary' : 'text-muted-foreground/30'}`} />
                    </div>
                    {field.value === 'no' && (
                      <div className="mt-2 pl-7 text-sm text-gray-500">
                        Select this for non-travel related expenses
                      </div>
                    )}
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {watchIsBusinessTravel === 'yes' && <BusinessTravelSection />}
      </div>
      
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          type="button" 
          onClick={onNext}
          className="group"
          disabled={!watchIsBusinessTravel}
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default StepOne;
