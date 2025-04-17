
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ExpenseFooter from '@/components/Expenses/ExpenseFooter';

interface ExpenseActionsProps {
  totalAmount: string;
}

export const ExpenseActions: React.FC<ExpenseActionsProps> = ({ totalAmount }) => {
  const navigate = useNavigate();
  
  const handleCancel = () => {
    navigate('/expenses');
  };

  const handleSaveAsDraft = () => {
    toast.success("Expense saved as draft");
    navigate('/expenses');
  };
  
  const handleSubmit = () => {
    toast.success("Expense submitted successfully");
    navigate('/expenses');
  };
  
  return (
    <ExpenseFooter 
      onCancel={handleCancel}
      onSaveAsDraft={handleSaveAsDraft}
      onSubmit={handleSubmit}
    />
  );
};
