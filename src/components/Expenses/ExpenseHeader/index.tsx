import React from 'react';
import { Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PolicyViolation } from '@/utils/policyValidations';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PolicyViolationsHeader from '../ExpenseForm/PolicyViolationsHeader';
import { TravelPurpose } from '../CreateExpense/types';
import EditableTitle from './EditableTitle';
import TravelPurposeField from './TravelPurposeField';
import UserProfile from './UserProfile';
import ExpenseDetails from './ExpenseDetails';

interface ExpenseHeaderProps {
  title: string;
  setTitle: (title: string) => void;
  expenseNo: string;
  expenseDate: string;
  totalAmount: string;
  userName: string;
  userEmail: string;
  travelPurpose?: TravelPurpose;
  policyViolations?: PolicyViolation[];
  onAddViolationComment?: (violationId: string, comment: string, type: 'approver' | 'user') => void;
}

const ExpenseHeader: React.FC<ExpenseHeaderProps> = ({
  title,
  setTitle,
  expenseNo,
  expenseDate,
  totalAmount,
  userName,
  userEmail,
  travelPurpose,
  policyViolations = [],
  onAddViolationComment
}) => {
  const errorCount = policyViolations.filter(v => v.severity === 'error').length;
  const warningCount = policyViolations.filter(v => v.severity === 'warning').length;
  const totalViolations = errorCount + warningCount;

  return (
    <div className="mb-8 border-b pb-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex flex-col items-start gap-4">
          <EditableTitle title={title} setTitle={setTitle} />
          
          {/* Travel Purpose Section (conditionally rendered) */}
          <TravelPurposeField travelPurpose={travelPurpose} />
          
          <UserProfile userName={userName} userEmail={userEmail} />
        </div>

        <div className="flex flex-col gap-4">
          {totalViolations > 0 && onAddViolationComment && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full bg-red-50 hover:bg-red-100 text-red-700 gap-2 rounded-xl shadow-sm"
                >
                  <Flag className="h-4 w-4" />
                  <span className="font-medium">{totalViolations} Policy Violations</span>
                  <span className="text-xs underline ml-1">Review</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-xl">Policy Violations</DialogTitle>
                </DialogHeader>
                <PolicyViolationsHeader
                  violations={policyViolations}
                  onAddComment={onAddViolationComment}
                />
              </DialogContent>
            </Dialog>
          )}

          <ExpenseDetails 
            expenseNo={expenseNo} 
            expenseDate={expenseDate} 
            totalAmount={totalAmount} 
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseHeader;
