
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useExpenseForm } from '@/hooks/useExpenseForm';
import { useExpenseValidation } from '@/hooks/useExpenseValidation';
import ExpenseFormLayout from './ExpenseForm/ExpenseFormLayout';
import ReceiptPreview from './ReceiptPreview';
import { FormProps } from './ExpenseForm/types';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ExpenseTypeTabs from './ExpenseForm/ExpenseTypeTabs';
import FormActions from './ExpenseForm/FormActions';

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
    validationWarnings,
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

  // Set page title based on expense type
  let pageTitle = editingItem ? "Edit Expense Item" : "Add Expense Item";
  if (formValues.type) {
    pageTitle = formValues.type.charAt(0).toUpperCase() + formValues.type.slice(1).replace('_', ' ');
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with Close Button */}
      <div className="border-b bg-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-medium">{pageTitle}</h1>
      </div>

      {/* Expense Type Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-[1200px] mx-auto px-6 py-3">
          <ExpenseTypeTabs
            selectedType={formValues.type}
            onTypeChange={(type) => handleFieldChange('type', type)}
          />
        </div>
      </div>

      {/* Main Form Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto">
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

          {/* Validation Messages Section */}
          {(validationWarnings.programmaticErrors.length > 0 || validationWarnings.llmWarnings.length > 0) && (
            <div className="mt-8 border rounded-md overflow-hidden">
              {validationWarnings.programmaticErrors.length > 0 && (
                <div className="p-4 border-b">
                  <h3 className="text-sm font-medium text-red-600 mb-2">Issues to resolve:</h3>
                  <ul className="space-y-2">
                    {validationWarnings.programmaticErrors.map((error, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-red-600">
                        <span className="text-red-500">⚠️</span> 
                        <span><strong>{error.field}:</strong> {error.error}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {validationWarnings.llmWarnings.length > 0 && (
                <div className="p-4">
                  <h3 className="text-sm font-medium text-amber-600 mb-2">Recommendations:</h3>
                  <ul className="space-y-2">
                    {validationWarnings.llmWarnings.map((warning, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-amber-600">
                        <span className="text-amber-500">ℹ️</span> {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
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
            className="px-6 flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
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
