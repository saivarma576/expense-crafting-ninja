
import React from 'react';
import { format } from 'date-fns';
import { PolicyComment } from '@/utils/policyValidations';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PolicyCommentTimelineProps {
  comments: PolicyComment[];
  className?: string;
}

const PolicyCommentTimeline: React.FC<PolicyCommentTimelineProps> = ({ comments, className }) => {
  if (!comments || comments.length === 0) return null;

  return (
    <div className={cn("space-y-3 pl-4 border-l-2 border-gray-200", className)}>
      {comments.map((comment, index) => (
        <div 
          key={comment.id} 
          className="relative"
        >
          {/* Timeline dot */}
          <div className="absolute -left-[25px] mt-1.5 w-4 h-4 bg-blue-100 rounded-full border-2 border-blue-500 flex items-center justify-center">
            <MessageSquare className="w-2 h-2 text-blue-500" />
          </div>
          
          {/* Comment content */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <span className="font-medium text-gray-700">{comment.user}</span>
              <span>•</span>
              <time dateTime={comment.timestamp.toISOString()}>
                {format(new Date(comment.timestamp), 'MMM d, yyyy HH:mm')}
              </time>
            </div>
            <p className="text-sm text-gray-700">{comment.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PolicyCommentTimeline;
