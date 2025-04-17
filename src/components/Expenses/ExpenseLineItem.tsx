
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useExpenseForm } from '@/hooks/useExpenseForm';
import { useExpenseValidation } from '@/hooks/useExpenseValidation';
import ExpenseFormLayout from './ExpenseForm/ExpenseFormLayout';
import ReceiptPreview from './ReceiptPreview';
import ValidationWarnings from './ExpenseForm/ValidationWarnings';
import { FormProps } from './ExpenseForm/types';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowRight } from 'lucide-react';

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
    <div className="flex flex-col gap-6">
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
      </div>

      {/* Validation Warnings Section */}
      {showValidationWarnings && (
        <div className="mt-4 border rounded-lg overflow-hidden">
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
        </div>
      )}

      {/* Action Buttons - Now sticky at bottom */}
      <div className="sticky bottom-0 bg-white border-t py-4 mt-auto">
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex items-center"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex items-center"
          >
            Save
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseLineItem;
