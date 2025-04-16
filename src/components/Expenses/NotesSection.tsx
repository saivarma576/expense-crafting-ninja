
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import TruncatedText from '@/components/ui/truncated-text';
import { ExternalLink } from 'lucide-react';

interface NotesSectionProps {
  notes: string;
  setNotes: (notes: string) => void;
  helperText?: string;
  showPolicyText?: boolean;
  policyTextMaxLength?: number;
}

const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  setNotes,
  helperText,
  showPolicyText = false,
  policyTextMaxLength = 150
}) => {
  const policyText = "With the exception of mileage and per diem amounts for meals and incidental expenses, itemized receipts should be submitted for ALL reimbursement requests. There is no minimum threshold for receipts. Comments section should be used for documenting any differences between receipts and amounts requested for reimbursement. This includes deductions for 'cash back', hotel points, airline 'frequent flyer' miles, or other rewards received by or due the employee in connection with PTC business travel (as required by the Ethics Act, statewide employee gift ban and the PTC Code of Conduct). For Travel procedures manual click here.";
  
  const handleTravelProceduresClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent tooltip from closing immediately
    window.open('https://dev-upgrade.ptcvendorportal.com/assets/documents/TravelProceduresManual.pdf', '_blank');
  };

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
      <h3 className="text-base font-medium text-gray-700 mb-3">Notes</h3>
      <Textarea 
        placeholder="Add any additional information about this expense report..." 
        value={notes} 
        onChange={e => setNotes(e.target.value)} 
        className="min-h-[120px] text-sm resize-none bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
      />
      
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
