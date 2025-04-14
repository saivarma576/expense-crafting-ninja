
import React from 'react';
import { Plane, Calendar, Coffee, Utensils, Wine, Briefcase, Map, Building2 } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TravelPurpose, Meal } from './CreateExpense/types';

interface TravelExpenseDetailsProps {
  isTravelExpense: boolean;
  travelPurpose?: TravelPurpose;
  fromDate?: Date;
  toDate?: Date;
  mealsProvided: string;
  meals: Meal[];
}

const TravelExpenseDetails: React.FC<TravelExpenseDetailsProps> = ({
  isTravelExpense,
  travelPurpose,
  fromDate,
  toDate,
  mealsProvided,
  meals
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
  
  // Get icon based on meal type
  const getMealIcon = (meal: string) => {
    switch (meal) {
      case 'breakfast':
        return <Coffee className="h-3.5 w-3.5" />;
      case 'lunch':
        return <Utensils className="h-3.5 w-3.5" />;
      case 'dinner':
        return <Wine className="h-3.5 w-3.5" />;
      default:
        return <Utensils className="h-3.5 w-3.5" />;
    }
  };
  
  // Purpose icon and formatted text
  const getPurposeInfo = () => {
    if (!travelPurpose) return { icon: <Briefcase />, text: 'Not specified' };
    
    switch (travelPurpose) {
      case 'conferences':
        return { icon: <Map className="h-5 w-5" />, text: 'Conferences' };
      case 'meeting':
        return { icon: <Building2 className="h-5 w-5" />, text: 'Meetings' };
      default:
        return { icon: <Briefcase className="h-5 w-5" />, text: 'Others' };
    }
  };
  
  const purposeInfo = getPurposeInfo();

  return (
    <Card className="mb-6 overflow-hidden border-blue-100 shadow-sm">
      <div className="bg-blue-500 px-4 py-2 flex items-center">
        <Plane className="h-5 w-5 text-white mr-2" />
        <h3 className="text-white font-medium">Travel Expense Details</h3>
      </div>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-blue-100">
          {/* Purpose section */}
          <div className="p-4 flex flex-col items-center justify-center text-center">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mb-2">
              {purposeInfo.icon}
            </div>
            <p className="text-gray-500 text-sm">Purpose of Travel</p>
            <p className="font-medium">{purposeInfo.text}</p>
          </div>
          
          {/* Duration section */}
          <div className="p-4 flex flex-col items-center justify-center text-center">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mb-2">
              <Calendar className="h-5 w-5" />
            </div>
            <p className="text-gray-500 text-sm">Duration</p>
            <p className="font-medium">{formattedDateRange()}</p>
          </div>
          
          {/* Meals section */}
          <div className="p-4 flex flex-col items-center justify-center text-center">
            <div className="flex gap-1 mb-2">
              {mealsProvided === 'yes' && meals && meals.length > 0 ? (
                meals.map((meal) => (
                  <div key={meal} className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                    {getMealIcon(meal)}
                  </div>
                ))
              ) : (
                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <Utensils className="h-5 w-5" />
                </div>
              )}
            </div>
            <p className="text-gray-500 text-sm">Meals Provided</p>
            {mealsProvided === 'yes' && meals && meals.length > 0 ? (
              <div className="flex gap-1 flex-wrap justify-center mt-1">
                {meals.map((meal) => (
                  <Badge key={meal} variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    {meal.charAt(0).toUpperCase() + meal.slice(1)}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="font-medium text-gray-700">No</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelExpenseDetails;
