import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PolicyViolation } from '@/utils/policyValidations';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PolicyViolationsHeader from './PolicyViolationsHeader';
interface CompactPolicyHeaderProps {
  violations: PolicyViolation[];
  onAddComment: (violationId: string, comment: string, type: 'approver' | 'user') => void;
}
const CompactPolicyHeader: React.FC<CompactPolicyHeaderProps> = ({
  violations,
  onAddComment
}) => {
  const pendingJustifications = violations.filter(v => !v.comments?.some(c => c.type === 'user' || c.type === 'approver')).length;
  const errorCount = violations.filter(v => v.severity === 'error').length;
  const warningCount = violations.filter(v => v.severity === 'warning').length;
  return;
};
export default CompactPolicyHeader;