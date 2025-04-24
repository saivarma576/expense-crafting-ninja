
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormValues, MealData } from './types';

const BusinessTravelSection: React.FC = () => {
  const { watch } = useFormContext<FormValues>();
  const meals = watch('meals') as MealData[];
  
  return (
    <div className="space-y-4 pl-4 border-l-2 border-primary/20">
      <p className="text-sm text-muted-foreground">
        Please provide additional information about your business travel expense.
      </p>
    </div>
  );
};

export default BusinessTravelSection;
