
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Clock, MapPin, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { FieldGroupProps } from './types';
import FieldValidationIndicator from './FieldValidationIndicator';
import { format, addDays } from 'date-fns';
import { Meal } from '@/components/Expenses/CreateExpense/types';
import PerDiemCalculationDialog from './PerDiemCalculationDialog';
import { ScrollArea } from "@/components/ui/scroll-area";
import CalculationDetailsTable from './PerDiem/CalculationDetailsTable';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const MealsFields: React.FC<FieldGroupProps> = ({ 
  values, 
  onChange,
  llmSuggestions = {}
}) => {
  const [showCalculation, setShowCalculation] = useState(false);
  const [showPerDiemDialog, setShowPerDiemDialog] = useState(false);
  
  // Format date objects from strings if they exist
  const checkInDate = values.date ? new Date(values.date) : new Date();
  const checkOutDate = values.throughDate ? new Date(values.throughDate) : addDays(checkInDate, 1);
  
  // Initialize empty provided meals
  const providedMeals: Record<string, Meal[]> = {
    [format(checkInDate, 'yyyy-MM-dd')]: [],
    [format(checkOutDate, 'yyyy-MM-dd')]: [],
  };

  const handleDateChange = (field: 'date' | 'throughDate', date: Date | undefined) => {
    if (date) {
      onChange(field, format(date, 'yyyy-MM-dd'));
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Meal Details</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="zipCode" className="text-xs font-medium text-gray-700">
            Location Zip Code
          </Label>
          <div className="relative">
            <Input
              id="zipCode"
              value={values.zipCode || ''}
              onChange={(e) => onChange('zipCode', e.target.value)}
              placeholder="Enter zip code"
              className={`h-8 px-2 py-1 text-sm pl-7 ${llmSuggestions.zipCode ? 'border-amber-300 pr-8' : ''}`}
            />
            <MapPin className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
            <FieldValidationIndicator llmSuggestion={llmSuggestions.zipCode} />
          </div>
        </div>

        <div>
          <Label htmlFor="city" className="text-xs font-medium text-gray-700">
            City
          </Label>
          <div className="relative">
            <Input
              id="city"
              value={values.city || ''}
              onChange={(e) => onChange('city', e.target.value)}
              placeholder="City"
              className="h-8 px-2 py-1 text-sm pl-7"
              readOnly
            />
            <MapPin className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <Label htmlFor="checkInDate" className="text-xs font-medium text-gray-700">
            Check-in Date
          </Label>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="checkInDate"
                  variant={"outline"}
                  className={cn(
                    "w-full h-8 px-2 py-1 text-sm pl-7 justify-start text-left font-normal",
                    !values.date && "text-muted-foreground"
                  )}
                >
                  {values.date ? (
                    format(new Date(values.date), "MMM dd, yyyy")
                  ) : (
                    <span>Select date</span>
                  )}
                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={values.date ? new Date(values.date) : undefined}
                  onSelect={(date) => handleDateChange('date', date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <Label htmlFor="checkOutDate" className="text-xs font-medium text-gray-700">
            Check-out Date
          </Label>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="checkOutDate"
                  variant={"outline"}
                  className={cn(
                    "w-full h-8 px-2 py-1 text-sm pl-7 justify-start text-left font-normal",
                    !values.throughDate && "text-muted-foreground"
                  )}
                >
                  {values.throughDate ? (
                    format(new Date(values.throughDate), "MMM dd, yyyy")
                  ) : (
                    <span>Select date</span>
                  )}
                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={values.throughDate ? new Date(values.throughDate) : undefined}
                  onSelect={(date) => handleDateChange('throughDate', date)}
                  initialFocus
                  disabled={(date) => values.date ? date < new Date(values.date) : false}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <Label htmlFor="checkInTime" className="text-xs font-medium text-gray-700">
            Check-in Time
          </Label>
          <div className="relative">
            <Input
              id="checkInTime"
              type="time"
              value={values.departureTime || ''}
              onChange={(e) => onChange('departureTime', e.target.value)}
              className={`h-8 px-2 py-1 text-sm pl-7 ${llmSuggestions.departureTime ? 'border-amber-300 pr-8' : ''}`}
            />
            <Clock className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
            <FieldValidationIndicator llmSuggestion={llmSuggestions.departureTime} />
          </div>
        </div>

        <div>
          <Label htmlFor="checkOutTime" className="text-xs font-medium text-gray-700">
            Check-out Time
          </Label>
          <div className="relative">
            <Input
              id="checkOutTime"
              type="time"
              value={values.returnTime || ''}
              onChange={(e) => onChange('returnTime', e.target.value)}
              className={`h-8 px-2 py-1 text-sm pl-7 ${llmSuggestions.returnTime ? 'border-amber-300 pr-8' : ''}`}
            />
            <Clock className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
            <FieldValidationIndicator llmSuggestion={llmSuggestions.returnTime} />
          </div>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="mealsRate" className="text-xs font-medium text-gray-700">
            Standard Meal Rate
          </Label>
          <div className="relative">
            <Input
              id="mealsRate"
              type="number"
              step="0.01"
              value={values.mealsRate || ''}
              onChange={(e) => onChange('mealsRate', parseFloat(e.target.value) || 0)}
              placeholder="Daily rate"
              className="h-8 px-2 py-1 text-sm pl-7"
            />
            <span className="absolute left-2 top-2 text-gray-400 text-sm">$</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">Per diem rate for this location</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => setShowCalculation(!showCalculation)}
        >
          {showCalculation ? 'Hide' : 'Show'} Per Diem Calculation
        </Button>

        <Button 
          type="button" 
          variant="secondary" 
          size="sm"
          onClick={() => setShowPerDiemDialog(true)}
          className="bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
        >
          Advanced Per Diem Calculator
        </Button>
      </div>

      {showCalculation && (
        <div className="border rounded-md">
          <ScrollArea className="h-[400px]">
            <div className="p-4">
              <CalculationDetailsTable
                dateRange={[checkInDate, checkOutDate]}
                perDiemRate={values.mealsRate || 80}
                providedMeals={providedMeals}
                mealRates={{
                  breakfast: 18,
                  lunch: 20,
                  dinner: 31
                }}
                checkInTime={values.departureTime || '13:00'}
                checkOutTime={values.returnTime || '19:00'}
              />
            </div>
          </ScrollArea>
        </div>
      )}

      <PerDiemCalculationDialog
        isOpen={showPerDiemDialog}
        onClose={() => setShowPerDiemDialog(false)}
        onSave={(data) => {
          Object.entries(data).forEach(([key, value]) => {
            onChange(key, value);
          });
          setShowPerDiemDialog(false);
        }}
        initialValues={values}
      />
    </div>
  );
};

export default MealsFields;
