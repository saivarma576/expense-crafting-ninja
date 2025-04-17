import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, UserCircle2, LightbulbIcon, X, MessageSquare, ArrowRight, BookOpen } from "lucide-react";
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

type ConversationData = {
  id: string;
  userId: string;
  userName: string;
  department: string;
  topic: string;
  context: string;
  messages: Message[];
  startTime: Date;
  endTime: Date | null;
  policyReferences: number;
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

// Mock user data - in a real app this would come from auth context
const currentUser = {
  id: "user-123",
  name: "Sarah Johnson",
  department: "Finance"
};

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
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  
  // Save conversation data for reporting
  const saveConversationData = (newMessages: Message[]) => {
    try {
      // Get existing conversations from localStorage
      const savedConversations = localStorage.getItem('ai-conversations-data');
      let conversations: ConversationData[] = [];
      
      if (savedConversations) {
        conversations = JSON.parse(savedConversations);
      }
      
      // If this is a new conversation (only has the welcome message)
      if (newMessages.length <= 1 && newMessages[0].id === "welcome") {
        // Don't save anything yet - wait for user input
        return;
      }
      
      // Check if we're in an existing conversation
      if (!currentConversationId) {
        // Create a new conversation
        const newConversationId = `conv-${Date.now()}`;
        setCurrentConversationId(newConversationId);
        
        const newConversation: ConversationData = {
          id: newConversationId,
          userId: currentUser.id,
          userName: currentUser.name,
          department: currentUser.department,
          topic: detectTopic(newMessages),
          context: context || "general-inquiry",
          messages: newMessages,
          startTime: new Date(),
          endTime: null,
          policyReferences: countPolicyReferences(newMessages)
        };
        
        conversations.push(newConversation);
      } else {
        // Update existing conversation
        const conversationIndex = conversations.findIndex(c => c.id === currentConversationId);
        if (conversationIndex >= 0) {
          conversations[conversationIndex] = {
            ...conversations[conversationIndex],
            messages: newMessages,
            topic: detectTopic(newMessages),
            policyReferences: countPolicyReferences(newMessages)
          };
        }
      }
      
      // Save updated conversations to localStorage
      localStorage.setItem('ai-conversations-data', JSON.stringify(conversations));
    } catch (error) {
      console.error("Error saving conversation data:", error);
    }
  };
  
  // Helper function to detect topic from messages (simplified)
  const detectTopic = (messages: Message[]): string => {
    // Use the first user message as a basis for topic detection
    const firstUserMessage = messages.find(m => !m.isAI && m.id !== "welcome");
    if (!firstUserMessage) return "General Inquiry";
    
    const content = firstUserMessage.content.toLowerCase();
    
    if (content.includes("meal") || content.includes("food") || content.includes("per diem")) {
      return "Meal Allowances";
    } else if (content.includes("travel") || content.includes("trip") || content.includes("flight")) {
      return "Travel Expenses";
    } else if (content.includes("client") || content.includes("entertainment")) {
      return "Client Entertainment";
    } else if (content.includes("approval") || content.includes("manager")) {
      return "Approval Workflow";
    } else if (content.includes("receipt") || content.includes("document")) {
      return "Receipt Requirements";
    }
    
    return "General Inquiry";
  };
  
  // Helper function to count policy references (simplified)
  const countPolicyReferences = (messages: Message[]): number => {
    // Count AI messages that likely reference policy
    let count = 0;
    messages.forEach(message => {
      if (message.isAI) {
        const content = message.content.toLowerCase();
        if (
          content.includes("policy") || 
          content.includes("guideline") || 
          content.includes("regulation") ||
          content.includes("requirement") ||
          content.includes("limit") ||
          content.includes("approval")
        ) {
          count++;
        }
      }
    });
    return count;
  };
  
  // End conversation when drawer closes
  useEffect(() => {
    if (!isOpen && currentConversationId) {
      try {
        const savedConversations = localStorage.getItem('ai-conversations-data');
        if (savedConversations) {
          let conversations: ConversationData[] = JSON.parse(savedConversations);
          const conversationIndex = conversations.findIndex(c => c.id === currentConversationId);
          
          if (conversationIndex >= 0) {
            conversations[conversationIndex].endTime = new Date();
            localStorage.setItem('ai-conversations-data', JSON.stringify(conversations));
          }
        }
        
        // Reset conversation ID for next session
        setCurrentConversationId(null);
      } catch (error) {
        console.error("Error ending conversation:", error);
      }
    }
  }, [isOpen, currentConversationId]);
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('policy-ai-chat-history', JSON.stringify(messages));
    
    // Also save to conversation data for reporting
    if (messages.length > 1 || (messages.length === 1 && messages[0].id !== "welcome")) {
      saveConversationData(messages);
    }
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
    
    // Reset conversation ID for next session
    setCurrentConversationId(null);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        className="w-full sm:max-w-md p-0 border-l shadow-xl overflow-hidden" 
        side="right"
      >
        <div 
          className="flex flex-col h-full" 
          style={{
            backgroundImage: "linear-gradient(to bottom right, #f9fafb, #e5f0ff, #f0f7ff)",
            backgroundSize: "cover"
          }}
        >
          <SheetHeader className="border-b p-4 bg-white/80 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <SheetTitle className="flex items-center text-blue-600">
                <div className="bg-blue-50 p-1.5 rounded-full mr-2 shadow-sm">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                </div>
                Policy AI Assistant
              </SheetTitle>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>
          
          <ScrollArea className="flex-1 px-4 py-3">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <motion.div 
                  key={message.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex max-w-[85%] ${message.isAI ? 'items-start' : 'items-end'} relative`}>
                    {message.isAI && (
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-2 mr-2 flex-shrink-0 shadow-sm">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div 
                      className={cn(
                        "rounded-2xl p-3 shadow-sm", 
                        message.isAI 
                          ? "bg-white/90 backdrop-blur-sm border border-blue-100/50 text-gray-800 rounded-tl-none" 
                          : "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                    {!message.isAI && (
                      <div className="bg-gray-200 rounded-full p-2 ml-2 flex-shrink-0 shadow-sm">
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
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-2 mr-2 flex-shrink-0 shadow-sm">
                      <Sparkles className="h-4 w-4 text-white animate-pulse" />
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm border border-blue-100/50 rounded-2xl p-4 max-w-[85%] rounded-tl-none shadow-sm">
                      <div className="flex gap-2 items-center">
                        <div className="w-6 h-6 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Skeleton className="h-3 w-40 bg-blue-100/70" />
                          <Skeleton className="h-3 w-28 bg-blue-100/70" />
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
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  <h4 className="text-sm font-medium text-blue-800">Suggested Questions</h4>
                </div>
                <div className="grid gap-2">
                  {suggestedQuestions.map((question) => (
                    <motion.button
                      key={question}
                      whileHover={{ scale: 1.01 }}
                      className="text-left p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100/50 text-sm text-gray-700 hover:bg-blue-50/80 hover:border-blue-200 transition-all duration-200 flex justify-between items-center shadow-sm"
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
          
          <div className="p-4 border-t bg-white/80 backdrop-blur-sm mt-auto">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm border border-gray-100 pl-3 transition-shadow focus-within:ring-1 focus-within:ring-blue-300 focus-within:border-blue-300">
                <LightbulbIcon className="h-4 w-4 text-blue-400" />
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about expense policies..."
                  className="resize-none text-sm min-h-[50px] py-2 border-none focus-visible:ring-0 shadow-none flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  size="sm" 
                  className="m-1"
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                >
                  <Send className="h-4 w-4 mr-1" />
                  <span>Send</span>
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
