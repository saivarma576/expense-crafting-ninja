
import React, { useState } from 'react';
import { format } from 'date-fns';
import { PolicyComment } from '@/utils/policyValidations';
import { MessageSquare, Bot, AlertTriangle, CircleX, CircleMinus, CircleCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface PolicyCommentTimelineProps {
  comments: PolicyComment[];
  policyRule?: string;
  severity?: 'error' | 'warning';
  status?: 'violation' | 'exception' | 'approved';
  maxHeight?: number;
  onAddComment?: (comment: string) => void;
}

const PolicyCommentTimeline: React.FC<PolicyCommentTimelineProps> = ({
  comments,
  policyRule,
  severity = 'warning',
  status = 'violation',
  maxHeight = 300,
  onAddComment
}) => {
  const [newComment, setNewComment] = useState('');

  const renderCommentIcon = (comment: PolicyComment) => {
    switch(comment.type) {
      case 'system':
        return (
          <div className="absolute -left-[25px] mt-1.5 w-4 h-4 bg-gray-100 rounded-full border-2 border-gray-500 flex items-center justify-center">
            <AlertTriangle className="w-2 h-2 text-gray-600" />
          </div>
        );
      case 'bot':
        return (
          <div className="absolute -left-[25px] mt-1.5 w-4 h-4 bg-blue-100 rounded-full border-2 border-blue-500 flex items-center justify-center">
            <Bot className="w-2 h-2 text-blue-600" />
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

  return (
    <div className="space-y-3">
      {/* Policy Rule Header */}
      {policyRule && (
        <div className={cn(
          "rounded-md p-2.5 mb-2 text-sm font-medium flex items-start gap-2",
          severity === 'error' ? "bg-red-50 text-red-700 border border-red-200" : 
                               "bg-amber-50 text-amber-700 border border-amber-200"
        )}>
          {status === 'violation' ? <CircleX className="h-4 w-4 flex-shrink-0 mt-0.5" /> :
           status === 'exception' ? <CircleMinus className="h-4 w-4 flex-shrink-0 mt-0.5" /> :
                                  <CircleCheck className="h-4 w-4 flex-shrink-0 mt-0.5" />}
          <span>{policyRule}</span>
        </div>
      )}

      {/* Comments Timeline */}
      <ScrollArea className={`max-h-[${maxHeight}px]`}>
        <div className="pl-4 border-l-2 border-gray-200">
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
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{comment.comment}</p>
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
