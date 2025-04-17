
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useExpenseForm } from '@/hooks/useExpenseForm';
import { useExpenseValidation } from '@/hooks/useExpenseValidation';
import ExpenseFormLayout from './ExpenseForm/ExpenseFormLayout';
import ReceiptPreview from './ReceiptPreview';
import { FormProps } from './ExpenseForm/types';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
    receiptUrl,
    receiptName,
  } = useExpenseForm({
    editingItem,
    onOcrDataExtracted: (data) => {
      toast.success('Receipt data processed successfully');
    }
  });

  const {
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
    <div className="flex flex-col min-h-screen">
      {/* Main Form Content */}
      <div className="flex-1 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <ExpenseFormLayout 
            formValues={formValues}
            onChange={handleFieldChange}
            fieldErrors={fieldErrors}
            llmSuggestions={llmSuggestions}
          />

          <div className="md:w-[35%]">
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
      </div>

      {/* Action Buttons - Sticky Footer */}
      <div className="border-t bg-white py-4 px-6">
        <div className="max-w-[1200px] mx-auto flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="px-6 flex items-center gap-2"
          >
            Save
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseLineItem;
