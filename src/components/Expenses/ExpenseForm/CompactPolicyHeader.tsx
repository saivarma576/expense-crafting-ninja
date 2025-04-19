import React, { useState } from 'react';
import { Flag } from 'lucide-react';
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
  const [reviewerRole, setReviewerRole] = useState<'user' | 'approver' | null>(null);
  const pendingJustifications = violations.filter(v => !v.comments?.some(c => c.type === 'user' || c.type === 'approver')).length;
  const errorCount = violations.filter(v => v.severity === 'error').length;
  const warningCount = violations.filter(v => v.severity === 'warning').length;
  const totalViolations = errorCount + warningCount;
  const handleRoleSelection = (role: 'user' | 'approver') => {
    setReviewerRole(role);
  };
  return <div className="mb-4">
      <Dialog>
        <DialogTrigger asChild>
          
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-2xl border-0 shadow-xl">
          {reviewerRole === null ? <div className="p-6 space-y-6">
              <DialogHeader>
                <DialogTitle className="text-xl text-center">Who's reviewing this report?</DialogTitle>
              </DialogHeader>
              <div className="flex gap-4 justify-center pt-2">
                <Button onClick={() => handleRoleSelection('user')} className="flex-1 gap-2 px-6 py-8 h-auto bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl hover:scale-[1.02] transition-transform shadow-sm">
                  <span className="text-2xl">👤</span>
                  <span className="font-medium">I'm the Initiator</span>
                </Button>
                <Button onClick={() => handleRoleSelection('approver')} className="flex-1 gap-2 px-6 py-8 h-auto bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl hover:scale-[1.02] transition-transform shadow-sm">
                  <span className="text-2xl">🧑‍💼</span>
                  <span className="font-medium">I'm the Approver</span>
                </Button>
              </div>
            </div> : <>
              <DialogHeader className="p-6 pb-2 border-b">
                <DialogTitle className="text-xl flex items-center gap-2">
                  <Flag className="h-5 w-5 text-red-500" />
                  Policy Violations
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {reviewerRole === 'user' ? "Please review and justify the flagged violations below" : "Review justifications and provide feedback if needed"}
                </p>
              </DialogHeader>
              <div className="p-4">
                <PolicyViolationsHeader violations={violations} onAddComment={(violationId, comment, type) => onAddComment(violationId, comment, type || reviewerRole)} />
              </div>
              <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
                <Button variant="outline" onClick={() => setReviewerRole(null)} className="rounded-lg">
                  Change Role
                </Button>
                <Button className="rounded-lg bg-blue-600 hover:bg-blue-700">
                  {reviewerRole === 'user' ? 'Save Justifications' : 'Complete Review'}
                </Button>
              </div>
            </>}
        </DialogContent>
      </Dialog>
    </div>;
};
export default CompactPolicyHeader;