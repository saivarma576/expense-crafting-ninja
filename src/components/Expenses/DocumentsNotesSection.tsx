
import React from 'react';
import { File, FileText, Upload, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotesSection from '@/components/Expenses/NotesSection';
import { ExpenseDocument } from '@/types/expense';
import { cn } from '@/lib/utils';

interface DocumentsNotesSectionProps {
  uploadedDocuments: ExpenseDocument[];
  setUploadedDocuments: React.Dispatch<React.SetStateAction<ExpenseDocument[]>>;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  activeField?: string;
}

const DocumentsNotesSection: React.FC<DocumentsNotesSectionProps> = ({
  uploadedDocuments,
  setUploadedDocuments,
  notes,
  setNotes,
  activeField
}) => {
  const highlightReceipt = activeField === 'receipt';
  
  const handleRemoveDocument = (index: number) => {
    setUploadedDocuments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className={cn(
        "bg-white border rounded-lg p-5", 
        highlightReceipt && "ring-2 ring-amber-400 animate-pulse"
      )}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-medium">
            Documents & Receipts
            {highlightReceipt && (
              <span className="ml-2 text-amber-500 inline-flex items-center text-xs font-medium">
                <AlertCircle className="h-3.5 w-3.5 mr-1" />
                Attention needed
              </span>
            )}
          </h3>
        </div>
        
        <div className="space-y-2 mb-4">
          {uploadedDocuments.length > 0 ? (
            uploadedDocuments.map((doc, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between bg-gray-50 p-2 rounded border text-sm"
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded mr-3">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.size}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemoveDocument(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center p-8 border-2 border-dashed rounded-lg bg-gray-50">
              <File className="h-10 w-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No documents uploaded yet</p>
            </div>
          )}
        </div>
        
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center justify-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>
      
      <NotesSection 
        notes={notes} 
        setNotes={setNotes} 
      />
    </div>
  );
};

export default DocumentsNotesSection;
