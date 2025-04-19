
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, AlertTriangle, CircleX } from 'lucide-react';
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
  const [expandedViolations, setExpandedViolations] = useState<string[]>([]);

  const toggleViolation = (id: string) => {
    setExpandedViolations(prev => 
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  if (!violations.length) return null;

  return (
    <div className="mb-6 bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h3 className="font-medium text-gray-900">
            Policy Violations ({violations.length})
          </h3>
        </div>
      </div>

      <ScrollArea className="max-h-[300px]">
        <div className="space-y-3">
          {violations.map((violation) => (
            <Collapsible
              key={violation.id}
              open={expandedViolations.includes(violation.id)}
              onOpenChange={() => toggleViolation(violation.id)}
            >
              <div className={`border rounded-lg ${
                violation.severity === 'error' ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50'
              }`}>
                <CollapsibleTrigger className="w-full p-3 flex items-center justify-between text-left">
                  <div className="flex items-start gap-2">
                    {violation.severity === 'error' ? (
                      <CircleX className="h-4 w-4 text-red-500 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-sm">
                        {violation.field}
                      </p>
                      <p className="text-sm text-gray-600">
                        {violation.message}
                      </p>
                    </div>
                  </div>
                  {expandedViolations.includes(violation.id) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="px-3 pb-3 pt-1">
                    <PolicyCommentTimeline
                      comments={violation.comments || []}
                      policyRule={violation.message}
                      severity={violation.severity}
                      status={violation.status}
                      maxHeight={200}
                      onAddComment={(comment) => onAddComment(violation.id, comment, 'approver')}
                    />
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PolicyViolationsHeader;
