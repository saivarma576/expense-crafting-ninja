
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from 'lucide-react';
import { FieldGroupProps } from './types';

const NotesField: React.FC<FieldGroupProps> = ({ values, onChange }) => {
  return (
    <div className="mb-4">
      <Label htmlFor="notes" className="text-xs font-medium text-gray-700 flex items-center">
        Notes <span className="text-gray-400 ml-1 text-[10px]">(optional)</span>
      </Label>
      <div className="relative">
        <Textarea
          id="notes"
          value={values.notes || ''}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="Add any additional information about this expense"
          className="resize-none min-h-20 text-sm pl-8 pt-2"
        />
        <FileText className="w-4 h-4 absolute left-2 top-2 text-gray-400" />
      </div>
    </div>
  );
};

export default NotesField;
