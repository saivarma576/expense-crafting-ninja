
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, X } from 'lucide-react';

interface EditableTitleProps {
  title: string;
  setTitle: (title: string) => void;
}

const EditableTitle: React.FC<EditableTitleProps> = ({
  title,
  setTitle
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  
  return (
    <>
      {isEditingTitle ? (
        <div className="flex items-center gap-2">
          <Input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-9 min-w-[300px] font-medium"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') setIsEditingTitle(false);
              if (e.key === 'Escape') setIsEditingTitle(false);
            }}
          />
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => setIsEditingTitle(false)}
            className="h-8 w-8 text-gray-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 group">
          <h2 className="text-xl font-medium text-gray-800">{title}</h2>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => setIsEditingTitle(true)}
            className="h-7 w-7 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </>
  );
};

export default EditableTitle;
