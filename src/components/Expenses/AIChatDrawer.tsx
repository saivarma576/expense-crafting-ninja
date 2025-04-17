
import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, UserCircle2, Zap, PieChart, BarChart, LineChart, ChevronLeft, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
};

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  context?: string;
}

const AIChatDrawer: React.FC<AIChatDrawerProps> = ({ 
  isOpen, 
  onClose,
  context
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your Travel & Expense AI assistant. I can help explain policy requirements or suggest ways to improve your expense report. What would you like to know?",
      isAI: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeChart, setActiveChart] = useState<string | null>("insights");
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      isAI: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Simulate AI response (would be replaced with actual API call)
    setTimeout(() => {
      const aiResponses = [
        "Based on our travel policy, meals exceeding $80 per day require itemized receipts and explanation.",
        "For hotel expenses, please make sure to include the folio receipt showing the breakdown of charges.",
        "This appears to be a business meal. Remember to list all attendees and the business purpose in your notes.",
        "I notice this is a high value expense. You might want to add more details in the description for faster approval.",
        "Policy tip: Expenses submitted more than 60 days after the transaction date require VP approval."
      ];
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        isAI: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  // Mock data for charts
  const categoryData = [
    { name: "Meals", value: 35, color: "#8884d8" },
    { name: "Lodging", value: 45, color: "#82ca9d" },
    { name: "Transportation", value: 20, color: "#ffc658" }
  ];
  
  const trendData = [
    { name: "Jan", expenses: 400 },
    { name: "Feb", expenses: 300 },
    { name: "Mar", expenses: 600 },
    { name: "Apr", expenses: 800 },
    { name: "May", expenses: 500 }
  ];
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg p-0 border-l-0 shadow-2xl bg-gradient-to-br from-slate-50 to-blue-50" side="right">
        <div className="flex flex-col h-full">
          <SheetHeader className="border-b p-4 bg-white">
            <div className="flex justify-between items-center">
              <SheetTitle className="flex items-center">
                <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
                Expense AI Insights
              </SheetTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex mt-4 space-x-2">
              <Button 
                variant={activeChart === "insights" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveChart("insights")}
                className="flex items-center gap-1"
              >
                <Zap className="h-4 w-4" />
                Insights
              </Button>
              <Button 
                variant={activeChart === "categories" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveChart("categories")}
                className="flex items-center gap-1"
              >
                <PieChart className="h-4 w-4" />
                Categories
              </Button>
              <Button 
                variant={activeChart === "trends" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveChart("trends")}
                className="flex items-center gap-1"
              >
                <LineChart className="h-4 w-4" />
                Trends
              </Button>
            </div>
          </SheetHeader>
          
          {activeChart === "insights" ? (
            <div className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`flex max-w-[80%] ${message.isAI ? 'items-start' : 'items-end'}`}>
                        {message.isAI && (
                          <div className="bg-blue-500 rounded-full p-2 mr-2 flex-shrink-0">
                            <Zap className="h-4 w-4 text-white" />
                          </div>
                        )}
                        <div 
                          className={`rounded-lg p-3 ${
                            message.isAI 
                              ? 'bg-blue-50 text-blue-900 border border-blue-100' 
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                        {!message.isAI && (
                          <div className="bg-gray-300 rounded-full p-2 ml-2 flex-shrink-0">
                            <UserCircle2 className="h-4 w-4 text-gray-600" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-blue-50 rounded-lg p-3 max-w-[80%]">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t mt-auto">
                <div className="flex items-center space-x-2">
                  <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about expense policies or get suggestions..."
                    className="resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : activeChart === "categories" ? (
            <div className="flex-1 p-6 flex flex-col">
              <h3 className="text-lg font-medium mb-4">Expense Categories</h3>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md aspect-square relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-600">$3,250</p>
                      <p className="text-sm text-gray-500">Total Expenses</p>
                    </div>
                  </div>
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <g transform="translate(200, 200)">
                      {/* Simulated pie chart */}
                      <path d="M0,-150 A150,150 0 0,1 129.9,-75 L0,0 Z" fill="#8884d8" />
                      <path d="M129.9,-75 A150,150 0 0,1 129.9,75 L0,0 Z" fill="#82ca9d" />
                      <path d="M129.9,75 A150,150 0 0,1 0,150 L0,0 Z" fill="#ffc658" />
                      <path d="M0,150 A150,150 0 0,1 -150,0 L0,0 Z" fill="#ff8042" />
                      <path d="M-150,0 A150,150 0 0,1 0,-150 L0,0 Z" fill="#0088fe" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: category.color }}
                    />
                    <div>
                      <p className="text-sm font-medium">{category.name}</p>
                      <p className="text-xs text-gray-500">{category.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">AI Insights</h4>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <div className="flex">
                    <Zap className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      Your meal expenses are trending 15% higher than company average. Consider using company cafeteria for more savings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 p-6 flex flex-col">
              <h3 className="text-lg font-medium mb-4">Expense Trends</h3>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full h-64 relative">
                  <svg viewBox="0 0 500 300" className="w-full h-full">
                    {/* X and Y axes */}
                    <line x1="50" y1="250" x2="450" y2="250" stroke="#ccc" strokeWidth="2" />
                    <line x1="50" y1="50" x2="50" y2="250" stroke="#ccc" strokeWidth="2" />
                    
                    {/* X-axis labels */}
                    {trendData.map((entry, index) => (
                      <text 
                        key={entry.name} 
                        x={50 + (index * 100)} 
                        y="270" 
                        textAnchor="middle" 
                        fontSize="12"
                        fill="#666"
                      >
                        {entry.name}
                      </text>
                    ))}
                    
                    {/* Bar chart */}
                    {trendData.map((entry, index) => (
                      <rect
                        key={index}
                        x={30 + (index * 100)}
                        y={250 - (entry.expenses / 4)}
                        width="40"
                        height={entry.expenses / 4}
                        fill="url(#gradient)"
                        rx="4"
                      />
                    ))}
                    
                    {/* Line chart */}
                    <path 
                      d={`M${50 + (0 * 100)} ${250 - (trendData[0].expenses / 4)} ${trendData.slice(1).map((entry, i) => 
                        `L ${50 + ((i + 1) * 100)} ${250 - (entry.expenses / 4)}`).join(' ')}`} 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="3"
                    />
                    
                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Monthly Insights</h4>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <div className="flex">
                    <Zap className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      April had the highest expenses at $800, which is 60% higher than your monthly average of $500.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AIChatDrawer;
