
import React from 'react';
import { AlertTriangle, AlertCircle, Zap, Check, ArrowRight } from 'lucide-react';
import PolicyViolationsModal from './PolicyViolationsModal';

export interface PolicyViolation {
  id: string;
  lineNumber: number;
  lineTitle: string;
  expenseType: string;
  violationType: 'error' | 'warning';
  message: string;
  category: string;
}

interface ValidationWarningsProps {
  programmaticErrors: { field: string, error: string }[];
  llmWarnings: string[];
  onClose: () => void;
  onProceed: () => void;
  open: boolean;
}

const ValidationWarnings: React.FC<ValidationWarningsProps> = ({ 
  programmaticErrors, 
  llmWarnings, 
  onClose, 
  onProceed,
  open
}) => {
  const hasErrors = programmaticErrors.length > 0;
  
  // Convert our programmatic errors and LLM warnings to PolicyViolation format
  const violations: PolicyViolation[] = [
    ...programmaticErrors.map((error, index) => ({
      id: `error-${index}`,
      lineNumber: index + 1,
      lineTitle: error.field,
      expenseType: 'Required Field',
      violationType: 'error' as const,
      message: error.error,
      category: 'Required Fields'
    })),
    ...llmWarnings.map((warning, index) => ({
      id: `warning-${index}`,
      lineNumber: index + 1,
      lineTitle: warning.includes('meal') ? 'Meal Expense' : 
                warning.includes('receipt') ? 'Receipt' : 
                warning.includes('hotel') ? 'Hotel Expense' : 'General',
      expenseType: warning.includes('meal') ? 'Meals' : 
                  warning.includes('hotel') ? 'Lodging' : 
                  warning.includes('receipt') ? 'Documentation' : 'Policy',
      violationType: 'warning' as const,
      message: warning,
      category: warning.includes('meal') ? 'Meals' : 
              warning.includes('hotel') ? 'Lodging' : 
              warning.includes('receipt') ? 'Documentation' : 'Policy'
    }))
  ];

  const handleReviewItem = (violationId: string) => {
    // Add logic here to highlight the specific field
    onClose();
  };
  
  return (
    <PolicyViolationsModal
      open={open}
      onClose={onClose}
      onReviewAndFix={handleReviewItem}
      onContinueAnyway={onProceed}
      violations={violations}
    />
  );
};

export default ValidationWarnings;
