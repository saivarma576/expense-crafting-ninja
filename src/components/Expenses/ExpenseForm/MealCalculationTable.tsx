
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import { MealType } from '@/components/Expenses/CreateExpense/types';
import CalculationDetailsTable from './PerDiem/CalculationDetailsTable';

export interface DailyMealAllowance {
  date: Date;
  perDiemRate: number;
  breakfast: number;
  lunch: number;
  dinner: number;
  incidentals: number;
  providedMeals: MealType[];
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
  providedMeals: Record<string, MealType[]>;
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
      <CalculationDetailsTable />
    </div>
  );
};

export default MealCalculationTable;
