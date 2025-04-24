
import React from 'react';
import { Plane, Calendar, Utensils, Edit, MessageSquare, CalendarClock } from 'lucide-react';
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
    return 'Date not specified';
  };
  
  // Get formatted purpose text
  const getPurposeText = () => {
    if (!travelPurpose) return 'Not specified';
    
    const purposeMap: Record<TravelPurpose, string> = {
      conferences: 'Conference',
      training: 'Training',
      client_visit: 'Client Visit',
      other: 'Other',
      meeting: 'Meeting'
    };
    
    return purposeMap[travelPurpose] || travelPurpose.charAt(0).toUpperCase() + travelPurpose.slice(1);
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
          <span className="font-medium text-gray-600">Travel Purpose:</span>
          <span className="font-medium">{getPurposeText()}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-600">Duration:</span>
          <CalendarClock className="h-3.5 w-3.5 text-gray-400 mx-1" />
          <span className="font-medium">{formattedDateRange()}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-600">Meals Provided:</span>
          <span className="font-medium">
            {mealsProvided === 'yes' ? (
              <span className="flex items-center gap-1">
                Yes <Badge variant="outline" className="ml-1 bg-green-50 text-green-600 border-green-200">{getMealsText()}</Badge>
              </span>
            ) : (
              <span>No</span>
            )}
          </span>
        </div>

        {travelComments && (
          <div className="flex items-center gap-1 text-gray-600">
            <MessageSquare className="h-3.5 w-3.5 text-gray-400 mr-1" />
            <span className="italic truncate max-w-[200px]">{travelComments}</span>
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
