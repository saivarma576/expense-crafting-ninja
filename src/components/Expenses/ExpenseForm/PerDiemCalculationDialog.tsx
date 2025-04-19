import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import TotalSummaryCard from './PerDiem/TotalSummaryCard';
import ActionButtons from './PerDiem/ActionButtons';
import { format, addDays, differenceInHours } from 'date-fns';
import { 
  Button 
} from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Meal } from '@/components/Expenses/CreateExpense/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CalendarDays, Clock, Download, Info, MapPin, RefreshCw } from 'lucide-react';
import MealCalculationTable from './MealCalculationTable';
import CalculationDetailsTable from './PerDiem/CalculationDetailsTable';
import { cn } from '@/lib/utils';
import FormulasDisplay from './PerDiem/FormulasDisplay';

interface PerDiemCalculationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
  initialValues?: {
    zipCode?: string;
    city?: string;
    date?: string;
    throughDate?: string;
    departureTime?: string;
    returnTime?: string;
    mealsProvided?: string;
    meals?: Meal[];
    mealsRate?: number;
  };
}

interface TimeInfo {
  hours: number;
  text: string;
  percent: number;
}

interface DailyMealData {
  date: Date;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

const DEFAULT_RATES = {
  breakfast: 18,
  lunch: 20,
  dinner: 31,
  incidentals: 5,
  mealsRate: 74,
};

const timePercentages: TimeInfo[] = [
  { hours: 3, text: "0 to 3 hours", percent: 12.5 },
  { hours: 6, text: "Greater than 3 hours to 6 hours", percent: 25 },
  { hours: 9, text: "Greater than 6 hours to 9 hours", percent: 37.5 },
  { hours: 12, text: "Greater than 9 hours to 12 hours", percent: 50 },
  { hours: 15, text: "Greater than 12 hours to 15 hours", percent: 62.5 },
  { hours: 18, text: "Greater than 15 hours to 18 hours", percent: 75 },
  { hours: 21, text: "Greater than 18 hours to 21 hours", percent: 87.5 },
  { hours: 24, text: "Greater than 21 hours to 24 hours", percent: 100 },
];

const PerDiemCalculationDialog: React.FC<PerDiemCalculationDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialValues
}) => {
  const [zipCode, setZipCode] = useState(initialValues?.zipCode || '');
  const [city, setCity] = useState(initialValues?.city || '');
  const [checkInDate, setCheckInDate] = useState<Date>(initialValues?.date ? new Date(initialValues.date) : new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date>(initialValues?.throughDate ? new Date(initialValues.throughDate) : addDays(new Date(), 1));
  const [checkInTime, setCheckInTime] = useState(initialValues?.departureTime || '13:00');
  const [checkOutTime, setCheckOutTime] = useState(initialValues?.returnTime || '19:00');
  const [areMealsProvided, setAreMealsProvided] = useState(initialValues?.mealsProvided === 'yes');
  const [perDiemRate, setPerDiemRate] = useState(initialValues?.mealsRate || DEFAULT_RATES.mealsRate);
  const [justification, setJustification] = useState('');
  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isMealOpen, setIsMealOpen] = useState(false);

  const [dailyMeals, setDailyMeals] = useState<DailyMealData[]>(() => {
    const result: DailyMealData[] = [];
    const initialMeals = initialValues?.meals || [];
    
    let currentDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    
    while (currentDate <= endDate) {
      const dateString = format(currentDate, 'yyyy-MM-dd');
      
      result.push({
        date: new Date(currentDate),
        breakfast: initialMeals.includes('breakfast'),
        lunch: initialMeals.includes('lunch'),
        dinner: initialMeals.includes('dinner')
      });
      
      currentDate = addDays(currentDate, 1);
    }
    
    return result;
  });

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setZipCode(value);
    
    if (value.length === 5) {
      setCity('Chicago');
      setPerDiemRate(74);
    }
  };

  const handleMealToggle = (index: number, meal: 'breakfast' | 'lunch' | 'dinner') => {
    setDailyMeals(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [meal]: !updated[index][meal]
      };
      return updated;
    });
  };

  const handleSave = () => {
    const providedMeals: Record<string, Meal[]> = {};
    
    dailyMeals.forEach(day => {
      const dateStr = format(day.date, 'yyyy-MM-dd');
      const meals: Meal[] = [];
      
      if (day.breakfast) meals.push('breakfast');
      if (day.lunch) meals.push('lunch');
      if (day.dinner) meals.push('dinner');
      
      providedMeals[dateStr] = meals;
    });
    
    onSave({
      zipCode,
      city,
      date: format(checkInDate, 'yyyy-MM-dd'),
      throughDate: format(checkOutDate, 'yyyy-MM-dd'),
      departureTime: checkInTime,
      returnTime: checkOutTime,
      mealsProvided: areMealsProvided ? 'yes' : 'no',
      providedMeals,
      mealsRate: perDiemRate,
      justification
    });
    
    onClose();
  };

  const generateDateRange = (): Date[] => {
    const dates: Date[] = [];
    let currentDate = new Date(checkInDate);
    
    while (currentDate <= checkOutDate) {
      dates.push(new Date(currentDate));
      currentDate = addDays(currentDate, 1);
    }
    
    return dates;
  };

  const handleDownloadPDF = () => {
    alert('PDF download functionality would be implemented here');
  };

  const calculateTotal = () => {
    return dailyMeals.reduce((total, day) => {
      const rate = DEFAULT_RATES;
      return total + (day.breakfast ? rate.breakfast : 0) + (day.lunch ? rate.lunch : 0) + (day.dinner ? rate.dinner : 0);
    }, 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <span>🧾</span> Per Diem Calculation Summary
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <TotalSummaryCard
            total={calculateTotal()}
            startDate={checkInDate}
            endDate={checkOutDate}
            location={city}
            zipCode={zipCode}
          />

          <FormulasDisplay
            perDiemRate={perDiemRate}
            breakfastRate={DEFAULT_RATES.breakfast}
            lunchRate={DEFAULT_RATES.lunch}
            dinnerRate={DEFAULT_RATES.dinner}
          />

          <CalculationDetailsTable
            dateRange={generateDateRange()}
            perDiemRate={perDiemRate}
            providedMeals={generateDateRange().reduce((acc, date) => {
              const dateStr = format(date, 'yyyy-MM-dd');
              const dayMeals = dailyMeals.find(d => format(d.date, 'yyyy-MM-dd') === dateStr);
              acc[dateStr] = [];
              if (dayMeals) {
                if (dayMeals.breakfast) acc[dateStr].push('breakfast');
                if (dayMeals.lunch) acc[dateStr].push('lunch');
                if (dayMeals.dinner) acc[dateStr].push('dinner');
              }
              return acc;
            }, {} as Record<string, Meal[]>)}
            mealRates={{
              breakfast: DEFAULT_RATES.breakfast,
              lunch: DEFAULT_RATES.lunch,
              dinner: DEFAULT_RATES.dinner
            }}
            checkInTime={checkInTime}
            checkOutTime={checkOutTime}
          />

          <Collapsible 
            open={isLocationOpen} 
            onOpenChange={setIsLocationOpen}
            className="border rounded-lg overflow-hidden"
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between p-4 bg-gray-50">
              <span className="text-base font-medium">✅ Location Information</span>
              <span>{isLocationOpen ? '−' : '+'}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zipCode" className="text-sm font-medium">
                    Zip Code
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="zipCode"
                      type="text"
                      value={zipCode}
                      onChange={handleZipCodeChange}
                      placeholder="Enter zip code"
                      className="pl-8"
                    />
                    <MapPin className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Rates are automatically fetched based on location
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="city" className="text-sm font-medium">
                    Location
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    value={city}
                    readOnly
                    className="mt-1 bg-gray-50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="perDiemRate" className="text-sm font-medium">
                    Per Diem Rate
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="perDiemRate"
                      type="number"
                      value={perDiemRate}
                      onChange={(e) => setPerDiemRate(parseFloat(e.target.value) || 0)}
                      className="pl-6"
                    />
                    <span className="absolute left-2 top-2.5 text-gray-600">$</span>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible 
            open={isTimeOpen} 
            onOpenChange={setIsTimeOpen}
            className="border rounded-lg overflow-hidden"
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between p-4 bg-gray-50">
              <span className="text-base font-medium">⏱️ Travel Dates & Times</span>
              <span>{isTimeOpen ? '−' : '+'}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checkInDate" className="text-sm font-medium">
                    Check-in Date
                  </Label>
                  <div className="relative mt-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left font-normal pl-8"
                        >
                          <CalendarDays className="w-4 h-4 absolute left-2" />
                          {format(checkInDate, 'MMM dd, yyyy')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          onSelect={(date) => date && setCheckInDate(date)}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="checkInTime" className="text-sm font-medium">
                    Check-in Time
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="checkInTime"
                      type="time"
                      value={checkInTime}
                      onChange={(e) => setCheckInTime(e.target.value)}
                      className="pl-8"
                    />
                    <Clock className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="checkOutDate" className="text-sm font-medium">
                    Check-out Date
                  </Label>
                  <div className="relative mt-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left font-normal pl-8"
                        >
                          <CalendarDays className="w-4 h-4 absolute left-2" />
                          {format(checkOutDate, 'MMM dd, yyyy')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          onSelect={(date) => date && setCheckOutDate(date)}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="checkOutTime" className="text-sm font-medium">
                    Check-out Time
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="checkOutTime"
                      type="time"
                      value={checkOutTime}
                      onChange={(e) => setCheckOutTime(e.target.value)}
                      className="pl-8"
                    />
                    <Clock className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible 
            open={isMealOpen} 
            onOpenChange={setIsMealOpen}
            className="border rounded-lg overflow-hidden"
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between p-4 bg-gray-50">
              <span className="text-base font-medium">🍽️ Provided Meals</span>
              <span>{isMealOpen ? '−' : '+'}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="mealsProvided" 
                  checked={areMealsProvided}
                  onCheckedChange={setAreMealsProvided}
                />
                <Label htmlFor="mealsProvided">Were any meals provided during your trip?</Label>
              </div>
              
              {areMealsProvided && (
                <Card className="border border-gray-200 shadow-sm mt-4">
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-base">Select provided meals by date</CardTitle>
                    <CardDescription>Check all meals that were provided during your trip</CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="border rounded-md overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-1/4">Date</TableHead>
                            <TableHead className="text-center">
                              <span className="flex justify-center items-center gap-1">
                                🍳 Breakfast
                                <span className="text-xs text-gray-500">(${DEFAULT_RATES.breakfast})</span>
                              </span>
                            </TableHead>
                            <TableHead className="text-center">
                              <span className="flex justify-center items-center gap-1">
                                🥗 Lunch
                                <span className="text-xs text-gray-500">(${DEFAULT_RATES.lunch})</span>
                              </span>
                            </TableHead>
                            <TableHead className="text-center">
                              <span className="flex justify-center items-center gap-1">
                                🍽️ Dinner
                                <span className="text-xs text-gray-500">(${DEFAULT_RATES.dinner})</span>
                              </span>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dailyMeals.map((day, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                {format(day.date, 'MM/dd/yyyy')}
                              </TableCell>
                              <TableCell className="text-center">
                                <Checkbox 
                                  checked={day.breakfast}
                                  onCheckedChange={() => handleMealToggle(index, 'breakfast')}
                                  className="mx-auto"
                                />
                              </TableCell>
                              <TableCell className="text-center">
                                <Checkbox 
                                  checked={day.lunch}
                                  onCheckedChange={() => handleMealToggle(index, 'lunch')}
                                  className="mx-auto"
                                />
                              </TableCell>
                              <TableCell className="text-center">
                                <Checkbox 
                                  checked={day.dinner}
                                  onCheckedChange={() => handleMealToggle(index, 'dinner')}
                                  className="mx-auto"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CollapsibleContent>
          </Collapsible>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-2 text-sm text-gray-600">
                <Info className="h-4 w-4" />
                View Policy Breakdown
              </TooltipTrigger>
              <TooltipContent side="right" className="w-80 p-4">
                <h4 className="font-medium mb-2">Per Diem Policy Breakdown</h4>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead>Duration</TableHead>
                        <TableHead className="text-right">% Allowance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timePercentages.map((time, index) => (
                        <TableRow key={index}>
                          <TableCell>{time.text}</TableCell>
                          <TableCell className="text-right">{time.percent}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="space-y-2">
            <Label htmlFor="justification" className="flex items-center gap-2 text-sm font-medium">
              <span>📝</span> Add Note or Justification
            </Label>
            <Textarea
              id="justification"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Optional: Add any notes or justification about your meal expenses..."
              className="min-h-[80px]"
            />
          </div>

          <ActionButtons
            onSave={handleSave}
            onClose={onClose}
            onDownloadPDF={handleDownloadPDF}
            onRecalculate={() => {
              console.log('Recalculating...');
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PerDiemCalculationDialog;
