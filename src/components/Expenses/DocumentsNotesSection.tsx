
import React from 'react';
import { DocumentUpload } from '@/components/Expenses/DocumentUpload';
import NotesSection from '@/components/Expenses/NotesSection';

interface DocumentsNotesSectionProps {
  uploadedDocuments: {name: string, size: string}[];
  setUploadedDocuments: React.Dispatch<React.SetStateAction<{name: string, size: string}[]>>;
  notes: string;
  setNotes: (notes: string) => void;
}

const DocumentsNotesSection: React.FC<DocumentsNotesSectionProps> = ({
  uploadedDocuments,
  setUploadedDocuments,
  notes,
  setNotes
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {/* Document upload section */}
      <DocumentUpload 
        uploadedDocuments={uploadedDocuments}
        setUploadedDocuments={setUploadedDocuments}
      />
      
      {/* Notes section */}
      <NotesSection notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default DocumentsNotesSection;
