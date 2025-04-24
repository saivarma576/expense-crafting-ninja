
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FormValues } from '../types';

interface StepOneV3Props {
  onNext: () => void;
  onCancel: () => void;
  onProceedToExpense: () => void;
}

const StepOneV3: React.FC<StepOneV3Props> = ({ onNext, onCancel, onProceedToExpense }) => {
  const { register, setValue, watch } = useFormContext<FormValues>();
  const isBusinessTravel = watch('isBusinessTravel');

  const handleSelection = (value: string) => {
    setValue('isBusinessTravel', value);
  };

  const handleNext = () => {
    if (isBusinessTravel === 'yes') {
      onNext();
    } else if (isBusinessTravel === 'no') {
      onProceedToExpense();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Is this a business travel expense?</h3>
        <RadioGroup 
          defaultValue={isBusinessTravel}
          className="grid grid-cols-2 gap-4"
          onValueChange={handleSelection}
        >
          <div className="flex items-center">
            <RadioGroupItem value="yes" id="yes" className="peer sr-only" />
            <Label
              htmlFor="yes"
              className="flex flex-col items-center justify-center w-full p-4 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-gray-50"
            >
              <span className="text-3xl mb-2">✈️</span>
              <span className="font-medium">Yes</span>
            </Label>
          </div>
          
          <div className="flex items-center">
            <RadioGroupItem value="no" id="no" className="peer sr-only" />
            <Label
              htmlFor="no"
              className="flex flex-col items-center justify-center w-full p-4 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-gray-50"
            >
              <span className="text-3xl mb-2">📝</span>
              <span className="font-medium">No</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          type="button" 
          onClick={handleNext}
          disabled={!isBusinessTravel}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default StepOneV3;
