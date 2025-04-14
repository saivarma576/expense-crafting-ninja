
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileDigit } from 'lucide-react';
import { FieldGroupProps } from './types';

interface GlAccountFieldProps extends FieldGroupProps {
  error?: string | null;
}

const GlAccountField: React.FC<GlAccountFieldProps> = ({ values, onChange, error }) => {
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
          className={`h-8 px-2 py-1 text-sm pl-7 ${error ? 'border-red-500' : ''}`}
          required
        />
        <FileDigit className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default GlAccountField;
