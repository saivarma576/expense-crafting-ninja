
import React from 'react';
import { File, FileText, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotesSection from '@/components/Expenses/NotesSection';
import { ExpenseDocument } from '@/types/expense';
import { cn } from '@/lib/utils';
import { useValidation } from '@/contexts/ValidationContext';
import { Card, CardContent } from '@/components/ui/card';
import TruncatedText from '@/components/ui/truncated-text';

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
  
  // Clean validation message to remove the specified text
  const validationMessage = receiptValidation?.error || 
    (receiptValidation?.warning && receiptValidation.warning !== "Receipt image appears to be for a personal expense" 
      ? receiptValidation.warning 
      : undefined);

  const handleRemoveDocument = (index: number) => {
    setUploadedDocuments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-medium text-gray-800">
            Documents & Receipts
          </h3>
          
          {validationMessage && (
            <span className={cn(
              "text-xs rounded-full px-2 py-1",
              receiptValidation?.error ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
            )}>
              {validationMessage}
            </span>
          )}
        </div>
        
        <Card className="border border-gray-200 bg-white overflow-hidden">
          <CardContent className="p-0">
            {uploadedDocuments.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {uploadedDocuments.map((doc, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "flex items-center justify-between p-3 hover:bg-gray-50 transition-colors",
                      activeField === 'receipt' && "bg-blue-50/50 border-l-2 border-blue-500"
                    )}
                  >
                    <div className="flex items-center">
                      <div className="p-2 rounded mr-3 bg-blue-50">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <TruncatedText 
                          text={doc.name} 
                          maxLength={20} 
                          className="font-medium text-sm"
                        />
                        <p className="text-xs text-gray-500">{doc.size}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRemoveDocument(index)} 
                      className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100"
                      aria-label="Remove document"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-gray-50">
                <File className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm text-gray-600 font-medium mb-1">
                  No documents uploaded
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Upload receipts and supporting documents
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center justify-center border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-600"
          >
            <Upload className="h-3.5 w-3.5 mr-2" />
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
