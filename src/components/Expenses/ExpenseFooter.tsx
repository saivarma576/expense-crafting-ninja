
import React from 'react';
import { ArrowRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExpenseFooterProps {
  onCancel: () => void;
  onSaveAsDraft: () => void;
  onSubmit: () => void;
}

const ExpenseFooter: React.FC<ExpenseFooterProps> = ({
  onCancel,
  onSaveAsDraft,
  onSubmit
}) => {
  const policyText = `With the exception of mileage and per diem amounts for meals and incidental expenses, itemized receipts should be submitted for ALL reimbursement requests. There is no minimum threshold for receipts.
Comments section should be used for the documenting any differences between receipts and amounts requested for reimbursement. This includes deductions for 'cash back', hotel points, airline 'frequent flyer' miles, or other rewards received by or due the employee in connection with PTC business travel (as required by the Ethics Act, statewide employee gift ban and the PTC Code of Conduct). For Travel procedures manual click here.`;

  return (
    <div className="border-t bg-white sticky bottom-0 p-4">
      <div className="flex flex-col space-y-4">
        <p className="text-xs text-gray-600 whitespace-pre-wrap">{policyText}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="terms" 
              className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500" 
            />
            <label htmlFor="terms" className="text-xs text-gray-600">
              By submitting, I confirm this is a valid business expense in accordance with company policy.
            </label>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="text-sm h-9"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              variant="outline" 
              className="text-sm h-9 flex items-center gap-1.5"
              onClick={onSaveAsDraft}
            >
              <Save className="h-4 w-4" />
              Save as draft
            </Button>
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-sm h-9 flex items-center gap-1.5"
              onClick={onSubmit}
            >
              Submit
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseFooter;
