
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormValues, Meal } from './types';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

const BusinessTravelSection: React.FC = () => {
  const { control, watch, setValue } = useFormContext<FormValues>();
  
  return (
    <div className="space-y-4 pl-4 border-l-2 border-primary/20">
      <p className="text-sm text-muted-foreground">
        Please provide additional information about your business travel expense.
      </p>
      
      <div className="space-y-4">
        <FormDescription>
          You'll be asked for travel dates and purpose in the next steps.
        </FormDescription>
      </div>
    </div>
  );
};

export default BusinessTravelSection;
