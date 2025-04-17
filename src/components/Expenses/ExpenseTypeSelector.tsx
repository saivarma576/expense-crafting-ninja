
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
  { value: 'mileage', label: 'Mileage', icon: <Milestone className="h-5 w-5" /> },
  { value: 'meals', label: 'Meals', icon: <UtensilsCrossed className="h-5 w-5" /> },
  { value: 'other', label: 'Others', icon: <FileQuestion className="h-5 w-5" /> },
  { value: 'professional_fees', label: 'Professional Fees', icon: <Briefcase className="h-5 w-5" /> },
  { value: 'hotel', label: 'Hotel', icon: <Hotel className="h-5 w-5" /> },
  { value: 'parking', label: 'Parking', icon: <ParkingCircle className="h-5 w-5" /> },
  { value: 'transport', label: 'Air/Taxi', icon: <Plane className="h-5 w-5" /> },
  { value: 'business_meals', label: 'Business Meals', icon: <Coffee className="h-5 w-5" /> },
  { value: 'registration', label: 'Registration', icon: <ClipboardCheck className="h-5 w-5" /> },
  { value: 'baggage', label: 'Baggage', icon: <Luggage className="h-5 w-5" /> },
  { value: 'subscriptions', label: 'Subscriptions', icon: <BookOpen className="h-5 w-5" /> },
  { value: 'postage', label: 'Postage', icon: <Package className="h-5 w-5" /> },
  { value: 'gasoline', label: 'Gasoline', icon: <Droplet className="h-5 w-5" /> },
  { value: 'office_supplies', label: 'Office Supplies', icon: <FileBox className="h-5 w-5" /> },
  { value: 'rental', label: 'Rental Car', icon: <Car className="h-5 w-5" /> },
  { value: 'auditing', label: 'Auditing', icon: <ReceiptText className="h-5 w-5" /> }
];

const ExpenseTypeSelector: React.FC<ExpenseTypeSelectorProps> = ({ 
  selectedType, 
  onTypeChange 
}) => {
  return (
    <div className="mb-5">
      <label className="text-sm font-medium text-gray-700 block mb-3">Expense Type</label>
      <div className="grid grid-cols-6 gap-2 mb-3">
        {expenseTypes.slice(0, 12).map((expType) => (
          <button
            key={expType.value}
            type="button"
            onClick={() => onTypeChange(expType.value as ExpenseType)}
            className={cn(
              "flex flex-col items-center justify-center py-3 px-2 rounded-lg border transition-all duration-200",
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
            <span className="text-xs text-center leading-tight">{expType.label.split('/')[0]}</span>
          </button>
        ))}
      </div>
      
      <select 
        className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
