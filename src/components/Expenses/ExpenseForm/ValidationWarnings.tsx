
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ValidationWarningsProps {
  warnings: string[];
  onClose: () => void;
}

const ValidationWarnings: React.FC<ValidationWarningsProps> = ({ warnings, onClose }) => {
  if (warnings.length === 0) return null;
  
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-auto">
        <div className="border-b p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center">
            <AlertTriangle className="text-amber-500 mr-2 h-5 w-5" />
            Policy Considerations
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-4">
            Please review the following policy considerations before submitting:
          </p>
          
          <ul className="space-y-3">
            {warnings.map((warning, index) => (
              <li key={index} className="flex items-start">
                <span className="text-amber-500 mr-2 mt-0.5">•</span>
                <span className="text-sm text-gray-700">{warning}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-amber-50 text-amber-600 rounded-md hover:bg-amber-100 text-sm font-medium"
            >
              Review & Fix
            </button>
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium"
            >
              Proceed Anyway
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationWarnings;
