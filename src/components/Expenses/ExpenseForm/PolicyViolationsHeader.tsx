import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AlertTriangle, CircleX } from 'lucide-react';
import { PolicyViolation } from '@/utils/policyValidations';
import PolicyCommentTimeline from './PolicyCommentTimeline';
interface PolicyViolationsHeaderProps {
  violations: PolicyViolation[];
  onAddComment: (violationId: string, comment: string, type: 'approver' | 'user') => void;
}
const PolicyViolationsHeader: React.FC<PolicyViolationsHeaderProps> = ({
  violations,
  onAddComment
}) => {
  const [expandedViolations, setExpandedViolations] = React.useState<string[]>([]);
  const toggleViolation = (id: string) => {
    setExpandedViolations(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };
  return;
};
export default PolicyViolationsHeader;