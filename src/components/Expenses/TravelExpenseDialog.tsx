
import React, { useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Plane } from 'lucide-react';
import { FormValues } from './CreateExpense/types';
import { useTravelInfo } from '@/contexts/TravelInfoContext';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import TravelPurposeSelector from './CreateExpense/TravelPurposeSelector';
import DateRangeSelection from './CreateExpense/DateRangeSelection';
import MealSelection from './CreateExpense/MealSelection';

const TravelExpenseDialog: React.FC = () => {
  const { 
    showTravelDialog, 
    setShowTravelDialog, 
    handleTravelDialogSave,
    travelPurpose,
    fromDate,
    toDate,
    mealsProvided,
    meals,
    travelComments
  } = useTravelInfo();

  const form = useForm<FormValues>({
    defaultValues: {
      isBusinessTravel: 'yes',
      travelPurpose: travelPurpose,
      fromDate: fromDate,
      toDate: toDate,
      mealsProvided: mealsProvided,
      meals: meals,
      travelComments: travelComments,
      expenseTitle: ''
    }
  });
  
  // Use a controlled onOpenChange handler with a guard condition
  const handleOpenChange = useCallback((open: boolean) => {
    if (open !== showTravelDialog) {
      setShowTravelDialog(open);
    }
  }, [showTravelDialog, setShowTravelDialog]);

  return (
    <Dialog open={showTravelDialog} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Plane className="h-5 w-5 text-blue-500" />
            Business Travel Details
          </DialogTitle>
          <DialogDescription>
            Please provide information about your business travel
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleTravelDialogSave)} className="space-y-5">
              <TravelPurposeSelector />
              <DateRangeSelection />
              <MealSelection />
              
              <div className="flex justify-end gap-2 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save Details
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TravelExpenseDialog;
