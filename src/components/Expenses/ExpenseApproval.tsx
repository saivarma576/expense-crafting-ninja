
import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApprovalStep {
  id: number;
  title: string;
  approver: string;
  status: 'pending' | 'approved' | 'rejected' | 'waiting';
}

export const ExpenseApproval: React.FC = () => {
  const approvalSteps: ApprovalStep[] = [
    {
      id: 1,
      title: 'Manager Approval',
      approver: 'Sarah Wright',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Finance Review',
      approver: 'Michael Chen',
      status: 'waiting'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'approved':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <Clock className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="text-amber-500">Pending</span>;
      case 'approved':
        return <span className="text-green-500">Approved</span>;
      case 'rejected':
        return <span className="text-red-500">Rejected</span>;
      case 'waiting':
        return <span className="text-gray-400">Waiting</span>;
      default:
        return null;
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-base font-medium text-gray-800 mb-5">Approval Flow</h3>
      
      <div className="space-y-4">
        {approvalSteps.map((step, index) => (
          <div key={step.id} className="flex items-start">
            <div 
              className={cn(
                "flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium",
                step.status === 'waiting' 
                  ? "bg-gray-100 text-gray-400" 
                  : "bg-blue-100 text-blue-700"
              )}
            >
              {step.id}
            </div>
            
            <div className="ml-4 flex-grow">
              <div className={cn(
                "flex items-center justify-between pb-4",
                index < approvalSteps.length - 1 && "border-b border-dashed"
              )}>
                <div>
                  <h4 className={cn(
                    "text-sm font-medium",
                    step.status === 'waiting' ? "text-gray-400" : "text-gray-800"
                  )}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{step.approver}</p>
                </div>
                
                <div className="flex items-center gap-1.5 text-sm">
                  {getStatusIcon(step.status)}
                  {getStatusText(step.status)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
