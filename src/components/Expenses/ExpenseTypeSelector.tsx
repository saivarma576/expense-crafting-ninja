
import React from 'react';
import { 
  Car, Utensils, Building2, Plane, Coffee, Briefcase, ParkingCircle,
  ClipboardCheck, Luggage, BookOpen, Package, HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ExpenseType } from '@/types/expense';

interface ExpenseTypeSelectorProps {
  selectedType: ExpenseType;
  onTypeChange: (type: ExpenseType) => void;
}

const ExpenseTypeSelector: React.FC<ExpenseTypeSelectorProps> = ({ 
  selectedType, 
  onTypeChange 
}) => {
  const allTypes = [
    { value: 'mileage', label: 'Mileage', icon: <Car className="h-4 w-4" /> },
    { value: 'meals', label: 'Meals', icon: <Utensils className="h-4 w-4" /> },
    { value: 'other', label: 'Others', icon: <HelpCircle className="h-4 w-4" /> },
    { value: 'professional_fees', label: 'Professional Fees', icon: <Briefcase className="h-4 w-4" /> },
    { value: 'hotel', label: 'Hotel/Lodging', icon: <Building2 className="h-4 w-4" /> },
    { value: 'parking', label: 'Parking/Tolls', icon: <ParkingCircle className="h-4 w-4" /> },
    { value: 'transport', label: 'Air/Taxi/Uber', icon: <Plane className="h-4 w-4" /> },
    { value: 'business_meals', label: 'Business Meals', icon: <Coffee className="h-4 w-4" /> },
    { value: 'registration', label: 'Registration Fees', icon: <ClipboardCheck className="h-4 w-4" /> },
    { value: 'baggage', label: 'Baggage Fees', icon: <Luggage className="h-4 w-4" /> },
    { value: 'subscriptions', label: 'Dues Subscriptions', icon: <BookOpen className="h-4 w-4" /> },
    { value: 'postage', label: 'Postage & Freight', icon: <Package className="h-4 w-4" /> },
    { value: 'gasoline', label: 'Gasoline', icon: <Package className="h-4 w-4" /> },
    { value: 'office_supplies', label: 'Office Supplies', icon: <Package className="h-4 w-4" /> },
    { value: 'rental', label: 'Rental Car', icon: <Car className="h-4 w-4" /> },
    { value: 'auditing', label: 'Auditing Serv Fees', icon: <Briefcase className="h-4 w-4" /> },
  ];

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">Expense Type</label>
        <select 
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value as ExpenseType)}
          className="h-9 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm w-[200px]"
        >
          <option value="" disabled>Select expense type...</option>
          {allTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center justify-start gap-2 overflow-x-auto py-1">
        {allTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => onTypeChange(type.value as ExpenseType)}
            className={cn(
              "flex flex-col items-center justify-center p-2 border rounded-md transition-all min-w-[70px] h-[50px]",
              selectedType === type.value 
                ? "border-blue-500 bg-blue-50 text-blue-700" 
                : "border-gray-200 hover:bg-gray-50 text-gray-600"
            )}
          >
            {type.icon}
            <span className="text-[11px] mt-1 text-center truncate">
              {type.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExpenseTypeSelector;
