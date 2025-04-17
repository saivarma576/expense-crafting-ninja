
import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, AlertCircle, Zap, ChevronLeft, ChevronRight, RotateCw, BarChart, ChevronDown, ChevronUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type ValidationItem = {
  field: string;
  error: string;
};

type ValidationPanelProps = {
  programmaticErrors: ValidationItem[];
  llmWarnings: string[];
  isVisible: boolean;
  toggleVisibility: () => void;
  onRevalidate?: () => void;
  onAskAI?: () => void;
  activeField?: string;
  setActiveField?: (field: string | null) => void;
};

const ValidationSummaryPanel: React.FC<ValidationPanelProps> = ({
  programmaticErrors,
  llmWarnings,
  isVisible,
  toggleVisibility,
  onRevalidate,
  onAskAI,
  activeField,
  setActiveField
}) => {
  const [activeTab, setActiveTab] = useState<string>("programmatic");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  
  const validationCount = programmaticErrors.length + llmWarnings.length;
  
  useEffect(() => {
    // Automatically show panel if there are issues
    if (validationCount > 0 && !isVisible) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  }, [validationCount, isVisible]);

  useEffect(() => {
    // Auto-expand panel when new issues are detected
    if (validationCount > 0) {
      setIsExpanded(true);
    }
  }, [programmaticErrors.length, llmWarnings.length]);

  const handleHighlightField = (field: string) => {
    if (setActiveField) {
      setActiveField(field);
      
      // Automatically clear the highlight after 3 seconds
      setTimeout(() => {
        setActiveField(null);
      }, 3000);
      
      toast.info(`Highlighting "${field}" field`, {
        duration: 2000,
        position: 'bottom-right'
      });
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className={cn(
      "fixed right-0 top-1/4 bg-white shadow-lg border border-gray-200 rounded-l-lg transition-all duration-300 z-50 flex",
      isVisible ? "translate-x-0" : "translate-x-[calc(100%-28px)]",
      isAnimating && "animate-pulse"
    )}>
      {/* Toggle Button */}
      <button 
        onClick={toggleVisibility}
        className="absolute -left-7 top-12 bg-white border border-gray-200 rounded-l-lg h-14 w-7 flex items-center justify-center shadow-md"
        aria-label={isVisible ? "Collapse validation panel" : "Expand validation panel"}
      >
        {isVisible ? 
          <ChevronRight className="h-4 w-4" /> : 
          <div className="flex flex-col items-center">
            <ChevronLeft className="h-4 w-4" />
            {validationCount > 0 && (
              <Badge 
                variant={programmaticErrors.length > 0 ? "destructive" : "outline"} 
                className={cn(
                  "text-[10px] h-4 min-w-4 px-1 mt-1",
                  programmaticErrors.length === 0 && "border-amber-400 text-amber-600 bg-amber-50"
                )}
              >
                {validationCount}
              </Badge>
            )}
          </div>
        }
      </button>
      
      <div className="w-80 max-h-[500px] overflow-hidden flex flex-col">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="w-full flex-1">
          <div className="p-3 border-b flex justify-between items-center bg-gray-50">
            <CollapsibleTrigger asChild>
              <h3 className="font-semibold text-sm flex items-center cursor-pointer">
                <AlertCircle className="h-4 w-4 mr-1.5 text-amber-500" />
                <span>Issues, Suggestions & Validation</span>
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
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 ml-2 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-2 text-gray-400" />
                )}
              </h3>
            </CollapsibleTrigger>
            <div className="flex items-center gap-1">
              <button 
                onClick={onRevalidate} 
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                title="Re-run validation"
              >
                <RotateCw className="h-4 w-4" />
              </button>
              <button onClick={toggleVisibility} className="text-gray-500 hover:text-gray-700 p-1">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <CollapsibleContent className="overflow-auto max-h-[400px]">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-2 p-1 h-auto">
                <TabsTrigger 
                  value="programmatic" 
                  className="flex items-center py-1.5 text-xs gap-1"
                >
                  <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                  Issues
                  {programmaticErrors.length > 0 && (
                    <Badge variant="destructive" className="ml-1 text-[10px] h-4 min-w-4 px-1">
                      {programmaticErrors.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="llm" 
                  className="flex items-center py-1.5 text-xs gap-1"
                >
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  Suggestions
                  {llmWarnings.length > 0 && (
                    <Badge variant="outline" className="ml-1 text-[10px] h-4 min-w-4 px-1 border-amber-400 text-amber-600 bg-amber-50">
                      {llmWarnings.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="programmatic" className="pt-2">
                <div className="space-y-2 p-3">
                  <p className="text-xs text-gray-500 mb-2">
                    These issues should be resolved before submission:
                  </p>
                  {programmaticErrors.length > 0 ? (
                    <ul className="space-y-1.5">
                      {programmaticErrors.map((error, index) => (
                        <li key={index} className="bg-red-50 p-2 rounded-md text-xs">
                          <div className="flex items-start">
                            <AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 mr-1.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="font-medium text-red-700">{error.field}</p>
                              <p className="text-red-600">{error.error}</p>
                            </div>
                            <button 
                              onClick={() => handleHighlightField(error.field)}
                              className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-0.5 ml-1"
                            >
                              <ChevronRight className="h-3 w-3" />
                              Show
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-6 text-center text-gray-500 text-sm">
                      <AlertCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p>No programmatic issues found</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="llm" className="pt-2">
                <div className="space-y-2 p-3">
                  <p className="text-xs text-amber-700 mb-2 flex items-center">
                    <Zap className="h-3.5 w-3.5 mr-1" />
                    AI policy suggestions:
                  </p>
                  {llmWarnings.length > 0 ? (
                    <ul className="space-y-1.5">
                      {llmWarnings.map((warning, index) => (
                        <li key={index} className="bg-amber-50 p-2 rounded-md text-xs">
                          <div className="flex items-start">
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-500 mt-0.5 mr-1.5 flex-shrink-0" />
                            <p className="text-amber-800 flex-1">{warning}</p>
                            {warning.toLowerCase().includes("receipt") && (
                              <button 
                                onClick={() => handleHighlightField("Receipt")}
                                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-0.5 ml-1"
                              >
                                <ChevronRight className="h-3 w-3" />
                                Show
                              </button>
                            )}
                            {warning.toLowerCase().includes("amount") && (
                              <button 
                                onClick={() => handleHighlightField("Amount")}
                                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-0.5 ml-1"
                              >
                                <ChevronRight className="h-3 w-3" />
                                Show
                              </button>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-6 text-center text-gray-500 text-sm">
                      <Zap className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p>No AI suggestions found</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CollapsibleContent>
        </Collapsible>
        
        <div className="p-3 border-t flex justify-between items-center bg-gray-50">
          <p className="flex items-center text-xs text-gray-500">
            <Zap className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
            AI-powered validation active
          </p>
          <Button 
            size="sm" 
            variant="outline" 
            className="h-7 text-xs px-2 flex items-center gap-1"
            onClick={onAskAI}
          >
            <BarChart className="h-3.5 w-3.5" />
            Ask AI
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ValidationSummaryPanel;
