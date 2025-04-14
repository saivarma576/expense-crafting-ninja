
import React from 'react';
import { Plane, Calendar, Coffee, Utensils, Wine, Briefcase, Map, Building2, Edit, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TravelPurpose, Meal } from './CreateExpense/types';

interface TravelExpenseDetailsProps {
  isTravelExpense: boolean;
  travelPurpose?: TravelPurpose;
  travelComments?: string;
  fromDate?: Date;
  toDate?: Date;
  mealsProvided: string;
  meals: Meal[];
  onEdit?: () => void;
}

const TravelExpenseDetails: React.FC<TravelExpenseDetailsProps> = ({
  isTravelExpense,
  travelPurpose,
  travelComments,
  fromDate,
  toDate,
  mealsProvided,
  meals,
  onEdit
}) => {
  if (!isTravelExpense) return null;
  
  // Format date range for display
  const formattedDateRange = () => {
    if (fromDate && toDate) {
      const fromDateStr = format(fromDate, 'MMM dd, yyyy');
      const toDateStr = format(toDate, 'MMM dd, yyyy');
      return `${fromDateStr} - ${toDateStr}`;
    }
    return '';
  };
  
  // Get formatted purpose text
  const getPurposeText = () => {
    if (!travelPurpose) return 'Not specified';
    return travelPurpose.charAt(0).toUpperCase() + travelPurpose.slice(1);
  };
  
  // Get meals text
  const getMealsText = () => {
    if (mealsProvided === 'yes' && meals && meals.length > 0) {
      return meals.map(meal => 
        meal.charAt(0).toUpperCase() + meal.slice(1)
      ).join(', ');
    }
    return 'None';
  };

  return (
    <div className="mb-6 flex items-center bg-blue-50 p-3 rounded-lg text-sm border border-blue-100">
      <Plane className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 flex-grow">
        <div className="flex items-center gap-1">
          <span className="text-gray-500">Purpose:</span>
          <span className="font-medium">{getPurposeText()}</span>
          {travelComments && (
            <div className="flex items-center gap-1 ml-1 text-gray-500">
              <MessageSquare className="h-3.5 w-3.5" />
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5 text-gray-400 mr-1" />
          <span className="font-medium">{formattedDateRange()}</span>
        </div>
        
        {mealsProvided === 'yes' && meals && meals.length > 0 && (
          <div className="flex items-center gap-1">
            <Utensils className="h-3.5 w-3.5 text-gray-400 mr-1" />
            <span className="font-medium">Meals: {getMealsText()}</span>
          </div>
        )}

        {travelComments && (
          <div className="w-full mt-1 text-gray-600 text-xs italic">
            "{travelComments}"
          </div>
        )}
      </div>
      
      {onEdit && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onEdit}
          className="ml-2 h-8 px-2 text-blue-500 hover:text-blue-700 hover:bg-blue-100"
        >
          <Edit className="h-3.5 w-3.5" />
          <span className="sr-only">Edit travel details</span>
        </Button>
      )}
    </div>
  );
};

export default TravelExpenseDetails;
