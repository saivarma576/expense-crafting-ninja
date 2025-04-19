
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
  
  return (
    <ScrollArea className="h-[60vh] pr-4">
      <div className="space-y-4 py-2">
        {violations.map((violation) => (
          <Collapsible
            key={violation.id}
            open={expandedViolations.includes(violation.id)}
            onOpenChange={() => toggleViolation(violation.id)}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow duration-200"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
              <div className="flex items-center gap-2">
                {violation.severity === 'error' ? (
                  <CircleX className="h-5 w-5 text-red-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                )}
                <div>
                  <div className="font-medium text-left">{violation.message}</div>
                  <div className="text-sm text-gray-500 text-left">{violation.field}</div>
                </div>
              </div>
              <Badge variant={violation.severity === 'error' ? 'destructive' : 'outline'} className="ml-2">
                {violation.severity}
              </Badge>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 border-t bg-gray-50">
                <PolicyCommentTimeline 
                  violationId={violation.id}
                  comments={violation.comments || []}
                  onAddComment={(comment, type) => onAddComment(violation.id, comment, type)}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </ScrollArea>
  );
};

export default PolicyViolationsHeader;
