
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import { Meal } from '@/components/Expenses/CreateExpense/types';

export interface DailyMealAllowance {
  date: Date;
  perDiemRate: number;
  breakfast: number;
  lunch: number;
  dinner: number;
  incidentals: number;
  providedMeals: Meal[];
  eligibleAmount: number;
  percentage: number;
}

export interface MealCalculationProps {
  checkInDate: Date;
  checkInTime: string;
  checkOutDate: Date;
  checkOutTime: string;
  perDiemRate: number;
  breakfastRate: number;
  lunchRate: number;
  dinnerRate: number;
  incidentalsRate: number;
  providedMeals: Record<string, Meal[]>;
}

const getHoursPercentage = (hours: number): { percent: number; text: string } => {
  if (hours <= 3) return { percent: 12.5, text: "0 to 3 hours – 12.5%" };
  if (hours <= 6) return { percent: 25, text: "Greater than 3 hours to 6 hours – 25%" };
  if (hours <= 9) return { percent: 37.5, text: "Greater than 6 hours to 9 hours – 37.5%" };
  if (hours <= 12) return { percent: 50, text: "Greater than 9 hours to 12 hours – 50%" };
  if (hours <= 15) return { percent: 62.5, text: "Greater than 12 hours to 15 hours – 62.5%" };
  if (hours <= 18) return { percent: 75, text: "Greater than 15 hours to 18 hours – 75%" };
  if (hours <= 21) return { percent: 87.5, text: "Greater than 18 hours to 21 hours – 87.5%" };
  return { percent: 100, text: "Greater than 21 hours to 24 hours – 100%" };
};

