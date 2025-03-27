
import React, { useState, useEffect } from 'react';
import { 
  Droplet, Hotel, UtensilsCrossed, Milestone, FileBox, FileQuestion, 
  Calendar, DollarSign, FileText, ArrowRight, Building, BriefcaseBusiness,
  Paperclip, Upload, X, Car, ParkingCircle, Package, Briefcase,
  ClipboardCheck, Plane, ReceiptText, Luggage, Coffee, BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GLAccount, CostCenter, DynamicField, ExpenseType } from '@/types/expense';

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

const expenseTypes = [
  { value: 'gasoline', label: 'Gasoline', icon: <Droplet className="h-5 w-5" /> },
  { value: 'hotel', label: 'Hotel/Lodging', icon: <Hotel className="h-5 w-5" /> },
  { value: 'meals', label: 'Meals', icon: <UtensilsCrossed className="h-5 w-5" /> },
  { value: 'mileage', label: 'Mileage', icon: <Milestone className="h-5 w-5" /> },
  { value: 'office_supplies', label: 'Office Supplies', icon: <FileBox className="h-5 w-5" /> },
  { value: 'other', label: 'Others', icon: <FileQuestion className="h-5 w-5" /> },
  { value: 'parking', label: 'Parking/Tolls', icon: <ParkingCircle className="h-5 w-5" /> },
  { value: 'postage', label: 'Postage & Freight', icon: <Package className="h-5 w-5" /> },
  { value: 'professional_fees', label: 'Professional Fees', icon: <Briefcase className="h-5 w-5" /> },
  { value: 'registration', label: 'Registration Fees', icon: <ClipboardCheck className="h-5 w-5" /> },
  { value: 'rental', label: 'Rental Car', icon: <Car className="h-5 w-5" /> },
  { value: 'transport', label: 'Air/Taxi/Uber', icon: <Plane className="h-5 w-5" /> },
  { value: 'auditing', label: 'Auditing Serv Fees', icon: <ReceiptText className="h-5 w-5" /> },
  { value: 'baggage', label: 'Baggage Fees', icon: <Luggage className="h-5 w-5" /> },
  { value: 'business_meals', label: 'Business Meals', icon: <Coffee className="h-5 w-5" /> },
  { value: 'subscriptions', label: 'Dues Subscriptions', icon: <BookOpen className="h-5 w-5" /> }
];

// Mock data - In a real app, these would come from an API
const glAccounts: GLAccount[] = [
  { id: '1', code: '420000', name: 'Travel Expenses' },
  { id: '2', code: '420100', name: 'Meals & Entertainment' },
  { id: '3', code: '420200', name: 'Lodging Expenses' },
  { id: '4', code: '420300', name: 'Transportation' },
];

const costCenters: CostCenter[] = [
  { id: '1', code: '1000', name: 'Purchasing' },
  { id: '2', code: '2000', name: 'Marketing' },
  { id: '3', code: '3000', name: 'Finance' },
  { id: '4', code: '4000', name: 'IT Department' },
];

