
import React, { useState } from 'react';
import { 
  Droplet, Hotel, UtensilsCrossed, Milestone, FileBox, FileQuestion, 
  ParkingCircle, Package, Briefcase, ClipboardCheck, Car, Plane,
  ReceiptText, Luggage, Coffee, BookOpen, MoreHorizontal, FileCheck, Fuel
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ExpenseType } from '@/types/expense';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

interface ExpenseTypeSelectorProps {
  selectedType: ExpenseType;
  onTypeChange: (type: ExpenseType) => void;
}

// Primary expense types that appear in the grid
const primaryExpenseTypes = [
  { value: 'mileage', label: 'Mileage', icon: <Milestone className="h-4 w-4" /> },
  { value: 'meals', label: 'Meals', icon: <UtensilsCrossed className="h-4 w-4" /> },
  { value: 'hotel', label: 'Hotel/Lodging', icon: <Hotel className="h-4 w-4" /> },
  { value: 'transport', label: 'Air/Taxi/Uber', icon: <Plane className="h-4 w-4" /> },
  { value: 'parking', label: 'Parking/Tolls', icon: <ParkingCircle className="h-4 w-4" /> },
  { value: 'professional_fees', label: 'Professional Fees', icon: <Briefcase className="h-4 w-4" /> },
  { value: 'other', label: 'Others', icon: <FileQuestion className="h-4 w-4" /> },
];

// All expense types for the dropdown
const allExpenseTypes = [
  ...primaryExpenseTypes,
  { value: 'auditing', label: 'Auditing Serv Fees', icon: <FileCheck className="h-4 w-4" /> },
  { value: 'baggage', label: 'Baggage Fees', icon: <Luggage className="h-4 w-4" /> },
  { value: 'business_meals', label: 'Business Meals', icon: <Coffee className="h-4 w-4" /> },
  { value: 'subscriptions', label: 'Dues Subscriptions', icon: <BookOpen className="h-4 w-4" /> },
  { value: 'gasoline', label: 'Gasoline', icon: <Fuel className="h-4 w-4" /> },
  { value: 'office_supplies', label: 'Office Supplies', icon: <FileBox className="h-4 w-4" /> },
  { value: 'postage', label: 'Postage & Freight', icon: <Package className="h-4 w-4" /> },
  { value: 'registration', label: 'Registration Fees', icon: <ClipboardCheck className="h-4 w-4" /> },
  { value: 'rental', label: 'Rental Car', icon: <Car className="h-4 w-4" /> },
];

const ExpenseTypeSelector: React.FC<ExpenseTypeSelectorProps> = ({ 
  selectedType, 
  onTypeChange 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get the label for the currently selected type
  const getSelectedTypeLabel = () => {
    const selectedTypeObj = allExpenseTypes.find(type => type.value === selectedType);
    return selectedTypeObj ? selectedTypeObj.label : 'Select Type';
  };

  return (
    <div className="mb-3">
      <label className="text-sm font-medium text-gray-700 block mb-1.5">Expense Type</label>
      
      <div className="flex items-start space-x-2">
        {/* Grid View for Primary Types */}
        <div className="grid grid-cols-3 md:grid-cols-7 gap-1.5 flex-1">
          {primaryExpenseTypes.map((expType) => (
            <button
              key={expType.value}
              type="button"
              onClick={() => onTypeChange(expType.value as ExpenseType)}
              className={cn(
                "flex flex-col items-center justify-center py-1.5 px-0.5 rounded-md border transition-all text-xs",
                selectedType === expType.value 
                  ? "border-blue-500 bg-blue-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className={cn(
                "rounded-full mb-0.5",
                selectedType === expType.value 
                  ? "text-blue-600" 
                  : "text-gray-500"
              )}>
                {expType.icon}
              </div>
              <span className="text-[10px] leading-tight truncate w-full px-0.5">{expType.label}</span>
            </button>
          ))}
        </div>
        
        {/* Dropdown for All Types */}
        <div className="w-36">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="flex items-center justify-between w-full h-[40px] px-3 py-2 text-xs border border-gray-200 rounded-md bg-white hover:border-gray-300"
              >
                <span className="truncate">{getSelectedTypeLabel()}</span>
                <ChevronDown className="ml-1 h-3 w-3 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-[300px] overflow-y-auto">
              <DropdownMenuGroup>
                {allExpenseTypes.map((expType) => (
                  <DropdownMenuItem 
                    key={expType.value}
                    onClick={() => onTypeChange(expType.value as ExpenseType)}
                    className={cn(
                      "flex items-center cursor-pointer",
                      selectedType === expType.value ? "bg-blue-50 text-blue-600" : ""
                    )}
                  >
                    <span className="mr-2">{expType.icon}</span>
                    <span>{expType.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTypeSelector;
