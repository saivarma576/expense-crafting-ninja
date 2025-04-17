
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
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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

  const progressPercentage = (step / 2) * 100;

  if (uiStyle === 'sheet') {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:max-w-md flex flex-col overflow-y-auto">
          <SheetHeader className="space-y-2">
            <SheetTitle className="flex items-center gap-2 animate-fade-in">
              Create New Expense
            </SheetTitle>
            <SheetDescription className="animate-fade-in">
              {step === 1 ? 
                "Let's gather some basic information about your expense." : 
                "Just a few more details to set up your expense."}
            </SheetDescription>
            <Progress value={progressPercentage} className="h-1 animate-fade-in" />
          </SheetHeader>
          <div className="py-4 flex-1">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <FormProvider {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {renderContent()}
                  </form>
                </FormProvider>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md flex flex-col max-h-[90vh]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="flex items-center gap-2 animate-fade-in">
            Create New Expense
          </DialogTitle>
          <DialogDescription className="animate-fade-in">
            {step === 1 ? 
              "Let's gather some basic information about your expense." : 
              "Just a few more details to set up your expense."}
          </DialogDescription>
          <Progress value={progressPercentage} className="h-1 animate-fade-in" />
        </DialogHeader>
        <div className="py-4 overflow-y-auto">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  {renderContent()}
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExpenseDialog;
