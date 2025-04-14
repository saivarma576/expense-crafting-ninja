
import React, { useState, useEffect } from 'react';
import { SquareAsterisk } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExpenseType } from '@/types/expense';
import { format } from 'date-fns';
import { toast } from 'sonner';

// Import refactored components
import ExpenseTypeSelector from './ExpenseTypeSelector';
import ReceiptUpload from './ReceiptUpload';
import ReceiptPreview from './ReceiptPreview';
import { ExpenseLineItemFormData, FormProps } from './ExpenseForm/types';
import CommonFields from './ExpenseForm/CommonFields';
import HotelFields from './ExpenseForm/HotelFields';
import MealsFields from './ExpenseForm/MealsFields';
import MileageFields from './ExpenseForm/MileageFields';
import GlAccountField from './ExpenseForm/GlAccountField';
import NotesField from './ExpenseForm/NotesField';
import FormActions from './ExpenseForm/FormActions';
import { STANDARD_RATES } from './ExpenseFieldUtils';

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

  // Determine which fields to show based on expense type
  const needsGlAccount = ['transport', 'auditing', 'baggage', 'business_meals', 
                         'subscriptions', 'gasoline', 'office_supplies', 'other', 
                         'parking', 'postage', 'professional_fees', 'registration', 'rental'].includes(type);
  
  const isHotelOrLodging = type === 'hotel';
  const isMeals = type === 'meals';
  const isMileage = type === 'mileage';

  const handleFieldChange = (id: string, value: any) => {
    switch (id) {
      case 'type': setType(value); break;
      case 'amount': setAmount(value); break;
      case 'date': setDate(value); break;
      case 'description': setDescription(value); break;
      case 'account': setAccount(value); break;
      case 'accountName': setAccountName(value); break;
      case 'costCenter': setCostCenter(value); break;
      case 'costCenterName': setCostCenterName(value); break;
      case 'wbs': setWbs(value); break;
      case 'notes': setNotes(value); break;
      case 'merchantName': setMerchantName(value); break;
      case 'glAccount': setGlAccount(value); break;
      case 'zipCode': setZipCode(value); break;
      case 'city': setCity(value); break;
      case 'mealsRate': setMealsRate(value); break;
      case 'hotelRate': setHotelRate(value); break;
      case 'throughDate': setThroughDate(value); break;
      case 'perDiemExplanation': setPerDiemExplanation(value); break;
      case 'departureTime': setDepartureTime(value); break;
      case 'returnTime': setReturnTime(value); break;
      case 'miles': setMiles(value); break;
      case 'mileageRate': setMileageRate(value); break;
      default: break;
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

  const validateForm = (): boolean => {
    if (!type || !costCenter || !date || !wbs || amount <= 0 || !merchantName) {
      toast.error("Please fill in all required fields");
      return false;
    }

    if (needsGlAccount && !glAccount) {
      toast.error("GL Account is required for this expense type");
      return false;
    }

    if ((isHotelOrLodging || isMeals) && !zipCode) {
      toast.error("Zip Code is required for this expense type");
      return false;
    }

    if ((isHotelOrLodging || isMileage) && !throughDate) {
      toast.error("Through Date is required for this expense type");
      return false;
    }

    if (isMileage && (!miles || miles <= 0)) {
      toast.error("Miles must be greater than zero");
      return false;
    }

    if (isMeals && !departureTime) {
      toast.error("Departure Time is required for meals expenses");
      return false;
    }

    const needsPerDiemExplanation = (isHotelOrLodging && amount !== hotelRate) || 
                                  (isMeals && amount !== mealsRate);
                                  
    if (needsPerDiemExplanation && !perDiemExplanation) {
      toast.error("Please provide an explanation for the non-standard rate");
      return false;
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
      mealsRate: (isHotelOrLodging || isMeals) ? mealsRate : undefined,
      hotelRate: isHotelOrLodging ? hotelRate : undefined,
      throughDate: (isHotelOrLodging || isMileage) ? throughDate : undefined,
      perDiemExplanation: (isHotelOrLodging || isMeals) && amount !== (isHotelOrLodging ? hotelRate : mealsRate) ? perDiemExplanation : undefined,
      departureTime: isMeals ? departureTime : undefined,
      returnTime: isMeals ? returnTime : undefined,
      miles: isMileage ? miles : undefined,
      mileageRate: isMileage ? mileageRate : undefined,
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
              onTypeChange={setType} 
            />

            {/* Common Fields */}
            <CommonFields
              type={type}
              costCenter={costCenter}
              date={date}
              wbs={wbs}
              amount={amount}
              description={description}
              values={formValues}
              onChange={handleFieldChange}
              isAmountDisabled={type === 'mileage'}
            />

            {/* Type-specific Fields */}
            {needsGlAccount && <GlAccountField values={formValues} onChange={handleFieldChange} />}
            {isHotelOrLodging && <HotelFields values={formValues} onChange={handleFieldChange} />}
            {isMeals && <MealsFields values={formValues} onChange={handleFieldChange} />}
            {isMileage && <MileageFields values={formValues} onChange={handleFieldChange} />}

            {/* Notes Field */}
            <NotesField values={formValues} onChange={handleFieldChange} />

            {/* Receipt Upload */}
            <ReceiptUpload 
              receiptName={receiptName}
              receiptUrl={receiptUrl}
              onReceiptChange={handleReceiptChange}
            />

            {/* Required fields legend */}
            <div className="text-xs text-gray-500 flex items-center mb-4">
              <SquareAsterisk className="h-3 w-3 text-red-500 mr-1" />
              <span>Required field</span>
            </div>

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
