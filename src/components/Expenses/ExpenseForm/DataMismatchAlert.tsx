
import React from 'react';
import { AlertCircle, Check, X } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DataMismatch = {
  field: string;
  ocrValue: any;
  userValue: any;
  message: string;
};

interface DataMismatchAlertProps {
  mismatches: DataMismatch[] | null;
  isOpen: boolean;
  onClose: () => void;
  onAcceptOcrData: (field: string, value: any) => void;
}

const DataMismatchAlert: React.FC<DataMismatchAlertProps> = ({ 
  mismatches, 
  isOpen, 
  onClose,
  onAcceptOcrData
}) => {
  if (!mismatches || mismatches.length === 0) return null;
  
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
            Data Mismatch Detected
          </AlertDialogTitle>
          <AlertDialogDescription>
            We noticed differences between the OCR-extracted data and what you've entered:
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="my-4 space-y-3 max-h-[300px] overflow-auto">
          {mismatches.map((mismatch, index) => (
            <div key={index} className="border border-amber-200 bg-amber-50 rounded-md p-3">
              <p className="text-sm text-amber-800 mb-2">{mismatch.message}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Use OCR data?</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onAcceptOcrData(mismatch.field, mismatch.ocrValue)}
                    className="text-xs flex items-center gap-1 bg-green-50 hover:bg-green-100 text-green-700 px-2 py-1 rounded-md border border-green-200"
                  >
                    <Check className="h-3 w-3" />
                    Use OCR
                  </button>
                  <button 
                    onClick={() => {}} // Keep user data
                    className="text-xs flex items-center gap-1 bg-gray-50 hover:bg-gray-100 text-gray-700 px-2 py-1 rounded-md border border-gray-200"
                  >
                    <X className="h-3 w-3" />
                    Keep Mine
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction className="bg-amber-500 hover:bg-amber-600">
            Review All Fields
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DataMismatchAlert;
