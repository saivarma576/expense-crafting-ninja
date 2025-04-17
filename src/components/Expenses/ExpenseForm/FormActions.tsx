
import React from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FormActionsProps {
  onCancel: () => void;
  onSave: () => void;
  programmaticErrors?: {field: string, error: string}[];
  llmWarnings?: string[];
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onCancel, 
  onSave,
  programmaticErrors = [],
  llmWarnings = []
}) => {
  const hasWarnings = programmaticErrors.length > 0 || llmWarnings.length > 0;
  
  return (
    <div className="border-t bg-white py-4 px-6">
      <div className="max-w-[1200px] mx-auto flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={onCancel}
          className="px-6"
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          className="px-6 flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
        >
          Save
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FormActions;
