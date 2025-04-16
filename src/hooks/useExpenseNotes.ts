
import { useState, useEffect } from 'react';
import { FormValues } from '@/components/Expenses/CreateExpense/types';
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
        const mealsProvided = expenseData.meals.map(meal => 
          meal.charAt(0).toUpperCase() + meal.slice(1)
        ).join(', ');
        expenseNotes += `Business travel with ${mealsProvided} provided.`;
      }
      
      setNotes(expenseNotes);
    }
  }, [expenseData]);

  return {
    notes,
    setNotes
  };
}
