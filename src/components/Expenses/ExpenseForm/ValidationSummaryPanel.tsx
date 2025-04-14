
import React, { useState } from 'react';
import { X, AlertTriangle, AlertCircle, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

type ValidationItem = {
  field: string;
  error: string;
};

type ValidationPanelProps = {
  programmaticErrors: ValidationItem[];
  llmWarnings: string[];
  isVisible: boolean;
  toggleVisibility: () => void;
};

const ValidationSummaryPanel: React.FC<ValidationPanelProps> = ({
  programmaticErrors,
  llmWarnings,
  isVisible,
  toggleVisibility
}) => {
  const [activeTab, setActiveTab] = useState<string>(programmaticErrors.length > 0 ? "programmatic" : "llm");
  
  if (programmaticErrors.length === 0 && llmWarnings.length === 0) {
    return null;
  }
  
  return (
    <div className={cn(
      "fixed right-0 top-1/4 bg-white shadow-lg border border-gray-200 rounded-l-lg transition-all duration-300 z-50 flex",
      isVisible ? "translate-x-0" : "translate-x-[calc(100%-28px)]"
    )}>
      {/* Toggle Button */}
      <button 
        onClick={toggleVisibility}
        className="absolute -left-7 top-12 bg-white border border-gray-200 rounded-l-lg h-14 w-7 flex items-center justify-center shadow-md"
        aria-label={isVisible ? "Collapse validation panel" : "Expand validation panel"}
      >
        {isVisible ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
      
      <div className="w-80 max-h-[500px] overflow-auto">
        <div className="p-3 border-b flex justify-between items-center bg-gray-50">
          <h3 className="font-semibold text-sm flex items-center">
            <AlertCircle className="h-4 w-4 mr-1.5 text-amber-500" />
            Validation Summary
            <div className="ml-2 flex gap-1">
              {programmaticErrors.length > 0 && (
                <Badge variant="destructive" className="text-[10px] h-5">
                  {programmaticErrors.length}
                </Badge>
              )}
              {llmWarnings.length > 0 && (
                <Badge variant="outline" className="text-[10px] h-5 border-amber-400 text-amber-600 bg-amber-50">
                  {llmWarnings.length}
                </Badge>
              )}
            </div>
          </h3>
          <button onClick={toggleVisibility} className="text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 p-1 h-auto">
            <TabsTrigger 
              value="programmatic" 
              className={cn(
                "flex items-center py-1.5 text-xs gap-1",
                programmaticErrors.length === 0 && "opacity-50"
              )}
              disabled={programmaticErrors.length === 0}
            >
              <AlertCircle className="h-3.5 w-3.5 text-red-500" />
              Required
              {programmaticErrors.length > 0 && (
                <Badge variant="destructive" className="ml-1 text-[10px] h-4 min-w-4 px-1">
                  {programmaticErrors.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="llm" 
              className={cn(
                "flex items-center py-1.5 text-xs gap-1",
                llmWarnings.length === 0 && "opacity-50"
              )}
              disabled={llmWarnings.length === 0}
            >
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              AI Insights
              {llmWarnings.length > 0 && (
                <Badge variant="outline" className="ml-1 text-[10px] h-4 min-w-4 px-1 border-amber-400 text-amber-600 bg-amber-50">
                  {llmWarnings.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="programmatic" className="pt-2">
            {programmaticErrors.length > 0 ? (
              <div className="space-y-2 p-3">
                <p className="text-xs text-gray-500 mb-2">
                  These issues must be resolved before submission:
                </p>
                <ul className="space-y-1.5">
                  {programmaticErrors.map((error, index) => (
                    <li key={index} className="bg-red-50 p-2 rounded-md text-xs flex items-start">
                      <AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 mr-1.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-red-700">{error.field}</p>
                        <p className="text-red-600">{error.error}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500 text-sm">
                <AlertCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p>All required fields look good!</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="llm" className="pt-2">
            {llmWarnings.length > 0 ? (
              <div className="space-y-2 p-3">
                <p className="text-xs text-amber-700 mb-2 flex items-center">
                  <Zap className="h-3.5 w-3.5 mr-1" />
                  AI policy suggestions:
                </p>
                <ul className="space-y-1.5">
                  {llmWarnings.map((warning, index) => (
                    <li key={index} className="bg-amber-50 p-2 rounded-md text-xs">
                      <div className="flex items-start">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500 mt-0.5 mr-1.5 flex-shrink-0" />
                        <p className="text-amber-800">{warning}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500 text-sm">
                <Zap className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p>No policy suggestions!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="p-3 border-t text-xs text-gray-500 bg-gray-50">
          <p className="flex items-center">
            <Zap className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
            AI-powered validation is in testing mode. You can still submit with warnings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValidationSummaryPanel;
