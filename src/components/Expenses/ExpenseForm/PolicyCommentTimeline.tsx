
import React, { useState } from 'react';
import { format } from 'date-fns';
import { PolicyComment, PolicyViolation } from '@/utils/policyValidations';
import { MessageSquare, Bot, Wrench, ChevronDown, ChevronUp, CircleX, CircleMinus, CircleCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PolicyCommentTimelineProps {
  comments: PolicyComment[];
  policyRule?: string;
  severity?: 'error' | 'warning';
  status?: 'violation' | 'exception' | 'approved';
  className?: string;
  maxHeight?: number;
}

const PolicyCommentTimeline: React.FC<PolicyCommentTimelineProps> = ({ 
  comments, 
  policyRule,
  severity = 'warning',
  status = 'violation',
  className,
  maxHeight = 300
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!comments || comments.length === 0) {
    return policyRule ? (
      <div className={cn("space-y-3", className)}>
        <div className={cn(
          "rounded-md p-2.5 mb-2 text-sm font-medium flex items-start gap-2",
          severity === 'error' ? "bg-red-50 text-red-700 border border-red-200" : 
                                "bg-amber-50 text-amber-700 border border-amber-200"
        )}>
          {severity === 'error' ? 
            <CircleX className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" /> : 
            <CircleMinus className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
          }
          <span>{policyRule}</span>
        </div>
      </div>
    ) : null;
  }

  const getBorderClass = () => {
    switch(status) {
      case 'violation': return 'border-red-200';
      case 'exception': return 'border-amber-200';
      case 'approved': return 'border-green-200';
      default: return 'border-gray-200';
    }
  };

  const renderCommentIcon = (comment: PolicyComment) => {
    if (comment.type === 'system') {
      return (
        <div className="absolute -left-[25px] mt-1.5 w-4 h-4 bg-gray-100 rounded-full border-2 border-gray-500 flex items-center justify-center">
          <Wrench className="w-2 h-2 text-gray-600" />
        </div>
      );
    } else if (comment.type === 'bot') {
      return (
        <div className="absolute -left-[25px] mt-1.5 w-4 h-4 bg-blue-100 rounded-full border-2 border-blue-500 flex items-center justify-center">
          <Bot className="w-2 h-2 text-blue-600" />
        </div>
      );
    } else {
      return (
        <div className="absolute -left-[25px] mt-1.5 w-4 h-4 bg-indigo-100 rounded-full border-2 border-indigo-500 flex items-center justify-center">
          <MessageSquare className="w-2 h-2 text-indigo-600" />
        </div>
      );
    }
  };

  const getStatusIcon = () => {
    switch(status) {
      case 'violation': 
        return <CircleX className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />;
      case 'exception': 
        return <CircleMinus className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />;
      case 'approved': 
        return <CircleCheck className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />;
      default: 
        return <CircleX className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />;
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Policy Rule Header */}
      {policyRule && (
        <div className={cn(
          "rounded-md p-2.5 mb-2 text-sm font-medium flex items-start gap-2",
          severity === 'error' ? "bg-red-50 text-red-700 border border-red-200" : 
                               "bg-amber-50 text-amber-700 border border-amber-200"
        )}>
          {getStatusIcon()}
          <span>{policyRule}</span>
        </div>
      )}

      {/* Collapsible Comments Timeline */}
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        {comments.length > 3 && (
          <CollapsibleTrigger className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-2 w-full">
            {isExpanded ? (
              <>Hide comments <ChevronUp className="h-3 w-3" /></>
            ) : (
              <>Show all comments ({comments.length}) <ChevronDown className="h-3 w-3" /></>
            )}
          </CollapsibleTrigger>
        )}

        <CollapsibleContent>
          <ScrollArea className={comments.length > 4 ? `max-h-[${maxHeight}px]` : ''}>
            <div className={cn("pl-4 border-l-2", getBorderClass())}>
              {comments.map((comment, index) => (
                <div 
                  key={comment.id} 
                  className="relative mb-4 last:mb-0"
                >
                  {/* Comment Type Icon */}
                  {renderCommentIcon(comment)}
                  
                  {/* Comment content */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
                      <span className="font-medium text-gray-700">{comment.user}</span>
                      <span>•</span>
                      <time dateTime={comment.timestamp.toISOString()} className="text-xs">
                        {format(new Date(comment.timestamp), 'MMM d, yyyy – h:mm a')}
                      </time>
                    </div>

                    {/* Comment tags */}
                    {comment.tags && comment.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {comment.tags.map((tag, tagIndex) => {
                          let variant: "default" | "warning" | "success" = "default";
                          
                          if (tag.toLowerCase().includes('exception')) {
                            variant = "warning";
                          } else if (tag.toLowerCase().includes('approved')) {
                            variant = "success";
                          }
                          
                          return (
                            <Badge 
                              key={tagIndex} 
                              variant={variant}
                              size="sm" 
                              className="text-[10px]"
                            >
                              #{tag}
                            </Badge>
                          );
                        })}
                      </div>
                    )}

                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{comment.comment}</p>
                    
                    {/* File attachments */}
                    {comment.files && comment.files.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Attachments:</p>
                        <div className="flex flex-wrap gap-2">
                          {comment.files.map((file, fileIndex) => (
                            <Badge 
                              key={fileIndex} 
                              variant="outline"
                              className="text-xs py-0.5 px-2 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                            >
                              {file}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default PolicyCommentTimeline;
