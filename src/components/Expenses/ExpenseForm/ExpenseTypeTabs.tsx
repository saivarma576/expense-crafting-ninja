
import React from 'react';
import { ExpenseType } from '@/types/expense';
import { 
  Route, 
  UtensilsCrossed, 
  Building2, 
  Plane, 
  ParkingCircle, 
  Briefcase, 
  MoreHorizontal,
  Fuel,
  Luggage,
  Coffee,
  ScrollText,
  FileSpreadsheet,
  ShoppingBag,
  Box,
  Mail,
  Car
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface ExpenseTypeTabsProps {
  selectedType: ExpenseType;
  onTypeChange: (type: ExpenseType) => void;
}

const mainTypes: Array<{type: ExpenseType, label: string, icon: React.ReactNode}> = [
  { type: 'mileage', label: 'Mileage', icon: <Route className="h-4 w-4" /> },
  { type: 'meals', label: 'Meals', icon: <UtensilsCrossed className="h-4 w-4" /> },
  { type: 'hotel', label: 'Hotel/Lodging', icon: <Building2 className="h-4 w-4" /> },
  { type: 'transport', label: 'Air/Taxi/Uber', icon: <Plane className="h-4 w-4" /> },
  { type: 'parking', label: 'Parking/Tolls', icon: <ParkingCircle className="h-4 w-4" /> },
  { type: 'professional_fees', label: 'Professional...', icon: <Briefcase className="h-4 w-4" /> },
  { type: 'other', label: 'Others', icon: <MoreHorizontal className="h-4 w-4" /> },
];

const otherTypes: Array<{type: ExpenseType, label: string, icon: React.ReactNode}> = [
  { type: 'gasoline', label: 'Gasoline', icon: <Fuel className="h-4 w-4" /> },
  { type: 'baggage', label: 'Baggage Fees', icon: <Luggage className="h-4 w-4" /> },
  { type: 'business_meals', label: 'Business Meals', icon: <Coffee className="h-4 w-4" /> },
  { type: 'subscriptions', label: 'Subscriptions', icon: <ScrollText className="h-4 w-4" /> },
  { type: 'registration', label: 'Registration', icon: <FileSpreadsheet className="h-4 w-4" /> },
  { type: 'office_supplies', label: 'Office Supplies', icon: <ShoppingBag className="h-4 w-4" /> },
  { type: 'postage', label: 'Postage', icon: <Mail className="h-4 w-4" /> },
  { type: 'rental', label: 'Rental Car', icon: <Car className="h-4 w-4" /> },
  { type: 'auditing', label: 'Auditing', icon: <Box className="h-4 w-4" /> },
];

const ExpenseTypeTabs: React.FC<ExpenseTypeTabsProps> = ({ 
  selectedType, 
  onTypeChange 
}) => {
  // Find if selected type is one of the "other" types not shown in main tabs
  const isOtherTypeSelected = !mainTypes.find(t => t.type === selectedType) && selectedType !== 'other';
  const selectedOtherType = otherTypes.find(t => t.type === selectedType);
  
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Expense Type</h3>
      <div className="flex flex-wrap gap-2">
        {mainTypes.map((item, index) => {
          const isSelected = (item.type === selectedType) || 
                            (item.type === 'other' && isOtherTypeSelected);
          
          // For "Others" button, show popover
          if (item.type === 'other') {
            return (
              <Popover key={item.type}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "flex flex-col items-center justify-center p-2 border rounded-md min-w-16",
                      isSelected ? 
                        "border-blue-500 bg-blue-50 text-blue-600" : 
                        "border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    {selectedOtherType ? selectedOtherType.icon : item.icon}
                    <span className="text-xs mt-1">
                      {selectedOtherType ? selectedOtherType.label : item.label}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2">
                  <div className="grid grid-cols-2 gap-2">
                    {otherTypes.map((otherItem) => (
                      <button
                        key={otherItem.type}
                        type="button"
                        className={cn(
                          "flex items-center justify-start gap-2 p-2 border rounded-md text-left",
                          otherItem.type === selectedType ? 
                            "border-blue-500 bg-blue-50 text-blue-600" : 
                            "border-gray-200 hover:bg-gray-50"
                        )}
                        onClick={() => onTypeChange(otherItem.type)}
                      >
                        {otherItem.icon}
                        <span className="text-xs">{otherItem.label}</span>
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            );
          }
          
          // Regular tab buttons
          return (
            <button
              key={item.type}
              type="button"
              className={cn(
                "flex flex-col items-center justify-center p-2 border rounded-md min-w-16",
                isSelected ? 
                  "border-blue-500 bg-blue-50 text-blue-600" : 
                  "border-gray-200 hover:bg-gray-50"
              )}
              onClick={() => onTypeChange(item.type)}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
        
        {/* Dropdown for currently selected expense type */}
        <div className="flex-1 ml-2">
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as ExpenseType)}
            className="w-full h-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          >
            {mainTypes.map((item) => (
              <option key={item.type} value={item.type}>
                {item.label}
              </option>
            ))}
            <optgroup label="Other Types">
              {otherTypes.map((item) => (
                <option key={item.type} value={item.type}>
                  {item.label}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTypeTabs;
