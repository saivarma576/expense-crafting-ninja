
export type TravelPurpose = "conference" | "training" | "client" | "internal" | "other";
export type MealType = "breakfast" | "lunch" | "dinner";

export interface MealData {
  date: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

export interface FormValues {
  isBusinessTravel: string;
  fromDate?: Date;
  toDate?: Date;
  travelPurpose?: TravelPurpose;
  travelComments?: string;
  mealsProvided: string;
  meals: MealData[];
  expenseTitle: string;
  isSameDayTravel: boolean;
  zipCode?: string;
  city?: string;
  departureTime?: string;
  returnTime?: string;
}
