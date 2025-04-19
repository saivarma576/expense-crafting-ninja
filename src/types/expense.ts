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
  merchantName?: string;
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
  | 'mileage'
  | 'meals'
  | 'other'
  | 'professional_fees'
  | 'hotel'
  | 'parking'
  | 'transport'
  | 'business_meals'
  | 'registration'
  | 'baggage'
  | 'subscriptions'
  | 'postage'
  | 'gasoline'
  | 'office_supplies'
  | 'rental'
  | 'auditing';

export interface ExpenseLineItemFormData {
  id: string;
  type: ExpenseType;
  amount: number;
  date: string;
  description: string;
  receiptUrl: string;
  receiptName: string;
  merchantName: string;
  account: string;
  accountName: string;
  costCenter: string;
  costCenterName: string;
  wbs: string;
  notes: string;
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
