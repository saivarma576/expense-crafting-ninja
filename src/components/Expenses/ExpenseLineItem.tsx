
import React, { useState } from 'react';
import { toast } from 'sonner';
import { X, Calendar, DollarSign, Store, FileText, ArrowRight, AlertTriangle, AlertCircle } from 'lucide-react';
import { useExpenseForm } from '@/hooks/useExpenseForm';
import { useExpenseValidation } from '@/hooks/useExpenseValidation';
import ExpenseFormLayout from './ExpenseForm/ExpenseFormLayout';
import ReceiptPreview from './ReceiptPreview';
import { FormProps } from './ExpenseForm/types';
import { Button } from '@/components/ui/button';
import FormActions from './ExpenseForm/FormActions';
import ExpenseTypeTabs from './ExpenseForm/ExpenseTypeTabs';

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
  let pageTitle = "Add Expense Item";
  if (editingItem) {
    pageTitle = "Edit Expense Item";
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header with Close Button */}
      <div className="border-b bg-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-medium">{pageTitle}</h1>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-6 py-5">
          {/* Expense Type Tabs */}
          <ExpenseTypeTabs
            selectedType={formValues.type}
            onTypeChange={(type) => handleFieldChange('type', type)}
          />
          
          {/* Main Form Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column: Form Fields */}
            <div className="md:w-[65%]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ExpenseFormLayout 
                  formValues={formValues}
                  onChange={handleFieldChange}
                  fieldErrors={fieldErrors}
                  llmSuggestions={llmSuggestions}
                />
              </div>
            </div>
            
            {/* Right Column: Receipt Preview */}
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
            <div className="mt-8 space-y-4">
              {validationWarnings.programmaticErrors.length > 0 && (
                <div className="border border-red-200 rounded-md overflow-hidden">
                  <div className="p-3 bg-red-50 border-b border-red-200">
                    <h3 className="text-sm font-medium text-red-800 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                      Issues to resolve:
                    </h3>
                  </div>
                  <div className="p-3">
                    <ul className="space-y-2">
                      {validationWarnings.programmaticErrors.map((error, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-red-600">
                          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                          <div>
                            <span className="font-medium">{error.field}:</span> {error.error}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {validationWarnings.llmWarnings.length > 0 && (
                <div className="border border-amber-200 rounded-md overflow-hidden">
                  <div className="p-3 bg-amber-50 border-b border-amber-200">
                    <h3 className="text-sm font-medium text-amber-800 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                      Recommendations:
                    </h3>
                  </div>
                  <div className="p-3">
                    <ul className="space-y-2">
                      {validationWarnings.llmWarnings.map((warning, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-amber-600">
                          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons - Sticky Footer */}
      <div className="border-t bg-white py-4 px-6 sticky bottom-0">
        <div className="max-w-[1200px] mx-auto flex justify-between gap-3">
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
