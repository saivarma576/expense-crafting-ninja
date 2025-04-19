import React, { useState } from 'react';
import { CircleCheck, AlertCircle, AlertTriangle, MessageSquare, Plus, Paperclip, Flag } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PolicyViolation, PolicyComment } from '@/utils/policyValidations';
import PolicyCommentTimeline from './PolicyCommentTimeline';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  const [selectedViolation, setSelectedViolation] = useState<PolicyViolation | null>(null);
  if (violations.length === 0) {
    return <Tooltip>
        <TooltipTrigger asChild>
          <button className={`absolute top-2 right-2 ${className} relative group`}>
            <CircleCheck className="h-4 w-4 text-green-500 transition-transform group-hover:scale-110 animate-pulse" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-green-50 text-green-700 p-2 rounded-md">
          <p>No Policy Violations Detected</p>
        </TooltipContent>
      </Tooltip>;
  }
  const hasErrors = violations.some(v => v.severity === 'error');
  const handleAddComment = (violationId: string) => {
    if (commentText.trim() && onAddComment) {
      onAddComment(violationId, commentText.trim());
      setCommentText('');
      setActiveViolation(null);
    }
  };
  return <TooltipProvider delayDuration={0}>
      <Dialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className={`${className} relative group`}>
              <div className="relative">
                {hasErrors ? <AlertCircle className="h-4 w-4 text-red-500 transition-transform group-hover:scale-110" /> : <AlertTriangle className="h-4 w-4 text-amber-500 transition-transform group-hover:scale-110" />}
                {violations.some(v => v.comments?.length > 0)}
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="p-0 w-80 bg-white border rounded-lg shadow-lg">
            <div className="p-3 space-y-3">
              {violations.map(violation => <div key={violation.id} className="relative group hover:bg-gray-50 rounded-md transition-colors p-2">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <div className={`p-1.5 rounded-lg ${violation.severity === 'error' ? 'bg-red-50' : 'bg-amber-50'}`}>
                        {violation.severity === 'error' ? <AlertCircle className="h-3.5 w-3.5 text-red-500" /> : <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${violation.severity === 'error' ? 'text-red-700' : 'text-amber-700'}`}>
                          {violation.message}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Badge variant="outline" className="text-[10px] py-0 px-1.5 rounded-sm">
                            {violation.field}
                          </Badge>
                          {violation.category && <Badge variant="outline" className="text-[10px] py-0 px-1.5 rounded-sm">
                              {violation.category}
                            </Badge>}
                        </div>
                      </div>
                    </div>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setSelectedViolation(violation)}>
                        <MessageSquare className="h-3.5 w-3.5" />
                      </Button>
                    </DialogTrigger>
                  </div>
                </div>)}
            </div>
            <div className="border-t p-2 bg-gray-50">
              <div className="flex items-center gap-2 text-[11px] text-gray-500">
                <Flag className="h-3 w-3" />
                <span>AI-flagged potential violations • Review carefully</span>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>

        <DialogContent className="sm:max-w-[500px] p-0">
          {selectedViolation && <>
              <DialogHeader className="px-6 py-4 border-b">
                <DialogTitle className="text-lg flex items-center gap-2">
                  {selectedViolation.severity === 'error' ? <AlertCircle className="h-5 w-5 text-red-500" /> : <AlertTriangle className="h-5 w-5 text-amber-500" />}
                  Policy Violation Details
                </DialogTitle>
              </DialogHeader>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-medium">Issue</h3>
                    <p className="text-sm text-gray-600">{selectedViolation.message}</p>
                  </div>

                  <PolicyCommentTimeline comments={selectedViolation.comments || []} policyRule={selectedViolation.message} severity={selectedViolation.severity} status={selectedViolation.status} maxHeight={300} onAddComment={onAddComment ? comment => onAddComment(selectedViolation.id, comment) : undefined} />
                </div>
              </div>
            </>}
        </DialogContent>
      </Dialog>
    </TooltipProvider>;
};
export default PolicyTooltip;