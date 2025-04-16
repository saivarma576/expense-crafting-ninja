
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface NotesSectionProps {
  notes: string;
  setNotes: (notes: string) => void;
  helperText?: string;
  showPolicyText?: boolean;
}

const NotesSection: React.FC<NotesSectionProps> = ({ 
  notes, 
  setNotes, 
  helperText,
  showPolicyText = false
}) => {
  const defaultHelperText = "Comments section should be used for documenting any differences between receipts and amounts requested for reimbursement.";
  
  const policyText = "With the exception of mileage and per diem amounts for meals and incidental expenses, itemized receipts should be submitted for ALL reimbursement requests. There is no minimum threshold for receipts. Comments section should be used for documenting any differences between receipts and amounts requested for reimbursement. This includes deductions for 'cash back', hotel points, airline 'frequent flyer' miles, or other rewards received by or due the employee in connection with PTC business travel (as required by the Ethics Act, statewide employee gift ban and the PTC Code of Conduct). For Travel procedures manual click here.";
  
  return (
    <div>
      <h3 className="text-base font-medium text-gray-700 mb-3">Notes</h3>
      <Textarea
        placeholder="Add any additional information about this expense report..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="min-h-[120px] text-sm resize-none bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      />
      {(helperText || defaultHelperText) && (
        <p className="text-xs text-gray-500 mt-1">
          {helperText || defaultHelperText}
        </p>
      )}
      
      {showPolicyText && (
        <div className="mt-4 border-t pt-3">
          <p className="text-xs text-gray-500 whitespace-pre-wrap">
            {policyText}
          </p>
        </div>
      )}
    </div>
  );
};

export default NotesSection;
