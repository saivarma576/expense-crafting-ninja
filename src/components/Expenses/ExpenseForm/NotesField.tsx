
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroupProps } from './types';

const NotesField: React.FC<FieldGroupProps> = ({ values, onChange }) => {
  return (
    <div className="mb-4">
      <Label htmlFor="notes" className="text-xs font-medium text-gray-700">
        Notes
      </Label>
      <Textarea
        id="notes"
        value={values.notes || ''}
        onChange={(e) => onChange('notes', e.target.value)}
        placeholder="Add any additional notes"
        className="resize-none h-20 text-sm"
      />
    </div>
  );
};

export default NotesField;
