
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileDigit } from 'lucide-react';
import { FieldGroupProps } from './types';

const GlAccountField: React.FC<FieldGroupProps> = ({ values, onChange }) => {
  return (
    <div className="mb-4">
      <Label htmlFor="glAccount" className="text-xs font-medium text-gray-700 flex items-center">
        GL Account <span className="text-red-500 ml-1">*</span>
      </Label>
      <div className="relative">
        <Input
          id="glAccount"
          value={values.glAccount || ''}
          onChange={(e) => onChange('glAccount', e.target.value)}
          placeholder="E.g., 50600140"
          className="h-8 px-2 py-1 text-sm pl-7"
          required
        />
        <FileDigit className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default GlAccountField;
