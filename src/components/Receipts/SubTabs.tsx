
import React from 'react';
import { cn } from "@/lib/utils";
import { Upload, Mail, Camera } from 'lucide-react';

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
      <div className="bg-white rounded-full border border-gray-200 shadow-sm p-0.5 flex">
        <button
          onClick={() => onSubTabChange("inbox")}
          className={cn(
            "flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
            activeSubTab === "inbox" 
              ? "bg-blue-50 text-blue-600" 
              : "text-gray-600 hover:bg-gray-50"
          )}
        >
          <Mail className="h-3.5 w-3.5 mr-1.5" />
          Inbox
        </button>
        <button
          onClick={() => onSubTabChange("upload")}
          className={cn(
            "flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
            activeSubTab === "upload" 
              ? "bg-blue-50 text-blue-600" 
              : "text-gray-600 hover:bg-gray-50"
          )}
        >
          <Upload className="h-3.5 w-3.5 mr-1.5" />
          Upload
        </button>
        <button
          onClick={() => onSubTabChange("camera")}
          className={cn(
            "flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
            activeSubTab === "camera" 
              ? "bg-blue-50 text-blue-600" 
              : "text-gray-600 hover:bg-gray-50"
          )}
        >
          <Camera className="h-3.5 w-3.5 mr-1.5" />
          Capture
        </button>
      </div>
    </div>
  );
};

export default SubTabs;
