
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
  const pendingJustifications = violations.filter(v => 
    !v.comments?.some(c => c.type === 'user' || c.type === 'approver')
  ).length;

  const errorCount = violations.filter(v => v.severity === 'error').length;
  const warningCount = violations.filter(v => v.severity === 'warning').length;

  return (
    <div className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg mb-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <span>
            {errorCount > 0 && <span className="text-red-600 font-medium">{errorCount} Error{errorCount !== 1 ? 's' : ''}</span>}
            {errorCount > 0 && warningCount > 0 && <span className="mx-1">•</span>}
            {warningCount > 0 && <span className="text-amber-600 font-medium">{warningCount} Warning{warningCount !== 1 ? 's' : ''}</span>}
          </span>
        </div>
        {pendingJustifications > 0 && (
          <>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-600">
              📝 {pendingJustifications} Justification{pendingJustifications !== 1 ? 's' : ''} Pending
            </span>
          </>
        )}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
            View Details
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Policy Violations</DialogTitle>
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
