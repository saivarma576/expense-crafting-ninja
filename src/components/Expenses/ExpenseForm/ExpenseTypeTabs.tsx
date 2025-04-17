
import React from 'react';
import { 
  Car, Utensils, Hotel, Plane, ParkingCircle, 
  Briefcase, MoreHorizontal, ChevronDown, 
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ExpenseType } from '@/types/expense';

type ExpenseTabOption = {
  type: ExpenseType;
  label: string;
  icon: React.ReactNode;
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
    { type: 'mileage', label: 'Mileage', icon: <Car className="h-5 w-5" /> },
    { type: 'meals', label: 'Meals', icon: <Utensils className="h-5 w-5" /> },
    { type: 'hotel', label: 'Hotel/Lodging', icon: <Hotel className="h-5 w-5" /> },
    { type: 'transport', label: 'Air/Taxi/Uber', icon: <Plane className="h-5 w-5" /> },
    { type: 'parking', label: 'Parking/Tolls', icon: <ParkingCircle className="h-5 w-5" /> },
    { type: 'professional_fees', label: 'Professional', icon: <Briefcase className="h-5 w-5" /> },
  ];
  
  // Options for the "Others" dropdown
  const otherOptions: ExpenseTabOption[] = [
    { type: 'auditing', label: 'Auditing', icon: <MapPin className="h-4 w-4" /> },
    { type: 'baggage', label: 'Baggage', icon: <MapPin className="h-4 w-4" /> },
    { type: 'business_meals', label: 'Business Meals', icon: <Utensils className="h-4 w-4" /> },
    { type: 'subscriptions', label: 'Subscriptions', icon: <MapPin className="h-4 w-4" /> },
    { type: 'gasoline', label: 'Gasoline', icon: <MapPin className="h-4 w-4" /> },
    { type: 'office_supplies', label: 'Office Supplies', icon: <MapPin className="h-4 w-4" /> },
    { type: 'other', label: 'Other', icon: <MoreHorizontal className="h-4 w-4" /> },
    { type: 'postage', label: 'Postage', icon: <MapPin className="h-4 w-4" /> },
    { type: 'registration', label: 'Registration', icon: <MapPin className="h-4 w-4" /> },
    { type: 'rental', label: 'Rental', icon: <MapPin className="h-4 w-4" /> },
  ];

  // Find the currently selected option
  const selectedOption = [...mainTabs, ...otherOptions].find(option => option.type === selectedType);
  
  return (
    <div>
      <div className="mb-2">
        <h3 className="text-sm font-medium text-gray-700">Expense Type</h3>
      </div>
      
      <div className="flex space-x-2 mb-4">
        {mainTabs.map((tab) => (
          <button
            key={tab.type}
            onClick={() => onTypeChange(tab.type)}
            className={cn(
              "flex flex-col items-center justify-center h-20 w-20 p-2 border rounded-md transition-all",
              selectedType === tab.type 
                ? "border-blue-500 bg-blue-50 text-blue-700" 
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            )}
          >
            <div className="mb-1">
              {tab.icon}
            </div>
            <span className="text-xs text-center">{tab.label}</span>
          </button>
        ))}
        
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center justify-center h-20 w-20 p-2 border rounded-md transition-all",
                otherOptions.some(o => o.type === selectedType)
                  ? "border-blue-500 bg-blue-50 text-blue-700" 
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              )}
            >
              <div className="mb-1">
                <MoreHorizontal className="h-5 w-5" />
              </div>
              <span className="text-xs flex items-center">
                Others
                <ChevronDown className="h-3 w-3 ml-0.5" />
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2">
            <div className="grid grid-cols-2 gap-1">
              {otherOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => {
                    onTypeChange(option.type);
                  }}
                  className={cn(
                    "flex items-center space-x-2 p-2 rounded-md text-sm w-full text-left",
                    selectedType === option.type
                      ? "bg-blue-50 text-blue-700"
                      : "hover:bg-gray-100"
                  )}
                >
                  <span className="text-gray-500">{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-medium text-gray-800">
          {selectedOption?.label || 'Expense'} Information
        </h3>
        
        {selectedType === 'mileage' && (
          <div className="ml-auto">
            <h3 className="text-base font-medium text-gray-800">Mileage Details</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTypeTabs;
