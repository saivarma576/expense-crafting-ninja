
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { FileText, Sparkles, Plane } from 'lucide-react';

interface ReportVersionSelectorProps {
  activeVersion: 'standard' | 'apple' | 'modern';
  onChange: (version: 'standard' | 'apple' | 'modern') => void;
}

const ReportVersionSelector: React.FC<ReportVersionSelectorProps> = ({
  activeVersion,
  onChange
}) => {
  return (
    <div className="mb-6">
      <ToggleGroup type="single" value={activeVersion} onValueChange={(value) => value && onChange(value as 'standard' | 'apple' | 'modern')}>
        <ToggleGroupItem value="standard" aria-label="Standard Report" className="flex items-center gap-1.5">
          <FileText className="h-4 w-4" />
          <span>Standard</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="apple" aria-label="Apple Style Report" className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4" />
          <span>Apple Style</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="modern" aria-label="Modern Report" className="flex items-center gap-1.5">
          <Plane className="h-4 w-4" />
          <span>Modern</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default ReportVersionSelector;
