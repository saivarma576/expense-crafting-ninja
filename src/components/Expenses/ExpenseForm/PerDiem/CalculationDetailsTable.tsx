
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Meal } from '@/components/Expenses/CreateExpense/types';
import { Info } from 'lucide-react';

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

const getTimePercentage = (hours: number): number => {
  if (hours <= 3) return 12.5;
  if (hours <= 6) return 25;
  if (hours <= 9) return 37.5;
  if (hours <= 12) return 50;
  if (hours <= 15) return 62.5;
  if (hours <= 18) return 75;
  if (hours <= 21) return 87.5;
  return 100;
};

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

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
    
    // Calculate duration percentage
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
    
    // Calculate meal deductions
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
    
    return {
      date: format(date, 'MMM dd'),
      duration: `${hours} hrs (${timeRange})`,
      percentage: `${percentage}%`,
      baseRate: formatCurrency(perDiemRate),
      mealsProvided: providedMealsText,
      mealDeduction: formatCurrency(totalDeduction),
      finalAmount: formatCurrency(finalAmount),
      formula
    };
  };

  const details = dateRange.map((date, index) => calculateDayDetails(date, index));
  const totals = details.reduce((acc, day) => ({
    mealDeduction: acc.mealDeduction + parseFloat(day.mealDeduction.slice(1)),
    finalAmount: acc.finalAmount + parseFloat(day.finalAmount.slice(1))
  }), { mealDeduction: 0, finalAmount: 0 });

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>% Applied</TableHead>
            <TableHead>Base Rate</TableHead>
            <TableHead>Meals Provided</TableHead>
            <TableHead>Meal Deduction</TableHead>
            <TableHead>Final Amount</TableHead>
            <TableHead>
              Formula
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-1 inline-block text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="p-4 max-w-[300px]">
                    <p className="text-sm">
                      Final Amount = (Base Rate × Time %) - Meal Deductions
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {details.map((day, index) => (
            <TableRow key={index}>
              <TableCell>{day.date}</TableCell>
              <TableCell>{day.duration}</TableCell>
              <TableCell>{day.percentage}</TableCell>
              <TableCell>{day.baseRate}</TableCell>
              <TableCell>{day.mealsProvided}</TableCell>
              <TableCell>{day.mealDeduction}</TableCell>
              <TableCell className="font-medium">{day.finalAmount}</TableCell>
              <TableCell className="font-mono text-xs">{day.formula}</TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-muted/50">
            <TableCell>TOTAL</TableCell>
            <TableCell>—</TableCell>
            <TableCell>—</TableCell>
            <TableCell>—</TableCell>
            <TableCell>—</TableCell>
            <TableCell className="font-medium">${totals.mealDeduction.toFixed(2)}</TableCell>
            <TableCell className="font-medium">${totals.finalAmount.toFixed(2)}</TableCell>
            <TableCell>—</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CalculationDetailsTable;
