
import React from 'react';
import { 
  Car, Utensils, Hotel, Plane, ParkingCircle, 
  Briefcase, MoreHorizontal, MapPin, Coffee 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ExpenseType } from '@/types/expense';

type ExpenseTabOption = {
  type: ExpenseType;
  label: string;
  icon: React.ReactNode;
  shortLabel?: string;
}

interface ExpenseTypeTabsProps {
  selectedType: ExpenseType;
  onTypeChange: (type: ExpenseType) => void;
}

const ExpenseTypeTabs: React.FC<ExpenseTypeTabsProps> = ({
  selectedType,
  onTypeChange
}) => {
  // Main tabs that are always visible
  const mainTabs: ExpenseTabOption[] = [
    { type: 'mileage', label: 'Mileage', icon: <Car className="h-5 w-5" />, shortLabel: 'Miles' },
    { type: 'meals', label: 'Meals', icon: <Utensils className="h-5 w-5" /> },
    { type: 'hotel', label: 'Hotel/Lodging', icon: <Hotel className="h-5 w-5" />, shortLabel: 'Hotel' },
    { type: 'transport', label: 'Air/Taxi/Uber', icon: <Plane className="h-5 w-5" />, shortLabel: 'Travel' },
    { type: 'parking', label: 'Parking/Tolls', icon: <ParkingCircle className="h-5 w-5" />, shortLabel: 'Parking' },
    { type: 'professional_fees', label: 'Professional', icon: <Briefcase className="h-5 w-5" />, shortLabel: 'Prof.' },
    { type: 'business_meals', label: 'Business Meals', icon: <Coffee className="h-5 w-5" />, shortLabel: 'B.Meals' },
  ];
  
  // Options for the "More" dropdown
  const moreOptions: ExpenseTabOption[] = [
    { type: 'baggage', label: 'Baggage Fees', icon: <MapPin className="h-4 w-4" /> },
    { type: 'subscriptions', label: 'Subscriptions', icon: <MapPin className="h-4 w-4" /> },
    { type: 'gasoline', label: 'Gasoline', icon: <MapPin className="h-4 w-4" /> },
    { type: 'office_supplies', label: 'Office Supplies', icon: <MapPin className="h-4 w-4" /> },
    { type: 'other', label: 'Other', icon: <MoreHorizontal className="h-4 w-4" /> },
    { type: 'postage', label: 'Postage', icon: <MapPin className="h-4 w-4" /> },
    { type: 'registration', label: 'Registration', icon: <MapPin className="h-4 w-4" /> },
    { type: 'rental', label: 'Rental', icon: <MapPin className="h-4 w-4" /> },
    { type: 'auditing', label: 'Auditing', icon: <MapPin className="h-4 w-4" /> },
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
              "flex flex-col items-center justify-center h-16 w-16 p-1.5 border rounded-md transition-all text-center",
              selectedType === tab.type 
                ? "border-blue-500 bg-blue-50 text-blue-700" 
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            )}
          >
            <div className="mb-1">
              {tab.icon}
            </div>
            <span className="text-[10px] leading-tight">
              {tab.shortLabel || tab.label}
            </span>
          </button>
        ))}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center justify-center h-16 w-16 p-1.5 border rounded-md transition-all",
                moreOptions.some(o => o.type === selectedType)
                  ? "border-blue-500 bg-blue-50 text-blue-700" 
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              )}
            >
              <div className="mb-1">
                <MoreHorizontal className="h-5 w-5" />
              </div>
              <span className="text-[10px] leading-tight">
                More
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {moreOptions.map((option) => (
              <DropdownMenuItem
                key={option.type}
                onClick={() => onTypeChange(option.type)}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2",
                  selectedType === option.type && "bg-blue-50 text-blue-700"
                )}
              >
                <span className="text-gray-500">{option.icon}</span>
                <span>{option.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-medium text-gray-800">
          {[...mainTabs, ...moreOptions].find(opt => opt.type === selectedType)?.label || 'Expense'} Information
        </h3>
      </div>
    </div>
  );
};

export default ExpenseTypeTabs;
