
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
import PolicyCommentTimeline from './PolicyCommentTimeline';

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
      <Tooltip>
        <TooltipTrigger asChild>
          <button className={`${className} flex items-center`}>
            {hasErrors ? (
              <AlertCircle className="h-4 w-4 text-red-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent className="w-96 p-0">
          <div className="p-4 space-y-4 bg-white border rounded-lg shadow-lg">
            {violations.map((violation) => (
              <div 
                key={violation.id} 
                className={`text-sm ${
                  violation.severity === 'error' 
                    ? 'text-red-600'
                    : 'text-amber-600'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="font-medium">{violation.field}</p>
                    <p className="text-gray-600">{violation.message}</p>
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

                {/* Comments timeline */}
                {violation.comments && violation.comments.length > 0 && (
                  <PolicyCommentTimeline 
                    comments={violation.comments} 
                    className="mt-3"
                  />
                )}

                {/* Comment input */}
                {activeViolation === violation.id && (
                  <div className="mt-3 space-y-2">
                    <Textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      className="min-h-[60px] text-sm"
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
