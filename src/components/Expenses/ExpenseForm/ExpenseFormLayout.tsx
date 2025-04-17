
import React from 'react';
import ExpenseTypeSelector from '../ExpenseTypeSelector';
import CommonFields from './CommonFields';
import HotelFields from './HotelFields';
import MealsFields from './MealsFields';
import MileageFields from './MileageFields';
import GlAccountField from './GlAccountField';
import NotesField from './NotesField';
import { ExpenseLineItemFormData } from '@/types/expense';
import {
  GL_ACCOUNT_REQUIRED_TYPES,
  HOTEL_LODGING_TYPES,
  MEALS_TYPES,
  MILEAGE_TYPES
} from '../ExpenseFieldUtils';

interface ExpenseFormLayoutProps {
  formValues: ExpenseLineItemFormData;
  onChange: (id: string, value: any) => void;
  fieldErrors: Record<string, string | null>;
  llmSuggestions?: Record<string, string | null>;
}

const ExpenseFormLayout: React.FC<ExpenseFormLayoutProps> = ({
  formValues,
  onChange,
  fieldErrors,
  llmSuggestions = {}
}) => {
  const needsGlAccount = GL_ACCOUNT_REQUIRED_TYPES.includes(formValues.type);
  const isHotelOrLodging = HOTEL_LODGING_TYPES.includes(formValues.type);
  const isMeals = MEALS_TYPES.includes(formValues.type);
  const isMileage = MILEAGE_TYPES.includes(formValues.type);

  return (
    <div className="md:w-[65%]">
      <ExpenseTypeSelector 
        selectedType={formValues.type} 
        onTypeChange={(type) => onChange('type', type)} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <CommonFields
            type={formValues.type}
            values={formValues}
            onChange={onChange}
            isAmountDisabled={formValues.type === 'mileage'}
            fieldErrors={fieldErrors}
            llmSuggestions={llmSuggestions}
          />

          {needsGlAccount && (
            <GlAccountField 
              values={formValues} 
              onChange={onChange} 
              error={fieldErrors.glAccount}
              llmSuggestion={llmSuggestions.glAccount}
            />
          )}
        </div>
        
        <div>
          {isHotelOrLodging && (
            <HotelFields 
              values={formValues} 
              onChange={onChange}
              llmSuggestions={llmSuggestions}
            />
          )}
          
          {isMeals && (
            <MealsFields 
              values={formValues} 
              onChange={onChange}
              llmSuggestions={llmSuggestions}
            />
          )}
          
          {isMileage && (
            <MileageFields 
              values={formValues} 
              onChange={onChange} 
              error={fieldErrors.miles}
              llmSuggestions={llmSuggestions}
            />
          )}
        </div>
      </div>
      
      <NotesField 
        values={formValues} 
        onChange={onChange}
        llmSuggestions={llmSuggestions}
      />
    </div>
  );
};

export default ExpenseFormLayout;
