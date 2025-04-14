
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Briefcase, 
  Map, 
  CheckCircle2, 
  Utensils, 
  CreditCard,
  ArrowRight,
  Coffee,
  Pizza,
  Wine
} from 'lucide-react';
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
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
  const [uiStyle, setUiStyle] = useState<'dialog' | 'sheet'>('dialog');
  
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

  const ProgressIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-4">
      {[1, 2].map((i) => (
        <div 
          key={i} 
          className={`h-2 rounded-full transition-all duration-300 ${
            step === i 
              ? "w-8 bg-primary" 
              : step > i 
                ? "w-8 bg-primary/60" 
                : "w-2 bg-gray-200"
          }`}
        />
      ))}
    </div>
  );

  // Render different form content based on the current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <ProgressIndicator />
            <div className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="isBusinessTravel"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      Is this a business travel expense?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal text-base cursor-pointer flex-1">Yes</FormLabel>
                          <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal text-base cursor-pointer flex-1">No</FormLabel>
                          <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {watchIsBusinessTravel === 'yes' && (
                <div className="space-y-4 mt-6 p-6 bg-primary/5 rounded-lg border border-primary/10 animate-fade-in">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fromDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="flex items-center gap-2 mb-2">
                            <CalendarIcon className="h-4 w-4 text-primary" />
                            From Date
                          </FormLabel>
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
                          <FormLabel className="flex items-center gap-2 mb-2">
                            <CalendarIcon className="h-4 w-4 text-primary" />
                            To Date
                          </FormLabel>
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
                        <FormLabel className="flex items-center gap-2 mb-2">
                          <Map className="h-4 w-4 text-primary" />
                          Purpose of Travel
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
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
                        <FormLabel className="flex items-center gap-2 mb-2">
                          <Utensils className="h-4 w-4 text-primary" />
                          Were meals provided?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal text-base cursor-pointer flex-1">Yes</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal text-base cursor-pointer flex-1">No</FormLabel>
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
                        <FormItem className="animate-fade-in">
                          <div className="mb-4">
                            <FormLabel className="flex items-center gap-2">
                              <Utensils className="h-4 w-4 text-primary" />
                              Select meals that were provided:
                            </FormLabel>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <FormField
                              control={form.control}
                              name="meals"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    className="flex flex-col items-center space-y-3 space-x-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes("breakfast" as Meal)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, "breakfast" as Meal])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== "breakfast"
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <Coffee className="h-8 w-8 text-primary/80 my-2" />
                                    <FormLabel className="font-normal capitalize cursor-pointer">
                                      Breakfast
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                            <FormField
                              control={form.control}
                              name="meals"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    className="flex flex-col items-center space-y-3 space-x-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes("lunch" as Meal)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, "lunch" as Meal])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== "lunch"
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <Pizza className="h-8 w-8 text-primary/80 my-2" />
                                    <FormLabel className="font-normal capitalize cursor-pointer">
                                      Lunch
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                            <FormField
                              control={form.control}
                              name="meals"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    className="flex flex-col items-center space-y-3 space-x-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes("dinner" as Meal)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, "dinner" as Meal])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== "dinner"
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <Wine className="h-8 w-8 text-primary/80 my-2" />
                                    <FormLabel className="font-normal capitalize cursor-pointer">
                                      Dinner
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
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
              <Button 
                type="button" 
                onClick={handleStepForward}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        );
      case 2:
        return (
          <>
            <ProgressIndicator />
            <div className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="expenseTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-lg">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Expense Title
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter expense title" 
                        {...field} 
                        className="mt-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-6 flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleStepBack}
              >
                Back
              </Button>
              <Button 
                type="submit"
                className="bg-green-600 hover:bg-green-700"
              >
                Create Expense
              </Button>
            </DialogFooter>
          </>
        );
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
              {renderStepContent()}
            </form>
          </Form>
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
