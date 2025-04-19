
import React, { useState } from 'react';
import { format } from 'date-fns';
import { PolicyComment } from '@/utils/policyValidations';
import { MessageSquare, Bot, AlertTriangle, CircleX, CircleMinus, CircleCheck, User, Clock, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PolicyCommentTimelineProps {
  comments: PolicyComment[];
  policyRule?: string;
  severity?: 'error' | 'warning';
  status?: 'violation' | 'exception' | 'approved';
  maxHeight?: number;
  onAddComment?: (comment: string) => void;
  className?: string;
}

const PolicyCommentTimeline: React.FC<PolicyCommentTimelineProps> = ({
  comments,
  policyRule,
  severity = 'warning',
  status = 'violation',
  maxHeight = 300,
  onAddComment,
  className
}) => {
  const [newComment, setNewComment] = useState('');

  const renderCommentIcon = (comment: PolicyComment) => {
    const iconClass = "absolute -left-6 mt-1 w-5 h-5 rounded-full flex items-center justify-center";
    
    switch(comment.type) {
      case 'system':
        return (
          <div className={cn(iconClass, "bg-gray-100 text-gray-600")}>
            <Bot className="w-3 h-3" />
          </div>
        );
      case 'bot':
        return (
          <div className={cn(iconClass, "bg-blue-100 text-blue-600")}>
            <Bot className="w-3 h-3" />
          </div>
        );
      default:
        return (
          <div className={cn(iconClass, "bg-purple-100 text-purple-600")}>
            <User className="w-3 h-3" />
          </div>
        );
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <ScrollArea className={`max-h-[${maxHeight}px]`}>
        <div className="pl-8 relative space-y-4">
          <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-gray-100" />
          
          {comments.map((comment, index) => (
            <div key={comment.id} className="relative">
              {renderCommentIcon(comment)}
              
              <div className={cn(
                "rounded-lg p-3 border",
                comment.type === 'system' ? 'bg-gray-50 border-gray-100' :
                comment.type === 'bot' ? 'bg-blue-50 border-blue-100' :
                'bg-white border-gray-200'
              )}>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
                  <span className="font-medium text-gray-900">{comment.user}</span>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(comment.timestamp, 'MMM d, yyyy')}
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {format(comment.timestamp, 'h:mm a')}
                  </div>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {onAddComment && (
        <div className="pt-2 space-y-2">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment..."
            className="min-h-[80px] resize-none"
          />
          <div className="flex justify-end">
            <Button
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
        </div>
      )}
    </div>
  );
};

export default PolicyCommentTimeline;
