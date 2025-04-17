
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
    
    // Update field-level errors
    const newFieldErrors: Record<string, string | null> = {};
    validations.programmaticErrors.forEach(error => {
      // Convert field names to camelCase for matching with form fields
      const fieldName = error.field.toLowerCase().replace(/ /g, '');
      newFieldErrors[fieldName] = error.error;
    });
    setFieldErrors(newFieldErrors);
    
    return !validations.hasErrors;
  };

  const validateForm = (): boolean => {
    const isValid = runValidation();
    setShowValidationWarnings(true);
    return isValid;
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
