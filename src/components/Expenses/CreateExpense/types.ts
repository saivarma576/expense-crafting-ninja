
import { ExpenseType } from '@/types/expense';

export type TravelPurpose = "conferences" | "meeting" | "others";
export type Meal = "breakfast" | "lunch" | "dinner";

export interface FormValues {
  isBusinessTravel: string;
  fromDate?: Date;
  toDate?: Date;
  travelPurpose?: TravelPurpose;
  travelComments?: string;
  mealsProvided: string;
  meals: Meal[];
  expenseTitle: string;
}
