
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AlertTriangle, CircleX, Bot, MessageSquare } from 'lucide-react';
import { PolicyViolation } from '@/utils/policyValidations';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    <div className="space-y-4">
      <ScrollArea className="h-[60vh] pr-4">
        <div className="space-y-4 py-2">
          {violations.map((violation) => (
            <Collapsible
              key={violation.id}
              open={expandedViolations.includes(violation.id)}
              onOpenChange={() => toggleViolation(violation.id)}
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow transition-shadow duration-200"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  {violation.severity === 'error' ? (
                    <CircleX className="h-5 w-5 text-red-500 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  )}
                  <div>
                    <div className="font-medium text-left">{violation.message}</div>
                    <div className="text-sm text-gray-500 text-left flex items-center gap-2">
                      <span>Line {violation.lineNumber}</span>
                      <span>•</span>
                      <span>{violation.expenseType}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative">
                          <MessageSquare 
                            className={`h-5 w-5 ${violation.comments?.length ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-600 transition-colors`} 
                          />
                          {violation.comments?.length > 0 && (
                            <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                              {violation.comments.length}
                            </div>
                          )}
                        </div>
                      </TooltipTrigger>
                      {violation.comments?.length > 0 && (
                        <TooltipContent side="left" className="max-w-xs">
                          <div className="space-y-2">
                            {violation.comments.map((comment, idx) => (
                              <div key={idx} className="text-sm">
                                <div className="font-medium">{comment.user}</div>
                                <div className="text-gray-500">{comment.comment}</div>
                                <div className="text-xs text-gray-400">
                                  {format(comment.timestamp, 'MMM d, yyyy – h:mm a')}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                  <Badge variant={violation.severity === 'error' ? 'destructive' : 'outline'} className="ml-2">
                    {violation.severity}
                  </Badge>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 border-t bg-gray-50 space-y-4">
                  {/* Comments Section */}
                  <div className="space-y-3">
                    {violation.comments?.map((comment) => (
                      <div key={comment.id} className="relative pl-6 border-l-2 border-gray-200">
                        <div className="absolute -left-[11px] mt-1">
                          {comment.type === 'system' ? (
                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                              <Bot className="w-3 h-3 text-gray-600" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                              <MessageSquare className="w-3 h-3 text-blue-600" />
                            </div>
                          )}
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
                            <span className="font-medium text-gray-700">{comment.user}</span>
                            <span>•</span>
                            <time dateTime={comment.timestamp.toISOString()} className="text-gray-500">
                              {format(comment.timestamp, 'MMM d, yyyy – h:mm a')}
                            </time>
                          </div>
                          <p className="text-sm text-gray-700">{comment.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment Section */}
                  <div className="mt-4 space-y-2">
                    <textarea
                      placeholder="Add your comment..."
                      className="w-full min-h-[80px] p-3 rounded-lg border border-gray-200 text-sm"
                      onChange={(e) => {
                        if (e.target.value.trim()) {
                          onAddComment(violation.id, e.target.value, 'user');
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
      
      {/* AI Warning Message at the bottom */}
      <div className="text-xs text-gray-500 italic flex items-center gap-2 border-t pt-3">
        <Bot className="h-3 w-3" />
        This was flagged by AI as a potential violation, but it could be a false positive. Please review it carefully.
      </div>
    </div>
  );
};

export default PolicyViolationsHeader;
