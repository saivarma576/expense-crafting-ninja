
import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { Meal } from './types';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

interface DailyMealGridProps {
  startDate?: Date;
  endDate?: Date;
  selectedMeals: Meal[];
  dailyMeals: Record<string, Meal[]>;
  onDailyMealChange: (date: string, meal: Meal) => void;
}

const DailyMealGrid: React.FC<DailyMealGridProps> = ({
  startDate,
  endDate,
  selectedMeals,
  dailyMeals,
  onDailyMealChange,
}) => {
  // Use useMemo to calculate date range only when dates change
  const dateRange = useMemo(() => {
    if (!startDate || !endDate) return [];
    
    const dates = [];
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  }, [startDate, endDate]);

  if (!startDate || !endDate || dateRange.length === 0) return null;

  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="w-full text-left p-2 hover:bg-gray-100 rounded-md">
        🔽 Edit meals by date (Optional)
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 bg-gray-50 border-b text-sm font-medium">
            <div className="p-2 border-r">Date</div>
            <div className="p-2 border-r text-center">🍳 Breakfast</div>
            <div className="p-2 border-r text-center">🥗 Lunch</div>
            <div className="p-2 text-center">🍽️ Dinner</div>
          </div>
          <div className="max-h-[200px] overflow-y-auto">
            {dateRange.map((date) => {
              const dateStr = format(date, 'yyyy-MM-dd');
              const mealsForDate = dailyMeals[dateStr] || selectedMeals;
              
              return (
                <div key={dateStr} className="grid grid-cols-4 border-b last:border-b-0">
                  <div className="p-2 border-r text-sm">
                    {format(date, 'dd-MMM-yy')}
                  </div>
                  {['breakfast', 'lunch', 'dinner'].map((meal, index) => (
                    <div key={meal} className={`p-2 ${index < 2 ? 'border-r' : ''} flex justify-center`}>
                      <Checkbox
                        checked={mealsForDate.includes(meal as Meal)}
                        onCheckedChange={() => onDailyMealChange(dateStr, meal as Meal)}
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DailyMealGrid;
