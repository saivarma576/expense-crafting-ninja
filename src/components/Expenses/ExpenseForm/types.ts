
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

export interface PolicyViolation {
  id: string;
  lineNumber: number;
  lineTitle: string;
  expenseType: string;
  violationType: 'error' | 'warning';
  message: string;
  category: string;
}

export interface FieldGroupProps {
  values: ExpenseLineItemFormData;
  onChange: (id: string, value: any) => void;
  llmSuggestions?: Record<string, string | null>;
  programmaticErrors?: Record<string, string | null>;
  activeField?: string | null;
}

export interface MileageFieldsProps extends FieldGroupProps {
  error?: string | null;
}

export interface FormProps {
  onSave: (item: ExpenseLineItemFormData) => void;
  onCancel: () => void;
  editingItem?: Partial<ExpenseLineItemFormData>;
  activeField?: string | null;
}

export interface ValidationResult {
  programmaticErrors: {field: string, error: string}[];
  llmWarnings: string[];
  hasErrors: boolean;
  hasWarnings: boolean;
}
