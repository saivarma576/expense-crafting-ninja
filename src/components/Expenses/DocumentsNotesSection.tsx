
import React from 'react';
import { File, FileText, Upload, X, AlertCircle } from 'lucide-react';
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
  const highlightReceipt = activeField === 'receipt';
  const receiptValidation = fieldValidations.receipt;
  
  const handleRemoveDocument = (index: number) => {
    setUploadedDocuments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className={cn(
        "bg-white border rounded-lg p-5", 
        highlightReceipt && "ring-2 ring-amber-400 animate-pulse",
        receiptValidation?.error && "border-red-300",
        receiptValidation?.warning && !receiptValidation?.error && "border-amber-300"
      )}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={cn(
            "text-base font-medium",
            highlightReceipt && "text-amber-700"
          )}>
            Documents & Receipts
            {highlightReceipt && (
              <span className="ml-2 text-amber-500 inline-flex items-center text-xs font-medium">
                <AlertCircle className="h-3.5 w-3.5 mr-1" />
                Attention needed
              </span>
            )}
          </h3>
          
          {(receiptValidation?.error || receiptValidation?.warning) && (
            <div className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              receiptValidation.error ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
            )}>
              {receiptValidation.error ? (
                <span className="flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {receiptValidation.error}
                </span>
              ) : (
                <span className="flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {receiptValidation.warning}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          {uploadedDocuments.length > 0 ? (
            uploadedDocuments.map((doc, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex items-center justify-between bg-gray-50 p-2 rounded border text-sm",
                  highlightReceipt && "border-amber-300 bg-amber-50"
                )}
              >
                <div className="flex items-center">
                  <div className={cn(
                    "p-2 rounded mr-3",
                    highlightReceipt ? "bg-amber-100" : "bg-blue-100"
                  )}>
                    <FileText className={cn(
                      "h-4 w-4",
                      highlightReceipt ? "text-amber-600" : "text-blue-600"
                    )} />
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
            <div className={cn(
              "text-center p-8 border-2 border-dashed rounded-lg",
              highlightReceipt ? "bg-amber-50 border-amber-300" : "bg-gray-50"
            )}>
              <File className={cn(
                "h-10 w-10 mx-auto mb-2",
                highlightReceipt ? "text-amber-300" : "text-gray-300"
              )} />
              <p className={cn(
                "text-sm",
                highlightReceipt ? "text-amber-500" : "text-gray-500"
              )}>
                {highlightReceipt 
                  ? "Receipt required for this expense" 
                  : "No documents uploaded yet"}
              </p>
            </div>
          )}
        </div>
        
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "w-full flex items-center justify-center",
              highlightReceipt && "border-amber-300 text-amber-700 hover:bg-amber-50"
            )}
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
        activeField={activeField === 'notes' ? 'notes' : undefined}
        validation={fieldValidations.notes}
      />
    </div>
  );
};

export default DocumentsNotesSection;
