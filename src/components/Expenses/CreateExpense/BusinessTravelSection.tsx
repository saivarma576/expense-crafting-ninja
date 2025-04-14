
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
import { Input } from '@/components/ui/input';

const BusinessTravelSection: React.FC = () => {
  const { control } = useFormContext<FormValues>();
  
  return (
    <div className="space-y-4 pl-4 border-l-2 border-primary/20">
      <p className="text-sm text-muted-foreground">
        Please provide additional information about your business travel expense.
      </p>
      
      <FormField
        control={control}
        name="expenseTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expense Title</FormLabel>
            <FormControl>
              <Input 
                placeholder="E.g., Business Trip to New York" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              You'll provide more details in the next steps.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BusinessTravelSection;
