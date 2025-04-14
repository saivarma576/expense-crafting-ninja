
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
    navigate('/expenses/new');
    onClose();
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
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader className="space-y-2 mb-6">
            <SheetTitle className="flex items-center gap-2 animate-fade-in">
              Create New Expense
            </SheetTitle>
            <SheetDescription className="animate-fade-in">
              Let's set up your expense step by step.
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="flex items-center gap-2 animate-fade-in text-xl">
            Create New Expense
          </DialogTitle>
          <DialogDescription className="animate-fade-in">
            Let's set up your expense step by step.
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
