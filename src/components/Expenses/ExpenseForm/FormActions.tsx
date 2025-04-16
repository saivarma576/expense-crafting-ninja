
import React from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';
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
    <div className="mt-8">
      {hasWarnings && (
        <div className="mb-4 rounded-md border">
          {programmaticErrors.length > 0 && (
            <div className="border-b p-3">
              <h4 className="text-sm font-medium text-red-700 mb-1">Issues to resolve:</h4>
              <ul className="space-y-1">
                {programmaticErrors.map((error, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-red-600">
                    <AlertTriangle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                    <span><strong>{error.field}:</strong> {error.error}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {llmWarnings.length > 0 && (
            <div className={cn("p-3", programmaticErrors.length > 0 && "border-t")}>
              <h4 className="text-sm font-medium text-amber-700 mb-1">Recommendations:</h4>
              <ul className="space-y-1">
                {llmWarnings.map((warning, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-amber-600">
                    <AlertTriangle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-3 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-1.5 rounded-md border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          className="flex-1 px-4 py-1.5 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition-colors flex items-center justify-center"
        >
          <span>Save</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default FormActions;