const ExpenseLineItem: React.FC<ExpenseLineItemProps> = ({ 
  onSave, 
  onCancel,
  editingItem
}) => {
  const [type, setType] = useState<ExpenseType>(editingItem?.type || 'other');
  const [amount, setAmount] = useState(editingItem?.amount || 0);
  const [date, setDate] = useState(editingItem?.date || new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState(editingItem?.description || '');
  const [account, setAccount] = useState(editingItem?.account || '');
  const [accountName, setAccountName] = useState(editingItem?.accountName || '');
  const [costCenter, setCostCenter] = useState(editingItem?.costCenter || '');
  const [costCenterName, setCostCenterName] = useState(editingItem?.costCenterName || '');
  const [receiptUrl, setReceiptUrl] = useState(editingItem?.receiptUrl || '');
  const [receiptName, setReceiptName] = useState(editingItem?.receiptName || '');
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [dynamicFields, setDynamicFields] = useState<Record<string, any>>({
    merchantName: editingItem?.merchantName || '',
    location: editingItem?.location || '',
    checkInDate: editingItem?.checkInDate || '',
    checkOutDate: editingItem?.checkOutDate || '',
    numberOfNights: editingItem?.numberOfNights || 1,
    cityName: editingItem?.cityName || '',
    zipCode: editingItem?.zipCode || '',
  });

  const [typeSpecificFields, setTypeSpecificFields] = useState<DynamicField[]>([]);

  useEffect(() => {
    const fields: DynamicField[] = [
      { id: 'merchantName', label: 'Merchant Name', type: 'text', placeholder: 'Enter merchant name', required: true },
    ];

    switch (type) {
      case 'hotel':
        fields.push(
          { id: 'location', label: 'Lodging Location', type: 'text', placeholder: 'Address or hotel name', required: true },
          { id: 'checkInDate', label: 'Check-in Date', type: 'date', required: true },
          { id: 'checkOutDate', label: 'Check-out Date', type: 'date', required: true },
          { id: 'numberOfNights', label: 'Number of Nights', type: 'number', required: true },
          { id: 'cityName', label: 'City', type: 'text', required: true },
          { id: 'zipCode', label: 'ZIP Code', type: 'text', required: true },
        );
        break;
      case 'transport':
        fields.push(
          { id: 'location', label: 'Departure Location', type: 'text', required: true },
          { id: 'cityName', label: 'Destination', type: 'text', required: true },
          { id: 'checkInDate', label: 'Departure Date', type: 'date', required: true },
          { id: 'checkOutDate', label: 'Return Date', type: 'date', required: false },
        );
        break;
      case 'meals':
        fields.push(
          { id: 'cityName', label: 'City', type: 'text', required: true },
        );
        break;
      case 'rental':
        fields.push(
          { id: 'location', label: 'Pickup Location', type: 'text', required: true },
          { id: 'checkInDate', label: 'Pickup Date', type: 'date', required: true },
          { id: 'checkOutDate', label: 'Return Date', type: 'date', required: true },
          { id: 'cityName', label: 'City', type: 'text', required: true },
        );
        break;
      default:
        break;
    }

    setTypeSpecificFields(fields);
  }, [type]);

  const handleDynamicFieldChange = (id: string, value: any) => {
    setDynamicFields(prev => ({
      ...prev,
      [id]: value
    }));
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setReceiptName(file.name);
      setReceiptUrl(`receipt-${Date.now()}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-4 overflow-y-auto">
        {/* Expense Type - Compact version */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Expense Type</label>
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            {expenseTypes.slice(0, 8).map((expType) => (
              <button
                key={expType.value}
                type="button"
                onClick={() => setType(expType.value as ExpenseType)}
                className={cn(
                  "flex flex-col items-center justify-center p-1.5 rounded-lg border transition-all duration-200",
                  type === expType.value 
                    ? "border-blue-500 bg-blue-50" 
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className={cn(
                  "rounded-full mb-0.5",
                  type === expType.value ? `text-blue-500` : "text-gray-500"
                )}>
                  {expType.icon}
                </div>
                <span className="text-xs text-center leading-tight">{expType.label}</span>
              </button>
            ))}
          </div>
          
          <select 
            className="w-full h-9 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={type}
            onChange={(e) => setType(e.target.value as ExpenseType)}
          >
            <option value="" disabled>Select expense type...</option>
            {expenseTypes.map((expType) => (
              <option key={expType.value} value={expType.value}>
                {expType.label}
              </option>
            ))}
          </select>
        </div>

        {/* Amount and Date */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label htmlFor="amount" className="text-sm font-medium text-gray-700 block mb-1">Amount</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <DollarSign className="h-4 w-4" />
              </div>
              <input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="pl-9 w-full h-9 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label htmlFor="date" className="text-sm font-medium text-gray-700 block mb-1">Date</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Calendar className="h-4 w-4" />
              </div>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-9 w-full h-9 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="text-sm font-medium text-gray-700 block mb-1">Description</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-500">
              <FileText className="h-4 w-4" />
            </div>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="pl-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-h-[60px]"
              placeholder="Enter description"
            />
          </div>
        </div>
        
        {/* GL Account and Cost Center */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label htmlFor="account" className="text-sm font-medium text-gray-700 block mb-1">GL Account</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Building className="h-4 w-4" />
              </div>
              <select
                id="account"
                value={account}
                onChange={(e) => handleAccountChange(e.target.value)}
                className="pl-9 w-full h-9 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">Select GL Account</option>
                {glAccounts.map((acc) => (
                  <option key={acc.id} value={acc.code}>
                    {acc.code} - {acc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="costCenter" className="text-sm font-medium text-gray-700 block mb-1">Cost Center</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <BriefcaseBusiness className="h-4 w-4" />
              </div>
              <select
                id="costCenter"
                value={costCenter}
                onChange={(e) => handleCostCenterChange(e.target.value)}
                className="pl-9 w-full h-9 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">Select Cost Center</option>
                {costCenters.map((cc) => (
                  <option key={cc.id} value={cc.code}>
                    {cc.code} - {cc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Type-specific fields */}
        {typeSpecificFields.length > 0 && (
          <div className="mb-3">
            <h3 className="text-sm font-medium text-gray-700 mb-2">{expenseTypes.find(e => e.value === type)?.label} Details</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {typeSpecificFields.map((field) => (
                <div key={field.id} className="mb-1">
                  <label htmlFor={field.id} className="text-sm font-medium text-gray-700 block mb-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'text' && (
                    <Input
                      id={field.id}
                      type="text"
                      value={dynamicFields[field.id] || ''}
                      onChange={(e) => handleDynamicFieldChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="h-9 px-3 py-1 text-sm"
                    />
                  )}
                  {field.type === 'date' && (
                    <Input
                      id={field.id}
                      type="date"
                      value={dynamicFields[field.id] || ''}
                      onChange={(e) => handleDynamicFieldChange(field.id, e.target.value)}
                      className="h-9 px-3 py-1 text-sm"
                    />
                  )}
                  {field.type === 'number' && (
                    <Input
                      id={field.id}
                      type="number"
                      value={dynamicFields[field.id] || ''}
                      onChange={(e) => handleDynamicFieldChange(field.id, parseInt(e.target.value) || 0)}
                      className="h-9 px-3 py-1 text-sm"
                    />
                  )}
                  {field.type === 'select' && field.options && (
                    <Select 
                      value={dynamicFields[field.id] || ''} 
                      onValueChange={(value) => handleDynamicFieldChange(field.id, value)}
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Receipt upload */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block mb-1">Receipt</label>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <div className="relative flex items-center">
                <div className="absolute left-3 text-gray-500">
                  <Paperclip className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  className="pl-9 w-full h-9 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="No receipt attached"
                  value={receiptName || ''}
                  readOnly
                />
                {receiptName && (
                  <button
                    type="button"
                    onClick={() => {
                      setReceiptName('');
                      setReceiptUrl('');
                    }}
                    className="absolute right-3 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
              />
              <div className="px-3 py-1.5 h-9 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
                <Upload className="h-4 w-4 mr-1" />
                <span className="text-sm">Upload</span>
              </div>
            </label>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center pt-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 px-4 py-2 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            <span>Save</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Right side - Receipt Preview */}
      <div className="w-full md:w-1/2 bg-gray-50 flex flex-col border-l border-gray-200 h-full">
        <h3 className="text-sm font-medium text-gray-700 p-4 pb-2 border-b border-gray-200">Receipt Preview</h3>
        
        <div className="flex-1 p-4 flex flex-col items-center justify-center">
          {receiptUrl ? (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <img 
                src={`/public/lovable-uploads/fc953625-155a-4230-9515-5801b4d67e6f.png`} 
                alt="Receipt" 
                className="max-w-full max-h-[90%] object-contain rounded-md shadow-sm" 
              />
              <div className="mt-3 text-sm text-gray-500">
                {receiptName}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-white rounded-md border border-dashed border-gray-300 p-8 w-full h-full">
              <Upload className="h-12 w-12 text-gray-300 mb-3" />
              <p className="text-gray-500 text-center mb-1">No receipt uploaded</p>
              <p className="text-gray-400 text-sm text-center">
                Upload a receipt to see a preview here
              </p>
            </div>
          )}
        </div>
      </div>

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
