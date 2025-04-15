
import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, UserCircle2, Brain, Zap, X, MessageSquare, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

const suggestedQuestions = [
  "What are the meal allowance limits for business travel?",
  "Do I need approval for expenses over $500?",
  "How long do I have to submit receipts after a trip?",
  "What types of transportation expenses are covered?",
  "Are entertainment expenses allowed with clients?"
];

const AIChatDrawer: React.FC<AIChatDrawerProps> = ({ 
  isOpen, 
  onClose,
  context
}) => {
  // Get saved messages from localStorage if they exist
  const getSavedMessages = (): Message[] => {
    const savedMessages = localStorage.getItem('policy-ai-chat-history');
    if (savedMessages) {
      try {
        return JSON.parse(savedMessages);
      } catch (e) {
        console.error("Error parsing saved messages:", e);
      }
    }
    
    // Default welcome message if no history
    return [{
      id: "welcome",
      content: "Hello! I'm your Policy AI assistant. Ask me anything about expense policies or guidelines.",
      isAI: true,
      timestamp: new Date()
    }];
  };

  const [messages, setMessages] = useState<Message[]>(getSavedMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('policy-ai-chat-history', JSON.stringify(messages));
  }, [messages]);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (text?: string) => {
    const messageToSend = text || inputValue;
    if (!messageToSend.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: messageToSend,
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

  const handleClearHistory = () => {
    const welcomeMessage = {
      id: "welcome",
      content: "Hello! I'm your Policy AI assistant. Ask me anything about expense policies or guidelines.",
      isAI: true,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
    localStorage.removeItem('policy-ai-chat-history');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md p-0 border-l shadow-xl bg-gradient-to-br from-slate-50 to-blue-50" side="right">
        <div className="flex flex-col h-full">
          <SheetHeader className="border-b p-4 bg-white">
            <div className="flex justify-between items-center">
              <SheetTitle className="flex items-center">
                <div className="relative mr-2">
                  <Brain className="h-5 w-5 text-blue-500" />
                  <Zap className="h-3 w-3 text-amber-400 absolute -top-1 -right-1" />
                </div>
                Policy AI Assistant
              </SheetTitle>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <motion.div 
                  key={message.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex max-w-[85%] ${message.isAI ? 'items-start' : 'items-end'}`}>
                    {message.isAI && (
                      <div className="bg-blue-500 rounded-full p-2 mr-2 flex-shrink-0">
                        <Brain className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div 
                      className={cn(
                        "rounded-lg p-3 shadow-sm", 
                        message.isAI 
                          ? "bg-white border border-blue-100 text-blue-900 rounded-tl-none" 
                          : "bg-blue-500 text-white rounded-br-none"
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                    {!message.isAI && (
                      <div className="bg-gray-200 rounded-full p-2 ml-2 flex-shrink-0">
                        <UserCircle2 className="h-4 w-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start">
                    <div className="bg-blue-500 rounded-full p-2 mr-2 flex-shrink-0">
                      <Brain className="h-4 w-4 text-white animate-pulse" />
                    </div>
                    <div className="bg-white border border-blue-100 rounded-lg p-4 max-w-[85%] rounded-tl-none shadow-sm">
                      <div className="flex gap-2 items-center">
                        <div className="w-6 h-6 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Skeleton className="h-3 w-40 bg-blue-100" />
                          <Skeleton className="h-3 w-28 bg-blue-100" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {messages.length === 1 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3 text-blue-800">Suggested Questions</h4>
                <div className="grid gap-2">
                  {suggestedQuestions.map((question) => (
                    <motion.button
                      key={question}
                      whileHover={{ scale: 1.01, backgroundColor: "#EFF6FF" }}
                      className="text-left p-3 bg-white rounded-lg border border-blue-100 text-sm text-blue-900 hover:border-blue-300 transition-colors flex justify-between items-center shadow-sm"
                      onClick={() => handleSendMessage(question)}
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-400" />
                        <span>{question}</span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-blue-400" />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>
          
          <div className="p-4 border-t mt-auto bg-white">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about expense policies..."
                  className="resize-none text-sm min-h-[60px] py-3 flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  size="icon" 
                  className="h-10 w-10"
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {messages.length > 1 && (
                <div className="flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs text-gray-500"
                    onClick={handleClearHistory}
                  >
                    Clear chat history
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AIChatDrawer;
