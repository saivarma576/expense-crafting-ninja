
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AlertTriangle, CircleX, Bot, MessageSquare, Clock, User, Calendar } from 'lucide-react';
import { PolicyViolation } from '@/utils/policyValidations';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { format } from 'date-fns';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

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
              className="group border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${violation.severity === 'error' ? 'bg-red-50' : 'bg-amber-50'}`}>
                    {violation.severity === 'error' ? (
                      <CircleX className="h-5 w-5 text-red-500 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-left">{violation.message}</div>
                    <div className="text-sm text-gray-500 text-left flex items-center gap-2">
                      <Badge variant="outline" className="rounded-full">Line {violation.lineNumber}</Badge>
                      <Badge variant="outline" className="rounded-full">{violation.expenseType}</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <HoverCard>
                    <HoverCardTrigger>
                      <div className="relative cursor-pointer group-hover:scale-105 transition-transform">
                        <div className={`p-1.5 rounded-full ${violation.comments?.length ? 'bg-blue-50' : 'bg-gray-50'}`}>
                          <MessageSquare 
                            className={`h-5 w-5 ${violation.comments?.length ? 'text-blue-500' : 'text-gray-400'}`}
                          />
                        </div>
                        {violation.comments?.length > 0 && (
                          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {violation.comments.length}
                          </div>
                        )}
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent 
                      className="w-80 p-0" 
                      side="left"
                    >
                      {violation.comments?.length > 0 ? (
                        <div className="divide-y">
                          {violation.comments.map((comment, idx) => (
                            <div key={idx} className="p-4 hover:bg-gray-50 transition-colors space-y-2">
                              <div className="flex items-start gap-3">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                  <User className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium">{comment.user}</div>
                                  <p className="text-sm text-gray-600 mt-1 break-words">
                                    {comment.comment}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-gray-500 pl-11">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {format(comment.timestamp, 'MMM d, yyyy')}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {format(comment.timestamp, 'h:mm a')}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-sm text-gray-500 text-center">
                          No comments yet
                        </div>
                      )}
                    </HoverCardContent>
                  </HoverCard>
                  
                  <Badge 
                    variant={violation.severity === 'error' ? 'destructive' : 'outline'} 
                    className="rounded-full"
                  >
                    {violation.severity}
                  </Badge>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="p-4 border-t bg-gray-50 space-y-4">
                  <div className="space-y-4">
                    {violation.comments?.map((comment) => (
                      <div key={comment.id} className="relative pl-8 border-l-2 border-blue-200">
                        <div className="absolute -left-[13px] top-0">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            {comment.type === 'system' ? (
                              <Bot className="w-3 h-3 text-blue-600" />
                            ) : (
                              <MessageSquare className="w-3 h-3 text-blue-600" />
                            )}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <User className="h-3 w-3" />
                            <span className="font-medium text-gray-700">{comment.user}</span>
                            <span>•</span>
                            <Calendar className="h-3 w-3" />
                            <time dateTime={comment.timestamp.toISOString()}>
                              {format(comment.timestamp, 'MMM d, yyyy')}
                            </time>
                            <span>•</span>
                            <Clock className="h-3 w-3" />
                            <time dateTime={comment.timestamp.toISOString()}>
                              {format(comment.timestamp, 'h:mm a')}
                            </time>
                          </div>
                          <p className="text-sm text-gray-700">{comment.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2">
                    <textarea
                      placeholder="Add your comment..."
                      className="w-full min-h-[80px] p-3 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
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
      
      <div className="text-xs text-gray-500 italic flex items-center gap-2 border-t pt-3">
        <Bot className="h-3 w-3" />
        This was flagged by AI as a potential violation, but it could be a false positive. Please review it carefully.
      </div>
    </div>
  );
};

export default PolicyViolationsHeader;
