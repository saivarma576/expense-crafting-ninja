import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Meal } from '@/components/Expenses/CreateExpense/types';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalculationDetailsTableProps {
  dateRange: Date[];
  perDiemRate: number;
  providedMeals: Record<string, Meal[]>;
  mealRates: {
    breakfast: number;
    lunch: number;
    dinner: number;
  };
  checkInTime: string;
  checkOutTime: string;
}

const POLICY_RANGES = [
  { maxHours: 3, percentage: 12.5, text: "0 to 3 hours" },
  { maxHours: 6, percentage: 25, text: "Greater than 3 hours to 6 hours" },
  { maxHours: 9, percentage: 37.5, text: "Greater than 6 hours to 9 hours" },
  { maxHours: 12, percentage: 50, text: "Greater than 9 hours to 12 hours" },
  { maxHours: 15, percentage: 62.5, text: "Greater than 12 hours to 15 hours" },
  { maxHours: 18, percentage: 75, text: "Greater than 15 hours to 18 hours" },
  { maxHours: 21, percentage: 87.5, text: "Greater than 18 hours to 21 hours" },
  { maxHours: 24, percentage: 100, text: "Greater than 21 hours to 24 hours" },
];

const getTimePercentage = (hours: number): number => {
  const range = POLICY_RANGES.find(range => hours <= range.maxHours);
  return range ? range.percentage : 100;
};

const formatCurrency = (amount: number) => {
  const prefix = amount < 0 ? '-$' : '$';
  return `${prefix}${Math.abs(amount).toFixed(2)}`;
};

const CalculationDetailsTable: React.FC<CalculationDetailsTableProps> = ({
  dateRange,
  perDiemRate,
  providedMeals,
  mealRates,
  checkInTime,
  checkOutTime,
}) => {
  const calculateDayDetails = (date: Date, index: number) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const isFirstDay = index === 0;
    const isLastDay = index === dateRange.length - 1;
    
    let hours = 24;
    let timeRange = "Full Day";
    
    if (isFirstDay) {
      const [startHour, startMin] = checkInTime.split(':').map(Number);
      hours = 24 - (startHour + startMin/60);
      timeRange = `${checkInTime}–11:59 PM`;
    } else if (isLastDay) {
      const [endHour, endMin] = checkOutTime.split(':').map(Number);
      hours = endHour + endMin/60;
      timeRange = `12:00 AM–${checkOutTime}`;
    }
    
    const percentage = getTimePercentage(hours);
    const dayMeals = providedMeals[dateStr] || [];
    
    const mealDeductions = {
      breakfast: dayMeals.includes('breakfast') ? mealRates.breakfast : 0,
      lunch: dayMeals.includes('lunch') ? mealRates.lunch : 0,
      dinner: dayMeals.includes('dinner') ? mealRates.dinner : 0
    };
    
    const totalDeduction = mealDeductions.breakfast + mealDeductions.lunch + mealDeductions.dinner;
    const baseAmount = perDiemRate * (percentage / 100);
    const finalAmount = baseAmount - totalDeduction;
    
    const providedMealsText = dayMeals.length > 0
      ? dayMeals.map(meal => `${meal.charAt(0).toUpperCase() + meal.slice(1)} ($${mealRates[meal]})`).join(', ')
      : 'None';
    
    const formula = `(${formatCurrency(perDiemRate)} × ${percentage}%) ${totalDeduction > 0 ? `− ${formatCurrency(totalDeduction)}` : ''} = ${formatCurrency(finalAmount)}`;
    
    const policyRange = POLICY_RANGES.find(range => hours <= range.maxHours);
    const policyTooltip = policyRange ? `${policyRange.text} (${hours.toFixed(1)}h = ${policyRange.percentage}%)` : '';

    return {
      date: format(date, 'MMM dd'),
      duration: `${hours.toFixed(1)} hrs (${timeRange})`,
      percentage,
      baseRate: perDiemRate,
      mealsProvided: providedMealsText,
      mealDeduction: totalDeduction,
      finalAmount,
      formula,
      policyTooltip
    };
  };

  const details = dateRange.map((date, index) => calculateDayDetails(date, index));
  const totals = details.reduce((acc, day) => ({
    mealDeduction: acc.mealDeduction + day.mealDeduction,
    finalAmount: acc.finalAmount + day.finalAmount
  }), { mealDeduction: 0, finalAmount: 0 });

  return (
    <div className="rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[900px] table-fixed">
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-28">Date</TableHead>
              <TableHead className="w-40">Duration</TableHead>
              <TableHead className="w-28">
                <div className="flex items-center gap-1">
                  % Applied
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="p-4 max-w-[300px]">
                        <div className="space-y-2">
                          {POLICY_RANGES.map((range, index) => (
                            <p key={index} className="text-sm">
                              {range.text} - {range.percentage}%
                            </p>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
              <TableHead className="w-28">Base Rate</TableHead>
              <TableHead className="w-56">Meals Provided</TableHead>
              <TableHead className="w-32">Meal Deduction</TableHead>
              <TableHead className="w-60">Formula</TableHead>
              <TableHead className="w-32 sticky right-0 bg-muted/50 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                Final Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {details.map((day, index) => (
              <TableRow key={index} className="odd:bg-muted/20">
                <TableCell>{day.date}</TableCell>
                <TableCell>{day.duration}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="text-left">
                        {day.percentage}%
                      </TooltipTrigger>
                      <TooltipContent>{day.policyTooltip}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>{formatCurrency(day.baseRate)}</TableCell>
                <TableCell>{day.mealsProvided}</TableCell>
                <TableCell className={cn(day.mealDeduction < 0 && "text-red-500")}>
                  {formatCurrency(day.mealDeduction)}
                </TableCell>
                <TableCell className="font-mono text-xs">{day.formula}</TableCell>
                <TableCell className={cn(
                  "sticky right-0 bg-white font-medium shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]",
                  day.finalAmount < 0 && "text-red-500"
                )}>
                  {formatCurrency(day.finalAmount)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/50 font-medium">
              <TableCell colSpan={5}>TOTAL</TableCell>
              <TableCell className={cn(totals.mealDeduction < 0 && "text-red-500")}>
                {formatCurrency(totals.mealDeduction)}
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell className={cn(
                "sticky right-0 bg-muted/50 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]",
                totals.finalAmount < 0 && "text-red-500"
              )}>
                {formatCurrency(totals.finalAmount)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CalculationDetailsTable;
