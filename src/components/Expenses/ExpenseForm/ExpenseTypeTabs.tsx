
import React from 'react';
import { 
  Car, Utensils, Hotel, Plane, ParkingCircle, 
  Briefcase, MoreHorizontal, Coffee, HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ExpenseType } from '@/types/expense';

interface ExpenseTypeTabsProps {
  selectedType: ExpenseType;
  onTypeChange: (type: ExpenseType) => void;
}

const ExpenseTypeTabs: React.FC<ExpenseTypeTabsProps> = ({
  selectedType,
  onTypeChange
}) => {
  // Main tabs that are always visible
  const mainTabs = [
    { type: 'mileage' as ExpenseType, label: 'Miles', icon: <Car className="h-4 w-4" /> },
    { type: 'meals' as ExpenseType, label: 'Meals', icon: <Utensils className="h-4 w-4" /> },
    { type: 'hotel' as ExpenseType, label: 'Hotel', icon: <Hotel className="h-4 w-4" /> },
    { type: 'transport' as ExpenseType, label: 'Travel', icon: <Plane className="h-4 w-4" /> },
    { type: 'parking' as ExpenseType, label: 'Parking', icon: <ParkingCircle className="h-4 w-4" /> },
    { type: 'professional_fees' as ExpenseType, label: 'Prof.', icon: <Briefcase className="h-4 w-4" /> },
    { type: 'business_meals' as ExpenseType, label: 'B.Meals', icon: <Coffee className="h-4 w-4" /> },
  ];
  
  // Options for the "More" dropdown
  const moreOptions = [
    { type: 'baggage' as ExpenseType, label: 'Baggage Fees' },
    { type: 'subscriptions' as ExpenseType, label: 'Subscriptions' },
    { type: 'gasoline' as ExpenseType, label: 'Gasoline' },
    { type: 'office_supplies' as ExpenseType, label: 'Office Supplies' },
    { type: 'postage' as ExpenseType, label: 'Postage' },
    { type: 'registration' as ExpenseType, label: 'Registration' },
    { type: 'rental' as ExpenseType, label: 'Car Rental' },
    { type: 'auditing' as ExpenseType, label: 'Auditing' },
    { type: 'other' as ExpenseType, label: 'Other', icon: <HelpCircle className="h-4 w-4" /> },
  ];

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-sm font-medium text-gray-700">Expense Type</h3>
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        {mainTabs.map((tab) => (
          <button
            key={tab.type}
            onClick={() => onTypeChange(tab.type)}
            className={cn(
              "flex flex-col items-center justify-center h-14 w-14 p-1 border rounded-md transition-all text-center",
              selectedType === tab.type 
                ? "border-blue-500 bg-blue-50 text-blue-700" 
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            )}
          >
            <div className="mb-0.5">
              {tab.icon}
            </div>
            <span className="text-[10px] leading-tight">
              {tab.label}
            </span>
          </button>
        ))}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center justify-center h-14 w-14 p-1 border rounded-md transition-all",
                moreOptions.some(o => o.type === selectedType)
                  ? "border-blue-500 bg-blue-50 text-blue-700" 
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              )}
            >
              <div className="mb-0.5">
                <MoreHorizontal className="h-4 w-4" />
              </div>
              <span className="text-[10px] leading-tight">
                More
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 bg-white">
            {moreOptions.map((option) => (
              <DropdownMenuItem
                key={option.type}
                onClick={() => onTypeChange(option.type)}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2",
                  selectedType === option.type && "bg-blue-50 text-blue-700"
                )}
              >
                <span>{option.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ExpenseTypeTabs;
