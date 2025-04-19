
import React from 'react';
import { 
  Car, Utensils, Building2, Plane, Coffee, Briefcase, ParkingCircle,
  ClipboardCheck, Luggage, BookOpen, Package, HelpCircle
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
  // Primary expense types shown in main row
  const primaryTypes = [
    { value: 'mileage', label: 'Miles', icon: <Car className="h-4 w-4" /> },
    { value: 'meals', label: 'Meals', icon: <Utensils className="h-4 w-4" /> },
    { value: 'hotel', label: 'Hotel', icon: <Building2 className="h-4 w-4" /> },
    { value: 'transport', label: 'Travel', icon: <Plane className="h-4 w-4" /> },
    { value: 'business_meals', label: 'Biz Meal', icon: <Coffee className="h-4 w-4" /> },
    { value: 'professional_fees', label: 'Fees', icon: <Briefcase className="h-4 w-4" /> },
    { value: 'parking', label: 'Parking', icon: <ParkingCircle className="h-4 w-4" /> },
  ];

  // Secondary types shown in dropdown
  const secondaryTypes = [
    { value: 'registration', label: 'Register', icon: <ClipboardCheck className="h-4 w-4" /> },
    { value: 'baggage', label: 'Baggage', icon: <Luggage className="h-4 w-4" /> },
    { value: 'subscriptions', label: 'Subs', icon: <BookOpen className="h-4 w-4" /> },
    { value: 'postage', label: 'Postage', icon: <Package className="h-4 w-4" /> },
    { value: 'other', label: 'Other', icon: <HelpCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="mb-3">
      <label className="text-sm font-medium text-gray-700 block mb-1">Expense Type</label>
      <div className="flex items-center gap-2" style={{ height: 'auto', width: 'auto' }}>
        {primaryTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => onTypeChange(type.value as ExpenseType)}
            style={{ height: '50px', width: '60px' }}
            className={cn(
              "flex flex-col items-center justify-center p-2 border rounded-md transition-all",
              selectedType === type.value 
                ? "border-blue-500 bg-blue-50 text-blue-700" 
                : "border-gray-200 hover:bg-gray-50 text-gray-600"
            )}
          >
            {type.icon}
            <span className="text-[11px] mt-1 text-center leading-tight">
              {type.label}
            </span>
          </button>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger 
            style={{ height: '50px', width: '60px' }}
            className={cn(
              "flex flex-col items-center justify-center p-2 border rounded-md transition-all",
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
                onClick={() => onTypeChange(type.value as ExpenseType)}
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

      <select 
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value as ExpenseType)}
        className="mt-2 w-full h-9 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm"
      >
        <option value="" disabled>Select expense type...</option>
        {[...primaryTypes, ...secondaryTypes].map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpenseTypeSelector;

