import { ExpenseLineItemFormData } from '@/types/expense';

export interface PolicyComment {
  id: string;
  comment: string;
  user: string;
  timestamp: Date;
}

export interface PolicyViolation {
  id: string;
  field: string;
  message: string;
  severity: 'error' | 'warning';
  category: 'receipt' | 'travel' | 'transportation' | 'lodging' | 'meals' | 'general';
  comments: PolicyComment[];
}

export const validateExpensePolicy = (expense: ExpenseLineItemFormData): PolicyViolation[] => {
  const violations: PolicyViolation[] = [];
  
  // Receipt Validations
  if (!expense.receiptUrl && !['mileage'].includes(expense.type)) {
    violations.push({
      id: 'receipt-missing',
      field: 'receipt',
      message: 'Itemized receipt is required for all expenses except mileage.',
      severity: 'error',
      category: 'receipt',
      comments: []
    });
  }

  // Business Purpose Validation
  if (!expense.description || expense.description.length < 10) {
    violations.push({
      id: 'business-purpose',
      field: 'description',
      message: 'A clear business purpose must be provided in the description.',
      severity: 'error',
      category: 'general',
      comments: []
    });
  }

  // Amount and Tips Validation
  if (expense.type === 'meals' || expense.type === 'business_meals') {
    // Check for potential alcohol
    if (expense.amount > 50 && (!expense.notes || !expense.notes.includes('no alcohol'))) {
      violations.push({
        id: 'alcohol-check',
        field: 'notes',
        message: 'For meal expenses over $50, please confirm no alcohol was included.',
        severity: 'warning',
        category: 'meals',
        comments: []
      });
    }

    // Excessive tip warning
    const tipThreshold = expense.amount * 0.25; // 25% threshold for warning
    if (expense.notes?.toLowerCase().includes('tip') && Number(expense.notes.match(/\d+/)?.[0]) > tipThreshold) {
      violations.push({
        id: 'excessive-tip',
        field: 'amount',
        message: 'Tips exceeding 20% may require additional approval.',
        severity: 'warning',
        category: 'meals',
        comments: []
      });
    }
  }

  // Lodging Validations
  if (expense.type === 'hotel') {
    if (!expense.zipCode) {
      violations.push({
        id: 'lodging-location',
        field: 'zipCode',
        message: 'ZIP code is required to verify distance and rate compliance.',
        severity: 'error',
        category: 'lodging',
        comments: []
      });
    }

    if (expense.amount > 350) {
      violations.push({
        id: 'lodging-rate',
        field: 'amount',
        message: 'Amount exceeds standard lodging rate. Justification required.',
        severity: 'warning',
        category: 'lodging',
        comments: []
      });
    }
  }

  // Transportation Validations
  if (expense.type === 'mileage') {
    if (!expense.notes?.toLowerCase().includes('commute')) {
      violations.push({
        id: 'mileage-commute',
        field: 'notes',
        message: 'Confirm this mileage excludes normal commute distance.',
        severity: 'warning',
        category: 'transportation',
        comments: []
      });
    }
  }

  // Date Validations
  const submissionDate = new Date();
  const expenseDate = new Date(expense.date);
  const daysDifference = Math.floor((submissionDate.getTime() - expenseDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDifference > 60) {
    violations.push({
      id: 'late-submission',
      field: 'date',
      message: 'Expenses submitted after 60 days may be treated as taxable income.',
      severity: 'error',
      category: 'general',
      comments: []
    });
  }

  return violations;
};
