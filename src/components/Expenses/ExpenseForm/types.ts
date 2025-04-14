
import { ExpenseType } from '@/types/expense';

export interface ExpenseLineItemFormData {
  id: string;
  type: ExpenseType;
  amount: number;
  date: string;
  description: string;
  receiptUrl?: string;
  receiptName?: string;
  account?: string;
  accountName?: string;
  costCenter?: string;
  costCenterName?: string;
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

export interface FormProps {
  onSave: (lineItem: ExpenseLineItemFormData) => void;
  onCancel: () => void;
  editingItem?: ExpenseLineItemFormData;
}

export interface FieldGroupProps {
  values: Record<string, any>;
  onChange: (id: string, value: any) => void;
}
