import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { FormValues } from './types';
import { toast } from 'sonner';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import ProgressIndicator from './ProgressIndicator';

interface CreateExpenseV2Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateExpenseV2: React.FC<CreateExpenseV2Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [hasMultipleZipCodes, setHasMultipleZipCodes] = useState(false);
  
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

  const businessTravel = form.watch('isBusinessTravel');
  const isSameDayTravel = form.watch('isSameDayTravel');
  const fromDate = form.watch('fromDate');
  
  React.useEffect(() => {
    if (isSameDayTravel && fromDate) {
      form.setValue('toDate', fromDate);
    }
  }, [isSameDayTravel, fromDate, form]);

  const handleSubmit = (data: FormValues) => {
    console.log('Form data:', data);
    navigate('/expenses/new', { state: { expenseData: data } });
    onClose();
  };

  const progressValue = (step / 4) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">✅ Step 1: Basic Info</h2>
            <FormField
              control={form.control}
              name="isBusinessTravel"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Is this a business travel expense?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {businessTravel === 'yes' && (
              <>
                <FormField
                  control={form.control}
                  name="travelPurpose"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Travel Purpose*</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-wrap gap-4"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="conferences" />
                            </FormControl>
                            <FormLabel className="font-normal">Conference</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="training" />
                            </FormControl>
                            <FormLabel className="font-normal">Training</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="client_visit" />
                            </FormControl>
                            <FormLabel className="font-normal">Client Visit</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="other" />
                            </FormControl>
                            <FormLabel className="font-normal">Other</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="travelComments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comments (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Add any additional details about your travel..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">📅 Step 2: Travel Duration</h2>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isSameDayTravel"
                checked={isSameDayTravel}
                onCheckedChange={(checked) => {
                  form.setValue('isSameDayTravel', checked as boolean);
                  if (checked && fromDate) {
                    form.setValue('toDate', fromDate);
                  }
                }}
              />
              <label
                htmlFor="isSameDayTravel"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Is it same-day travel?
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fromDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>From Date*</FormLabel>
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
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="toDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>To Date*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={isSameDayTravel}
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
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < (fromDate || new Date())
                          }
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="departureTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departure Time*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="time"
                          className="pl-8"
                          {...field}
                        />
                        <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="returnTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Return Time*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="time"
                          className="pl-8"
                          {...field}
                        />
                        <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">🗺️ Step 3: Location Info</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="text"
                          className="pl-8"
                          placeholder="Enter ZIP code"
                          {...field}
                        />
                        <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="multipleZipCodes"
                checked={hasMultipleZipCodes}
                onCheckedChange={(checked) => setHasMultipleZipCodes(checked as boolean)}
              />
              <label
                htmlFor="multipleZipCodes"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Multiple Destination Zip Codes?
              </label>
            </div>

            {hasMultipleZipCodes && (
              <Alert>
                <AlertDescription>
                  ⚠️ Per diem calculation must be done manually.
                </AlertDescription>
              </Alert>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">🍽️ Step 4: Meals</h2>
            
            <FormField
              control={form.control}
              name="mealsProvided"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Were meals included in your travel?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <h3 className="font-medium">GSA Meal Rates:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Total: <span className="font-semibold">$74.00</span></div>
                <div>Breakfast: <span className="font-semibold">$18.00</span></div>
                <div>Lunch: <span className="font-semibold">$20.00</span></div>
                <div>Dinner: <span className="font-semibold">$31.00</span></div>
              </div>
            </div>

            {form.watch('mealsProvided') === 'yes' && fromDate && form.watch('toDate') && (
              <div className="space-y-4">
                <h3 className="font-medium">Which meals were provided per day?</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-center">Breakfast</th>
                        <th className="px-4 py-2 text-center">Lunch</th>
                        <th className="px-4 py-2 text-center">Dinner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* We'll implement the actual meal selection logic later */}
                      <tr className="border-t">
                        <td className="px-4 py-2">April 1, 2025</td>
                        <td className="px-4 py-2 text-center"><Checkbox /></td>
                        <td className="px-4 py-2 text-center"><Checkbox /></td>
                        <td className="px-4 py-2 text-center"><Checkbox /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="allMeals" />
                  <label
                    htmlFor="allMeals"
                    className="text-sm font-medium leading-none"
                  >
                    All meals were provided for all days
                  </label>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-2xl p-0 bg-white flex flex-col"
      >
        <SheetHeader className="p-6 pb-2">
          <SheetTitle className="flex items-center gap-2 animate-fade-in text-xl">
            Create New Expense
          </SheetTitle>
          <SheetDescription className="animate-fade-in">
            Let's gather some basic information about your expense.
          </SheetDescription>
        </SheetHeader>
        
        <Progress value={progressValue} className="mx-6" />
        
        <div className="flex-1 overflow-auto">
          <div className="p-6 flex gap-6">
            <div className="hidden lg:block">
              <ProgressIndicator step={step} />
            </div>
            
            <div className="flex-1">
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  {renderStep()}
                  
                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => step > 1 && setStep(step - 1)}
                      disabled={step === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        if (step < 4) {
                          setStep(step + 1);
                        } else {
                          form.handleSubmit(handleSubmit)();
                        }
                      }}
                    >
                      {step < 4 ? 'Next' : 'Create Expense'}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateExpenseV2;
