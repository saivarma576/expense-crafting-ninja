
import React, { useState, useEffect } from 'react';
import { AlertTriangle, AlertCircle, Zap, Check, ArrowRight, FileBarChart, ArrowUpDown, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface PolicyViolation {
  id: string;
  lineNumber: number;
  lineTitle: string;
  expenseType: string;
  violationType: 'error' | 'warning';
  message: string;
  category: string;
}

interface PolicyViolationsModalProps {
  open: boolean;
  onClose: () => void;
  onReviewAndFix: (violationId: string) => void;
  onContinueAnyway: () => void;
  violations: PolicyViolation[];
}

const PolicyViolationsModal: React.FC<PolicyViolationsModalProps> = ({ 
  open, 
  onClose, 
  onReviewAndFix, 
  onContinueAnyway,
  violations
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Get unique categories
  const categories = Array.from(new Set(violations.map(v => v.category)));

  useEffect(() => {
    if (open) {
      // Simulate AI analysis
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
      }, 1800);
      
      return () => clearTimeout(timer);
    }
  }, [open]);
  
  const filteredViolations = activeCategory 
    ? violations.filter(v => v.category === activeCategory)
    : violations;
  
  const hasErrors = violations.some(v => v.violationType === 'error');

  const handleReviewItem = (violationId: string) => {
    onReviewAndFix(violationId);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={() => !isAnalyzing && onClose()}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden max-h-[85vh] flex flex-col">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Policy Compliance Check
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center p-12 space-y-4">
              <div className="relative">
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
                <FileBarChart className="h-6 w-6 text-blue-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-gray-600 font-medium mt-4">Analyzing expense report...</p>
              <p className="text-gray-500 text-sm text-center max-w-xs">
                Checking company policies, compliance requirements, and expense guidelines
              </p>
            </div>
          ) : (
            <>
              <div className="p-6 pb-0">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    variant={activeCategory === null ? "default" : "outline"}
                    onClick={() => setActiveCategory(null)}
                    className="rounded-full text-xs h-7 px-3"
                  >
                    All ({violations.length})
                  </Button>
                  {categories.map(category => (
                    <Button
                      key={category}
                      size="sm"
                      variant={activeCategory === category ? "default" : "outline"}
                      onClick={() => setActiveCategory(category)}
                      className="rounded-full text-xs h-7 px-3"
                    >
                      {category} ({violations.filter(v => v.category === category).length})
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="px-6 pb-6 space-y-3">
                {filteredViolations.length > 0 ? (
                  filteredViolations.map((violation, index) => (
                    <motion.div
                      key={violation.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className={`p-3 rounded-lg border ${
                        violation.violationType === 'error' 
                          ? 'bg-red-50 border-red-200' 
                          : 'bg-amber-50 border-amber-200'
                      }`}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-start gap-2">
                          {violation.violationType === 'error' ? (
                            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {violation.violationType === 'error' ? (
                                  <span className="text-red-700">Error</span>
                                ) : (
                                  <span className="text-amber-700">Warning</span>
                                )}
                              </span>
                              <Badge className="text-[10px] px-1.5 h-4">Line {violation.lineNumber}</Badge>
                              <Badge variant="outline" className="text-[10px] px-1.5 h-4">
                                {violation.expenseType}
                              </Badge>
                            </div>
                            <p className="text-sm mt-1 font-medium">
                              {violation.lineTitle}
                            </p>
                            <p className="text-sm mt-0.5 text-gray-700">
                              {violation.message}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-7 px-2 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          onClick={() => handleReviewItem(violation.id)}
                        >
                          Review
                          <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center p-6 text-gray-500">
                    <Check className="h-10 w-10 mx-auto text-green-500 mb-2" />
                    <p>No policy violations found in this category</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        
        <div className="p-4 border-t bg-gray-50 flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isAnalyzing}
          >
            Review & Fix
          </Button>
          
          {!hasErrors && (
            <Button
              onClick={onContinueAnyway}
              disabled={isAnalyzing}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Continue Anyway
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyViolationsModal;
