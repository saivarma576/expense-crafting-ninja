import React, { useState } from 'react';
import { format } from 'date-fns';
import { PolicyComment, PolicyViolation } from '@/utils/policyValidations';
import { MessageSquare, Bot, Wrench, ChevronDown, ChevronUp, CircleX, CircleMinus, CircleCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface PolicyCommentTimelineProps {
  comments: PolicyComment[];
  policyRule?: string;
  severity?: 'error' | 'warning';
  status?: 'violation' | 'exception' | 'approved';
  className?: string;
  maxHeight?: number;
  onAddComment?: (comment: string) => void;
}

const PolicyCommentTimeline: React.FC<PolicyCommentTimelineProps> = ({
  comments,
  policyRule,
  severity = 'warning',
  status = 'violation',
  className,
  maxHeight = 300,
  onAddComment
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [newComment, setNewComment] = useState('');

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

  const renderCommentIcon = (comment: PolicyComment) => {
    switch(comment.type) {
      case 'system':
        return (
          <div className="absolute -left-[25px] mt-1.5 w-4 h-4 bg-gray-100 rounded-full border-2 border-gray-500 flex items-center justify-center">
            <Wrench className="w-2 h-2 text-gray-600" />
          </div>
        );
      case 'bot':
        return (
          <div className="absolute -left-[25px] mt-1.5 w-4 h-4 bg-blue-100 rounded-full border-2 border-blue-500 flex items-center justify-center">
            <Bot className="w-2 h-2 text-blue-600" />
          </div>
        );
      case 'approver':
        return (
          <div className="absolute -left-[25px] mt-1.5 w-4 h-4 bg-green-100 rounded-full border-2 border-green-500 flex items-center justify-center">
            <MessageSquare className="w-2 h-2 text-green-600" />
          </div>
        );
      default:
        return (
          <div className="absolute -left-[25px] mt-1.5 w-4 h-4 bg-indigo-100 rounded-full border-2 border-indigo-500 flex items-center justify-center">
            <MessageSquare className="w-2 h-2 text-indigo-600" />
          </div>
        );
    }
  };

  const getTagVariant = (tag: string): "default" | "warning" | "success" => {
    if (tag.toLowerCase().includes('exception')) {
      return "warning";
    } else if (tag.toLowerCase().includes('approved')) {
      return "success";
    }
    return "default";
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

      {/* Comments Timeline */}
      <ScrollArea className={`max-h-[${maxHeight}px]`}>
        <div className={cn("pl-4 border-l-2", getBorderClass())}>
          {comments.map((comment) => (
            <div key={comment.id} className="relative mb-4 last:mb-0">
              {renderCommentIcon(comment)}
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
                  <span className="font-medium text-gray-700">{comment.user}</span>
                  <span>•</span>
                  <time dateTime={comment.timestamp.toISOString()}>
                    {format(comment.timestamp, 'MMM d, yyyy – h:mm a')}
                  </time>
                </div>

                {/* Tags */}
                {comment.tags && comment.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {comment.tags.map((tag, index) => (
                      <Badge 
                        key={index}
                        variant={getTagVariant(tag)}
                        className="text-[10px]"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <p className="text-sm text-gray-700 whitespace-pre-wrap">{comment.comment}</p>

                {/* Files */}
                {comment.files && comment.files.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Attachments:</p>
                    <div className="flex flex-wrap gap-1">
                      {comment.files.map((file, index) => (
                        <Badge 
                          key={index}
                          variant="outline"
                          className="text-xs py-0.5 px-2 hover:bg-gray-100"
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

          {/* Add Comment Input */}
          {onAddComment && (
            <div className="mt-4">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add your comment..."
                className="min-h-[80px]"
              />
              <Button
                className="mt-2"
                size="sm"
                onClick={() => {
                  if (newComment.trim()) {
                    onAddComment(newComment);
                    setNewComment('');
                  }
                }}
              >
                Add Comment
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PolicyCommentTimeline;
