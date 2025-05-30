
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { FormValues } from './types';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { Progress } from '@/components/ui/progress';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import ProgressIndicator from './ProgressIndicator';

interface CreateExpenseV2Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateExpenseV2: React.FC<CreateExpenseV2Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const form = useForm<FormValues>({
    defaultValues: {
      isBusinessTravel: "",
      travelPurpose: undefined,
      travelComments: "",
      isSameDayTravel: false,
      fromDate: undefined,
      toDate: undefined,
      departureTime: "",
      returnTime: "",
      zipCode: "",
      city: "",
      mealsProvided: "",
      meals: [],
    }
  });

  const handleSubmit = (data: FormValues) => {
    console.log('Form data:', data);
    navigate('/expenses/new', { state: { expenseData: data } });
    onClose();
  };

  const progressValue = (step / 2) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne 
            onNext={() => setStep(2)}
            onCancel={onClose}
            onProceedToExpense={() => {
              const data = form.getValues();
              handleSubmit(data);
            }}
          />
        );
      case 2:
        return (
          <StepTwo 
            onBack={() => setStep(1)}
            onSubmit={() => {
              const data = form.getValues();
              handleSubmit(data);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="sm:max-w-2xl p-0 bg-white"
      >
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="flex items-center gap-2 animate-fade-in text-xl">
            Create New Expense
          </DialogTitle>
          <DialogDescription className="animate-fade-in">
            Let's gather some basic information about your expense.
          </DialogDescription>
        </DialogHeader>
        
        <Progress value={progressValue} className="mx-6" />
        
        <div className="p-6">
          <div className="flex gap-6">
            <div className="hidden lg:block">
              <ProgressIndicator step={step} />
            </div>
            
            <div className="flex-1">
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  {renderStep()}
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExpenseV2;
