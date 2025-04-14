
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';

interface CreateExpenseDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type TravelPurpose = "conferences" | "meeting" | "others";
type Meal = "breakfast" | "lunch" | "dinner";

interface FormValues {
  isBusinessTravel: string;
  fromDate?: Date;
  toDate?: Date;
  travelPurpose?: TravelPurpose;
  mealsProvided: string;
  meals: Meal[];
  expenseTitle: string;
}

const CreateExpenseDialog: React.FC<CreateExpenseDialogProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const form = useForm<FormValues>({
    defaultValues: {
      isBusinessTravel: "",
      mealsProvided: "",
      meals: [],
      expenseTitle: "",
    }
  });

  const watchIsBusinessTravel = form.watch('isBusinessTravel');
  const watchMealsProvided = form.watch('mealsProvided');

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

  // Render different form content based on the current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="isBusinessTravel"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Is this a business travel expense?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {watchIsBusinessTravel === 'yes' && (
                <div className="space-y-4 mt-4 p-4 bg-slate-50 rounded-md">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fromDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>From Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="toDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>To Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="travelPurpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purpose of Travel</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the purpose of travel" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            <SelectItem value="conferences">Conferences</SelectItem>
                            <SelectItem value="meeting">Meeting</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mealsProvided"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Were meals provided?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal">Yes</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">No</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchMealsProvided === 'yes' && (
                    <FormField
                      control={form.control}
                      name="meals"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>Select meals that were provided:</FormLabel>
                          </div>
                          <div className="flex flex-col space-y-2">
                            {["breakfast", "lunch", "dinner"].map((meal) => (
                              <FormField
                                key={meal}
                                control={form.control}
                                name="meals"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={meal}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(meal as Meal)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, meal as Meal])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== meal
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal capitalize">
                                        {meal}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}
            </div>
            <DialogFooter className="mt-6 flex justify-between">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="button" onClick={handleStepForward}>
                Next
              </Button>
            </DialogFooter>
          </>
        );
      case 2:
        return (
          <>
            <div className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="expenseTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expense Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter expense title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-6 flex justify-between">
              <Button type="button" variant="outline" onClick={handleStepBack}>
                Back
              </Button>
              <Button type="submit">
                Create Expense
              </Button>
            </DialogFooter>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Expense</DialogTitle>
          <DialogDescription>
            {step === 1 ? "Let's gather some basic information about your expense." : "Just a few more details to set up your expense."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {renderStepContent()}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExpenseDialog;
