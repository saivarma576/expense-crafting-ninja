
import React from 'react';
import { Mic, Handshake, FileText } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from './types';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TravelPurposeSelector: React.FC = () => {
  const { control } = useFormContext<FormValues>();

  return (
    <FormField
      control={control}
      name="travelPurpose"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Purpose of Travel</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="conferences" className="flex items-center">
                <div className="flex items-center">
                  <Mic className="h-4 w-4 mr-2 text-primary" />
                  <span>Conferences</span>
                </div>
              </SelectItem>
              <SelectItem value="meeting">
                <div className="flex items-center">
                  <Handshake className="h-4 w-4 mr-2 text-primary" />
                  <span>Meetings</span>
                </div>
              </SelectItem>
              <SelectItem value="others">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-primary" />
                  <span>Others</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TravelPurposeSelector;
