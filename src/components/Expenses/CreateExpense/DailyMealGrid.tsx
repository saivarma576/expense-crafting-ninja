import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { Meal } from './types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { STANDARD_RATES } from '@/components/Expenses/ExpenseFieldUtils';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DailyMealGridProps {
  startDate?: Date;
  endDate?: Date;
  selectedMeals: Meal[];
  dailyMeals: Record<string, Meal[]>;
  onDailyMealChange: (date: string, meal: Meal) => void;
}

const DailyMealGrid: React.FC<DailyMealGridProps> = ({
  startDate,
  endDate,
  selectedMeals,
  dailyMeals,
  onDailyMealChange
}) => {
  const dateRange = useMemo(() => {
    if (!startDate || !endDate) return [];
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }, [startDate, endDate]);

  const [showCalculation, setShowCalculation] = React.useState(false);

  if (!startDate || !endDate || dateRange.length === 0) return null;

  const getMealDeduction = (date: Date, meal: Meal): number => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const mealsForDate = dailyMeals[dateStr] || selectedMeals;
    if (mealsForDate.includes(meal)) {
      switch (meal) {
        case 'breakfast':
          return STANDARD_RATES.BREAKFAST;
        case 'lunch':
          return STANDARD_RATES.LUNCH;
        case 'dinner':
          return STANDARD_RATES.DINNER;
        default:
          return 0;
      }
    }
    return 0;
  };

  const calculateDailyAllowance = (date: Date, index: number): number => {
    const isFirstDay = index === 0;
    const isLastDay = index === dateRange.length - 1;
    const fullRate = STANDARD_RATES.MEALS_RATE;

    let percentage = 100;
    if (isFirstDay) percentage = 100;
    if (isLastDay) percentage = 25;

    const baseAmount = fullRate * (percentage / 100);

    if (percentage === 100) {
      const dateStr = format(date, 'yyyy-MM-dd');
      const mealsForDate = dailyMeals[dateStr] || selectedMeals;
      let deduction = 0;
      if (mealsForDate.includes('breakfast')) deduction += 18;
      if (mealsForDate.includes('lunch')) deduction += 20;
      if (mealsForDate.includes('dinner')) deduction += 31;
      return Math.max(0, baseAmount - deduction);
    }
    return baseAmount;
  };

  const totalPerDiem = dateRange.reduce((sum, date, index) => sum + calculateDailyAllowance(date, index), 0);

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 bg-gray-50 border-b text-sm font-medium">
          <div className="p-2 border-r">Date</div>
          <div className="p-2 border-r text-center">🍳 Breakfast</div>
          <div className="p-2 border-r text-center">🥗 Lunch</div>
          <div className="p-2 text-center">🍽️ Dinner</div>
        </div>
        <div className="max-h-[200px] overflow-y-auto">
          {dateRange.map((date, index) => {
            const dateStr = format(date, 'yyyy-MM-dd');
            const mealsForDate = dailyMeals[dateStr] || selectedMeals;
            return (
              <div key={dateStr} className="grid grid-cols-4 border-b last:border-b-0">
                <div className="p-2 border-r text-sm">
                  {format(date, 'dd-MMM-yy')}
                </div>
                {['breakfast', 'lunch', 'dinner'].map((meal, index) => (
                  <div key={meal} className={`p-2 ${index < 2 ? 'border-r' : ''} flex justify-center`}>
                    <Checkbox checked={mealsForDate.includes(meal as Meal)} onCheckedChange={() => onDailyMealChange(dateStr, meal as Meal)} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {showCalculation && (
        <div className="mt-4 border rounded-lg p-4">
          <h4 className="text-sm font-medium mb-3">Per Diem Calculation Preview</h4>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Base Rate</TableHead>
                <TableHead>Provided Meals</TableHead>
                <TableHead className="text-right">Eligible Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dateRange.map((date, index) => {
                const dateStr = format(date, 'yyyy-MM-dd');
                const mealsForDate = dailyMeals[dateStr] || selectedMeals;
                const isFirstDay = index === 0;
                const isLastDay = index === dateRange.length - 1;
                const baseRate = STANDARD_RATES.MEALS_RATE;
                const eligibleAmount = calculateDailyAllowance(date, index);
                return (
                  <TableRow key={dateStr}>
                    <TableCell>
                      {format(date, 'MM/dd/yyyy')}
                      {isFirstDay && " (Arrival)"}
                      {isLastDay && " (Departure)"}
                    </TableCell>
                    <TableCell>
                      ${baseRate.toFixed(2)}
                      {isLastDay && " × 25%"}
                    </TableCell>
                    <TableCell>
                      {mealsForDate.length > 0 ? (
                        <div className="text-xs text-red-500">
                          {mealsForDate.includes('breakfast') && <div>- Breakfast: -$18.00</div>}
                          {mealsForDate.includes('lunch') && <div>- Lunch: -$20.00</div>}
                          {mealsForDate.includes('dinner') && <div>- Dinner: -$31.00</div>}
                        </div>
                      ) : "None"}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${eligibleAmount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="mt-4 pt-2 border-t flex justify-between">
            <span>Total Eligible Per Diem:</span>
            <span className="font-medium">${totalPerDiem.toFixed(2)}</span>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <h5 className="font-medium mb-1">Meal Breakdown</h5>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Breakfast:</span>
                  <span>$18.00 (24.3%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Lunch:</span>
                  <span>$20.00 (27.0%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Dinner:</span>
                  <span>$31.00 (41.9%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Incidentals:</span>
                  <span>$5.00 (6.8%)</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-1">Partial Day Rates</h5>
              <div className="space-y-1">
                <div>0-3 hours: 12.5% (${(STANDARD_RATES.MEALS_RATE * 0.125).toFixed(2)})</div>
                <div>3-6 hours: 25% (${(STANDARD_RATES.MEALS_RATE * 0.25).toFixed(2)})</div>
                <div>6-9 hours: 37.5% (${(STANDARD_RATES.MEALS_RATE * 0.375).toFixed(2)})</div>
                <div>9-12 hours: 50% (${(STANDARD_RATES.MEALS_RATE * 0.5).toFixed(2)})</div>
                <div>12+ hours: 75%-100%</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyMealGrid;
