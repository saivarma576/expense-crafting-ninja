
import React from 'react';
import { 
  Droplet, Hotel, UtensilsCrossed, Milestone, FileBox, FileQuestion, 
  ParkingCircle, Package, Briefcase, ClipboardCheck, Car, Plane,
  ReceiptText, Luggage, Coffee, BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ExpenseType } from '@/types/expense';

interface ExpenseTypeSelectorProps {
  selectedType: ExpenseType;
  onTypeChange: (type: ExpenseType) => void;
}

// Reordered expense types based on priority
const expenseTypes = [
  { value: 'mileage', label: 'Mileage', icon: <Milestone className="h-4 w-4" /> },
  { value: 'meals', label: 'Meals', icon: <UtensilsCrossed className="h-4 w-4" /> },
  { value: 'other', label: 'Others', icon: <FileQuestion className="h-4 w-4" /> },
  { value: 'professional_fees', label: 'Professional Fees', icon: <Briefcase className="h-4 w-4" /> },
  { value: 'hotel', label: 'Hotel', icon: <Hotel className="h-4 w-4" /> },
  { value: 'parking', label: 'Parking', icon: <ParkingCircle className="h-4 w-4" /> },
  { value: 'transport', label: 'Air/Taxi', icon: <Plane className="h-4 w-4" /> },
  { value: 'business_meals', label: 'Business Meals', icon: <Coffee className="h-4 w-4" /> },
  { value: 'registration', label: 'Registration', icon: <ClipboardCheck className="h-4 w-4" /> },
  { value: 'baggage', label: 'Baggage', icon: <Luggage className="h-4 w-4" /> },
  { value: 'subscriptions', label: 'Subscriptions', icon: <BookOpen className="h-4 w-4" /> },
  { value: 'postage', label: 'Postage', icon: <Package className="h-4 w-4" /> }
];

const ExpenseTypeSelector: React.FC<ExpenseTypeSelectorProps> = ({ 
  selectedType, 
  onTypeChange 
}) => {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-gray-700 block mb-2">Expense Type</label>
      <div className="grid grid-cols-6 gap-2 mb-2">
        {expenseTypes.slice(0, 12).map((expType) => (
          <button
            key={expType.value}
            type="button"
            onClick={() => onTypeChange(expType.value as ExpenseType)}
            className={cn(
              "flex flex-col items-center justify-center py-2 px-1 rounded-lg border transition-all text-xs",
              selectedType === expType.value 
                ? "border-blue-500 bg-blue-50" 
                : "border-gray-200 hover:border-gray-300"
            )}
          >
            <div className={cn(
              "rounded-full mb-1",
              selectedType === expType.value 
                ? "text-blue-600" 
                : "text-gray-500"
            )}>
              {expType.icon}
            </div>
            <span className="text-xs text-center leading-tight truncate w-full px-1">{expType.label}</span>
          </button>
        ))}
      </div>
      
      <select 
        className="w-full h-9 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value as ExpenseType)}
      >
        <option value="" disabled>Select expense type...</option>
        {expenseTypes.map((expType) => (
          <option key={expType.value} value={expType.value}>
            {expType.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpenseTypeSelector;
