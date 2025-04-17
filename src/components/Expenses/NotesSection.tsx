
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface NotesSectionProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({ notes, setNotes }) => {
  return (
    <div>
      <h3 className="text-base font-medium text-gray-700 mb-3">Notes</h3>
      <Textarea
        placeholder="Add any additional information about this expense report..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="min-h-[120px] text-sm resize-none bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      />
    </div>
  );
};

export default NotesSection;
