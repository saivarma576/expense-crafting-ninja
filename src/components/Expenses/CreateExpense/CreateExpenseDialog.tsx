
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { FormValues } from './types';
import { X } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Progress } from '@/components/ui/progress';

import StepOne from './StepOne';
import StepTwo from './StepTwo';

type UiStyle = 'dialog';

interface CreateExpenseDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateExpenseDialog: React.FC<CreateExpenseDialogProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const uiStyle: UiStyle = 'dialog';

  const form = useForm<FormValues>({
    defaultValues: {
      isBusinessTravel: "",
      mealsProvided: "",
      meals: [],
      expenseTitle: "",
      fromDate: undefined,
      toDate: undefined,
      travelPurpose: undefined,
      travelComments: "",
    }
  });

  const handleStepBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  const handleStepForward = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const handleProceedToExpense = () => {
    navigate('/expenses/new', { state: { expenseData: form.getValues() } });
    onClose();
  };

  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data);
    navigate('/expenses/new', { state: { expenseData: data } });
    onClose();
  };

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne onNext={handleStepForward} onCancel={handleCancel} onProceedToExpense={handleProceedToExpense} />;
      case 2:
        return <StepTwo onBack={handleStepBack} onSubmit={form.handleSubmit(onSubmit)} />;
      default:
        return null;
    }
  };

  const progressValue = (step / 2) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-[#F1F0FB] border-none shadow-lg rounded-xl">
        <DialogHeader className="p-6 pb-2 bg-[#9b87f5] bg-opacity-10">
          <DialogTitle className="flex items-center gap-2 animate-fade-in text-xl text-[#1A1F2C]">
            Create New Expense
          </DialogTitle>
          <DialogDescription className="animate-fade-in text-[#8E9196]">
            Let's gather some basic information about your expense.
          </DialogDescription>
        </DialogHeader>
        
        <Progress value={progressValue} className="mx-6 bg-[#E6E6E6]" />
        
        <div className="p-6 bg-[#F1F0FB]">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {renderStep()}
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExpenseDialog;
