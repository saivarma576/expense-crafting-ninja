
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart4, 
  Search, 
  Download, 
  Sparkles, 
  MessageSquare, 
  UserCircle2,
  Filter,
  Calendar,
  ArrowUpDown
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types for our conversation data
type Conversation = {
  id: string;
  userId: string;
  userName: string;
  department: string;
  topic: string;
  context: string;
  messageCount: number;
  policyReferences: number;
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
  satisfaction?: 'high' | 'medium' | 'low' | undefined;
};

type ConversationMessage = {
  id: string;
  conversationId: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
};

type TopicDistribution = {
  topic: string;
  count: number;
  percentage: number;
};

type UserEngagement = {
  department: string;
  totalConversations: number;
  avgMessagesPerConversation: number;
  avgDuration: number; // in seconds
};

// Mock data for demonstration purposes
const mockConversations: Conversation[] = [
  {
    id: "conv-001",
    userId: "user-123",
    userName: "Sarah Johnson",
    department: "Finance",
    topic: "Meal Allowances",
    context: "expense-policy",
    messageCount: 12,
    policyReferences: 3,
    startTime: new Date(2025, 3, 15, 10, 15),
    endTime: new Date(2025, 3, 15, 10, 23),
    duration: 480,
    satisfaction: 'high'
  },
  {
    id: "conv-002",
    userId: "user-456",
    userName: "Michael Chen",
    department: "Sales",
    topic: "Travel Expenses",
    context: "report-submission",
    messageCount: 8,
    policyReferences: 2,
    startTime: new Date(2025, 3, 15, 14, 30),
    endTime: new Date(2025, 3, 15, 14, 36),
    duration: 360,
    satisfaction: 'medium'
  },
  {
    id: "conv-003",
    userId: "user-789",
    userName: "Jessica Kim",
    department: "Marketing",
    topic: "Client Entertainment",
    context: "policy-question",
    messageCount: 15,
    policyReferences: 5,
    startTime: new Date(2025, 3, 16, 9, 45),
    endTime: new Date(2025, 3, 16, 9, 58),
    duration: 780,
    satisfaction: 'high'
  },
  {
    id: "conv-004",
    userId: "user-101",
    userName: "David Rodriguez",
    department: "IT",
    topic: "Software Purchases",
    context: "approval-workflow",
    messageCount: 6,
    policyReferences: 1,
    startTime: new Date(2025, 3, 16, 13, 10),
    endTime: new Date(2025, 3, 16, 13, 15),
    duration: 300,
    satisfaction: 'low'
  },
  {
    id: "conv-005",
    userId: "user-202",
    userName: "Emma Wilson",
    department: "HR",
    topic: "Training Expenses",
    context: "policy-compliance",
    messageCount: 10,
    policyReferences: 4,
    startTime: new Date(2025, 3, 17, 11, 20),
    endTime: new Date(2025, 3, 17, 11, 29),
    duration: 540,
    satisfaction: 'high'
  },
  {
    id: "conv-006",
    userId: "user-303",
    userName: "James Lee",
    department: "Finance",
    topic: "Mileage Reimbursement",
    context: "expense-policy",
    messageCount: 9,
    policyReferences: 2,
    startTime: new Date(2025, 3, 17, 15, 40),
    endTime: new Date(2025, 3, 17, 15, 47),
    duration: 420,
    satisfaction: 'medium'
  },
  {
    id: "conv-007",
    userId: "user-404",
    userName: "Sophia Martinez",
    department: "Sales",
    topic: "International Travel",
    context: "expense-policy",
    messageCount: 18,
    policyReferences: 6,
    startTime: new Date(2025, 3, 17, 16, 30),
    endTime: new Date(2025, 3, 17, 16, 48),
    duration: 1080,
    satisfaction: 'high'
  },
  {
    id: "conv-008",
    userId: "user-505",
    userName: "Robert Taylor",
    department: "IT",
    topic: "Equipment Purchases",
    context: "approval-workflow",
    messageCount: 7,
    policyReferences: 2,
    startTime: new Date(2025, 3, 14, 10, 10),
    endTime: new Date(2025, 3, 14, 10, 17),
    duration: 420,
    satisfaction: 'medium'
  },
  {
    id: "conv-009",
    userId: "user-606",
    userName: "Olivia Brown",
    department: "Marketing",
    topic: "Event Expenses",
    context: "policy-question",
    messageCount: 14,
    policyReferences: 3,
    startTime: new Date(2025, 3, 14, 13, 35),
    endTime: new Date(2025, 3, 14, 13, 48),
    duration: 780,
    satisfaction: 'high'
  },
  {
    id: "conv-010",
    userName: "William Clark",
    userId: "user-707",
    department: "HR",
    topic: "Benefits Questions",
    context: "policy-compliance",
    messageCount: 11,
    policyReferences: 4,
    startTime: new Date(2025, 3, 13, 9, 25),
    endTime: new Date(2025, 3, 13, 9, 36),
    duration: 660,
    satisfaction: 'medium'
  }
];

