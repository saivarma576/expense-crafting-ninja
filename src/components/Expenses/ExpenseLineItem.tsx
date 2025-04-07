
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExpenseType } from '@/types/expense';

// Import refactored components
import ExpenseTypeSelector from './ExpenseTypeSelector';
import BasicInfoFields from './BasicInfoFields';
import DynamicFields from './DynamicFields';
import ReceiptUpload from './ReceiptUpload';
import ReceiptPreview from './ReceiptPreview';
import { generateTypeSpecificFields, glAccounts, costCenters } from './ExpenseFieldUtils';

interface ExpenseLineItemProps {
  onSave: (lineItem: ExpenseLineItemType) => void;
  onCancel: () => void;
  editingItem?: ExpenseLineItemType;
}

export interface ExpenseLineItemType {
  id: string;
  type: ExpenseType;
  amount: number;
  date: string;
  description: string;
  receiptUrl?: string;
  receiptName?: string;
  account?: string;
  accountName?: string;
  costCenter?: string;
  costCenterName?: string;
  // Dynamic fields based on expense type
  merchantName?: string;
  location?: string;
  checkInDate?: string;
  checkOutDate?: string;
  numberOfNights?: number;
  cityName?: string;
  zipCode?: string;
}

const ExpenseLineItem: React.FC<ExpenseLineItemProps> = ({ 
  onSave, 
  onCancel,
  editingItem
}) => {
  // State for basic fields
  const [type, setType] = useState<ExpenseType>(editingItem?.type || 'other');
  const [amount, setAmount] = useState(editingItem?.amount || 0);
  const [date, setDate] = useState(editingItem?.date || new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState(editingItem?.description || '');
  const [account, setAccount] = useState(editingItem?.account || '');
  const [accountName, setAccountName] = useState(editingItem?.accountName || '');
  const [costCenter, setCostCenter] = useState(editingItem?.costCenter || '');
  const [costCenterName, setCostCenterName] = useState(editingItem?.costCenterName || '');
  
  // State for receipt
  const [receiptUrl, setReceiptUrl] = useState(editingItem?.receiptUrl || '');
  const [receiptName, setReceiptName] = useState(editingItem?.receiptName || '');
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // State for dynamic fields
  const [dynamicFields, setDynamicFields] = useState<Record<string, any>>({
    merchantName: editingItem?.merchantName || '',
    location: editingItem?.location || '',
    checkInDate: editingItem?.checkInDate || '',
    checkOutDate: editingItem?.checkOutDate || '',
    numberOfNights: editingItem?.numberOfNights || 1,
    cityName: editingItem?.cityName || '',
    zipCode: editingItem?.zipCode || '',
  });

  // State for type-specific fields
  const [typeSpecificFields, setTypeSpecificFields] = useState(generateTypeSpecificFields(type));

  // Update type-specific fields when type changes
  useEffect(() => {
    setTypeSpecificFields(generateTypeSpecificFields(type));
  }, [type]);

  // Handlers
  const handleTypeChange = (newType: ExpenseType) => {
    setType(newType);
  };

  const handleDynamicFieldChange = (id: string, value: any) => {
    setDynamicFields(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleAccountChange = (value: string) => {
    const selected = glAccounts.find(acc => acc.code === value);
    if (selected) {
      setAccount(selected.code);
      setAccountName(selected.name);
    }
  };

  const handleCostCenterChange = (value: string) => {
    const selected = costCenters.find(cc => cc.code === value);
    if (selected) {
      setCostCenter(selected.code);
      setCostCenterName(selected.name);
    }
  };

  const handleReceiptChange = (name: string, url: string) => {
    setReceiptName(name);
    setReceiptUrl(url);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setReceiptName(file.name);
      setReceiptUrl(`receipt-${Date.now()}`);
    }
  };

  const handleSave = () => {
    onSave({
      id: editingItem?.id || `item-${Date.now()}`,
      type,
      amount,
      date,
      description,
      receiptUrl,
      receiptName,
      account,
      accountName,
      costCenter,
      costCenterName,
      ...dynamicFields
    });
  };

  return (
    <div className="flex h-full">
      {/* Left side - Form */}
      <div className="w-3/5 h-full px-4 py-3">
        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="pr-4">
            {/* Expense Type Selector */}
            <ExpenseTypeSelector 
              selectedType={type} 
              onTypeChange={handleTypeChange} 
            />

            {/* Basic Fields (Amount, Date, GL Account, Cost Center, Description) */}
            <BasicInfoFields 
              amount={amount}
              date={date}
              description={description}
              account={account}
              costCenter={costCenter}
              onAmountChange={setAmount}
              onDateChange={setDate}
              onDescriptionChange={setDescription}
              onAccountChange={handleAccountChange}
              onCostCenterChange={handleCostCenterChange}
              glAccounts={glAccounts}
              costCenters={costCenters}
            />
            
            {/* Dynamic Fields based on expense type */}
            <DynamicFields 
              fields={typeSpecificFields}
              values={dynamicFields}
              onChange={handleDynamicFieldChange}
            />

            {/* Receipt Upload */}
            <ReceiptUpload 
              receiptName={receiptName}
              receiptUrl={receiptUrl}
              onReceiptChange={handleReceiptChange}
            />

            {/* Action buttons */}
            <div className="flex items-center gap-3 mt-auto pt-1">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-4 py-1.5 rounded-md border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 px-4 py-1.5 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition-colors flex items-center justify-center"
              >
                <span>Save</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Right side - Receipt Preview */}
      <div className="w-2/5">
        <ReceiptPreview 
          receiptUrl={receiptUrl}
          receiptName={receiptName}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          dragActive={dragActive}
        />
      </div>

      {/* Receipt Dialog */}
      <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Receipt Preview</DialogTitle>
            <DialogDescription>
              {receiptName}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center min-h-[300px] bg-gray-100 rounded-md">
            {receiptUrl ? (
              <img 
                src={`/public/lovable-uploads/fc953625-155a-4230-9515-5801b4d67e6f.png`} 
                alt="Receipt" 
                className="max-w-full max-h-[400px] object-contain" 
              />
            ) : (
              <div className="text-gray-500">No receipt available</div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpenseLineItem;
