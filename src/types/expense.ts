
export interface ExpenseLineItem {
  id: string;
  title: string;
  type: string;
  category: string;
  date: string;
  amount: number;
  account: string;
  accountName: string;
  costCenter: string;
  costCenterName: string;
  receiptName?: string;
  receiptUrl?: string;
  wbs?: string;
  notes?: string;
  glAccount?: string;
  zipCode?: string;
  city?: string;
  mealsRate?: number;
  hotelRate?: number;
  throughDate?: string;
  perDiemExplanation?: string;
  departureTime?: string;
  returnTime?: string;
  miles?: number;
  mileageRate?: number;
}

export interface ExpenseDocument {
  name: string;
  size: string;
  url?: string;
}

export interface GLAccount {
  id: string;
  code: string;
  name: string;
}

export interface CostCenter {
  id: string;
  code: string;
  name: string;
}

export interface DynamicField {
  id: string;
  label: string;
  type: 'text' | 'date' | 'select' | 'number';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

export type ExpenseType = 
  | 'gasoline'
  | 'hotel'
  | 'meals'
  | 'mileage'
  | 'office_supplies'
  | 'other'
  | 'parking'
  | 'postage'
  | 'professional_fees'
  | 'registration'
  | 'rental'
  | 'transport'
  | 'auditing'
  | 'baggage'
  | 'business_meals'
  | 'subscriptions';

