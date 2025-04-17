
import React from 'react';
import { Car, UtensilsCrossed, Building2, PlaneTakeoff, CircleParking, Building, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ExpenseType } from '@/types/expense';

interface ExpenseTypeButtonProps {
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const ExpenseTypeButton: React.FC<ExpenseTypeButtonProps> = ({ icon, label, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-col items-center gap-1 p-3 rounded-lg transition-all",
      "hover:bg-gray-50",
      isSelected ? "bg-blue-50 text-blue-600 ring-2 ring-blue-200" : "text-gray-600"
    )}
  >
    <div className="h-5 w-5">{icon}</div>
    <span className="text-xs font-medium whitespace-nowrap">{label}</span>
  </button>
);

interface ExpenseTypesProps {
  selectedType: ExpenseType;
  onTypeChange: (type: ExpenseType) => void;
}

const ExpenseTypes: React.FC<ExpenseTypesProps> = ({ selectedType, onTypeChange }) => {
  const types = [
    { id: 'mileage', icon: <Car />, label: 'Mileage' },
    { id: 'meals', icon: <UtensilsCrossed />, label: 'Meals' },
    { id: 'hotel', icon: <Building2 />, label: 'Hotel/Lodging' },
    { id: 'transport', icon: <PlaneTakeoff />, label: 'Air/Taxi/Uber' },
    { id: 'parking', icon: <CircleParking />, label: 'Parking/Tolls' },
    { id: 'professional_fees', icon: <Building />, label: 'Professional' },
    { id: 'other', icon: <HelpCircle />, label: 'Others' },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Expense Type</h3>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {types.map((type) => (
          <ExpenseTypeButton
            key={type.id}
            icon={type.icon}
            label={type.label}
            isSelected={selectedType === type.id}
            onClick={() => onTypeChange(type.id as ExpenseType)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseTypes;
