
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, X, Briefcase } from 'lucide-react';
import { TravelPurpose } from '../CreateExpense/types';

interface TravelPurposeFieldProps {
  travelPurpose?: TravelPurpose;
}

const TravelPurposeField: React.FC<TravelPurposeFieldProps> = ({
  travelPurpose
}) => {
  const [isEditingPurpose, setIsEditingPurpose] = useState(false);
  const [localPurpose, setLocalPurpose] = useState(travelPurpose || '');
  
  if (!travelPurpose) return null;
  
  return (
    <div className="mt-1">
      {isEditingPurpose ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-gray-400" />
            <Input 
              value={localPurpose}
              onChange={(e) => setLocalPurpose(e.target.value)}
              className="h-7 text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') setIsEditingPurpose(false);
                if (e.key === 'Escape') setIsEditingPurpose(false);
              }}
            />
          </div>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => setIsEditingPurpose(false)}
            className="h-7 w-7 text-gray-500"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-1 text-sm text-gray-600 group">
          <Briefcase className="h-3.5 w-3.5 text-gray-400" />
          <span>Purpose: {localPurpose.charAt(0).toUpperCase() + localPurpose.slice(1)}</span>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => setIsEditingPurpose(true)}
            className="h-6 w-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500"
          >
            <Pencil className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TravelPurposeField;
