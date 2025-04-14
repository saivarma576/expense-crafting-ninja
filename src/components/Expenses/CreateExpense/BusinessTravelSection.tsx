
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from './types';

const BusinessTravelSection: React.FC = () => {
  return (
    <div className="space-y-4 pl-4 border-l-2 border-primary/20">
      <p className="text-sm text-muted-foreground">
        Please provide additional information about your business travel expense.
      </p>
    </div>
  );
};

export default BusinessTravelSection;
