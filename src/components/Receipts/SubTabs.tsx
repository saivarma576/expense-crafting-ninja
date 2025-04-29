
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { Upload, Mail } from 'lucide-react';

interface SubTabsProps {
  activeSubTab: string;
  onSubTabChange: (value: string) => void;
}

const SubTabs: React.FC<SubTabsProps> = ({
  activeSubTab,
  onSubTabChange
}) => {
  return (
    <div className="flex justify-center py-2 border-b border-gray-200">
      <ToggleGroup 
        type="single" 
        value={activeSubTab} 
        onValueChange={(value) => value && onSubTabChange(value)}
        className="bg-white rounded-full border shadow-sm"
      >
        <ToggleGroupItem 
          value="email" 
          className={cn(
            "rounded-full text-sm font-medium transition-all",
            activeSubTab === "email" 
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-400" 
              : "text-gray-600"
          )}
        >
          <Mail className="h-3.5 w-3.5 mr-1.5" />
          Email
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="upload" 
          className={cn(
            "rounded-full text-sm font-medium transition-all",
            activeSubTab === "upload" 
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-400" 
              : "text-gray-600"
          )}
        >
          <Upload className="h-3.5 w-3.5 mr-1.5" />
          Upload
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default SubTabs;
