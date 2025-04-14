
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap, ChevronLeft, SendHorizonal, XCircle, BarChart, Brain } from 'lucide-react';

interface ExpenseActionsProps {
  totalAmount: string | number;
  onSubmit?: () => void;
  onAskAI?: () => void;
  onSaveAsDraft?: () => void;
  onDiscard?: () => void;
  submitting?: boolean;
}

export const ExpenseActions: React.FC<ExpenseActionsProps> = ({ 
  totalAmount, 
  onSubmit,
  onAskAI,
  onSaveAsDraft,
  onDiscard,
  submitting = false
}) => {
  return (
    <div className="sticky bottom-0 px-6 py-3 bg-white border-t flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center"
          onClick={onSaveAsDraft}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Save as Draft
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center"
          onClick={onDiscard}
        >
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
          className="bg-blue-600 hover:bg-blue-700 relative overflow-hidden group"
          onClick={onSubmit}
          disabled={submitting}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {submitting ? (
            <div className="flex items-center relative z-10">
              <div className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
              <span>Analyzing...</span>
            </div>
          ) : (
            <div className="flex items-center relative z-10">
              <Brain className="h-4 w-4 mr-2 text-blue-200" />
              <SendHorizonal className="h-4 w-4 mr-2" />
              Submit for Approval
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};
