
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExpenseType } from '@/types/expense';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Zap, FileCheck, AlertCircle } from 'lucide-react';

// Import refactored components
import ExpenseTypeSelector from './ExpenseTypeSelector';
import ReceiptPreview from './ReceiptPreview';
import { ExpenseLineItemFormData, FormProps } from './ExpenseForm/types';
import CommonFields from './ExpenseForm/CommonFields';
import HotelFields from './ExpenseForm/HotelFields';
import MealsFields from './ExpenseForm/MealsFields';
import MileageFields from './ExpenseForm/MileageFields';
import GlAccountField from './ExpenseForm/GlAccountField';
import NotesField from './ExpenseForm/NotesField';
import FormActions from './ExpenseForm/FormActions';
import ValidationWarnings from './ExpenseForm/ValidationWarnings';
import ValidationSummaryPanel from './ExpenseForm/ValidationSummaryPanel';
import DataMismatchAlert from './ExpenseForm/DataMismatchAlert';
import { STANDARD_RATES } from './ExpenseFieldUtils';
import { 
  validateField, 
  performLLMValidation, 
  showFieldError,
  getAllValidations
} from '@/utils/validationUtils';
import { 
  extractDataFromReceipt, 
  detectDataMismatch 
} from '@/utils/ocrUtils';

export type { ExpenseLineItemFormData as ExpenseLineItemType };

