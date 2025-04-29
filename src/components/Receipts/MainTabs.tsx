
import React from 'react';
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
    <div className="flex justify-center pt-3 pb-2 border-b border-gray-200">
      <div className="bg-gray-100 p-1 rounded-full flex">
        {["email", "captured", "archived"].map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "relative px-6 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
              activeTab === tab 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <span className="capitalize">{tab} Receipts</span>
            {activeTab === tab && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainTabs;
