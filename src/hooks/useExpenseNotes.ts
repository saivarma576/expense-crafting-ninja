
import { useState, useEffect } from 'react';
import { FormValues, MealData } from '@/components/Expenses/CreateExpense/types';
import { format } from 'date-fns';

export function useExpenseNotes(expenseData?: FormValues) {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (expenseData) {
      let expenseNotes = '';
      
      if (expenseData.travelPurpose) {
        expenseNotes += `Purpose: ${expenseData.travelPurpose.charAt(0).toUpperCase() + expenseData.travelPurpose.slice(1)}\n`;
      }
      
      if (expenseData.fromDate && expenseData.toDate) {
        const fromDateStr = format(expenseData.fromDate, 'MMM dd, yyyy');
        const toDateStr = format(expenseData.toDate, 'MMM dd, yyyy');
        expenseNotes += `Date range: ${fromDateStr} - ${toDateStr}\n`;
      }
      
      if (expenseData.mealsProvided === 'yes' && expenseData.meals?.length > 0) {
        // Extract meal types that are provided (where boolean is true)
        const providedMealTypes = [];
        if (expenseData.meals.some(meal => meal.breakfast)) providedMealTypes.push('Breakfast');
        if (expenseData.meals.some(meal => meal.lunch)) providedMealTypes.push('Lunch');
        if (expenseData.meals.some(meal => meal.dinner)) providedMealTypes.push('Dinner');
        
        if (providedMealTypes.length > 0) {
          expenseNotes += `Business travel with ${providedMealTypes.join(', ')} provided.`;
        }
      }
      
      setNotes(expenseNotes);
    }
  }, [expenseData]);

  return {
    notes,
    setNotes
  };
}
