
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FormActionsProps {
  onCancel: () => void;
  onSave: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ onCancel, onSave }) => {
  return (
    <div className="flex items-center gap-3 mt-auto pt-1">
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
  );
};

export default FormActions;
