
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
    { type: 'mileage', label: 'Miles', icon: <Car className="h-4 w-4" /> },
    { type: 'meals', label: 'Meals', icon: <Utensils className="h-4 w-4" /> },
    { type: 'hotel', label: 'Hotel', icon: <Hotel className="h-4 w-4" /> },
    { type: 'transport', label: 'Travel', icon: <Plane className="h-4 w-4" /> },
    { type: 'parking', label: 'Parking', icon: <ParkingCircle className="h-4 w-4" /> },
    { type: 'professional_fees', label: 'Prof.', icon: <Briefcase className="h-4 w-4" /> },
    { type: 'business_meals', label: 'B.Meals', icon: <Coffee className="h-4 w-4" /> },
  ];
  
  // Options for the "More" dropdown
  const moreOptions = [
    { type: 'baggage', label: 'Baggage Fees' },
    { type: 'subscriptions', label: 'Subscriptions' },
    { type: 'gasoline', label: 'Gasoline' },
    { type: 'office_supplies', label: 'Office Supplies' },
    { type: 'postage', label: 'Postage' },
    { type: 'registration', label: 'Registration' },
    { type: 'rental', label: 'Car Rental' },
    { type: 'auditing', label: 'Auditing' },
    { type: 'other', label: 'Other', icon: <HelpCircle className="h-4 w-4" /> },
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
