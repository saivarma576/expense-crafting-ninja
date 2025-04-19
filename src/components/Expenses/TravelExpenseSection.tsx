
import React from 'react';
import { Meal, TravelPurpose } from './CreateExpense/types';

interface TravelExpenseSectionProps {
  fromDate?: Date;
  toDate?: Date;
  travelPurpose?: TravelPurpose;
  travelComments?: string;
  mealsProvided: string;
  meals: Meal[];
}

const TravelExpenseSection: React.FC<TravelExpenseSectionProps> = ({
  fromDate,
  toDate,
  travelPurpose,
  travelComments,
  mealsProvided,
  meals
}) => {
  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
      <h2 className="text-md font-medium mb-2">Business Travel Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Travel Period:</p>
          <p className="font-medium">
            {fromDate?.toLocaleDateString()} - {toDate?.toLocaleDateString()}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Purpose:</p>
          <p className="font-medium">{travelPurpose}</p>
        </div>
        
        {mealsProvided === 'yes' && (
          <div>
            <p className="text-sm text-gray-600">Meals Provided:</p>
            <p className="font-medium">
              {(meals as Meal[]).map(meal => 
                meal.charAt(0).toUpperCase() + meal.slice(1)
              ).join(', ')}
            </p>
          </div>
        )}
        
        {travelComments && (
          <div className="col-span-2">
            <p className="text-sm text-gray-600">Comments:</p>
            <p className="font-medium">{travelComments}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelExpenseSection;
