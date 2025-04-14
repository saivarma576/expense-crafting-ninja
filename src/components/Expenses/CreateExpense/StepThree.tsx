
import React from 'react';
import { ArrowLeft, ArrowRight, Mic, Handshake, FileText } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues, TravelPurpose } from './types';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';

interface StepThreeProps {
  onBack: () => void;
  onNext: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({ onBack, onNext }) => {
  const { control, watch, setValue } = useFormContext<FormValues>();
  const travelPurpose = watch('travelPurpose');

  const handleSelect = (value: TravelPurpose) => {
    setValue('travelPurpose', value);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-4">
      <div className="space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <span className="text-2xl">🎯</span> Purpose of Travel
        </h2>
        
        <FormField
          control={control}
          name="travelPurpose"
          render={({ field }) => (
            <FormItem className="space-y-5">
              <FormLabel className="text-base">
                Select the primary purpose of your business trip
              </FormLabel>
              <div className="grid gap-4">
                <Card 
                  className={`p-4 cursor-pointer hover:bg-primary/5 transition-colors border-2 ${field.value === 'conferences' ? 'border-primary bg-primary/10' : ''}`}
                  onClick={() => handleSelect('conferences')}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Mic className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Conferences</div>
                      <div className="text-sm text-gray-500">Attending industry events and conferences</div>
                    </div>
                  </div>
                </Card>
                
                <Card 
                  className={`p-4 cursor-pointer hover:bg-primary/5 transition-colors border-2 ${field.value === 'meeting' ? 'border-primary bg-primary/10' : ''}`}
                  onClick={() => handleSelect('meeting')}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Handshake className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Meetings</div>
                      <div className="text-sm text-gray-500">Client or team meetings</div>
                    </div>
                  </div>
                </Card>
                
                <Card 
                  className={`p-4 cursor-pointer hover:bg-primary/5 transition-colors border-2 ${field.value === 'others' ? 'border-primary bg-primary/10' : ''}`}
                  onClick={() => handleSelect('others')}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Others</div>
                      <div className="text-sm text-gray-500">Other business purposes</div>
                    </div>
                  </div>
                </Card>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="flex justify-between pt-6">
        <Button 
          type="button" 
          variant="outline"
          onClick={onBack}
          className="group rounded-full px-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Button>
        <Button 
          type="button" 
          onClick={onNext}
          className="group rounded-full px-6"
          disabled={!travelPurpose}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default StepThree;
