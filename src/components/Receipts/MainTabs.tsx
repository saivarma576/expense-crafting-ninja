
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface MainTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const MainTabs: React.FC<MainTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <div className="flex justify-center pb-2 pt-3 border-b border-gray-200">
      <ToggleGroup 
        type="single" 
        value={activeTab} 
        onValueChange={(value) => value && onTabChange(value)}
        className="bg-gray-100 p-1 rounded-full"
      >
        <ToggleGroupItem 
          value="new" 
          className={cn(
            "rounded-full text-sm px-5 py-1.5 font-medium transition-all",
            activeTab === "new" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
          )}
        >
          New
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="processed" 
          className={cn(
            "rounded-full text-sm px-5 py-1.5 font-medium transition-all",
            activeTab === "processed" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
          )}
        >
          Processed
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="archived" 
          className={cn(
            "rounded-full text-sm px-5 py-1.5 font-medium transition-all",
            activeTab === "archived" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
          )}
        >
          Archived
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default MainTabs;
