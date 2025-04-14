
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap, ChevronLeft, SendHorizonal, XCircle, BarChart } from 'lucide-react';

interface ExpenseActionsProps {
  totalAmount: string | number;
  onSubmit?: () => void;
  onAskAI?: () => void;
}

export const ExpenseActions: React.FC<ExpenseActionsProps> = ({ 
  totalAmount, 
  onSubmit,
  onAskAI 
}) => {
  return (
    <div className="sticky bottom-0 px-6 py-3 bg-white border-t flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm" className="flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Save as Draft
        </Button>
        <Button variant="outline" size="sm" className="flex items-center">
          <XCircle className="h-4 w-4 mr-1" />
          Discard
        </Button>
        {onAskAI && (
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
            onClick={onAskAI}
          >
            <BarChart className="h-4 w-4 mr-1" />
            AI Insights
          </Button>
        )}
      </div>
      
      <div className="flex items-center">
        <div className="mr-4">
          <p className="text-sm text-gray-500">Total</p>
          <p className="font-semibold">${typeof totalAmount === 'string' ? totalAmount : totalAmount.toFixed(2)}</p>
        </div>
        <Button 
          size="sm" 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={onSubmit}
        >
          <SendHorizonal className="h-4 w-4 mr-2" />
          Submit for Approval
        </Button>
      </div>
    </div>
  );
};