const mockMessages: ConversationMessage[] = [
  {
    id: "msg-001-1",
    conversationId: "conv-001",
    content: "What are the meal allowance limits for business travel?",
    isAI: false,
    timestamp: new Date(2025, 3, 15, 10, 15)
  },
  {
    id: "msg-001-2",
    conversationId: "conv-001",
    content: "Based on our expense policy, meal allowances for business travel are set at $75 per day for domestic travel and $100 per day for international travel. These limits are subject to itemized receipt requirements for any single meal exceeding $25.",
    isAI: true,
    timestamp: new Date(2025, 3, 15, 10, 15, 30)
  },
  // more messages would be here in a real implementation
];

// Analysis of mock data
const topicDistribution: TopicDistribution[] = [
  { topic: "Meal Allowances", count: 1, percentage: 10 },
  { topic: "Travel Expenses", count: 1, percentage: 10 },
  { topic: "Client Entertainment", count: 1, percentage: 10 },
  { topic: "Software Purchases", count: 1, percentage: 10 },
  { topic: "Training Expenses", count: 1, percentage: 10 },
  { topic: "Mileage Reimbursement", count: 1, percentage: 10 },
  { topic: "International Travel", count: 1, percentage: 10 },
  { topic: "Equipment Purchases", count: 1, percentage: 10 },
  { topic: "Event Expenses", count: 1, percentage: 10 },
  { topic: "Benefits Questions", count: 1, percentage: 10 }
];

const departmentEngagement: UserEngagement[] = [
  { department: "Finance", totalConversations: 2, avgMessagesPerConversation: 10.5, avgDuration: 450 },
  { department: "Sales", totalConversations: 2, avgMessagesPerConversation: 13, avgDuration: 720 },
  { department: "Marketing", totalConversations: 2, avgMessagesPerConversation: 14.5, avgDuration: 780 },
  { department: "IT", totalConversations: 2, avgMessagesPerConversation: 6.5, avgDuration: 360 },
  { department: "HR", totalConversations: 2, avgMessagesPerConversation: 10.5, avgDuration: 600 }
];

