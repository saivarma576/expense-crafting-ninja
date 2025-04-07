
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DynamicField } from '@/types/expense';

interface DynamicFieldsProps {
  fields: DynamicField[];
  values: Record<string, any>;
  onChange: (id: string, value: any) => void;
}

const DynamicFields: React.FC<DynamicFieldsProps> = ({ 
  fields, 
  values, 
  onChange 
}) => {
  if (fields.length === 0) {
    return null;
  }

  return (
    <div className="mb-3">
      <h3 className="text-xs font-medium text-gray-700 mb-1">Additional Details</h3>
      
      <div className="grid grid-cols-2 gap-x-3 gap-y-2">
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="text-xs font-medium text-gray-700 block mb-1">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === 'text' && (
              <Input
                id={field.id}
                type="text"
                value={values[field.id] || ''}
                onChange={(e) => onChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="h-8 px-2 py-1 text-sm"
              />
            )}
            {field.type === 'date' && (
              <Input
                id={field.id}
                type="date"
                value={values[field.id] || ''}
                onChange={(e) => onChange(field.id, e.target.value)}
                className="h-8 px-2 py-1 text-sm"
              />
            )}
            {field.type === 'number' && (
              <Input
                id={field.id}
                type="number"
                value={values[field.id] || ''}
                onChange={(e) => onChange(field.id, parseInt(e.target.value) || 0)}
                className="h-8 px-2 py-1 text-sm"
              />
            )}
            {field.type === 'select' && field.options && (
              <Select 
                value={values[field.id] || ''} 
                onValueChange={(value) => onChange(field.id, value)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicFields;
