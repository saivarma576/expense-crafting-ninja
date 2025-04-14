
import { ExpenseType } from '@/types/expense';

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

export interface FieldGroupProps {
  values: ExpenseLineItemFormData;
  onChange: (id: string, value: any) => void;
  llmSuggestions?: Record<string, string | null>;
}

export interface MileageFieldsProps extends FieldGroupProps {
  error?: string | null;
}

export interface FormProps {
  onSave: (item: ExpenseLineItemFormData) => void;
  onCancel: () => void;
  editingItem?: Partial<ExpenseLineItemFormData>;
}
