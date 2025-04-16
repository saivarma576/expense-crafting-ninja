
import React from 'react';
import { File, FileText, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotesSection from '@/components/Expenses/NotesSection';
import { ExpenseDocument } from '@/types/expense';
import { cn } from '@/lib/utils';
import { useValidation } from '@/contexts/ValidationContext';

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
  const { fieldValidations } = useValidation();
  const receiptValidation = fieldValidations.receipt;
  
  const handleRemoveDocument = (index: number) => {
    setUploadedDocuments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className={cn(
        "bg-white border rounded-lg p-5", 
        receiptValidation?.error && "border-red-300",
        receiptValidation?.warning && !receiptValidation?.error && "border-amber-300"
      )}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-medium">
            Documents & Receipts
          </h3>
          
          {(receiptValidation?.error || receiptValidation?.warning) && (
            <div className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              receiptValidation.error ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
            )}>
              {receiptValidation.error || receiptValidation.warning}
            </div>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          {uploadedDocuments.length > 0 ? (
            uploadedDocuments.map((doc, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between bg-gray-50 p-2 rounded border text-sm"
              >
                <div className="flex items-center">
                  <div className="p-2 rounded mr-3 bg-blue-100">
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
              <File className="h-10 w-10 mx-auto mb-2 text-gray-300" />
              <p className="text-sm text-gray-500">
                No documents uploaded yet
              </p>
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
        showPolicyText={true}
        policyTextMaxLength={150}
        validation={fieldValidations.notes}
      />
    </div>
  );
};

export default DocumentsNotesSection;
