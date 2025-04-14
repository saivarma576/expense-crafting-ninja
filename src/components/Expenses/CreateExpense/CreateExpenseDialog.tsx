
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
import StepThree from './StepThree';
import StepFour from './StepFour';
import ProgressIndicator from './ProgressIndicator';

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
    if (step < 4) {
      setStep(step + 1);
    } else {
      form.handleSubmit(onSubmit)();
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne onNext={handleStepForward} onCancel={handleCancel} />;
      case 2:
        return <StepTwo onBack={handleStepBack} onNext={handleStepForward} />;
      case 3:
        return <StepThree onBack={handleStepBack} onNext={handleStepForward} />;
      case 4:
        return <StepFour onBack={handleStepBack} onSubmit={form.handleSubmit(onSubmit)} />;
      default:
        return null;
    }
  };

  if (uiStyle === 'sheet') {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:max-w-md flex flex-col overflow-y-auto">
          <SheetHeader className="space-y-2 mb-6">
            <SheetTitle className="flex items-center gap-2 animate-fade-in">
              Create New Expense
            </SheetTitle>
            <SheetDescription className="animate-fade-in">
              Let's set up your expense step by step.
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex flex-1 h-full overflow-y-auto">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 h-full">
                <div className="flex flex-1 h-full">
                  <div className="hidden sm:block">
                    <ProgressIndicator step={step} totalSteps={4} />
                  </div>
                  <div className="flex-1 min-h-0 overflow-y-auto">
                    {renderStep()}
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl flex flex-col max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center gap-2 animate-fade-in text-xl">
            Create New Expense
          </DialogTitle>
          <DialogDescription className="animate-fade-in">
            Let's set up your expense step by step.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-1 overflow-hidden">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 overflow-hidden">
              <div className="flex flex-1 h-full">
                <div className="py-6 pl-6 hidden sm:block">
                  <ProgressIndicator step={step} totalSteps={4} />
                </div>
                <div className="flex-1 p-6 overflow-y-auto glass-card mx-6 mb-6 rounded-xl">
                  {renderStep()}
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExpenseDialog;
