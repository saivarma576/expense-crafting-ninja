
import React from 'react';
import { useValidation } from '@/contexts/ValidationContext';
import PolicyViolationsModal from './ExpenseForm/PolicyViolationsModal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ValidationWarningsModalProps {
  onReviewItem: (violationId: string) => void;
}

const ValidationWarningsModal: React.FC<ValidationWarningsModalProps> = ({ onReviewItem }) => {
  const navigate = useNavigate();
  const { 
    showValidationWarnings, 
    setShowValidationWarnings, 
    policyViolations 
  } = useValidation();

  const handleContinueAnyway = () => {
    setShowValidationWarnings(false);
    toast.success("Expense report submitted with warnings");
    navigate('/expenses');
  };

  return (
    <PolicyViolationsModal
      open={showValidationWarnings}
      onClose={() => setShowValidationWarnings(false)}
      onReviewAndFix={onReviewItem}
      onContinueAnyway={handleContinueAnyway}
      violations={policyViolations}
    />
  );
};

export default ValidationWarningsModal;