const ExpenseLineItem: React.FC<FormProps> = ({ 
  onSave, 
  onCancel,
  editingItem
}) => {
  // State for basic fields
  const [type, setType] = useState<ExpenseType>(editingItem?.type || 'other');
  const [amount, setAmount] = useState(editingItem?.amount || 0);
  const [date, setDate] = useState(editingItem?.date || format(new Date(), 'yyyy-MM-dd'));
  const [description, setDescription] = useState(editingItem?.description || '');
  const [account, setAccount] = useState(editingItem?.account || '');
  const [accountName, setAccountName] = useState(editingItem?.accountName || '');
  const [costCenter, setCostCenter] = useState(editingItem?.costCenter || '');
  const [costCenterName, setCostCenterName] = useState(editingItem?.costCenterName || '');
  const [wbs, setWbs] = useState(editingItem?.wbs || '');
  const [notes, setNotes] = useState(editingItem?.notes || '');
  const [merchantName, setMerchantName] = useState(editingItem?.merchantName || '');
  
  // State for receipt
  const [receiptUrl, setReceiptUrl] = useState(editingItem?.receiptUrl || '');
  const [receiptName, setReceiptName] = useState(editingItem?.receiptName || '');
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // State for OCR data
  const [ocrData, setOcrData] = useState<any>(null);
  const [showMismatchDialog, setShowMismatchDialog] = useState(false);
  const [dataMismatches, setDataMismatches] = useState<any[] | null>(null);
  
  // State for type-specific fields
  const [glAccount, setGlAccount] = useState(editingItem?.glAccount || '');
  const [zipCode, setZipCode] = useState(editingItem?.zipCode || '');
  const [city, setCity] = useState(editingItem?.city || '');
  const [mealsRate, setMealsRate] = useState(editingItem?.mealsRate || STANDARD_RATES.MEALS_RATE);
  const [hotelRate, setHotelRate] = useState(editingItem?.hotelRate || STANDARD_RATES.HOTEL_RATE);
  const [throughDate, setThroughDate] = useState(editingItem?.throughDate || '');
  const [perDiemExplanation, setPerDiemExplanation] = useState(editingItem?.perDiemExplanation || '');
  const [departureTime, setDepartureTime] = useState(editingItem?.departureTime || '');
  const [returnTime, setReturnTime] = useState(editingItem?.returnTime || '');
  const [miles, setMiles] = useState(editingItem?.miles || 0);
  const [mileageRate, setMileageRate] = useState(editingItem?.mileageRate || STANDARD_RATES.MILEAGE_RATE);

  // State for validation
  const [validationWarnings, setValidationWarnings] = useState<{
    programmaticErrors: {field: string, error: string}[],
    llmWarnings: string[]
  }>({ programmaticErrors: [], llmWarnings: [] });
  const [showValidationWarnings, setShowValidationWarnings] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({});
  const [showValidationPanel, setShowValidationPanel] = useState(false);
  const [llmSuggestions, setLlmSuggestions] = useState<Record<string, string | null>>({});

  // All form values in a single object for passing to components
  const formValues = {
    type, amount, date, description, account, accountName, costCenter, costCenterName,
    wbs, notes, merchantName, glAccount, zipCode, city, mealsRate, hotelRate, throughDate,
    perDiemExplanation, departureTime, returnTime, miles, mileageRate
  };

  // Effect to auto-calculate mileage amount
  useEffect(() => {
    if (type === 'mileage' && miles > 0) {
      setAmount(parseFloat((miles * mileageRate).toFixed(2)));
    }
  }, [miles, mileageRate, type]);

  // Effect to handle zip code lookup
  useEffect(() => {
    if (zipCode && zipCode.length === 5) {
      // This would normally be an API call to lookup the city
      // For now we'll just set a dummy city
      setCity('New York');
      toast.success(`City updated based on zip code: ${zipCode}`);
    }
  }, [zipCode]);

  // Validate a field when its value changes
  const validateAndSetFieldError = (field: string, value: any) => {
    const error = validateField(field, value);
    setFieldErrors(prev => ({ ...prev, [field]: error }));
    return error;
  };

  // Determine which fields to show based on expense type
  const needsGlAccount = ['transport', 'auditing', 'baggage', 'business_meals', 
                         'subscriptions', 'gasoline', 'office_supplies', 'other', 
                         'parking', 'postage', 'professional_fees', 'registration', 'rental'].includes(type);
  
  const isHotelOrLodging = type === 'hotel';
  const isMeals = type === 'meals';
  const isMileage = type === 'mileage';

  // Add LLM suggestions for specific fields based on context
  useEffect(() => {
    const suggestions: Record<string, string | null> = {};
    
    // Amount suggestions
    if (type === 'hotel' && amount > STANDARD_RATES.HOTEL_RATE) {
      suggestions.amount = `Hotel expense exceeds the standard rate of $${STANDARD_RATES.HOTEL_RATE}. Consider explaining the reason.`;
    } else if (type === 'meals' && amount > STANDARD_RATES.MEALS_RATE) {
      suggestions.amount = `Meal expense exceeds the standard rate of $${STANDARD_RATES.MEALS_RATE}. Note if alcohol was included.`;
    }
    
    // Date suggestions
    const expenseDate = new Date(date);
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    if (expenseDate < thirtyDaysAgo) {
      suggestions.date = `This expense is over 30 days old. Submit promptly to comply with the 60-day rule.`;
    }
    
    // Merchant suggestions
    if (merchantName && merchantName.toLowerCase().includes('amazon')) {
      suggestions.merchantName = `For Amazon purchases, please specify what was purchased in the description.`;
    }
    
    // GL Account suggestions
    if (type === 'meals' && glAccount && glAccount !== '420100') {
      suggestions.glAccount = `For meals, the preferred GL Account is 420100 (Meals & Entertainment).`;
    } else if (type === 'hotel' && glAccount && glAccount !== '420200') {
      suggestions.glAccount = `For lodging, the preferred GL Account is 420200 (Lodging Expenses).`;
    }
    
    setLlmSuggestions(suggestions);
  }, [type, amount, date, merchantName, glAccount]);

  const handleFieldChange = (id: string, value: any) => {
    // Update field value
    switch (id) {
      case 'type': setType(value); break;
      case 'amount': 
        setAmount(value); 
        validateAndSetFieldError('amount', value);
        break;
      case 'date': 
        setDate(value); 
        validateAndSetFieldError('date', value);
        break;
      case 'description': setDescription(value); break;
      case 'account': setAccount(value); break;
      case 'accountName': setAccountName(value); break;
      case 'costCenter': setCostCenter(value); break;
      case 'costCenterName': setCostCenterName(value); break;
      case 'wbs': setWbs(value); break;
      case 'notes': setNotes(value); break;
      case 'merchantName': 
        setMerchantName(value); 
        validateAndSetFieldError('merchantName', value);
        break;
      case 'glAccount': 
        setGlAccount(value); 
        validateAndSetFieldError('glAccount', value);
        break;
      case 'zipCode': setZipCode(value); break;
      case 'city': setCity(value); break;
      case 'mealsRate': setMealsRate(value); break;
      case 'hotelRate': setHotelRate(value); break;
      case 'throughDate': setThroughDate(value); break;
      case 'perDiemExplanation': setPerDiemExplanation(value); break;
      case 'departureTime': setDepartureTime(value); break;
      case 'returnTime': setReturnTime(value); break;
      case 'miles': 
        setMiles(value); 
        validateAndSetFieldError('miles', value);
        break;
      case 'mileageRate': setMileageRate(value); break;
      default: break;
    }
    
    // Check for OCR data mismatches after user input
    if (ocrData && ['merchantName', 'amount', 'date', 'type'].includes(id)) {
      const userData = {
        merchantName,
        amount,
        date,
        type,
        [id]: value // Include the just-updated field
      };
      
      const mismatches = detectDataMismatch(ocrData, userData);
      setDataMismatches(mismatches);
      
      if (mismatches && !showMismatchDialog) {
        setShowMismatchDialog(true);
      }
    }
  };

  const handleReceiptChange = async (name: string, url: string) => {
    setReceiptName(name);
    setReceiptUrl(url);
    toast.success(`Receipt ${name} uploaded successfully`);
    
    // Extract OCR data from receipt
    try {
      toast.loading('Extracting data from receipt...');
      const extractedData = await extractDataFromReceipt(url);
      setOcrData(extractedData);
      toast.dismiss();
      toast.success('Receipt data extracted');
      
      // Check for mismatches between OCR and user data
      const userData = {
        merchantName,
        amount,
        date,
        type
      };
      
      const mismatches = detectDataMismatch(extractedData, userData);
      setDataMismatches(mismatches);
      
      if (mismatches) {
        setShowMismatchDialog(true);
      } else {
        // If no mismatches and fields are empty, update with OCR data
        handleOcrDataExtracted(extractedData);
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to extract data from receipt');
      console.error('OCR extraction error:', error);
    }
  };

  const handleOcrDataExtracted = (data: any) => {
    // Only update fields that are empty or have default values
    if (data.merchantName && (!merchantName || merchantName === '')) {
      setMerchantName(data.merchantName);
    }
    
    if (data.amount && amount === 0) {
      setAmount(data.amount);
    }
    
    if (data.date && (!date || date === format(new Date(), 'yyyy-MM-dd'))) {
      setDate(data.date);
    }
    
    if (data.type && type === 'other') {
      setType(data.type);
    }
  };

  const handleAcceptOcrData = (field: string, value: any) => {
    handleFieldChange(field, value);
    
    // Update the mismatches list to remove the resolved mismatch
    if (dataMismatches) {
      const updatedMismatches = dataMismatches.filter(mismatch => mismatch.field !== field);
      setDataMismatches(updatedMismatches.length > 0 ? updatedMismatches : null);
      
      if (updatedMismatches.length === 0) {
        setShowMismatchDialog(false);
      }
    }
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
      handleReceiptChange(file.name, `receipt-${Date.now()}`);
    }
  };

  const validateForm = (): boolean => {
    // Create the expense object
    const expense: ExpenseLineItemFormData = {
      id: editingItem?.id || `item-${Date.now()}`,
      type,
      amount,
      date,
      description,
      receiptUrl,
      receiptName,
      merchantName,
      account,
      accountName,
      costCenter,
      costCenterName,
      wbs,
      notes,
      glAccount: needsGlAccount ? glAccount : undefined,
      zipCode: (isHotelOrLodging || isMeals) ? zipCode : undefined,
      city: (isHotelOrLodging || isMeals) ? city : undefined,
      mealsRate: (isMeals) ? mealsRate : undefined,
      hotelRate: isHotelOrLodging ? hotelRate : undefined,
      throughDate: (isHotelOrLodging || isMileage) ? throughDate : undefined,
      perDiemExplanation: (isHotelOrLodging || isMeals) && amount !== (isHotelOrLodging ? hotelRate : mealsRate) ? perDiemExplanation : undefined,
      departureTime: isMeals ? departureTime : undefined,
      returnTime: isMeals ? returnTime : undefined,
      miles: isMileage ? miles : undefined,
      mileageRate: isMileage ? mileageRate : undefined,
    };
    
    // Get all validations
    const validations = getAllValidations(expense);
    
    setValidationWarnings({
      programmaticErrors: validations.programmaticErrors,
      llmWarnings: validations.llmWarnings
    });
    
    // Show validation warnings dialog
    if (validations.programmaticErrors.length > 0 || validations.llmWarnings.length > 0) {
      setShowValidationWarnings(true);
      
      // In testing mode, we allow submission even with warnings but not with errors
      return !validations.hasErrors;
    }
    
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
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
      wbs,
      notes,
      merchantName,
      glAccount: needsGlAccount ? glAccount : undefined,
      zipCode: (isHotelOrLodging || isMeals) ? zipCode : undefined,
      city: (isHotelOrLodging || isMeals) ? city : undefined,
      mealsRate: (isMeals) ? mealsRate : undefined,
      hotelRate: isHotelOrLodging ? hotelRate : undefined,
      throughDate: (isHotelOrLodging || isMileage) ? throughDate : undefined,
      perDiemExplanation: (isHotelOrLodging || isMeals) && amount !== (isHotelOrLodging ? hotelRate : mealsRate) ? perDiemExplanation : undefined,
      departureTime: isMeals ? departureTime : undefined,
      returnTime: isMeals ? returnTime : undefined,
      miles: isMileage ? miles : undefined,
      mileageRate: isMileage ? mileageRate : undefined,
    });
  };

  // For live validation status
  useEffect(() => {
    const expense: ExpenseLineItemFormData = {
      id: editingItem?.id || `item-${Date.now()}`,
      type,
      amount,
      date,
      description,
      receiptUrl,
      receiptName,
      merchantName,
      account,
      accountName,
      costCenter,
      costCenterName,
      wbs,
      notes,
      glAccount: needsGlAccount ? glAccount : undefined,
      zipCode: (isHotelOrLodging || isMeals) ? zipCode : undefined,
      city: (isHotelOrLodging || isMeals) ? city : undefined,
      mealsRate: (isMeals) ? mealsRate : undefined,
      hotelRate: isHotelOrLodging ? hotelRate : undefined,
      throughDate: (isHotelOrLodging || isMileage) ? throughDate : undefined,
      perDiemExplanation: (isHotelOrLodging || isMeals) && amount !== (isHotelOrLodging ? hotelRate : mealsRate) ? perDiemExplanation : undefined,
      departureTime: isMeals ? departureTime : undefined,
      returnTime: isMeals ? returnTime : undefined,
      miles: isMileage ? miles : undefined,
      mileageRate: isMileage ? mileageRate : undefined,
    };
    
    const validations = getAllValidations(expense);
    
    // Only update if there are errors or warnings
    if (validations.programmaticErrors.length > 0 || validations.llmWarnings.length > 0) {
      setValidationWarnings({
        programmaticErrors: validations.programmaticErrors,
        llmWarnings: validations.llmWarnings
      });
    }
  }, [type, amount, date, description, merchantName, glAccount, miles]);

  return (
    <div className="flex h-full">
      {/* Left side - Form */}
      <div className="w-3/5 h-full px-4 py-3 relative">
        <div className="mb-3 flex items-center">
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            {validationWarnings.programmaticErrors.length > 0 && (
              <div className="flex items-center text-xs bg-red-50 text-red-600 py-1 px-2 rounded-full">
                <AlertCircle className="h-3.5 w-3.5 mr-1" />
                {validationWarnings.programmaticErrors.length} issue{validationWarnings.programmaticErrors.length !== 1 ? 's' : ''}
              </div>
            )}
            {validationWarnings.llmWarnings.length > 0 && (
              <div className="flex items-center text-xs bg-amber-50 text-amber-600 py-1 px-2 rounded-full">
                <Zap className="h-3.5 w-3.5 mr-1" />
                {validationWarnings.llmWarnings.length} suggestion{validationWarnings.llmWarnings.length !== 1 ? 's' : ''}
              </div>
            )}
            <button 
              onClick={() => setShowValidationPanel(prev => !prev)}
              className="text-xs flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-1 px-2 rounded-full"
            >
              <FileCheck className="h-3.5 w-3.5" />
              Validation panel
            </button>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="pr-4">
            {/* Expense Type Selector */}
            <ExpenseTypeSelector 
              selectedType={type} 
              onTypeChange={setType} 
            />

            {/* Common Fields */}
            <CommonFields
              type={type}
              values={formValues}
              onChange={handleFieldChange}
              isAmountDisabled={type === 'mileage'}
              fieldErrors={fieldErrors}
              llmSuggestions={llmSuggestions}
            />

            {/* Type-specific Fields */}
            {needsGlAccount && (
              <GlAccountField 
                values={formValues} 
                onChange={handleFieldChange} 
                error={fieldErrors.glAccount}
                llmSuggestion={llmSuggestions.glAccount}
              />
            )}
            
            {isHotelOrLodging && (
              <HotelFields 
                values={formValues} 
                onChange={handleFieldChange} 
                llmSuggestions={llmSuggestions}
              />
            )}
            
            {isMeals && (
              <MealsFields 
                values={formValues} 
                onChange={handleFieldChange} 
                llmSuggestions={llmSuggestions}
              />
            )}
            
            {isMileage && (
              <MileageFields 
                values={formValues} 
                onChange={handleFieldChange} 
                error={fieldErrors.miles}
                llmSuggestions={llmSuggestions}
              />
            )}

            {/* Notes Field */}
            <NotesField values={formValues} onChange={handleFieldChange} />

            {/* Action buttons */}
            <FormActions onCancel={onCancel} onSave={handleSave} />
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
          onReceiptChange={handleReceiptChange}
          onOcrDataExtracted={handleOcrDataExtracted}
          currentValues={formValues}
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
      
      {/* Data Mismatch Dialog */}
      <DataMismatchAlert
        mismatches={dataMismatches}
        isOpen={showMismatchDialog}
        onClose={() => setShowMismatchDialog(false)}
        onAcceptOcrData={handleAcceptOcrData}
      />
      
      {/* Validation Warnings Dialog */}
      {showValidationWarnings && (
        <ValidationWarnings 
          programmaticErrors={validationWarnings.programmaticErrors}
          llmWarnings={validationWarnings.llmWarnings}
          onClose={() => setShowValidationWarnings(false)}
          onProceed={() => {
            setShowValidationWarnings(false);
            handleSave();
          }}
        />
      )}
      
      {/* Validation Summary Panel */}
      <ValidationSummaryPanel
        programmaticErrors={validationWarnings.programmaticErrors}
        llmWarnings={validationWarnings.llmWarnings}
        isVisible={showValidationPanel}
        toggleVisibility={() => setShowValidationPanel(prev => !prev)}
      />
    </div>
  );
};

export default ExpenseLineItem;
