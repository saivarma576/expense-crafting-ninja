
export interface PolicyComment {
  id: string;
  comment: string;
  user: string;
  timestamp: Date;
  type?: 'user' | 'system' | 'bot' | 'approver';
}

export interface PolicyViolation {
  id: string;
  field: string;
  message: string;
  severity: 'error' | 'warning';
  status: 'violation' | 'exception' | 'approved';
  comments?: PolicyComment[];
  lineNumber: number;
  lineTitle: string;
  expenseType: string;
  violationType: 'error' | 'warning';
  category: string;
}

import { ExpenseLineItemFormData } from '@/types/expense';

/**
 * Validates expense data against company policies
 * @param expense The expense data to validate
 * @returns Array of policy violations
 */
export const validateExpensePolicy = (expense: ExpenseLineItemFormData): PolicyViolation[] => {
  const violations: PolicyViolation[] = [];
  
  // Check for expense amount policy violations
  if (expense.amount > 5000) {
    violations.push({
      id: `policy-${Date.now()}-1`,
      field: 'Amount',
      message: 'Expense exceeds the $5,000 threshold for standard approval',
      severity: 'error',
      status: 'violation',
      lineNumber: 1,
      lineTitle: 'Amount Limit',
      expenseType: expense.type || 'general',
      violationType: 'error',
      category: 'Spending Limit'
    });
  } else if (expense.amount > 1000) {
    violations.push({
      id: `policy-${Date.now()}-2`,
      field: 'Amount',
      message: 'Expense exceeds the $1,000 threshold and requires manager approval',
      severity: 'warning',
      status: 'violation',
      lineNumber: 2,
      lineTitle: 'Amount Approval',
      expenseType: expense.type || 'general',
      violationType: 'warning',
      category: 'Approval Required'
    });
  }
  
  // Check for meals policy violations
  if (expense.type === 'meals' && expense.amount > 80) {
    violations.push({
      id: `policy-${Date.now()}-3`,
      field: 'Meals',
      message: 'Meal expense exceeds the $80 per day limit',
      severity: 'warning',
      status: 'violation',
      lineNumber: 3,
      lineTitle: 'Meal Limit',
      expenseType: 'meals',
      violationType: 'warning',
      category: 'Per Diem Limit',
      comments: [
        {
          id: `comment-${Date.now()}-1`,
          comment: 'This policy ensures compliance with IRS regulations for per diem expenses.',
          user: 'System',
          timestamp: new Date(),
          type: 'system'
        }
      ]
    });
  }
  
  // Check for lodging policy violations
  if (expense.type === 'hotel' && expense.amount > 300) {
    violations.push({
      id: `policy-${Date.now()}-4`,
      field: 'Lodging',
      message: 'Hotel rate exceeds the maximum allowed rate of $300 per night',
      severity: 'warning',
      status: 'violation',
      lineNumber: 4,
      lineTitle: 'Hotel Rate',
      expenseType: 'hotel',
      violationType: 'warning',
      category: 'Lodging Limit'
    });
  }
  
  // Check for receipt policy violations
  if (expense.amount > 75 && (!expense.receiptUrl || expense.receiptUrl.trim() === '')) {
    violations.push({
      id: `policy-${Date.now()}-5`,
      field: 'Receipt',
      message: 'Receipt is required for expenses over $75',
      severity: 'error',
      status: 'violation',
      lineNumber: 5,
      lineTitle: 'Missing Receipt',
      expenseType: expense.type || 'general',
      violationType: 'error',
      category: 'Documentation'
    });
  }
  
  // Check for date policy violations
  const expenseDate = new Date(expense.date);
  const today = new Date();
  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(today.getDate() - 60);
  
  if (expenseDate < sixtyDaysAgo) {
    violations.push({
      id: `policy-${Date.now()}-6`,
      field: 'Date',
      message: 'Expense is older than 60 days and requires special approval',
      severity: 'error',
      status: 'violation',
      lineNumber: 6,
      lineTitle: 'Expense Age',
      expenseType: expense.type || 'general',
      violationType: 'error',
      category: 'Timing Policy',
      comments: [
        {
          id: `comment-${Date.now()}-2`,
          comment: 'Our policy requires all expenses to be submitted within 60 days of the expense date.',
          user: 'System',
          timestamp: new Date(),
          type: 'system'
        }
      ]
    });
  }
  
  // Check for merchant name policy violations
  if (!expense.merchantName || expense.merchantName.trim() === '') {
    violations.push({
      id: `policy-${Date.now()}-7`,
      field: 'Merchant',
      message: 'Merchant name is required for all expenses',
      severity: 'warning',
      status: 'violation',
      lineNumber: 7,
      lineTitle: 'Missing Merchant',
      expenseType: expense.type || 'general',
      violationType: 'warning',
      category: 'Documentation'
    });
  }
  
  // Check for description policy violations
  if (!expense.description || expense.description.trim().length < 10) {
    violations.push({
      id: `policy-${Date.now()}-8`,
      field: 'Description',
      message: 'Description must be at least 10 characters long',
      severity: 'warning',
      status: 'violation',
      lineNumber: 8,
      lineTitle: 'Description Length',
      expenseType: expense.type || 'general',
      violationType: 'warning',
      category: 'Documentation'
    });
  }
  
  return violations;
};
