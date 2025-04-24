
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
import StepOneV3 from './V3/StepOneV3';
import StepTwoV3 from './V3/StepTwoV3';
import StepThreeV3 from './V3/StepThreeV3';
import ProgressIndicatorV3 from './V3/ProgressIndicatorV3';

interface CreateExpenseV3Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateExpenseV3: React.FC<CreateExpenseV3Props> = ({ isOpen, onClose }) => {
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

  const progressValue = (step / 3) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOneV3 
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
          <StepTwoV3 
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        );
      case 3:
        return (
          <StepThreeV3
            onBack={() => setStep(2)}
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
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            New Travel Expense
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Let's create your travel expense report step by step.
          </DialogDescription>
        </DialogHeader>
        
        <Progress value={progressValue} className="mx-6 h-1 bg-gray-100" />
        
        <div className="p-6">
          <div className="flex gap-6">
            <div className="hidden lg:block w-48">
              <ProgressIndicatorV3 step={step} />
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

export default CreateExpenseV3;
