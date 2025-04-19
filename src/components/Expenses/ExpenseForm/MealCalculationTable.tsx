import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import { Meal } from '@/components/Expenses/CreateExpense/types';
import CalculationDetailsTable from './PerDiem/CalculationDetailsTable';

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

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium">Per Diem Calculation</h3>
      
      <CalculationDetailsTable
        dateRange={dateRange}
        perDiemRate={perDiemRate}
        providedMeals={providedMeals}
        mealRates={{
          breakfast: breakfastRate,
          lunch: lunchRate,
          dinner: dinnerRate
        }}
        checkInTime={checkInTime}
        checkOutTime={checkOutTime}
      />
    </div>
  );
};

export default MealCalculationTable;