// Main component
const AIConversationReport: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("7days");
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Conversation; direction: 'ascending' | 'descending' }>({
    key: 'startTime',
    direction: 'descending'
  });

  // Effect to load messages when a conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      // In a real app, this would fetch messages from storage or API
      const filteredMessages = mockMessages.filter(msg => msg.conversationId === selectedConversation);
      setMessages(filteredMessages);
    } else {
      setMessages([]);
    }
  }, [selectedConversation]);

  // Handle sorting
  const requestSort = (key: keyof Conversation) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    
    // Sort the conversations
    const sortedConversations = [...conversations].sort((a, b) => {
      if (a[key] < b[key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    setConversations(sortedConversations);
  };

  // Filter conversations based on search and filters
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = searchQuery === "" || 
      conv.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.topic.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === "all" || conv.department === departmentFilter;
    const matchesTopic = topicFilter === "all" || conv.topic === topicFilter;
    
    return matchesSearch && matchesDepartment && matchesTopic;
  });

  // Get unique departments and topics for filters
  const departments = Array.from(new Set(conversations.map(c => c.department)));
  const topics = Array.from(new Set(conversations.map(c => c.topic)));

  // Format duration for display
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">AI Conversation Reports</h1>
          <p className="text-muted-foreground">Track and analyze all policy AI assistant conversations</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download size={16} />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={topicFilter} onValueChange={setTopicFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  {topics.map(topic => (
                    <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[140px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="conversations" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        {/* Conversations Tab */}
        <TabsContent value="conversations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare size={18} className="text-primary" />
                  Conversations
                </CardTitle>
                <CardDescription>
                  {filteredConversations.length} conversations found
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <div className="px-4 py-2">
                    {filteredConversations.map((conv) => (
                      <div 
                        key={conv.id}
                        className={`py-3 px-3 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer rounded-md transition-colors ${selectedConversation === conv.id ? 'bg-muted' : ''}`}
                        onClick={() => setSelectedConversation(conv.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-sm">{conv.userName}</h3>
                            <p className="text-xs text-muted-foreground">{conv.department}</p>
                          </div>
                          <Badge variant={
                            conv.satisfaction === 'high' ? 'success' : 
                            conv.satisfaction === 'medium' ? 'warning' : 
                            conv.satisfaction === 'low' ? 'destructive' : 'outline'
                          }>
                            {conv.satisfaction || 'Unknown'}
                          </Badge>
                        </div>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">{conv.topic}</span>
                          <span className="mx-2">•</span>
                          <span>{conv.messageCount} messages</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(conv.startTime).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            {/* Conversation Details */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles size={18} className="text-primary" />
                  Conversation Details
                </CardTitle>
                <CardDescription>
                  {selectedConversation ? 'View the complete conversation' : 'Select a conversation to view details'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedConversation ? (
                  <div className="space-y-4">
                    {/* Conversation Metadata */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">User</p>
                        <p className="font-medium">{conversations.find(c => c.id === selectedConversation)?.userName}</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">Department</p>
                        <p className="font-medium">{conversations.find(c => c.id === selectedConversation)?.department}</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="font-medium">{formatDuration(conversations.find(c => c.id === selectedConversation)?.duration || 0)}</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">Policy References</p>
                        <p className="font-medium">{conversations.find(c => c.id === selectedConversation)?.policyReferences}</p>
                      </div>
                    </div>
                    
                    {/* Messages */}
                    <div className="border rounded-md p-4 space-y-4">
                      {messages.length > 0 ? (
                        messages.map(message => (
                          <div 
                            key={message.id} 
                            className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
                          >
                            <div className={`flex max-w-[85%] ${message.isAI ? 'items-start' : 'items-end'}`}>
                              {message.isAI && (
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-2 mr-2 flex-shrink-0 shadow-sm">
                                  <Sparkles className="h-4 w-4 text-white" />
                                </div>
                              )}
                              <div 
                                className={`rounded-2xl p-3 shadow-sm ${
                                  message.isAI 
                                    ? "bg-white border border-blue-100/50 text-gray-800 rounded-tl-none" 
                                    : "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <p className="text-xs mt-1 opacity-70">
                                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </p>
                              </div>
                              {!message.isAI && (
                                <div className="bg-gray-200 rounded-full p-2 ml-2 flex-shrink-0 shadow-sm">
                                  <UserCircle2 className="h-4 w-4 text-gray-600" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <MessageSquare className="mx-auto h-12 w-12 opacity-20 mb-2" />
                          <p>No messages available for this conversation</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <MessageSquare className="h-16 w-16 text-muted-foreground/20 mb-4" />
                    <h3 className="text-lg font-medium">No Conversation Selected</h3>
                    <p className="text-muted-foreground mt-1">Select a conversation from the list to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* All Conversations Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart4 size={18} className="text-primary" />
                All Conversations
              </CardTitle>
              <CardDescription>
                Detailed list of all AI assistant conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px] cursor-pointer" onClick={() => requestSort('userName')}>
                      <div className="flex items-center gap-1">
                        User
                        <ArrowUpDown size={14} />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => requestSort('department')}>
                      <div className="flex items-center gap-1">
                        Department
                        <ArrowUpDown size={14} />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => requestSort('topic')}>
                      <div className="flex items-center gap-1">
                        Topic
                        <ArrowUpDown size={14} />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => requestSort('messageCount')}>
                      <div className="flex items-center gap-1">
                        Messages
                        <ArrowUpDown size={14} />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => requestSort('duration')}>
                      <div className="flex items-center gap-1">
                        Duration
                        <ArrowUpDown size={14} />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => requestSort('startTime')}>
                      <div className="flex items-center gap-1">
                        Date/Time
                        <ArrowUpDown size={14} />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => requestSort('satisfaction')}>
                      <div className="flex items-center gap-1">
                        Satisfaction
                        <ArrowUpDown size={14} />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConversations.map((conv) => (
                    <TableRow 
                      key={conv.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedConversation(conv.id)}
                    >
                      <TableCell className="font-medium">{conv.userName}</TableCell>
                      <TableCell>{conv.department}</TableCell>
                      <TableCell>{conv.topic}</TableCell>
                      <TableCell>{conv.messageCount}</TableCell>
                      <TableCell>{formatDuration(conv.duration)}</TableCell>
                      <TableCell>
                        {new Date(conv.startTime).toLocaleDateString()} {new Date(conv.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          conv.satisfaction === 'high' ? 'success' : 
                          conv.satisfaction === 'medium' ? 'warning' : 
                          conv.satisfaction === 'low' ? 'destructive' : 'outline'
                        }>
                          {conv.satisfaction || 'Unknown'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Topic Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare size={18} className="text-primary" />
                  Topic Distribution
                </CardTitle>
                <CardDescription>
                  Most common topics discussed with the AI assistant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topicDistribution.map((item) => (
                    <div key={item.topic} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.topic}</span>
                        <span className="text-sm text-muted-foreground">{item.count} ({item.percentage}%)</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Department Engagement */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <UserCircle2 size={18} className="text-primary" />
                  Department Engagement
                </CardTitle>
                <CardDescription>
                  AI assistant usage across departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Conversations</TableHead>
                      <TableHead>Avg Messages</TableHead>
                      <TableHead>Avg Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentEngagement.map((dept) => (
                      <TableRow key={dept.department}>
                        <TableCell className="font-medium">{dept.department}</TableCell>
                        <TableCell>{dept.totalConversations}</TableCell>
                        <TableCell>{dept.avgMessagesPerConversation.toFixed(1)}</TableCell>
                        <TableCell>{formatDuration(dept.avgDuration)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          
          {/* Satisfaction Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles size={18} className="text-primary" />
                Satisfaction Analysis
              </CardTitle>
              <CardDescription>
                User satisfaction metrics based on conversation outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">60%</div>
                  <div className="text-sm font-medium">High Satisfaction</div>
                  <div className="text-xs text-muted-foreground mt-1">6 conversations</div>
                </div>
                <div className="bg-muted/50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-amber-500 mb-2">30%</div>
                  <div className="text-sm font-medium">Medium Satisfaction</div>
                  <div className="text-xs text-muted-foreground mt-1">3 conversations</div>
                </div>
                <div className="bg-muted/50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">10%</div>
                  <div className="text-sm font-medium">Low Satisfaction</div>
                  <div className="text-xs text-muted-foreground mt-1">1 conversation</div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Satisfaction by Department</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>High</TableHead>
                      <TableHead>Medium</TableHead>
                      <TableHead>Low</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Finance</TableCell>
                      <TableCell>50%</TableCell>
                      <TableCell>50%</TableCell>
                      <TableCell>0%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sales</TableCell>
                      <TableCell>50%</TableCell>
                      <TableCell>50%</TableCell>
                      <TableCell>0%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Marketing</TableCell>
                      <TableCell>100%</TableCell>
                      <TableCell>0%</TableCell>
                      <TableCell>0%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">IT</TableCell>
                      <TableCell>0%</TableCell>
                      <TableCell>50%</TableCell>
                      <TableCell>50%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">HR</TableCell>
                      <TableCell>50%</TableCell>
                      <TableCell>50%</TableCell>
                      <TableCell>0%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare size={18} className="text-primary" />
                  Total Conversations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">10</div>
                <div className="text-sm text-green-600 flex items-center gap-1">
                  <span>↑ 25%</span>
                  <span className="text-muted-foreground">vs previous period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles size={18} className="text-primary" />
                  Avg. Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">High</div>
                <div className="text-sm text-green-600 flex items-center gap-1">
                  <span>↑ 10%</span>
                  <span className="text-muted-foreground">vs previous period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <UserCircle2 size={18} className="text-primary" />
                  Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">8</div>
                <div className="text-sm text-amber-500 flex items-center gap-1">
                  <span>↓ 5%</span>
                  <span className="text-muted-foreground">vs previous period</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart4 size={18} className="text-primary" />
                Usage Trends
              </CardTitle>
              <CardDescription>
                AI conversation usage patterns over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-md">
                <p className="text-muted-foreground">Chart visualization would be displayed here</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Usage by Time of Day</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time Period</TableHead>
                        <TableHead>Conversations</TableHead>
                        <TableHead>Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Morning (8AM-12PM)</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>50%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Afternoon (12PM-5PM)</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell>40%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Evening (5PM-8PM)</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>10%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Most Frequent Questions</h3>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li className="p-2 bg-muted/50 rounded-md">What are the meal allowance limits for business travel?</li>
                    <li className="p-2 bg-muted/50 rounded-md">Do I need approval for expenses over $500?</li>
                    <li className="p-2 bg-muted/50 rounded-md">How long do I have to submit receipts after a trip?</li>
                    <li className="p-2 bg-muted/50 rounded-md">What types of transportation expenses are covered?</li>
                    <li className="p-2 bg-muted/50 rounded-md">Are entertainment expenses allowed with clients?</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIConversationReport;
