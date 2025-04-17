
import React, { useState } from 'react';
import { useExpenseForm } from '@/hooks/useExpenseForm';
import { useExpenseValidation } from '@/hooks/useExpenseValidation';
import { FormProps } from './ExpenseForm/types';
import { Button } from '@/components/ui/button';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import FormActions from './ExpenseForm/FormActions';
import ExpenseTypes from './ExpenseForm/ExpenseTypes';
import ExpenseFormLayout from './ExpenseForm/ExpenseFormLayout';
import ReceiptPreview from './ReceiptPreview';

const ExpenseLineItem: React.FC<FormProps> = ({ 
  onSave, 
  onCancel,
  editingItem,
  activeField
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [llmSuggestions, setLlmSuggestions] = useState<Record<string, string | null>>({});
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);

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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="border-b bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-lg font-medium text-gray-800">Add Expense Item</h1>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto p-6">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <ExpenseTypes
              selectedType={formValues.type}
              onTypeChange={(type) => handleFieldChange('type', type)}
            />
            
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-[65%] space-y-6">
                <ExpenseFormLayout 
                  formValues={formValues}
                  onChange={handleFieldChange}
                  fieldErrors={fieldErrors}
                  llmSuggestions={llmSuggestions}
                />
              </div>
              
              <div className="lg:w-[35%]">
                <div className="bg-white rounded-lg border">
                  <div className="p-3 border-b flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">Receipt Preview</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
                    >
                      {isPreviewExpanded ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
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
                    expanded={isPreviewExpanded}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FormActions
        onSave={handleSave}
        onCancel={onCancel}
        programmaticErrors={validationWarnings.programmaticErrors}
        llmWarnings={validationWarnings.llmWarnings}
      />
    </div>
  );
};

export default ExpenseLineItem;
