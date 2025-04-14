
import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, DollarSign, MapPin, Calendar, SquareAsterisk } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExpenseType } from '@/types/expense';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { format } from 'date-fns';
import { toast } from 'sonner';

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
  wbs?: string;
  notes?: string;
  glAccount?: string;
  zipCode?: string;
  city?: string;
  mealsRate?: number;
  hotelRate?: number;
  throughDate?: string;
  perDiemExplanation?: string;
  departureTime?: string;
  returnTime?: string;
  miles?: number;
  mileageRate?: number;
}

const ExpenseLineItem: React.FC<ExpenseLineItemProps> = ({ 
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
  
  // State for receipt
  const [receiptUrl, setReceiptUrl] = useState(editingItem?.receiptUrl || '');
  const [receiptName, setReceiptName] = useState(editingItem?.receiptName || '');
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // State for type-specific fields
  const [glAccount, setGlAccount] = useState(editingItem?.glAccount || '');
  const [zipCode, setZipCode] = useState(editingItem?.zipCode || '');
  const [city, setCity] = useState(editingItem?.city || '');
  const [mealsRate, setMealsRate] = useState(editingItem?.mealsRate || 80);
  const [hotelRate, setHotelRate] = useState(editingItem?.hotelRate || 159);
  const [throughDate, setThroughDate] = useState(editingItem?.throughDate || '');
  const [perDiemExplanation, setPerDiemExplanation] = useState(editingItem?.perDiemExplanation || '');
  const [departureTime, setDepartureTime] = useState(editingItem?.departureTime || '');
  const [returnTime, setReturnTime] = useState(editingItem?.returnTime || '');
  const [miles, setMiles] = useState(editingItem?.miles || 0);
  const [mileageRate, setMileageRate] = useState(editingItem?.mileageRate || 0.7);

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

  // Check if per diem explanation is needed
  const needsPerDiemExplanation = (type === 'hotel' && amount !== hotelRate) || 
                               (type === 'meals' && amount !== mealsRate);

  // Determine which fields to show based on expense type
  const needsGlAccount = ['transport', 'auditing', 'baggage', 'business_meals', 
                         'subscriptions', 'gasoline', 'office_supplies', 'other', 
                         'parking', 'postage', 'professional_fees', 'registration', 'rental'].includes(type);
  
  const isHotelOrLodging = type === 'hotel';
  const isMeals = type === 'meals';
  const isMileage = type === 'mileage';

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

  const validateForm = (): boolean => {
    if (!type || !costCenter || !date || !wbs || amount <= 0) {
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
      glAccount: needsGlAccount ? glAccount : undefined,
      zipCode: (isHotelOrLodging || isMeals) ? zipCode : undefined,
      city: (isHotelOrLodging || isMeals) ? city : undefined,
      mealsRate: (isHotelOrLodging || isMeals) ? mealsRate : undefined,
      hotelRate: isHotelOrLodging ? hotelRate : undefined,
      throughDate: (isHotelOrLodging || isMileage) ? throughDate : undefined,
      perDiemExplanation: needsPerDiemExplanation ? perDiemExplanation : undefined,
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

            {/* Common fields - always shown */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-4">
              <div>
                <Label htmlFor="costCenter" className="text-xs font-medium text-gray-700 flex items-center">
                  Cost Center <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="costCenter"
                  value={costCenter}
                  onChange={(e) => handleCostCenterChange(e.target.value)}
                  placeholder="Enter cost center"
                  className="h-8 px-2 py-1 text-sm"
                  required
                />
              </div>

              <div>
                <Label htmlFor="date" className="text-xs font-medium text-gray-700 flex items-center">
                  Date <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-8 px-2 py-1 text-sm"
                    required
                  />
                  <Calendar className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
                </div>
              </div>

              <div>
                <Label htmlFor="wbs" className="text-xs font-medium text-gray-700 flex items-center">
                  WBS <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="wbs"
                  value={wbs}
                  onChange={(e) => setWbs(e.target.value)}
                  placeholder="Enter WBS code"
                  className="h-8 px-2 py-1 text-sm"
                  required
                />
              </div>

              <div>
                <Label htmlFor="amount" className="text-xs font-medium text-gray-700 flex items-center">
                  Expense Amount <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="h-8 pl-6 pr-2 py-1 text-sm"
                    disabled={type === 'mileage'}
                    required
                  />
                  <DollarSign className="w-4 h-4 absolute left-2 top-2 text-gray-400" />
                </div>
              </div>

              <div className="col-span-2">
                <Label htmlFor="description" className="text-xs font-medium text-gray-700 flex items-center">
                  Description <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter expense description"
                  className="h-8 px-2 py-1 text-sm"
                  required
                />
              </div>
            </div>

            {/* Conditional fields based on expense type */}
            {needsGlAccount && (
              <div className="mb-4">
                <Label htmlFor="glAccount" className="text-xs font-medium text-gray-700 flex items-center">
                  GL Account <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="glAccount"
                  value={glAccount}
                  onChange={(e) => setGlAccount(e.target.value)}
                  placeholder="E.g., 50600140"
                  className="h-8 px-2 py-1 text-sm"
                  required
                />
              </div>
            )}

            {/* Hotel/Lodging specific fields */}
            {isHotelOrLodging && (
              <div className="mb-4 space-y-2">
                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                  <div>
                    <Label htmlFor="zipCode" className="text-xs font-medium text-gray-700 flex items-center">
                      Zip Code <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="zipCode"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="Enter zip code"
                        className="h-8 px-2 py-1 text-sm"
                        required
                      />
                      <MapPin className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="city" className="text-xs font-medium text-gray-700">
                      City (Auto-filled)
                    </Label>
                    <Input
                      id="city"
                      value={city}
                      readOnly
                      className="h-8 px-2 py-1 text-sm bg-gray-50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hotelRate" className="text-xs font-medium text-gray-700">
                      Hotel Rate (Default)
                    </Label>
                    <div className="relative">
                      <Input
                        id="hotelRate"
                        type="number"
                        value={hotelRate}
                        onChange={(e) => setHotelRate(parseFloat(e.target.value) || 0)}
                        className="h-8 pl-6 pr-2 py-1 text-sm bg-gray-50"
                      />
                      <DollarSign className="w-4 h-4 absolute left-2 top-2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="throughDate" className="text-xs font-medium text-gray-700 flex items-center">
                      Through Date <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="throughDate"
                        type="date"
                        value={throughDate}
                        onChange={(e) => setThroughDate(e.target.value)}
                        className="h-8 px-2 py-1 text-sm"
                        required
                      />
                      <Calendar className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {needsPerDiemExplanation && (
                  <div>
                    <Label htmlFor="perDiemExplanation" className="text-xs font-medium text-gray-700 flex items-center">
                      Per Diem Explanation <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Textarea
                      id="perDiemExplanation"
                      value={perDiemExplanation}
                      onChange={(e) => setPerDiemExplanation(e.target.value)}
                      placeholder="Explain why the amount differs from the standard rate"
                      className="resize-none h-20 text-sm"
                      required
                    />
                  </div>
                )}
              </div>
            )}

            {/* Meals specific fields */}
            {isMeals && (
              <div className="mb-4 space-y-2">
                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                  <div>
                    <Label htmlFor="zipCode" className="text-xs font-medium text-gray-700 flex items-center">
                      Zip Code <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="zipCode"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="Enter zip code"
                        className="h-8 px-2 py-1 text-sm"
                        required
                      />
                      <MapPin className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="city" className="text-xs font-medium text-gray-700">
                      City (Auto-filled)
                    </Label>
                    <Input
                      id="city"
                      value={city}
                      readOnly
                      className="h-8 px-2 py-1 text-sm bg-gray-50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="mealsRate" className="text-xs font-medium text-gray-700">
                      Meals Rate (Default)
                    </Label>
                    <div className="relative">
                      <Input
                        id="mealsRate"
                        type="number"
                        value={mealsRate}
                        onChange={(e) => setMealsRate(parseFloat(e.target.value) || 0)}
                        className="h-8 pl-6 pr-2 py-1 text-sm bg-gray-50"
                      />
                      <DollarSign className="w-4 h-4 absolute left-2 top-2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="departureTime" className="text-xs font-medium text-gray-700 flex items-center">
                      Departure Time <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="departureTime"
                        type="time"
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                        className="h-8 px-2 py-1 text-sm"
                        required
                      />
                      <Clock className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="returnTime" className="text-xs font-medium text-gray-700">
                      Return Time
                    </Label>
                    <div className="relative">
                      <Input
                        id="returnTime"
                        type="time"
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className="h-8 px-2 py-1 text-sm"
                      />
                      <Clock className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {needsPerDiemExplanation && (
                  <div>
                    <Label htmlFor="perDiemExplanation" className="text-xs font-medium text-gray-700 flex items-center">
                      Per Diem Explanation <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Textarea
                      id="perDiemExplanation"
                      value={perDiemExplanation}
                      onChange={(e) => setPerDiemExplanation(e.target.value)}
                      placeholder="Explain why the amount differs from the standard rate"
                      className="resize-none h-20 text-sm"
                      required
                    />
                  </div>
                )}
              </div>
            )}

            {/* Mileage specific fields */}
            {isMileage && (
              <div className="mb-4 space-y-2">
                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                  <div>
                    <Label htmlFor="miles" className="text-xs font-medium text-gray-700 flex items-center">
                      Miles <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="miles"
                      type="number"
                      value={miles}
                      onChange={(e) => setMiles(parseInt(e.target.value) || 0)}
                      placeholder="Enter miles"
                      className="h-8 px-2 py-1 text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="mileageRate" className="text-xs font-medium text-gray-700 flex items-center">
                      Mileage Rate <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="mileageRate"
                        type="number"
                        step="0.01"
                        value={mileageRate}
                        onChange={(e) => setMileageRate(parseFloat(e.target.value) || 0)}
                        className="h-8 pl-6 pr-2 py-1 text-sm"
                        required
                      />
                      <DollarSign className="w-4 h-4 absolute left-2 top-2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="throughDate" className="text-xs font-medium text-gray-700 flex items-center">
                      Through Date <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="throughDate"
                        type="date"
                        value={throughDate}
                        onChange={(e) => setThroughDate(e.target.value)}
                        className="h-8 px-2 py-1 text-sm"
                        required
                      />
                      <Calendar className="w-4 h-4 absolute right-2 top-2 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes - optional for all expense types */}
            <div className="mb-4">
              <Label htmlFor="notes" className="text-xs font-medium text-gray-700">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes"
                className="resize-none h-20 text-sm"
              />
            </div>

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
