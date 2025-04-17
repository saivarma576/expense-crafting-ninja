
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { ExpenseLineItemFormData, ExpenseType } from '@/types/expense';
import { extractDataFromReceipt, detectDataMismatch } from '@/utils/ocrUtils';
import { STANDARD_RATES } from '@/components/Expenses/ExpenseFieldUtils';

interface UseExpenseFormProps {
  editingItem?: Partial<ExpenseLineItemFormData>;
  onOcrDataExtracted?: (data: any) => void;
}

export const useExpenseForm = ({ editingItem, onOcrDataExtracted }: UseExpenseFormProps) => {
  const formId = editingItem?.id || `item-${Date.now()}`;
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
  const [receiptUrl, setReceiptUrl] = useState(editingItem?.receiptUrl || '');
  const [receiptName, setReceiptName] = useState(editingItem?.receiptName || '');
  const [ocrData, setOcrData] = useState<any>(null);
  const [dataMismatches, setDataMismatches] = useState<any[] | null>(null);
  const [showMismatchDialog, setShowMismatchDialog] = useState(false);

  useEffect(() => {
    if (type === 'mileage' && miles > 0) {
      setAmount(parseFloat((miles * mileageRate).toFixed(2)));
    }
  }, [miles, mileageRate, type]);

  useEffect(() => {
    if (zipCode && zipCode.length === 5) {
      setCity('New York');
      toast.success(`City updated based on zip code: ${zipCode}`);
    }
  }, [zipCode]);

  const handleFieldChange = (id: string, value: any) => {
    const setters: Record<string, (value: any) => void> = {
      type: setType,
      amount: setAmount,
      date: setDate,
      description: setDescription,
      account: setAccount,
      accountName: setAccountName,
      costCenter: setCostCenter,
      costCenterName: setCostCenterName,
      wbs: setWbs,
      notes: setNotes,
      merchantName: setMerchantName,
      glAccount: setGlAccount,
      zipCode: setZipCode,
      city: setCity,
      mealsRate: setMealsRate,
      hotelRate: setHotelRate,
      throughDate: setThroughDate,
      perDiemExplanation: setPerDiemExplanation,
      departureTime: setDepartureTime,
      returnTime: setReturnTime,
      miles: setMiles,
      mileageRate: setMileageRate,
    };

    if (setters[id]) {
      setters[id](value);
    }

    if (ocrData && ['merchantName', 'amount', 'date', 'type'].includes(id)) {
      const userData = {
        merchantName,
        amount,
        date,
        type,
        [id]: value
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
    
    try {
      toast.loading('Extracting data from receipt...');
      const extractedData = await extractDataFromReceipt(url);
      setOcrData(extractedData);
      toast.dismiss();
      toast.success('Receipt data extracted');
      
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
        handleOcrDataExtracted(extractedData);
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to extract data from receipt');
      console.error('OCR extraction error:', error);
    }
  };

  const handleOcrDataExtracted = (data: any) => {
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

    if (onOcrDataExtracted) {
      onOcrDataExtracted(data);
    }
  };

  const formValues: ExpenseLineItemFormData = {
    id: formId,
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
    glAccount,
    zipCode,
    city,
    mealsRate,
    hotelRate,
    throughDate,
    perDiemExplanation,
    departureTime,
    returnTime,
    miles,
    mileageRate,
  };

  return {
    formValues,
    handleFieldChange,
    handleReceiptChange,
    handleOcrDataExtracted,
    dataMismatches,
    showMismatchDialog,
    setShowMismatchDialog,
    ocrData,
    receiptUrl,
    receiptName,
  };
};
