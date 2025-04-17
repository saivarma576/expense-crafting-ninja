
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useExpenseForm } from '@/hooks/useExpenseForm';
import { useExpenseValidation } from '@/hooks/useExpenseValidation';
import FormActions from './ExpenseForm/FormActions';
import ExpenseFormLayout from './ExpenseForm/ExpenseFormLayout';
import ReceiptPreview from './ReceiptPreview';
import ValidationWarnings from './ExpenseForm/ValidationWarnings';
import { FormProps } from './ExpenseForm/types';

const ExpenseLineItem: React.FC<FormProps> = ({ 
  onSave, 
  onCancel,
  editingItem,
  activeField
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [llmSuggestions, setLlmSuggestions] = useState<Record<string, string | null>>({});

  const {
    formValues,
    handleFieldChange,
    handleReceiptChange,
    handleOcrDataExtracted,
    dataMismatches,
    showMismatchDialog,
    setShowMismatchDialog,
    receiptUrl,
    receiptName,
  } = useExpenseForm({
    editingItem,
    onOcrDataExtracted: (data) => {
      // Handle OCR data extraction
      toast.success('Receipt data processed successfully');
    }
  });

  const {
    validationWarnings,
    showValidationWarnings,
    setShowValidationWarnings,
    fieldErrors,
    validateForm
  } = useExpenseValidation(formValues);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleReceiptChange(file.name, `receipt-${Date.now()}`);
    }
  };

  const handleSave = () => {
    if (!validateForm()) return;
    onSave(formValues);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <ExpenseFormLayout 
        formValues={formValues}
        onChange={handleFieldChange}
        fieldErrors={fieldErrors}
        llmSuggestions={llmSuggestions}
      />

      <div className="md:w-[35%] h-[500px]">
        <ReceiptPreview 
          receiptUrl={receiptUrl}
          receiptName={receiptName}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          dragActive={dragActive}
          onReceiptChange={handleReceiptChange}
          onOcrDataExtracted={handleOcrDataExtracted}
          currentValues={formValues}
        />
      </div>

      <FormActions 
        onCancel={onCancel} 
        onSave={handleSave} 
        programmaticErrors={validationWarnings.programmaticErrors}
        llmWarnings={validationWarnings.llmWarnings}
      />

      {showValidationWarnings && (
        <ValidationWarnings 
          programmaticErrors={validationWarnings.programmaticErrors}
          llmWarnings={validationWarnings.llmWarnings}
          onClose={() => setShowValidationWarnings(false)}
          onProceed={() => {
            setShowValidationWarnings(false);
            handleSave();
          }}
          open={showValidationWarnings}
        />
      )}
    </div>
  );
};

export default ExpenseLineItem;
