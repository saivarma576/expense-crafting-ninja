
import React from 'react';
import { AlertTriangle, AlertCircle, Zap, Check, ArrowRight } from 'lucide-react';

interface ValidationWarningsProps {
  programmaticErrors: {field: string, error: string}[];
  llmWarnings: string[];
  onClose: () => void;
  onProceed: () => void;
}

const ValidationWarnings: React.FC<ValidationWarningsProps> = ({ 
  programmaticErrors, 
  llmWarnings, 
  onClose, 
  onProceed 
}) => {
  const hasErrors = programmaticErrors.length > 0;
  const totalIssues = programmaticErrors.length + llmWarnings.length;
  
  if (totalIssues === 0) return null;
  
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-auto animate-in fade-in-50 zoom-in-95 duration-300">
        <div className="border-b p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center">
            {hasErrors ? (
              <AlertCircle className="text-red-500 mr-2 h-5 w-5" />
            ) : (
              <AlertTriangle className="text-amber-500 mr-2 h-5 w-5" />
            )}
            {hasErrors ? "Required Fields Missing" : "Policy Considerations"}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-4">
            {hasErrors 
              ? "Please address the following issues before submitting:"
              : "Please review the following policy considerations before submitting:"}
          </p>
          
          {programmaticErrors.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 flex items-center text-red-600">
                <AlertCircle className="h-4 w-4 mr-1.5" />
                Required Fields ({programmaticErrors.length})
              </h4>
              <ul className="space-y-2 bg-red-50 p-3 rounded-md">
                {programmaticErrors.map((error, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2 mt-0.5">•</span>
                    <div>
                      <span className="text-sm font-medium text-red-700">{error.field}: </span>
                      <span className="text-sm text-red-700">{error.error}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {llmWarnings.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center text-amber-700">
                <Zap className="h-4 w-4 mr-1.5" />
                AI Policy Suggestions ({llmWarnings.length})
              </h4>
              <ul className="space-y-2 bg-amber-50 p-3 rounded-md">
                {llmWarnings.map((warning, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-amber-500 mr-2 mt-0.5">•</span>
                    <span className="text-sm text-amber-700">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-6 flex justify-end space-x-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium"
            >
              Review & Fix
            </button>
            {!hasErrors && (
              <button 
                onClick={onProceed}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium flex items-center"
              >
                Proceed Anyway
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        
        {!hasErrors && (
          <div className="border-t p-3 bg-blue-50 flex items-center text-xs text-blue-600">
            <Check className="h-4 w-4 mr-1.5 text-blue-500" />
            Testing mode: Submission allowed with warnings
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidationWarnings;
