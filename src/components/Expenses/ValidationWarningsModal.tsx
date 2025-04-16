import React from 'react';
import { AlertCircle, Zap, X, ArrowRight } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useValidation } from '@/contexts/ValidationContext';
import { cn } from '@/lib/utils';

interface ValidationWarningsModalProps {
  onReviewItem: (id: string) => void;
}

const ValidationWarningsModal: React.FC<ValidationWarningsModalProps> = ({ onReviewItem }) => {
  const { 
    policyViolations, 
    showValidationWarnings, 
    setShowValidationWarnings 
  } = useValidation();

  if (!showValidationWarnings) return null;

  const errors = policyViolations.filter(v => v.violationType === 'error');
  const warnings = policyViolations.filter(v => v.violationType === 'warning');

  return (
    <Sheet open={showValidationWarnings} onOpenChange={setShowValidationWarnings}>
      <SheetContent className="sm:max-w-md overflow-y-auto" side="right">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            Expense Validation Results
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {errors.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-red-700 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1.5" />
                {errors.length} Error{errors.length !== 1 && 's'} to Fix
              </h3>
              
              <div className="space-y-2">
                {errors.map((violation) => (
                  <div 
                    key={violation.id}
                    className="bg-red-50 border border-red-200 rounded-md p-3"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-red-700">
                            {violation.lineTitle}
                          </p>
                          <p className="text-sm text-red-600">
                            {violation.message}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="ml-2 h-7 px-2 text-xs border-red-300 text-red-700 hover:bg-red-50"
                        onClick={() => onReviewItem(violation.id)}
                      >
                        Review <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {warnings.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-amber-700 flex items-center">
                <Zap className="h-4 w-4 mr-1.5" />
                {warnings.length} Policy Warning{warnings.length !== 1 && 's'}
              </h3>
              
              <div className="space-y-2">
                {warnings.map((violation) => (
                  <div 
                    key={violation.id}
                    className="bg-amber-50 border border-amber-200 rounded-md p-3"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <Zap className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-amber-700">
                            {violation.category}
                          </p>
                          <p className="text-sm text-amber-600">
                            {violation.message}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="ml-2 h-7 px-2 text-xs border-amber-300 text-amber-700 hover:bg-amber-50"
                        onClick={() => onReviewItem(violation.id)}
                      >
                        Review <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowValidationWarnings(false)}
            >
              <X className="h-4 w-4 mr-2" /> Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ValidationWarningsModal;
