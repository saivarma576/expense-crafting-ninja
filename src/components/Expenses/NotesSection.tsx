
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface NotesSectionProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({ notes, setNotes }) => {
  return (
    <div>
      <h3 className="text-base font-medium text-gray-800 mb-3">Notes</h3>
      <Textarea
        placeholder="Add any additional information about this expense report..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="min-h-[180px] text-sm resize-none"
      />
    </div>
  );
};

export default NotesSection;
