
import { ExpenseType, ExpenseLineItemFormData } from '@/types/expense';

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

export interface PolicyViolation {
  id: string;
  lineNumber: number;
  lineTitle: string;
  expenseType: string;
  violationType: 'error' | 'warning';
  message: string;
  category: string;
}
