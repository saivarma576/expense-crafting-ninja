
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { FormValues } from './types';

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

interface CreateExpenseDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateExpenseDialog: React.FC<CreateExpenseDialogProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [uiStyle, setUiStyle] = useState<'dialog' | 'sheet'>('dialog');
  
  const form = useForm<FormValues>({
    defaultValues: {
      isBusinessTravel: "",
      mealsProvided: "",
      meals: [],
      expenseTitle: "",
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
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const onSubmit = (data: FormValues) => {
    // Store the form data for the new expense
    console.log('Form data:', data);
    
    // Navigate to the new expense page
    navigate('/expenses/new');
    onClose();
  };

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return <StepOne onNext={handleStepForward} onCancel={handleCancel} />;
      case 2:
        return <StepTwo onBack={handleStepBack} onSubmit={form.handleSubmit(onSubmit)} />;
      default:
        return null;
    }
  };

  if (uiStyle === 'sheet') {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Create New Expense</SheetTitle>
            <SheetDescription>
              {step === 1 ? "Let's gather some basic information about your expense." : "Just a few more details to set up your expense."}
            </SheetDescription>
          </SheetHeader>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
              {renderContent()}
            </form>
          </FormProvider>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Expense</DialogTitle>
          <DialogDescription>
            {step === 1 ? "Let's gather some basic information about your expense." : "Just a few more details to set up your expense."}
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {renderContent()}
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExpenseDialog;
