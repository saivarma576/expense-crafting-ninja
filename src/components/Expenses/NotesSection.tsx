
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import TruncatedText from '@/components/ui/truncated-text';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotesSectionProps {
  notes: string;
  setNotes: (notes: string) => void;
  helperText?: string;
  showPolicyText?: boolean;
  policyTextMaxLength?: number;
  activeField?: string;
  validation?: {
    error?: string;
    warning?: string;
  };
}

const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  setNotes,
  helperText,
  showPolicyText = false,
  policyTextMaxLength = 150,
  activeField,
  validation
}) => {
  const policyText = "With the exception of mileage and per diem amounts for meals and incidental expenses, itemized receipts should be submitted for ALL reimbursement requests. There is no minimum threshold for receipts. Comments section should be used for documenting any differences between receipts and amounts requested for reimbursement. This includes deductions for 'cash back', hotel points, airline 'frequent flyer' miles, or other rewards received by or due the employee in connection with PTC business travel (as required by the Ethics Act, statewide employee gift ban and the PTC Code of Conduct). For Travel procedures manual click here.";
  
  const handleTravelProceduresClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent tooltip from closing immediately
    window.open('https://dev-upgrade.ptcvendorportal.com/assets/documents/TravelProceduresManual.pdf', '_blank');
  };

  const isHighlighted = activeField === 'notes';
  const hasError = !!validation?.error;
  const hasWarning = !!validation?.warning;

  // Custom renderer for the tooltip content to include the clickable link
  const renderTooltipContent = () => {
    // Find the position of "click here" in the policy text
    const clickHereIndex = policyText.indexOf("click here");
    if (clickHereIndex === -1) return policyText;

    // Split the text into three parts: before link, the link text, and after link
    const beforeLink = policyText.substring(0, clickHereIndex);
    const afterLink = policyText.substring(clickHereIndex + "click here".length);

    return (
      <>
        {beforeLink}
        <span 
          onClick={handleTravelProceduresClick}
          className="text-blue-600 cursor-pointer hover:underline inline-flex items-center"
        >
          click here
          <ExternalLink className="h-3 w-3 ml-0.5" />
        </span>
        {afterLink}
      </>
    );
  };

  return (
    <div>
      <h3 className={cn(
        "text-base font-medium text-gray-700 mb-3",
        isHighlighted && "text-amber-700",
        hasError && "text-red-700"
      )}>
        Notes
        {isHighlighted && (
          <span className="ml-2 text-amber-500 inline-flex items-center text-xs font-medium">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Attention needed
          </span>
        )}
      </h3>
      <Textarea 
        placeholder="Add any additional information about this expense report..." 
        value={notes} 
        onChange={e => setNotes(e.target.value)} 
        className={cn(
          "min-h-[120px] text-sm resize-none bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50",
          isHighlighted && "ring-2 ring-amber-400 animate-pulse",
          hasError && "border-red-300",
          hasWarning && !hasError && "border-amber-300"
        )}
      />
      
      {(hasError || hasWarning) && (
        <div className={cn(
          "mt-1 text-xs flex items-start gap-1",
          hasError ? "text-red-600" : "text-amber-600"
        )}>
          {hasError ? (
            <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
          )}
          <span>{validation?.error || validation?.warning}</span>
        </div>
      )}
      
      {showPolicyText && (
        <div className="mt-4 border-t pt-3 text-xs text-gray-500">
          <TruncatedText 
            text={policyText} 
            maxLength={policyTextMaxLength}
            tooltipContent={renderTooltipContent()}
          />
        </div>
      )}
    </div>
  );
};

export default NotesSection;
