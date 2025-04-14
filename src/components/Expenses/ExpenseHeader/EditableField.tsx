
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, X } from 'lucide-react';

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  prefix?: string;
  label?: string;
  className?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onChange,
  icon,
  prefix = '',
  label,
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const handleSave = () => {
    onChange(localValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center">
        {icon && <span className="mr-1.5">{icon}</span>}
        <Input 
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          className="h-7 text-right text-sm"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') setIsEditing(false);
          }}
        />
        <Button 
          size="icon" 
          variant="ghost" 
          onClick={() => setIsEditing(false)}
          className="h-7 w-7 text-gray-500 ml-1"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`font-medium text-right group flex items-center justify-end ${className}`}>
      {label && <span className="text-gray-500 mr-2">{label}:</span>}
      {icon && <span className="mr-1.5">{icon}</span>}
      {prefix}{localValue}
      <Button 
        size="icon" 
        variant="ghost" 
        onClick={() => setIsEditing(true)}
        className="h-6 w-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 ml-1"
      >
        <Pencil className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default EditableField;
