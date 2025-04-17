
import React from 'react';
import { ArrowRight } from 'lucide-react';
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
  const hasErrors = programmaticErrors.length > 0;
  
  return (
    <div className="border-t bg-white py-4 px-6 sticky bottom-0 z-10">
      <div className="max-w-[1200px] mx-auto flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={onCancel}
          className="min-w-[100px]"
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          className={cn(
            "min-w-[100px] flex items-center gap-2 bg-blue-500 hover:bg-blue-600",
            hasErrors ? "bg-gray-400 hover:bg-gray-500" : ""
          )}
          disabled={hasErrors}
        >
          Save
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FormActions;
