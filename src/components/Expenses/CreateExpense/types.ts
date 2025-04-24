
export type TravelPurpose = "conferences" | "training" | "client_visit" | "other" | "meeting";
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
  isSameDayTravel: boolean;
  zipCode?: string;
  city?: string;
  departureTime?: string;
  returnTime?: string;
}
