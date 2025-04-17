
import React from 'react';
import { CreditCard, ArrowLeft, FileCheck } from 'lucide-react';
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
import { Card } from '@/components/ui/card';

interface StepTwoProps {
  onBack: () => void;
  onSubmit: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ onBack, onSubmit }) => {
  const { control, watch } = useFormContext<FormValues>();
  const expenseTitle = watch('expenseTitle');

  return (
    <div className="space-y-6 animate-fade-in">
      <ProgressIndicator step={2} />
      
      <Card className="bg-gray-50/50 p-6 border rounded-lg shadow-sm">
        <FormField
          control={control}
          name="expenseTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-lg mb-3">
                <CreditCard className="h-5 w-5 text-primary" />
                Expense Title
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter a descriptive title for this expense" 
                  {...field} 
                  className="transition-all focus-within:shadow-md"
                />
              </FormControl>
              <FormMessage />
              {field.value && (
                <div className="mt-3 text-sm text-gray-500 animate-fade-in">
                  This title will help you identify the expense later.
                </div>
              )}
            </FormItem>
          )}
        />
      </Card>
      
      <div className="pt-4 flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Button>
        <Button 
          type="submit"
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700 group"
          disabled={!expenseTitle}
        >
          <FileCheck className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          Create Expense
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
