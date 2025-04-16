
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { PolicyViolation } from '@/components/Expenses/ExpenseForm/types';

interface ValidationContextType {
  programmaticErrors: {field: string, error: string}[];
  llmWarnings: string[];
  fieldValidations: Record<string, {error?: string, warning?: string}>;
  showValidationWarnings: boolean;
  activeField: string | null;
  setProgrammaticErrors: React.Dispatch<React.SetStateAction<{field: string, error: string}[]>>;
  setLlmWarnings: React.Dispatch<React.SetStateAction<string[]>>;
  setFieldValidations: React.Dispatch<React.SetStateAction<Record<string, {error?: string, warning?: string}>>>;
  setShowValidationWarnings: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveField: React.Dispatch<React.SetStateAction<string | null>>;
  policyViolations: PolicyViolation[];
  validateFieldsRealtime: (fieldValues: Record<string, any>) => void;
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
  
  const [fieldValidations, setFieldValidations] = useState<Record<string, {error?: string, warning?: string}>>({
    amount: { error: 'Amount exceeds the $500 limit for meals without approval' },
    merchantName: { error: 'Merchant name is required' },
    receipt: { warning: 'Receipt image appears to be for a personal expense' },
    glAccount: { warning: 'This GL account may not be appropriate for this expense type' }
  });
  
  const [showValidationWarnings, setShowValidationWarnings] = useState<boolean>(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  // Function to validate fields in real-time as users type
  const validateFieldsRealtime = (fieldValues: Record<string, any>) => {
    const newValidations: Record<string, {error?: string, warning?: string}> = {};
    
    // Check amount
    if (fieldValues.amount && fieldValues.amount > 500 && fieldValues.type === 'meals') {
      newValidations.amount = { warning: 'Amount exceeds the standard meal allowance' };
    }
    
    // Check merchant name
    if (fieldValues.merchantName === '') {
      newValidations.merchantName = { error: 'Merchant name is required' };
    }
    
    // Check GL account format
    if (fieldValues.glAccount && !/^\d{8}$/.test(fieldValues.glAccount)) {
      newValidations.glAccount = { error: 'GL Account must be 8 digits' };
    }
    
    // Update validations that changed
    setFieldValidations(prev => ({
      ...prev,
      ...newValidations
    }));
  };

  const policyViolations = [
    ...programmaticErrors.map((error, index) => ({
      id: `error-${index}`,
      lineNumber: index + 1,
      lineTitle: `Error in ${error.field}`,
      expenseType: 'Business Meal',
      violationType: 'error' as const,
      message: error.error,
      category: 'Validation',
      fieldId: error.field.toLowerCase().replace(' ', '')
    })),
    ...llmWarnings.map((warning, index) => ({
      id: `warning-${index}`,
      lineNumber: index + 2,
      lineTitle: `Policy Warning`,
      expenseType: 'Business Expense',
      violationType: 'warning' as const,
      message: warning,
      category: 'Policy',
      fieldId: warning.toLowerCase().includes('receipt') ? 'receipt' : 
               warning.toLowerCase().includes('meal') ? 'amount' : 
               warning.toLowerCase().includes('gl account') ? 'glAccount' : 'notes'
    }))
  ];

  return (
    <ValidationContext.Provider 
      value={{ 
        programmaticErrors,
        llmWarnings,
        fieldValidations,
        showValidationWarnings,
        activeField,
        setProgrammaticErrors,
        setLlmWarnings,
        setFieldValidations,
        setShowValidationWarnings,
        setActiveField,
        policyViolations,
        validateFieldsRealtime
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
