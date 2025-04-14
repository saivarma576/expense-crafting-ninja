
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, AlertTriangle, Check, XCircle } from 'lucide-react';

interface ValidationWarningsProps {
  programmaticErrors: { field: string; error: string }[];
  llmWarnings: string[];
  onClose: () => void;
  onProceed: () => void;
  open: boolean;
}

const ValidationWarnings: React.FC<ValidationWarningsProps> = ({
  programmaticErrors,
  llmWarnings,
  onClose,
  onProceed,
  open
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Validation Issues Found
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {programmaticErrors.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Errors</h3>
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <ul className="space-y-2">
                  {programmaticErrors.map((error, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">{error.field}:</span> {error.error}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {llmWarnings.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Warnings</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                <ul className="space-y-2">
                  {llmWarnings.map((warning, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>{warning}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose} className="gap-1">
            <XCircle className="h-4 w-4" />
            Cancel
          </Button>
          {programmaticErrors.length === 0 && (
            <Button onClick={onProceed} className="gap-1">
              <Check className="h-4 w-4" />
              Continue Anyway
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ValidationWarnings;
