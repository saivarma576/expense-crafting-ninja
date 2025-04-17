import React, { useState, useRef, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, BookOpenText, UserCircle2, Zap, PieChart, BarChart, LineChart, ChevronLeft, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
};

interface ExpenseAIDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  context?: string;
}

const ExpenseAIDrawer: React.FC<ExpenseAIDrawerProps> = ({ 
  isOpen, 
  onClose,
  context
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your Expense Policy AI assistant. Ask me any questions about expense policies or guidelines.",
      isAI: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
        "Based on our expense policy, meal expenses exceeding $75 per day require manager approval and itemized receipts.",
        "For international travel, you need to submit your request at least 14 days in advance for proper approval.",
        "Our policy states that business class flights are only approved for flights longer than 6 hours and require VP approval.",
        "Expense reports should be submitted within 30 days of the expense date. Anything beyond that requires special approval.",
        "When entertaining clients, you need to include the business purpose and names of all attendees in your expense report."
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
      <DrawerContent className="h-[500px]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <BookOpenText className="h-5 w-5 text-blue-500" />
            Expense Policy AI Assistant
          </DrawerTitle>
        </DrawerHeader>
        
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex max-w-[90%] ${message.isAI ? 'items-start' : 'items-end'}`}>
                  {message.isAI && (
                    <div className="bg-blue-500 rounded-full p-1.5 mr-2 flex-shrink-0">
                      <Zap className="h-3 w-3 text-white" />
                    </div>
                  )}
                  <div 
                    className={cn(
                      "rounded-lg p-3", 
                      message.isAI 
                        ? "bg-blue-50 text-blue-900 rounded-tl-none" 
                        : "bg-gray-100 text-gray-900 rounded-tr-none"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                  {!message.isAI && (
                    <div className="bg-gray-300 rounded-full p-1.5 ml-2 flex-shrink-0">
                      <UserCircle2 className="h-3 w-3 text-gray-600" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start">
                  <div className="bg-blue-500 rounded-full p-1.5 mr-2 flex-shrink-0">
                    <Zap className="h-3 w-3 text-white" />
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 max-w-[85%] rounded-tl-none">
                    <div className="flex space-x-1.5">
                      <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-3 border-t mt-auto">
          <div className="flex gap-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about expense policies..."
              className="resize-none text-sm min-h-[45px] py-2"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              size="icon" 
              className="h-auto aspect-square"
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

export default ExpenseAIDrawer;
