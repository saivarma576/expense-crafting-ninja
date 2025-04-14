
import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, UserCircle2, XCircle, Zap } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[85vh] max-h-[85vh] flex flex-col">
        <DrawerHeader className="border-b p-4">
          <DrawerTitle className="flex items-center">
            <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
            Expense Policy Assistant
          </DrawerTitle>
        </DrawerHeader>
        
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
      </DrawerContent>
    </Drawer>
  );
};

export default AIChatDrawer;