const MealCalculationTable: React.FC<MealCalculationProps> = ({
  checkInDate,
  checkInTime,
  checkOutDate,
  checkOutTime,
  perDiemRate,
  breakfastRate,
  lunchRate,
  dinnerRate,
  incidentalsRate,
  providedMeals
}) => {
  // Generate an array of dates between check-in and check-out
  const dateRange: Date[] = [];
  const currentDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);
  
  while (currentDate <= endDate) {
    dateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Calculate daily allowances
  const dailyAllowances: DailyMealAllowance[] = dateRange.map((date, index) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayProvidedMeals = providedMeals[dateStr] || [];
    
    // Determine if it's a partial day (first or last day)
    const isFirstDay = index === 0;
    const isLastDay = index === dateRange.length - 1;
    
    let percentage = 100;
    
    // Calculate hours for partial days
    if (isFirstDay || isLastDay) {
      const timeStr = isFirstDay ? checkInTime : checkOutTime;
      const [hours, minutes] = timeStr.split(':').map(Number);
      
      // For simplicity, we'll calculate based on a fixed period
      // In a real app, you would calculate the actual hours
      const hoursInDay = isFirstDay 
        ? 24 - (hours + minutes/60) 
        : (hours + minutes/60);
      
      const percentInfo = getHoursPercentage(hoursInDay);
      percentage = percentInfo.percent;
    }
    
    // Calculate deductions for provided meals (only for full days)
    let deductBreakfast = 0;
    let deductLunch = 0;
    let deductDinner = 0;
    
    if (percentage === 100) {
      deductBreakfast = dayProvidedMeals.includes('breakfast') ? breakfastRate : 0;
      deductLunch = dayProvidedMeals.includes('lunch') ? lunchRate : 0;
      deductDinner = dayProvidedMeals.includes('dinner') ? dinnerRate : 0;
    }
    
    // Calculate eligible amount
    const dailyRate = perDiemRate * (percentage / 100);
    const eligibleAmount = Math.max(0, dailyRate - deductBreakfast - deductLunch - deductDinner);
    
    return {
      date,
      perDiemRate,
      breakfast: deductBreakfast,
      lunch: deductLunch,
      dinner: deductDinner,
      incidentals: incidentalsRate,
      providedMeals: dayProvidedMeals,
      eligibleAmount,
      percentage
    };
  });

  // Calculate totals
  const totalEligible = dailyAllowances.reduce((sum, day) => sum + day.eligibleAmount, 0);
  const totalBreakfastDeduction = dailyAllowances.reduce((sum, day) => sum + day.breakfast, 0);
  const totalLunchDeduction = dailyAllowances.reduce((sum, day) => sum + day.lunch, 0);
  const totalDinnerDeduction = dailyAllowances.reduce((sum, day) => sum + day.dinner, 0);

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium">Per Diem Calculation</h3>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Details</TableHead>
              {dailyAllowances.map((day, i) => (
                <TableHead key={i} className="text-center">
                  Day {i + 1}<br />
                  <span className="text-xs font-normal">
                    {format(day.date, 'MM/dd/yyyy')}
                  </span>
                </TableHead>
              ))}
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">${perDiemRate.toFixed(2)}</div>
                <div className="text-xs text-gray-500">per diem rate</div>
              </TableCell>
              {dailyAllowances.map((day, i) => (
                <TableCell key={i} className="text-center">
                  ${(day.perDiemRate * day.percentage / 100).toFixed(2)}
                </TableCell>
              ))}
              <TableCell className="text-right font-medium">
                ${(perDiemRate * dailyAllowances.length).toFixed(2)}
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell>
                <div className="font-medium">${breakfastRate.toFixed(2)}</div>
                <div className="text-xs text-gray-500">Breakfast</div>
              </TableCell>
              {dailyAllowances.map((day, i) => (
                <TableCell key={i} className="text-center">
                  {day.breakfast > 0 ? (
                    <span className="text-red-500">(${day.breakfast.toFixed(2)})</span>
                  ) : '$0.00'}
                </TableCell>
              ))}
              <TableCell className="text-right font-medium text-red-500">
                (${totalBreakfastDeduction.toFixed(2)})
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell>
                <div className="font-medium">${lunchRate.toFixed(2)}</div>
                <div className="text-xs text-gray-500">Lunch</div>
              </TableCell>
              {dailyAllowances.map((day, i) => (
                <TableCell key={i} className="text-center">
                  {day.lunch > 0 ? (
                    <span className="text-red-500">(${day.lunch.toFixed(2)})</span>
                  ) : '$0.00'}
                </TableCell>
              ))}
              <TableCell className="text-right font-medium text-red-500">
                (${totalLunchDeduction.toFixed(2)})
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell>
                <div className="font-medium">${dinnerRate.toFixed(2)}</div>
                <div className="text-xs text-gray-500">Dinner</div>
              </TableCell>
              {dailyAllowances.map((day, i) => (
                <TableCell key={i} className="text-center">
                  {day.dinner > 0 ? (
                    <span className="text-red-500">(${day.dinner.toFixed(2)})</span>
                  ) : '$0.00'}
                </TableCell>
              ))}
              <TableCell className="text-right font-medium text-red-500">
                (${totalDinnerDeduction.toFixed(2)})
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell>
                <div className="font-medium">${incidentalsRate.toFixed(2)}</div>
                <div className="text-xs text-gray-500">Incidentals</div>
              </TableCell>
              {dailyAllowances.map((day, i) => (
                <TableCell key={i} className="text-center">$0.00</TableCell>
              ))}
              <TableCell className="text-right font-medium">$0.00</TableCell>
            </TableRow>
            
            <TableRow className="bg-gray-50">
              <TableCell className="font-medium">Daily Total</TableCell>
              {dailyAllowances.map((day, i) => (
                <TableCell key={i} className="text-center font-medium">
                  ${day.eligibleAmount.toFixed(2)}
                </TableCell>
              ))}
              <TableCell className="text-right font-medium">
                ${totalEligible.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg bg-gray-50">
          <h4 className="text-sm font-medium mb-2">Reimbursement Summary</h4>
          <div className="flex justify-between items-center">
            <span>Total Eligible Amount:</span>
            <span className="font-medium">${totalEligible.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
            <span>Total Provided Meals Deduction:</span>
            <span>(${(totalBreakfastDeduction + totalLunchDeduction + totalDinnerDeduction).toFixed(2)})</span>
          </div>
        </div>
        
        <div className="p-4 border rounded-lg bg-gray-50">
          <h4 className="text-sm font-medium mb-2">Partial Day Calculations</h4>
          <div className="text-xs space-y-1">
            <p>0 to 3 hours – 12.5% of Max. Daily Allowance</p>
            <p>Greater than 3 hours to 6 hours – 25% of Max. Daily Allowance</p>
            <p>Greater than 6 hours to 9 hours – 37.5% of Max. Daily Allowance</p>
            <p>Greater than 9 hours to 12 hours – 50% of Max. Daily Allowance</p>
            <p>Greater than 12 hours to 15 hours – 62.5% of Max. Daily Allowance</p>
            <p>Greater than 15 hours to 18 hours – 75% of Max. Daily Allowance</p>
            <p>Greater than 18 hours to 21 hours – 87.5% of Max. Daily Allowance</p>
            <p>Greater than 21 hours to 24 hours – 100% of Max. Daily Allowance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCalculationTable;
