
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

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { Progress } from '@/components/ui/progress';

type UiStyle = 'dialog' | 'sheet';

interface CreateExpenseDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateExpenseDialog: React.FC<CreateExpenseDialogProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Use a constant value for uiStyle to avoid re-renders
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

  if (uiStyle === 'sheet') {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader className="space-y-2 mb-6">
            <SheetTitle className="flex items-center gap-2 animate-fade-in">
              Create New Expense
            </SheetTitle>
            <SheetDescription className="animate-fade-in">
              Let's gather some basic information about your expense.
            </SheetDescription>
          </SheetHeader>
          
          <Progress value={progressValue} className="mb-6" />
          
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {renderStep()}
            </form>
          </FormProvider>
        </SheetContent>
      </Sheet>
    );
  }

  // Here's the fix: Use strict equality operator to compare string literals
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
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
