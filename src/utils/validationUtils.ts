
import { ExpenseLineItemFormData } from '@/components/Expenses/ExpenseForm/types';
import { toast } from 'sonner';

// Programmatic validations (displayed at field level)
export const validateField = (field: string, value: any): string | null => {
  switch (field) {
    case 'amount':
      if (value <= 0) return 'Amount must be greater than zero';
      if (value > 10000) return 'Amounts over $10,000 require additional approval';
      return null;
      
    case 'merchantName':
      if (!value || value.trim().length < 2) return 'Please enter merchant name';
      return null;
      
    case 'date':
      if (!value) return 'Date is required';
      const expenseDate = new Date(value);
      const today = new Date();
      const sixtyDaysAgo = new Date();
      sixtyDaysAgo.setDate(today.getDate() - 60);
      
      if (expenseDate > today) return 'Future-dated expenses are not allowed';
      if (expenseDate < sixtyDaysAgo) return 'Expenses over 60 days old require special approval';
      return null;
      
    case 'miles':
      if (value <= 0) return 'Miles must be greater than zero';
      if (value > 1000) return 'Mileage claims over 1,000 miles require documentation';
      return null;
      
    case 'glAccount':
      if (!value || !/^\d{8}$/.test(value)) return 'GL Account must be 8 digits';
      return null;
      
    default:
      return null;
  }
};

// LLM-based validations (displayed on form submit)
export const performLLMValidation = (expense: ExpenseLineItemFormData): string[] => {
  const warnings = [];
  
  // Receipt warnings
  if (!expense.receiptUrl && expense.type !== 'mileage') {
    warnings.push('Receipt missing. Please upload a receipt or bank statement for this expense.');
  }
  
  // Transport warnings
  if (expense.type === 'transport') {
    if (expense.amount > 500) {
      warnings.push('High transportation cost detected. Consider more cost-effective options for future travel.');
    }
  }
  
  // Lodging warnings
  if (expense.type === 'hotel') {
    const standardRate = 159; // From STANDARD_RATES
    if (expense.amount > standardRate && (!expense.perDiemExplanation || expense.perDiemExplanation.length < 10)) {
      warnings.push(`Lodging cost exceeds standard rate of $${standardRate}. Please provide a detailed explanation.`);
    }
  }
  
  // Meals warnings
  if (expense.type === 'meals') {
    const standardRate = 80; // From STANDARD_RATES
    if (expense.amount > standardRate) {
      warnings.push(`Meal expense exceeds daily per diem of $${standardRate}. Please check if alcohol or excessive tips are included.`);
    }
  }
  
  // Approval warnings
  const expenseDate = new Date(expense.date);
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  if (expenseDate < thirtyDaysAgo) {
    warnings.push('This expense is over 30 days old. Submit promptly to comply with the 60-day rule.');
  }
  
  return warnings;
};

// Display programmatic validation errors
export const showFieldError = (error: string) => {
  toast.error(error, {
    duration: 3000,
    position: 'bottom-center'
  });
};

// Display LLM-based warnings
export const showLLMWarnings = (warnings: string[]) => {
  if (warnings.length === 0) return;
  
  // Show warning toast with first warning
  toast.warning(warnings[0], {
    duration: 5000,
    position: 'top-center',
    description: `${warnings.length} policy considerations detected`
  });
  
  // Log all warnings to console for reference
  console.log('Policy considerations:', warnings);
};
