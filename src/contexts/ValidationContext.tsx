
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { PolicyViolation } from '@/components/Expenses/ExpenseForm/types';

interface ValidationContextType {
  programmaticErrors: {field: string, error: string}[];
  llmWarnings: string[];
  showValidationWarnings: boolean;
  activeField: string | null;
  setProgrammaticErrors: React.Dispatch<React.SetStateAction<{field: string, error: string}[]>>;
  setLlmWarnings: React.Dispatch<React.SetStateAction<string[]>>;
  setShowValidationWarnings: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveField: React.Dispatch<React.SetStateAction<string | null>>;
  policyViolations: PolicyViolation[];
}

const ValidationContext = createContext<ValidationContextType | undefined>(undefined);

export const ValidationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [programmaticErrors, setProgrammaticErrors] = useState<{field: string, error: string}[]>([
    {field: 'Amount', error: 'Amount exceeds the $500 limit for meals without approval'},
    {field: 'Merchant Name', error: 'Merchant name is required'}
  ]);
  
  const [llmWarnings, setLlmWarnings] = useState<string[]>([
    'Receipt image appears to be for a personal expense, not a business expense',
    'This meal expense occurs on a weekend - please confirm it was for business purposes',
    'Consider using a corporate card for this expense type'
  ]);
  
  const [showValidationWarnings, setShowValidationWarnings] = useState<boolean>(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const policyViolations = [
    ...programmaticErrors.map((error, index) => ({
      id: `error-${index}`,
      lineNumber: index + 1,
      lineTitle: `Error in ${error.field}`,
      expenseType: 'Business Meal',
      violationType: 'error' as const,
      message: error.error,
      category: 'Validation'
    })),
    ...llmWarnings.map((warning, index) => ({
      id: `warning-${index}`,
      lineNumber: index + 2,
      lineTitle: `Policy Warning`,
      expenseType: 'Business Expense',
      violationType: 'warning' as const,
      message: warning,
      category: 'Policy'
    }))
  ];

  return (
    <ValidationContext.Provider 
      value={{ 
        programmaticErrors,
        llmWarnings,
        showValidationWarnings,
        activeField,
        setProgrammaticErrors,
        setLlmWarnings,
        setShowValidationWarnings,
        setActiveField,
        policyViolations
      }}
    >
      {children}
    </ValidationContext.Provider>
  );
};

export const useValidation = () => {
  const context = useContext(ValidationContext);
  if (context === undefined) {
    throw new Error('useValidation must be used within a ValidationProvider');
  }
  return context;
};
