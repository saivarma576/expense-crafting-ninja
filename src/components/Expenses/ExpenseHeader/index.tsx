
import React from 'react';
import { TravelPurpose } from '../CreateExpense/types';
import { PolicyViolation } from '@/utils/policyValidations';
import EditableTitle from './EditableTitle';
import TravelPurposeField from './TravelPurposeField';
import UserProfile from './UserProfile';
import ExpenseDetails from './ExpenseDetails';
import PolicyViolationsHeader from '../ExpenseForm/PolicyViolationsHeader';

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
  return (
    <div className="mb-8 border-b pb-6">
      {policyViolations.length > 0 && onAddViolationComment && (
        <PolicyViolationsHeader
          violations={policyViolations}
          onAddComment={onAddViolationComment}
        />
      )}
      
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex flex-col items-start gap-4">
          <EditableTitle title={title} setTitle={setTitle} />
          
          {/* Travel Purpose Section (conditionally rendered) */}
          <TravelPurposeField travelPurpose={travelPurpose} />
          
          <UserProfile userName={userName} userEmail={userEmail} />
        </div>

        <ExpenseDetails 
          expenseNo={expenseNo} 
          expenseDate={expenseDate} 
          totalAmount={totalAmount} 
        />
      </div>
    </div>
  );
};

export default ExpenseHeader;
