
import { useState, useEffect } from 'react';
import { ExpenseLineItemFormData } from '@/types/expense';
import { getAllValidations } from '@/utils/validationUtils';

export const useExpenseValidation = (formValues: ExpenseLineItemFormData) => {
  const [validationWarnings, setValidationWarnings] = useState<{
    programmaticErrors: {field: string, error: string}[];
    llmWarnings: string[];
  }>({ programmaticErrors: [], llmWarnings: [] });
  const [showValidationWarnings, setShowValidationWarnings] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({});

  const runValidation = () => {
    const validations = getAllValidations(formValues);
    setValidationWarnings({
      programmaticErrors: validations.programmaticErrors,
      llmWarnings: validations.llmWarnings
    });
    return !validations.hasErrors;
  };

  const validateForm = (): boolean => {
    const isValid = runValidation();
    
    if (validationWarnings.programmaticErrors.length > 0 || validationWarnings.llmWarnings.length > 0) {
      setShowValidationWarnings(true);
      return isValid;
    }
    
    return true;
  };

  useEffect(() => {
    runValidation();
  }, [formValues]);

  return {
    validationWarnings,
    showValidationWarnings,
    setShowValidationWarnings,
    fieldErrors,
    setFieldErrors,
    validateForm
  };
};
