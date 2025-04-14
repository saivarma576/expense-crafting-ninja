
import React from 'react';
import { Mic, Handshake, FileText, MessageSquare } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from './types';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TravelPurposeSelector: React.FC = () => {
  const { control } = useFormContext<FormValues>();

  return (
    <div className="space-y-4">
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

      <FormField
        control={control}
        name="travelComments"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              Comments (Optional)
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Add any additional details about your travel purpose..."
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TravelPurposeSelector;
