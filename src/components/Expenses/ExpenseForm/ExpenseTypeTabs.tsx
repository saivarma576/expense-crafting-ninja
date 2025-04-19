
import React from 'react';
import { 
  Car, Utensils, HelpCircle, Briefcase, Building2, ParkingCircle,
  Plane, Coffee, ClipboardCheck, Luggage, BookOpen, Package, MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ExpenseType } from '@/types/expense';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface ExpenseTypeTabsProps {
  selectedType: ExpenseType;
  onTypeChange: (type: ExpenseType) => void;
}

const ExpenseTypeTabs: React.FC<ExpenseTypeTabsProps> = ({
  selectedType,
  onTypeChange
}) => {
  // Primary expense types shown in the main row
  const primaryTypes = [
    { type: 'mileage' as ExpenseType, label: 'Mileage', icon: <Car className="h-4 w-4" /> },
    { type: 'meals' as ExpenseType, label: 'Meals', icon: <Utensils className="h-4 w-4" /> },
    { type: 'hotel' as ExpenseType, label: 'Hotel', icon: <Building2 className="h-4 w-4" /> },
    { type: 'transport' as ExpenseType, label: 'Air/Transport', icon: <Plane className="h-4 w-4" /> },
    { type: 'business_meals' as ExpenseType, label: 'Biz Meals', icon: <Coffee className="h-4 w-4" /> },
  ];

  // Secondary types shown in the dropdown
  const secondaryTypes = [
    { type: 'professional_fees' as ExpenseType, label: 'Prof Fees', icon: <Briefcase className="h-4 w-4" /> },
    { type: 'parking' as ExpenseType, label: 'Parking', icon: <ParkingCircle className="h-4 w-4" /> },
    { type: 'registration' as ExpenseType, label: 'Registration', icon: <ClipboardCheck className="h-4 w-4" /> },
    { type: 'baggage' as ExpenseType, label: 'Baggage', icon: <Luggage className="h-4 w-4" /> },
    { type: 'subscriptions' as ExpenseType, label: 'Subscriptions', icon: <BookOpen className="h-4 w-4" /> },
    { type: 'postage' as ExpenseType, label: 'Postage', icon: <Package className="h-4 w-4" /> },
    { type: 'other' as ExpenseType, label: 'Other', icon: <HelpCircle className="h-4 w-4" /> },
  ];

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-sm font-medium text-gray-700">Expense Type</h3>
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        {primaryTypes.map((type) => (
          <button
            key={type.type}
            onClick={() => onTypeChange(type.type)}
            className={cn(
              "flex flex-col items-center justify-center p-2 border rounded-md transition-all min-w-[80px]",
              selectedType === type.type 
                ? "border-blue-500 bg-blue-50 text-blue-700" 
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            )}
          >
            {type.icon}
            <span className="text-[10px] mt-1 text-center leading-tight">
              {type.label}
            </span>
          </button>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger className={cn(
            "flex flex-col items-center justify-center p-2 border rounded-md transition-all min-w-[80px]",
            "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
          )}>
            <MoreHorizontal className="h-4 w-4" />
            <span className="text-[10px] mt-1">More</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white">
            {secondaryTypes.map((type) => (
              <DropdownMenuItem
                key={type.type}
                onClick={() => onTypeChange(type.type)}
                className={cn(
                  "flex items-center space-x-2 cursor-pointer",
                  selectedType === type.type && "bg-blue-50 text-blue-700"
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
        className="w-full h-9 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm"
      >
        <option value="" disabled>Select expense type...</option>
        {[...primaryTypes, ...secondaryTypes].map((type) => (
          <option key={type.type} value={type.type}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpenseTypeTabs;
