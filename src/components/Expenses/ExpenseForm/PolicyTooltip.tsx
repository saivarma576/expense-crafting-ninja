
import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, MessageSquare, Plus, Paperclip } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

interface PolicyTooltipProps {
  violations: PolicyViolation[];
  className?: string;
  onAddComment?: (violationId: string, comment: string, tags?: string[], files?: string[]) => void;
}

const PolicyTooltip: React.FC<PolicyTooltipProps> = ({ 
  violations, 
  className,
  onAddComment 
}) => {
  const [commentText, setCommentText] = useState<string>('');
  const [activeViolation, setActiveViolation] = useState<string | null>(null);
  const [commentTags, setCommentTags] = useState<string[]>([]);
  const [commentFiles, setCommentFiles] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');

  if (violations.length === 0) return null;

  const hasErrors = violations.some(v => v.severity === 'error');

  const handleAddComment = (violationId: string) => {
    if (commentText.trim() && onAddComment) {
      onAddComment(
        violationId, 
        commentText.trim(), 
        commentTags.length > 0 ? commentTags : undefined,
        commentFiles.length > 0 ? commentFiles : undefined
      );
      setCommentText('');
      setCommentTags([]);
      setCommentFiles([]);
      setActiveViolation(null);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/^#/, '');
      if (newTag && !commentTags.includes(newTag)) {
        setCommentTags([...commentTags, newTag]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setCommentTags(commentTags.filter(t => t !== tag));
  };

  const handleAddFile = () => {
    // Mock file upload - in a real implementation, this would open a file picker
    const mockFileName = `Receipt-${Math.floor(Math.random() * 1000)}.pdf`;
    setCommentFiles([...commentFiles, mockFileName]);
  };

  const handleRemoveFile = (file: string) => {
    setCommentFiles(commentFiles.filter(f => f !== file));
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
                <div className="flex justify-between items-start mb-2">
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
                {(violation.comments && violation.comments.length > 0) || violation.message && (
                  <PolicyCommentTimeline 
                    comments={violation.comments || []} 
                    policyRule={violation.message}
                    severity={violation.severity}
                    status={violation.status || 'violation'}
                    className="mt-3"
                  />
                )}

                {/* Comment input */}
                {activeViolation === violation.id && (
                  <div className="mt-3 space-y-2 bg-gray-50 p-3 rounded-md">
                    <Textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      className="min-h-[80px] text-sm"
                    />
                    
                    {/* Tags input */}
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {commentTags.map((tag, index) => (
                        <Badge 
                          key={index}
                          variant="secondary" 
                          className="text-xs py-0.5 px-2 cursor-pointer"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          #{tag} <span className="ml-1">×</span>
                        </Badge>
                      ))}
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="Add tag..."
                        className="text-xs flex-1 min-w-[80px] py-1 px-2 bg-transparent border-none outline-none"
                      />
                    </div>
                    
                    {/* File attachments */}
                    {commentFiles.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {commentFiles.map((file, index) => (
                          <Badge 
                            key={index}
                            variant="outline" 
                            className="text-xs py-0.5 px-2 bg-gray-100 cursor-pointer"
                            onClick={() => handleRemoveFile(file)}
                          >
                            {file} <span className="ml-1">×</span>
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={handleAddFile}
                      >
                        <Paperclip className="h-3 w-3 mr-1" />
                        Attach
                      </Button>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => {
                            setCommentText('');
                            setCommentTags([]);
                            setCommentFiles([]);
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
