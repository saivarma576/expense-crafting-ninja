
import React from 'react';
import { 
  Car, Utensils, Building2, Plane, ParkingCircle, HelpCircle, 
  Coffee, ClipboardCheck, Luggage, BookOpen, Package
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ExpenseType } from '@/types/expense';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface ExpenseTypeSelectorProps {
  selectedType: ExpenseType;
  onTypeChange: (type: ExpenseType) => void;
}

const ExpenseTypeSelector: React.FC<ExpenseTypeSelectorProps> = ({ 
  selectedType, 
  onTypeChange 
}) => {
  const primaryTypes = [
    { value: 'mileage', label: 'Mileage', icon: <Car className="h-4 w-4" /> },
    { value: 'meals', label: 'Meals', icon: <Utensils className="h-4 w-4" /> },
    { value: 'other', label: 'Others', icon: <HelpCircle className="h-4 w-4" /> },
    { value: 'professional_fees', label: 'Professional Fees', icon: <Building2 className="h-4 w-4" /> },
    { value: 'hotel', label: 'Hotel/Lodging', icon: <Building2 className="h-4 w-4" /> },
    { value: 'parking', label: 'Parking/Tolls', icon: <ParkingCircle className="h-4 w-4" /> },
    { value: 'transport', label: 'Air/Taxi/Uber', icon: <Plane className="h-4 w-4" /> },
  ];

  const secondaryTypes = [
    { value: 'business_meals', label: 'Business Meals', icon: <Coffee className="h-4 w-4" /> },
    { value: 'registration', label: 'Registration Fees', icon: <ClipboardCheck className="h-4 w-4" /> },
    { value: 'baggage', label: 'Baggage Fees', icon: <Luggage className="h-4 w-4" /> },
    { value: 'subscriptions', label: 'Dues Subscriptions', icon: <BookOpen className="h-4 w-4" /> },
    { value: 'postage', label: 'Postage & Freight', icon: <Package className="h-4 w-4" /> },
    { value: 'gasoline', label: 'Gasoline', icon: <Package className="h-4 w-4" /> },
    { value: 'office_supplies', label: 'Office Supplies', icon: <Package className="h-4 w-4" /> },
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
          {[...primaryTypes, ...secondaryTypes].map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center justify-start gap-2 overflow-x-auto py-1">
        {primaryTypes.map((type) => (
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

        <DropdownMenu>
          <DropdownMenuTrigger 
            className={cn(
              "flex flex-col items-center justify-center p-2 border rounded-md transition-all min-w-[70px] h-[50px]",
              "border-gray-200 hover:bg-gray-50 text-gray-600"
            )}
          >
            <HelpCircle className="h-4 w-4" />
            <span className="text-[11px] mt-1">More</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-48 bg-white border border-gray-200 shadow-md z-50" 
            sideOffset={5}
          >
            {secondaryTypes.map((type) => (
              <DropdownMenuItem
                key={type.value}
                onSelect={() => onTypeChange(type.value as ExpenseType)}
                className={cn(
                  "flex items-center gap-2 cursor-pointer hover:bg-gray-50",
                  selectedType === type.value && "bg-blue-50 text-blue-700"
                )}
              >
                {type.icon}
                <span>{type.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ExpenseTypeSelector;
