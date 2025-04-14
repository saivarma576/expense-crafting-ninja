
import React from 'react';
import { CreditCard } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from './types';
import ProgressIndicator from './ProgressIndicator';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface StepTwoProps {
  onBack: () => void;
  onSubmit: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ onBack, onSubmit }) => {
  const { control } = useFormContext<FormValues>();

  return (
    <>
      <ProgressIndicator step={2} />
      <div className="mt-4 space-y-4">
        <FormField
          control={control}
          name="expenseTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-lg">
                <CreditCard className="h-5 w-5 text-primary" />
                Expense Title
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter expense title" 
                  {...field} 
                  className="mt-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="mt-6 flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          type="submit"
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700"
        >
          Create Expense
        </Button>
      </div>
    </>
  );
};

export default StepTwo;
