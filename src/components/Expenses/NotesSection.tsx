
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import TruncatedText from '@/components/ui/truncated-text';

interface NotesSectionProps {
  notes: string;
  setNotes: (notes: string) => void;
  helperText?: string;
}

const NotesSection: React.FC<NotesSectionProps> = ({ 
  notes, 
  setNotes, 
  helperText 
}) => {
  const defaultHelperText = "Comments section should be used for documenting any differences between receipts and amounts requested for reimbursement.";
  
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
        <TruncatedText
          text={helperText || defaultHelperText}
          maxLength={100}
          className="text-xs text-gray-500 mt-1"
        />
      )}
    </div>
  );
};

export default NotesSection;
