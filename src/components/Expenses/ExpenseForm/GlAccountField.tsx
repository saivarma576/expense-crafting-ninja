
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldGroupProps } from './types';

const GlAccountField: React.FC<FieldGroupProps> = ({ values, onChange }) => {
  return (
    <div className="mb-4">
      <Label htmlFor="glAccount" className="text-xs font-medium text-gray-700 flex items-center">
        GL Account <span className="text-red-500 ml-1">*</span>
      </Label>
      <Input
        id="glAccount"
        value={values.glAccount || ''}
        onChange={(e) => onChange('glAccount', e.target.value)}
        placeholder="E.g., 50600140"
        className="h-8 px-2 py-1 text-sm"
        required
      />
    </div>
  );
};

export default GlAccountField;
