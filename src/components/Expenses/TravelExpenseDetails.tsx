
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MealData, TravelPurpose } from './CreateExpense/types';

interface TravelExpenseDetailsProps {
  isTravelExpense: boolean;
  travelPurpose?: TravelPurpose;
  travelComments?: string;
  fromDate?: Date;
  toDate?: Date;
  mealsProvided: string;
  meals: MealData[];
  onEdit: () => void;
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
  if (!isTravelExpense) {
    return null;
  }
  
  const purposeLabels: Record<TravelPurpose, string> = {
    'conference': 'Conference or Meeting',
    'training': 'Training or Education',
    'client': 'Client Visit',
    'internal': 'Internal Business',
    'other': 'Other Business Purpose'
  };
  
  const formatDate = (date?: Date) => {
    if (!date) return '';
    return format(date, 'MMM dd, yyyy');
  };
  
  // Determine which meals were provided
  const getMealsProvided = () => {
    if (mealsProvided !== 'yes' || !meals || meals.length === 0) {
      return 'None';
    }
    
    const providedMealTypes = [];
    if (meals.some(meal => meal.breakfast)) providedMealTypes.push('Breakfast');
    if (meals.some(meal => meal.lunch)) providedMealTypes.push('Lunch');
    if (meals.some(meal => meal.dinner)) providedMealTypes.push('Dinner');
    
    return providedMealTypes.length > 0 ? providedMealTypes.join(', ') : 'None';
  };

  return (
    <Card className="border-blue-100 bg-blue-50/30 mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-blue-800">Business Travel Details</h3>
            <div className="text-xs text-blue-700 space-y-0.5">
              <p>Purpose: {travelPurpose ? purposeLabels[travelPurpose] : 'Not specified'}</p>
              <p>Dates: {formatDate(fromDate)} - {formatDate(toDate)}</p>
              <p>Meals provided: {getMealsProvided()}</p>
              {travelComments && <p>Additional info: {travelComments}</p>}
            </div>
          </div>
          <Button 
            onClick={onEdit} 
            variant="ghost" 
            size="sm"
            className="mt-2 sm:mt-0 text-blue-700 hover:text-blue-800 hover:bg-blue-100 self-start"
          >
            Edit Travel Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelExpenseDetails;
