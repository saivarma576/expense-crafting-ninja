
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
  
  return (
    <div className="mb-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full bg-red-50 hover:bg-red-100 text-red-700 gap-2 rounded-xl shadow-sm"
          >
            <AlertTriangle className="h-4 w-4" />
            <span className="font-medium">
              {errorCount > 0 && `${errorCount} Errors`}{errorCount > 0 && warningCount > 0 && ', '}
              {warningCount > 0 && `${warningCount} Warnings`}
            </span>
            {pendingJustifications > 0 && (
              <span className="text-xs bg-red-200 px-2 py-0.5 rounded-full ml-1">
                {pendingJustifications} Justifications Pending
              </span>
            )}
            <span className="text-xs underline ml-1">Review</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Policy Violations</DialogTitle>
          </DialogHeader>
          <PolicyViolationsHeader
            violations={violations}
            onAddComment={onAddComment}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompactPolicyHeader;
