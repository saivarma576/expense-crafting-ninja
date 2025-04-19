
import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, MessageSquare, Plus } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PolicyViolation, PolicyComment } from '@/utils/policyValidations';
import { format } from 'date-fns';

interface PolicyTooltipProps {
  violations: PolicyViolation[];
  className?: string;
  onAddComment?: (violationId: string, comment: string) => void;
}

const PolicyTooltip: React.FC<PolicyTooltipProps> = ({ 
  violations, 
  className,
  onAddComment 
}) => {
  const [commentText, setCommentText] = useState<string>('');
  const [activeViolation, setActiveViolation] = useState<string | null>(null);

  if (violations.length === 0) return null;

  const hasErrors = violations.some(v => v.severity === 'error');

  const handleAddComment = (violationId: string) => {
    if (commentText.trim() && onAddComment) {
      onAddComment(violationId, commentText.trim());
      setCommentText('');
      setActiveViolation(null);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip defaultOpen={true}>
        <TooltipTrigger asChild>
          <button className={`${className} flex items-center`}>
            {hasErrors ? (
              <AlertCircle className="h-4 w-4 text-red-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent className="w-80 p-0 z-50">
          <div className="p-2 space-y-2 bg-white border rounded-md shadow-lg">
            {violations.map((violation) => (
              <div 
                key={violation.id} 
                className={`text-xs ${
                  violation.severity === 'error' 
                    ? 'text-red-600'
                    : 'text-amber-600'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{violation.field}</p>
                    <p>{violation.message}</p>
                  </div>
                  {onAddComment && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => setActiveViolation(
                        activeViolation === violation.id ? null : violation.id
                      )}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Comments section */}
                {violation.comments && violation.comments.length > 0 && (
                  <div className="mt-2 space-y-1.5 pl-3 border-l-2 border-gray-200">
                    {violation.comments.map((comment) => (
                      <div key={comment.id} className="text-gray-600">
                        <p className="text-[10px] font-medium text-gray-400">
                          {comment.user} • {format(new Date(comment.timestamp), 'MMM d, yyyy HH:mm')}
                        </p>
                        <p className="text-xs">{comment.comment}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment input */}
                {activeViolation === violation.id && (
                  <div className="mt-2 space-y-2">
                    <Textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      className="min-h-[60px] text-xs"
                    />
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => {
                          setCommentText('');
                          setActiveViolation(null);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => handleAddComment(violation.id)}
                      >
                        Add Comment
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PolicyTooltip;
